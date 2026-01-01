import { NIGER_CITIES } from '../constants';
import { PrayerTimes, City } from '../types';

class PrayerTimeService {
  private readonly FAJR_ANGLE = 18.0;
  private readonly ISHA_ANGLE = 17.0;
  private readonly ASR_FACTOR = 1;

  calculatePrayerTimes(date: Date, city: City): PrayerTimes {
    const { latitude, longitude } = city;
    const timezone = 1;
    
    const jd = this.julianDate(date);
    const { declination, eqTime } = this.sunPosition(jd);
    
    const dhuhr = 12 + timezone - longitude / 15 - eqTime / 60;
    const fajr = dhuhr - this.hourAngle(latitude, declination, this.FAJR_ANGLE) / 15;
    const sunrise = dhuhr - this.hourAngle(latitude, declination, 0.833) / 15;
    const asr = dhuhr + this.asrHourAngle(latitude, declination) / 15;
    const maghrib = dhuhr + this.hourAngle(latitude, declination, 0.833) / 15;
    const isha = dhuhr + this.hourAngle(latitude, declination, this.ISHA_ANGLE) / 15;

    return {
      fajr: this.formatTime(fajr),
      sunrise: this.formatTime(sunrise),
      dhuhr: this.formatTime(dhuhr),
      asr: this.formatTime(asr),
      maghrib: this.formatTime(maghrib),
      isha: this.formatTime(isha),
      date: this.formatDate(date),
    };
  }

  getNextPrayer(times: PrayerTimes): { name: string; time: string; remaining: string } {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        return {
          name: prayer.name,
          time: prayer.time,
          remaining: h > 0 ? `${h}h ${m}min` : `${m}min`,
        };
      }
    }

    const [fajrH, fajrM] = times.fajr.split(':').map(Number);
    const fajrMinutes = fajrH * 60 + fajrM;
    const diff = (24 * 60 - currentMinutes) + fajrMinutes;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    
    return { name: 'Fajr', time: times.fajr, remaining: `${h}h ${m}min` };
  }

  getCities(): City[] {
    return NIGER_CITIES;
  }

  getCityById(id: string): City | undefined {
    return NIGER_CITIES.find(city => city.id === id);
  }

  private julianDate(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let y = year;
    let m = month;
    
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  }

  private sunPosition(jd: number): { declination: number; eqTime: number } {
    const d = jd - 2451545.0;
    const L = this.fixAngle(280.46646 + 0.9856474 * d);
    const g = this.fixAngle(357.52911 + 0.98560028 * d);
    const gRad = this.toRadians(g);
    
    const c = (1.9146 - 0.004817 * d / 36525) * Math.sin(gRad) +
              0.019993 * Math.sin(2 * gRad) + 0.00029 * Math.sin(3 * gRad);
    
    const trueLong = this.fixAngle(L + c);
    const obliq = 23.439 - 0.00000036 * d;
    
    const declination = this.toDegrees(Math.asin(
      Math.sin(this.toRadians(obliq)) * Math.sin(this.toRadians(trueLong))
    ));
    
    const ra = this.toDegrees(Math.atan2(
      Math.cos(this.toRadians(obliq)) * Math.sin(this.toRadians(trueLong)),
      Math.cos(this.toRadians(trueLong))
    ));
    
    const eqTime = (L - this.fixAngle(ra)) * 4;
    return { declination, eqTime };
  }

  private hourAngle(latitude: number, declination: number, angle: number): number {
    const latRad = this.toRadians(latitude);
    const declRad = this.toRadians(declination);
    const angleRad = this.toRadians(angle);
    
    const cosHA = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declRad)) /
                  (Math.cos(latRad) * Math.cos(declRad));
    
    if (cosHA > 1) return 0;
    if (cosHA < -1) return 180;
    
    return this.toDegrees(Math.acos(cosHA));
  }

  private asrHourAngle(latitude: number, declination: number): number {
    const latRad = this.toRadians(latitude);
    const declRad = this.toRadians(declination);
    const shadowRatio = this.ASR_FACTOR + Math.tan(Math.abs(latRad - declRad));
    const asrAngle = this.toDegrees(Math.atan(1 / shadowRatio));
    return this.hourAngle(latitude, declination, 90 - asrAngle);
  }

  private formatTime(hours: number): string {
    let h = hours;
    while (h < 0) h += 24;
    while (h >= 24) h -= 24;
    
    const hour = Math.floor(h);
    const minute = Math.round((h - hour) * 60);
    const finalHour = minute === 60 ? hour + 1 : hour;
    const finalMinute = minute === 60 ? 0 : minute;
    
    return `${finalHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}`;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private toRadians(d: number): number { return d * Math.PI / 180; }
  private toDegrees(r: number): number { return r * 180 / Math.PI; }
  private fixAngle(a: number): number { return a - 360 * Math.floor(a / 360); }
}

export const prayerTimeService = new PrayerTimeService();

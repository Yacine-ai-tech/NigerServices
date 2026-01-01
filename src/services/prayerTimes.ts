import { NIGER_CITIES } from '../constants';
import { PrayerTimes, City } from '../types';

// Prayer time calculation using basic astronomical formulas
// This provides offline-capable prayer times calculation

class PrayerTimeService {
  // Calculation methods
  private readonly FAJR_ANGLE = 18; // Muslim World League
  private readonly ISHA_ANGLE = 17; // Muslim World League
  private readonly ASR_SHADOW_FACTOR = 1; // Shafi'i method

  calculatePrayerTimes(date: Date, city: City): PrayerTimes {
    const { latitude, longitude } = city;
    const jd = this.gregorianToJulian(date);
    const d = jd - 2451545.0;
    
    // Sun's position
    const g = this.normalizeAngle(357.529 + 0.98560028 * d);
    const q = this.normalizeAngle(280.459 + 0.98564736 * d);
    const L = this.normalizeAngle(q + 1.915 * this.sin(g) + 0.020 * this.sin(2 * g));
    const e = 23.439 - 0.00000036 * d;
    const decl = this.arcsin(this.sin(e) * this.sin(L));
    
    // Equation of time
    const RA = this.arctan2(this.cos(e) * this.sin(L), this.cos(L)) / 15;
    const eqTime = q / 15 - RA;
    
    // Timezone offset (Niger uses WAT, UTC+1)
    const timezone = 1;
    
    // Calculate times
    const dhuhr = 12 + timezone - longitude / 15 - eqTime;
    const sunrise = dhuhr - this.sunAngle(latitude, decl, 0.833) / 15;
    const fajr = dhuhr - this.sunAngle(latitude, decl, this.FAJR_ANGLE) / 15;
    const maghrib = dhuhr + this.sunAngle(latitude, decl, 0.833) / 15;
    const isha = dhuhr + this.sunAngle(latitude, decl, this.ISHA_ANGLE) / 15;
    const asr = dhuhr + this.asrTime(latitude, decl, this.ASR_SHADOW_FACTOR) / 15;

    return {
      fajr: this.formatTime(fajr),
      sunrise: this.formatTime(sunrise),
      dhuhr: this.formatTime(dhuhr),
      asr: this.formatTime(asr),
      maghrib: this.formatTime(maghrib),
      isha: this.formatTime(isha),
      date: date.toISOString().split('T')[0],
    };
  }

  getCities(): City[] {
    return NIGER_CITIES;
  }

  getCityById(id: string): City | undefined {
    return NIGER_CITIES.find(city => city.id === id);
  }

  // Helper methods
  private gregorianToJulian(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let y = year;
    let m = month;
    
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    
    return Math.floor(365.25 * (y + 4716)) + 
           Math.floor(30.6001 * (m + 1)) + 
           day + B - 1524.5;
  }

  private normalizeAngle(angle: number): number {
    return angle - 360 * Math.floor(angle / 360);
  }

  private sin(d: number): number {
    return Math.sin(this.toRadians(d));
  }

  private cos(d: number): number {
    return Math.cos(this.toRadians(d));
  }

  private tan(d: number): number {
    return Math.tan(this.toRadians(d));
  }

  private arcsin(x: number): number {
    return this.toDegrees(Math.asin(x));
  }

  private arctan2(y: number, x: number): number {
    return this.toDegrees(Math.atan2(y, x));
  }

  private toRadians(d: number): number {
    return (d * Math.PI) / 180;
  }

  private toDegrees(r: number): number {
    return (r * 180) / Math.PI;
  }

  private sunAngle(lat: number, decl: number, angle: number): number {
    const cosHA = (this.sin(angle) - this.sin(lat) * this.sin(decl)) / 
                  (this.cos(lat) * this.cos(decl));
    
    if (cosHA > 1 || cosHA < -1) return 0;
    return this.toDegrees(Math.acos(cosHA));
  }

  private asrTime(lat: number, decl: number, factor: number): number {
    const angle = this.toDegrees(
      Math.atan(1 / (factor + this.tan(Math.abs(lat - decl))))
    );
    return this.sunAngle(lat, decl, 90 - angle);
  }

  private formatTime(time: number): string {
    // Handle time wrapping
    if (time < 0) time += 24;
    if (time >= 24) time -= 24;
    
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

export const prayerTimeService = new PrayerTimeService();

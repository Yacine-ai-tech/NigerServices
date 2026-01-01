# Niger Services 🇳🇪# 🇳🇪 Niger Services



A comprehensive mobile application for essential services in Niger - prayer times, currency conversion, emergency contacts, notes, and an intelligent offline assistant.**Votre assistant quotidien pour les services essentiels au Niger**



[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)A fully functional, offline-first mobile application built with React Native and Expo, designed specifically for Niger citizens. This app showcases modern mobile development practices with a focus on performance, security, and user experience.

[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)](https://expo.dev)

[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-52-black.svg)](https://expo.dev)![Niger Flag Colors](https://img.shields.io/badge/Made%20for-Niger-E05206?style=for-the-badge)

[![React Native](https://img.shields.io/badge/React%20Native-0.76.9-blue.svg)](https://reactnative.dev)![React Native](https://img.shields.io/badge/React%20Native-0.76.5-61DAFB?style=for-the-badge&logo=react)

![Expo](https://img.shields.io/badge/Expo-52.0-000020?style=for-the-badge&logo=expo)

<p align="center">![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)

  <img src="assets/icon.png" alt="Niger Services Logo" width="120" height="120"/>

</p>## 📱 Features



## 📱 Features### 🏠 Home Screen

- Personalized greetings based on time of day

### 🕌 Prayer Times- Quick access to all app features

- Accurate Islamic prayer times calculated using the **Muslim World League** method- Niger flag representation

- Supports all major cities in Niger with GPS coordinates- Essential information at a glance

- Real-time location detection for precise calculations

- Visual countdown to next prayer### 💱 Currency Converter

- Convert between XOF (Franc CFA) and major currencies

### 💱 Currency Converter- Fixed EUR/XOF rate (1 EUR = 655.957 FCFA)

- Real-time exchange rates with offline fallback- Support for USD, GBP, NGN, GHS, MAD, CNY

- Support for **CFA Franc (XOF)**, USD, EUR, GBP, and more- Quick amount buttons for common values

- Quick conversion with saved favorites- **Works completely offline**

- Last updated timestamp for transparency

### 🕌 Prayer Times

### 🚨 Emergency Contacts- Accurate prayer time calculations for all Niger cities

- **14 verified emergency numbers** for Niger- Niamey, Zinder, Maradi, Agadez, Tahoua, Dosso, Diffa, Tillabéri

- Categories: Medical, Police, Fire, Administration- Muslim World League calculation method

- One-tap calling functionality- Automatic next prayer highlighting

- Works completely offline- **No internet required - calculated locally**



### 📝 Smart Notes### 📞 Emergency Contacts

- Create and organize notes with categories- Essential emergency numbers for Niger

- Search functionality with real-time filtering- Police (17), Pompiers (18), SAMU (15)

- Pin important notes to top- Hospitals, utilities, embassies

- Color-coded categories- One-tap calling functionality

- Full offline support with SQLite- Searchable and filterable list



### 🤖 Offline AI Assistant### 📝 Notes

- **100% offline** intelligent assistant- Create, edit, and delete personal notes

- Pre-trained knowledge base on Niger:- Color-coded notes for organization

  - Geography and climate- Pin important notes to the top

  - Tourism and UNESCO World Heritage sites- Offline SQLite storage

  - Currency and exchange information- Rich text editing

  - Emergency services

  - Prayer times guidance### ⚙️ Settings

  - Local culture and customs- City selection for prayer times

- Context-aware suggestions- App preferences

- French language interface- Data management



### 🗺️ Tourist Information## 🏗️ Architecture

- 8 major tourist destinations including:

  - W National Park (UNESCO)```

  - Aïr and Ténéré Natural Reserve (UNESCO)NigerServices/

  - Agadez Historic Centre├── App.tsx                 # Main entry point

  - Sultan's Palace in Zinder├── src/

  - Grand Mosque of Niamey│   ├── components/         # Reusable UI components

- GPS coordinates for navigation│   │   ├── Button.tsx

- Category icons for quick identification│   │   ├── Card.tsx

│   │   ├── Header.tsx

## 🛠️ Tech Stack│   │   └── Input.tsx

│   ├── screens/            # App screens

- **Framework**: React Native 0.76.9 with Expo SDK 52│   │   ├── HomeScreen.tsx

- **Language**: TypeScript 5.3.3│   │   ├── CurrencyScreen.tsx

- **Navigation**: React Navigation 7.x│   │   ├── PrayerScreen.tsx

- **Database**: expo-sqlite for offline storage│   │   ├── EmergencyScreen.tsx

- **Location**: expo-location for GPS│   │   ├── NotesScreen.tsx

- **Icons**: @expo/vector-icons (Ionicons)│   │   ├── NoteDetailScreen.tsx

- **State Management**: React Hooks│   │   └── SettingsScreen.tsx

│   ├── services/           # Business logic

## 📦 Installation│   │   ├── database.ts     # SQLite operations

│   │   ├── currency.ts     # Currency conversion

### Prerequisites│   │   ├── prayerTimes.ts  # Prayer calculations

│   │   └── unitConverter.ts

- Node.js 18.x or higher│   ├── constants/          # App constants

- npm or yarn│   │   ├── theme.ts        # Colors, spacing, fonts

- Expo CLI (`npm install -g expo-cli`)│   │   └── data.ts         # Static data

- Android Studio (for Android development)│   └── types/              # TypeScript definitions

- Xcode (for iOS development, macOS only)│       └── index.ts

├── assets/                 # App icons and images

### Setup└── scripts/                # Build scripts

```

1. **Clone the repository**

   ```bash## 🎨 Design System

   git clone https://github.com/Yacine-ai-tech/NigerServices.git

   cd NigerServices### Colors (Niger Flag Inspired)

   ```- **Primary (Orange):** `#E05206`

- **Secondary (Green):** `#0D9F4F`

2. **Install dependencies**- **Background:** `#F8F9FA`

   ```bash- **Surface:** `#FFFFFF`

   npm install

   ```### Typography

- System fonts with custom weights

3. **Start the development server**- French language primary

   ```bash

   npx expo start## 🔐 Security Features

   ```

- Input validation on all forms

4. **Run on device/emulator**- Secure local storage with expo-secure-store

   - Press `a` for Android emulator- No external data transmission (offline-first)

   - Press `i` for iOS simulator (macOS only)- SQL injection prevention with parameterized queries

   - Scan QR code with Expo Go app on physical device

## 📴 Offline Capabilities

## 🏗️ Building for Production

This app is designed to work **100% offline**:

### Android (APK/AAB)- ✅ Currency conversion (fixed rates cached)

- ✅ Prayer time calculations (astronomical formulas)

1. **Configure EAS Build**- ✅ Emergency contacts (bundled data)

   ```bash- ✅ Notes (SQLite local database)

   npx eas-cli build:configure- ✅ All UI and navigation

   ```

## 🚀 Getting Started

2. **Build Preview APK**

   ```bash### Prerequisites

   npx eas-cli build --platform android --profile preview- Node.js 18+

   ```- npm or yarn

- Expo CLI (`npm install -g expo-cli`)

3. **Build Production AAB (for Play Store)**- EAS CLI (`npm install -g eas-cli`)

   ```bash- Android Studio (for Android builds)

   npx eas-cli build --platform android --profile production

   ```### Installation



### iOS```bash

# Clone the repository

```bashcd NigerServices

npx eas-cli build --platform ios --profile production

```# Install dependencies

npm install

## 📁 Project Structure

# Start development server

```npm start

NigerServices/

├── App.tsx                 # Main application entry# Run on Android

├── app.json                # Expo configurationnpm run android

├── eas.json                # EAS Build configuration

├── package.json            # Dependencies# Run on iOS (macOS only)

├── tsconfig.json           # TypeScript configurationnpm run ios

├── assets/                 # App icons and splash screens```

├── src/

│   ├── components/         # Reusable UI components### Building for Production

│   │   ├── Button.tsx

│   │   ├── Card.tsx```bash

│   │   ├── Header.tsx# Login to Expo

│   │   └── Input.tsxeas login

│   ├── constants/          # App constants and data

│   │   ├── data.ts        # Niger cities, emergencies, tourist places# Configure EAS (first time)

│   │   └── theme.ts       # Colors, spacing, typographyeas build:configure

│   ├── screens/            # Application screens

│   │   ├── HomeScreen.tsx# Build APK for testing

│   │   ├── CurrencyScreen.tsxeas build --platform android --profile preview

│   │   ├── PrayerScreen.tsx

│   │   ├── EmergencyScreen.tsx# Build AAB for Play Store

│   │   ├── NotesScreen.tsxeas build --platform android --profile production

│   │   ├── AIScreen.tsx```

│   │   └── SettingsScreen.tsx

│   ├── services/           # Business logic services## 📦 Play Store Deployment

│   │   ├── aiService.ts   # Offline AI assistant

│   │   ├── currency.ts    # Currency conversion API### 1. Generate App Icons

│   │   ├── database.ts    # SQLite database```bash

│   │   ├── prayerTimes.ts # Prayer calculations# Generate assets (placeholder)

│   │   └── unitConverter.tsnpm run generate:assets

│   └── types/              # TypeScript type definitions```

│       └── index.ts

└── scripts/                # Build and asset scripts### 2. Update app.json

```- Set unique `android.package` (e.g., `com.yourcompany.nigerservices`)

- Update version numbers

## 🌍 Supported Cities- Add EAS project ID



| City | Region | Population | Coordinates |### 3. Build & Submit

|------|--------|------------|-------------|```bash

| Niamey | Niamey | 1,200,000 | 13.5127°N, 2.1128°E |# Build production AAB

| Zinder | Zinder | 322,935 | 13.8053°N, 8.9883°E |eas build --platform android --profile production

| Maradi | Maradi | 267,249 | 13.5000°N, 7.1017°E |

| Agadez | Agadez | 124,324 | 16.9739°N, 7.9911°E |# Submit to Play Store

| Tahoua | Tahoua | 117,826 | 14.8888°N, 5.2692°E |eas submit --platform android

| Dosso | Dosso | 58,671 | 13.0444°N, 3.1936°E |```

| Diffa | Diffa | 48,000 | 13.3154°N, 12.6089°E |

| Arlit | Agadez | 112,000 | 18.7369°N, 7.3853°E |### 4. Play Store Requirements

| Tessaoua | Maradi | 43,409 | 13.7572°N, 7.9867°E |- Privacy Policy URL

| Birni N'Konni | Tahoua | 63,000 | 13.7956°N, 5.2503°E |- App screenshots (phone & tablet)

- Feature graphic (1024x500)

## 🕌 Prayer Time Calculation- App description in French

- Content rating questionnaire

This app uses the **Muslim World League (MWL)** method for prayer time calculations:

- **Fajr**: Sun angle at -18°## 🧪 Testing

- **Isha**: Sun angle at -17°

- **Asr**: Shafi'i school (shadow factor = 1)```bash

# Run tests

All calculations are performed locally using astronomical formulas for maximum accuracy and offline capability.npm test



## 📄 License# Lint code

npm run lint

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.```



```## 📄 License

Copyright 2025 Yacine-ai-tech (siddoyacinedigitl@gmail.com)

This project is licensed under the MIT License.

Licensed under the Apache License, Version 2.0 (the "License");

you may not use this file except in compliance with the License.## 👨‍💻 Developer

You may obtain a copy of the License at

Built to showcase mobile development skills with:

    http://www.apache.org/licenses/LICENSE-2.0- React Native & Expo

- TypeScript

Unless required by applicable law or agreed to in writing, software- Offline-first architecture

distributed under the License is distributed on an "AS IS" BASIS,- Modern UI/UX design

WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.- Production-ready code quality

See the License for the specific language governing permissions and

limitations under the License.---

```

**🇳🇪 Fraternité - Travail - Progrès**

## 👨‍💻 Author

*Made with ❤️ for Niger*

**Yacine-ai-tech**
- GitHub: [@Yacine-ai-tech](https://github.com/Yacine-ai-tech)
- Email: siddoyacinedigitl@gmail.com

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/Yacine-ai-tech/NigerServices/issues/new) with:
- Device information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development platform
- [React Navigation](https://reactnavigation.org) for seamless navigation
- All contributors and users of Niger Services

## 📊 App Size

The app is optimized to be **extremely lightweight**:
- Uses @expo/vector-icons instead of custom icon fonts
- Optimized PNG assets (< 50KB each)
- Minimal external dependencies
- Efficient SQLite storage

---

<p align="center">
  Made with ❤️ for Niger 🇳🇪
</p>

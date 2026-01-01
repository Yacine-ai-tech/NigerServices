# 🇳🇪 Niger Services

**Votre assistant quotidien pour les services essentiels au Niger**

A fully functional, offline-first mobile application built with React Native and Expo, designed specifically for Niger citizens. This app showcases modern mobile development practices with a focus on performance, security, and user experience.

![Niger Flag Colors](https://img.shields.io/badge/Made%20for-Niger-E05206?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-0.76.5-61DAFB?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-52.0-000020?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)

## 📱 Features

### 🏠 Home Screen
- Personalized greetings based on time of day
- Quick access to all app features
- Niger flag representation
- Essential information at a glance

### 💱 Currency Converter
- Convert between XOF (Franc CFA) and major currencies
- Fixed EUR/XOF rate (1 EUR = 655.957 FCFA)
- Support for USD, GBP, NGN, GHS, MAD, CNY
- Quick amount buttons for common values
- **Works completely offline**

### 🕌 Prayer Times
- Accurate prayer time calculations for all Niger cities
- Niamey, Zinder, Maradi, Agadez, Tahoua, Dosso, Diffa, Tillabéri
- Muslim World League calculation method
- Automatic next prayer highlighting
- **No internet required - calculated locally**

### 📞 Emergency Contacts
- Essential emergency numbers for Niger
- Police (17), Pompiers (18), SAMU (15)
- Hospitals, utilities, embassies
- One-tap calling functionality
- Searchable and filterable list

### 📝 Notes
- Create, edit, and delete personal notes
- Color-coded notes for organization
- Pin important notes to the top
- Offline SQLite storage
- Rich text editing

### ⚙️ Settings
- City selection for prayer times
- App preferences
- Data management

## 🏗️ Architecture

```
NigerServices/
├── App.tsx                 # Main entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   └── Input.tsx
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── CurrencyScreen.tsx
│   │   ├── PrayerScreen.tsx
│   │   ├── EmergencyScreen.tsx
│   │   ├── NotesScreen.tsx
│   │   ├── NoteDetailScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/           # Business logic
│   │   ├── database.ts     # SQLite operations
│   │   ├── currency.ts     # Currency conversion
│   │   ├── prayerTimes.ts  # Prayer calculations
│   │   └── unitConverter.ts
│   ├── constants/          # App constants
│   │   ├── theme.ts        # Colors, spacing, fonts
│   │   └── data.ts         # Static data
│   └── types/              # TypeScript definitions
│       └── index.ts
├── assets/                 # App icons and images
└── scripts/                # Build scripts
```

## 🎨 Design System

### Colors (Niger Flag Inspired)
- **Primary (Orange):** `#E05206`
- **Secondary (Green):** `#0D9F4F`
- **Background:** `#F8F9FA`
- **Surface:** `#FFFFFF`

### Typography
- System fonts with custom weights
- French language primary

## 🔐 Security Features

- Input validation on all forms
- Secure local storage with expo-secure-store
- No external data transmission (offline-first)
- SQL injection prevention with parameterized queries

## 📴 Offline Capabilities

This app is designed to work **100% offline**:
- ✅ Currency conversion (fixed rates cached)
- ✅ Prayer time calculations (astronomical formulas)
- ✅ Emergency contacts (bundled data)
- ✅ Notes (SQLite local database)
- ✅ All UI and navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Android Studio (for Android builds)

### Installation

```bash
# Clone the repository
cd NigerServices

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Building for Production

```bash
# Login to Expo
eas login

# Configure EAS (first time)
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

## 📦 Play Store Deployment

### 1. Generate App Icons
```bash
# Generate assets (placeholder)
npm run generate:assets
```

### 2. Update app.json
- Set unique `android.package` (e.g., `com.yourcompany.nigerservices`)
- Update version numbers
- Add EAS project ID

### 3. Build & Submit
```bash
# Build production AAB
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

### 4. Play Store Requirements
- Privacy Policy URL
- App screenshots (phone & tablet)
- Feature graphic (1024x500)
- App description in French
- Content rating questionnaire

## 🧪 Testing

```bash
# Run tests
npm test

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built to showcase mobile development skills with:
- React Native & Expo
- TypeScript
- Offline-first architecture
- Modern UI/UX design
- Production-ready code quality

---

**🇳🇪 Fraternité - Travail - Progrès**

*Made with ❤️ for Niger*

# Niger Services - Play Store Deployment Guide

## 🚀 QUICK DEPLOY (Follow these steps exactly)

### Step 1: Login to Expo/EAS (if not already logged in)
```bash
cd c:\Users\YACINE.AI\Documents\CONSULTING\PORTFOLIO\mobile_project\NigerServices
npx eas login
```
Enter your Expo credentials when prompted.

### Step 2: Initialize the project with EAS
```bash
npx eas build:configure
```
- Select "All" when asked which platforms
- This creates/updates the eas.json and links to your Expo account

### Step 3: Build APK for Testing (Quick - ~10 min)
```bash
npx eas build --platform android --profile preview
```
- Wait for the build to complete
- Download the APK and test on your device

### Step 4: Build AAB for Play Store (Production)
```bash
npx eas build --platform android --profile production
```
- Wait for the build (~15-20 min)
- Download the .aab file when complete

### Step 5: Submit to Play Store
Option A - Manual Upload (Recommended first time):
1. Go to https://play.google.com/console
2. Create a new app or select existing
3. Go to "Production" or "Internal testing"
4. Upload the .aab file
5. Fill in store listing, content rating, etc.

Option B - Automatic Submit (requires service account):
```bash
npx eas submit --platform android --profile production
```

---

## 📋 Pre-Deployment Checklist

### ✅ Code Ready
- [x] All TypeScript errors fixed
- [x] Database service working
- [x] All screens implemented
- [x] Navigation working

### ✅ Assets Ready
- [x] App icon (icon.png)
- [x] Adaptive icon (adaptive-icon.png)
- [x] Splash screen (splash.png)
- [x] Favicon (favicon.png)

### ✅ Configuration Ready
- [x] package.json cleaned
- [x] app.json configured
- [x] eas.json configured
- [x] tsconfig.json fixed

---

## 🔧 Common Issues & Solutions

### Issue: "Gradle build failed"
**Solution**: Already fixed by:
- Setting `newArchEnabled: false` in app.json
- Removing problematic plugins
- Using stable dependency versions

### Issue: "Facebook SDK error"
**Solution**: Already fixed by:
- Not using any Facebook-related packages
- Clean dependency list

### Issue: "Build takes too long"
**Solution**: Use `preview` profile first for testing:
```bash
npx eas build --platform android --profile preview
```

### Issue: "Signing key issues"
**Solution**: Let EAS manage signing (default):
- EAS automatically creates and manages signing keys
- For manual key management, see EAS docs

---

## 📱 Play Store Requirements

Before submitting, prepare:
1. **App Title**: Niger Services
2. **Short Description**: Services essentiels pour le Niger
3. **Full Description**: (Write in French for Niger audience)
4. **Screenshots**: At least 2 phone screenshots
5. **Feature Graphic**: 1024x500 image
6. **Privacy Policy URL**: Required by Google
7. **Content Rating**: Fill out questionnaire

---

## 🎯 Final Commands Summary

```bash
# Navigate to project
cd c:\Users\YACINE.AI\Documents\CONSULTING\PORTFOLIO\mobile_project\NigerServices

# Login (if needed)
npx eas login

# Configure project (first time)
npx eas build:configure

# Build for testing
npx eas build --platform android --profile preview

# Build for Play Store
npx eas build --platform android --profile production
```

Good luck with your deployment! 🇳🇪

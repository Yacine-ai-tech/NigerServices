# Niger Services - Asset Generation

## Quick Setup (Recommended)

Since the app needs icons to build, follow these steps:

### Option 1: Use Expo's Default Icons (Quickest)
1. Run `npx create-expo-app temp-app` in a temporary folder
2. Copy the `assets` folder from `temp-app` to this project
3. The app will build with default Expo icons

### Option 2: Generate Custom Icons Online
1. Go to https://www.canva.com or https://figma.com
2. Create a 1024x1024 icon with Niger flag colors:
   - Orange: #E05206
   - White: #FFFFFF  
   - Green: #0D9F4F
3. Export as PNG and save as `assets/icon.png`
4. Create adaptive icon (same size) as `assets/adaptive-icon.png`
5. Create 1284x2778 splash screen as `assets/splash.png`
6. Create 48x48 favicon as `assets/favicon.png`

### Option 3: Use Sharp Script
1. Run `npm install sharp --save-dev`
2. Run `node scripts/generate-assets.js`

## Icon Design Guidelines

The Niger Services icon should include:
- Niger flag colors (Orange, White, Green)
- "NS" text or a sun symbol (from Niger flag)
- Round or rounded square shape

## Required Files
- `assets/icon.png` (1024x1024) - App icon
- `assets/adaptive-icon.png` (1024x1024) - Android adaptive icon foreground
- `assets/splash.png` (1284x2778) - Splash screen
- `assets/favicon.png` (48x48) - Web favicon

## Color Palette
```
Primary Orange: #E05206
Secondary Green: #0D9F4F
White: #FFFFFF
Background: #F8F9FA
```

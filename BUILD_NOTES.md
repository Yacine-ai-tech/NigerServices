Build Notes
===========

I attempted to validate native build configuration locally using `npx expo prebuild --no-install` and encountered a missing module error related to `expo-sqlite` (module resolution during prebuild). Steps to reproduce and resolve locally:

1. Install dependencies cleanly:
   npm ci

2. If prebuild fails with missing module errors for `expo-sqlite`, install it explicitly:
   npm install expo-sqlite

3. Generate placeholder assets (if not already generated):
   npm run generate:assets

4. Run prebuild to validate native project generation:
   npx expo prebuild

5. Build with EAS (replace project ID and configure credentials with `eas build:configure`):
   eas build --platform android --profile production

Notes:
- These steps were executed in a CI-like environment without a running emulator or Android Studio; if you plan to test on an emulator use Android Studio and `npm run android` for local runtime testing.
- If `npm ci` or prebuild seems to hang on your machine, ensure Node.js and npm are up-to-date and that the network is available for fetching dependencies.

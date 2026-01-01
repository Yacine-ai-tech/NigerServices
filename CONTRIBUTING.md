# Contributing to Niger Services

First off, thank you for considering contributing to Niger Services! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (e.g., code snippets, screenshots)
- **Describe the behavior you observed and what you expected**
- **Include device information** (OS version, device model)
- **Include app version and build number**

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed feature**
- **Explain why this feature would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**
4. **Test your changes**: `npx tsc --noEmit` and test on a device/emulator
5. **Ensure code quality**: Follow the existing code style
6. **Write clear commit messages**
7. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/NigerServices.git
cd NigerServices

# Install dependencies
npm install

# Start development server
npx expo start
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── constants/      # App constants and data
├── screens/        # Application screens
├── services/       # Business logic services
└── types/          # TypeScript type definitions
```

## Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use functional components with hooks

### React Native

- Follow React Native best practices
- Use StyleSheet.create for styles
- Keep components small and focused
- Use proper prop types

### Naming Conventions

- **Files**: PascalCase for components (e.g., `HomeScreen.tsx`)
- **Variables**: camelCase (e.g., `prayerTimes`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `EMERGENCY_CONTACTS`)
- **Types/Interfaces**: PascalCase (e.g., `PrayerTimes`)

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters
- Reference issues when applicable

Examples:
```
Add prayer notification feature
Fix currency conversion bug (#42)
Update README with new installation steps
```

## Testing

Before submitting a pull request:

1. **TypeScript check**: `npx tsc --noEmit`
2. **Test on Android**: `npx expo run:android`
3. **Test on iOS** (if available): `npx expo run:ios`
4. **Test offline functionality**

## Translation

We welcome translations! Currently supported languages:
- French (primary)
- English

To add a new language, please open an issue first to discuss.

## Questions?

Feel free to open an issue with the "question" label if you have any questions about contributing.

---

Thank you for contributing to Niger Services! 🇳🇪

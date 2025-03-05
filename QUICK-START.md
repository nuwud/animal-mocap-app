# Quick Start Guide

## Starting with the Simple Setup

1. Run the simplified setup script:
   ```
   use-simple-setup.bat
   ```
   This will apply simplified configurations without complex dependencies.

2. Start the Expo development server:
   ```
   npx expo start
   ```

3. Follow the on-screen instructions to run the app on your device. You can:
   - Scan the QR code with the Expo Go app on your phone
   - Press 'a' to run on an Android emulator or connected device
   - Press 'i' to run on an iOS simulator (macOS only)

## Switching Back to Full Setup

When you're ready to try the full version with all features:

1. Run the restoration script:
   ```
   restore-full-setup.bat
   ```

2. Start the Expo development server:
   ```
   npx expo start
   ```

## Troubleshooting

If you encounter issues:

1. Make sure your device is connected properly
2. Try clearing the Metro bundler cache:
   ```
   npx expo start --clear
   ```
3. Check that all required assets exist in the assets folder

## Development Workflow

1. Start with the simple setup to establish a working baseline
2. Gradually add features one by one
3. Test each feature on your device before adding the next one
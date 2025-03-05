# Animal MoCap App

A mobile application for animal motion capture using smartphone sensors and TensorFlow.

## Features

- Multi-animal detection: Automatically identify multiple dogs and cats in the camera view
- Skeleton tracking: Track key points and joints to analyze movement patterns
- Motion recording: Save motion data for animation or research purposes
- Data export: Export captured motion data in standard formats

## Requirements

- Node.js (>= 16.x)
- React Native CLI
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Quick Start (Windows)

For Windows users, we've created a simple setup script to help you get started:

1. Clone the repository
```bash
git clone https://github.com/nuwud/animal-mocap-app.git
cd animal-mocap-app
```

2. Run the setup script by double-clicking `setup.bat` or running it from the command line:
```bash
setup.bat
```

3. From the menu, select option 1 to perform a clean installation

4. Connect your device via USB (ensure USB debugging is enabled)

5. From the menu, select option 3 to build and run on your Android device

## Manual Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/nuwud/animal-mocap-app.git
cd animal-mocap-app
```

2. Install dependencies

```bash
npm install --legacy-peer-deps
```

3. Apply patches (if needed)

```bash
npx patch-package
```

4. Run the application

```bash
# For Android
npm run android

# For iOS
npm run ios

# Using Expo
npm start
```

## Samsung Galaxy S24 Ultra Setup

For optimal performance on the Samsung Galaxy S24 Ultra:

1. Ensure the app has access to Camera and Storage permissions:
   - Go to Settings > Apps > Animal MoCap App > Permissions
   - Enable Camera and Storage permissions

2. For better detection performance:
   - Enable "Performance mode" on your device
   - Ensure good lighting conditions for better animal detection
   - Allow the app to fully initialize before using the camera features

3. Fix common issues:
   - If camera access fails, restart the app and check permissions
   - If TensorFlow models fail to load, check your internet connection as they need to download on first use
   - For storage access issues, make sure to grant all requested permissions

## Troubleshooting

### Common Issues

1. **Dependency conflicts during installation**:
   - Use `npm install --legacy-peer-deps` to bypass peer dependency checks
   - Check that your Node.js version is compatible (v16.x+ recommended)

2. **Camera permissions not working**:
   - On Android 13+, ensure both camera and media permissions are granted
   - Use the Permissions Test screen in the app to verify all required permissions

3. **TensorFlow models not loading**:
   - Check you have an active internet connection for the first run
   - Allow sufficient time for model download (can take a few minutes)
   - Check the debug screen for detailed loading status

4. **Build errors**:
   - Clear project caches using option 5 in the setup script
   - Make sure you have the latest Android SDK and build tools installed

### Clearing Cache

If you encounter issues, try clearing the cache:

```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install --legacy-peer-deps

# Clear Android build cache
cd android
./gradlew clean
cd ..

# Clear Metro bundler cache
npm start -- --reset-cache
```

## Project Structure

```
├── App.tsx              # Main app entry point
├── src/
│   ├── app/             # App UI components
│   │   └── components/  # Reusable UI components
│   ├── core/            # Core utilities
│   │   └── permissions/ # Permission handling logic
│   ├── data/            # Data models and storage
│   └── vision/          # Computer vision modules
├── android/             # Android platform code
├── assets/              # Images and other assets
└── patches/             # Patches for dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT
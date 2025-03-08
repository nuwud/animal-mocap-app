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
- JDK 17 (recommended, configured in gradle.properties)

## Project Status

This project is currently in active development:

- **Stable Release (v1.0)**: A simple test version is available on the `stable-v1` branch
- **Current Development**: Integrating enhanced functionality from the original research prototype
- **Upcoming**: Full release with complete animal motion capture capabilities

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
npx expo start

# Using Expo with cache clearing
npx expo start --clear

# Installing Expo dependencies
npx expo install
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
   - If the app crashes immediately after launch, verify that the correct package name (`com.animalmocapapp`) is used in all configuration files

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
   - Use the `reset-environment.bat` script to reset the build environment
   - Make sure you have the latest Android SDK and build tools installed
   - If you see `gradlew.bat is not recognized`, ensure the Gradle wrapper files exist in the android directory
   - For missing Gradle wrapper files, run `cd android && gradle wrapper` or restore them from the repository

### Specific Error Solutions

1. **Project with path ':react-native-xx' could not be found in project ':app'**:
   - This is fixed in the latest version by properly configuring paths in settings.gradle
   - Make sure settings.gradle includes the correct paths to native modules
   - Run the reset-environment.bat script to clear caches

2. **Plugin with id 'com.android.library' not found**:
   - Install Android SDK Build Tools through Android Studio
   - Ensure you have the proper com.android.tools.build:gradle version specified in the build.gradle

3. **Missing Gradle configuration files**:
   - Run the reset-environment.bat script which will create necessary config files
   - Alternatively, run `cd android && gradle wrapper` to regenerate Gradle files

4. **withDevTools.tsx errors**:
   - Clear Metro bundler cache: `npx react-native start --reset-cache`
   - Make sure app.json is properly configured with "newArchEnabled": false
   - Use the reset-environment.bat script to clear all caches

5. **Duplicate module definitions**:
   - The app now prioritizes modules from node_modules over local modules
   - If you see errors about duplicate modules, use reset-environment.bat to fix them
   - Avoid editing modules in both places simultaneously

### Using Java 17

This project is configured to use Java 17 by default. To ensure you're using the correct version:

```bash
# Check your current Java version
java -version

# Set JAVA_HOME to point to JDK 17 (Windows PowerShell example)
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot"

# Or add to your system environment variables
# This is already configured in gradle.properties as:
# org.gradle.java.home=C:\\Program Files\\Microsoft\\jdk-17.0.14.7-hotspot
```

### Clearing Cache

If you encounter issues, use the provided reset script:

```bash
# Run the environment reset script
reset-environment.bat

# Or manually clear caches:
# Remove node_modules and reinstall
rm -rf node_modules
npm install --legacy-peer-deps

# Clear Android build cache
cd android
./gradlew clean
cd ..

# For React Native CLI
npm start -- --reset-cache

# For Expo CLI
npx expo start --clear
```

## Project Structure

```
├── App.tsx              # Main app entry point
├── SimpleTestApp.js     # Simple version for testing
├── src/
│   ├── app/             # App UI components
│   │   ├── components/  # Reusable UI components
│   │   ├── navigation/  # Navigation configuration
│   │   └── state/       # State management (Redux)
│   ├── core/            # Core utilities
│   │   └── permissions/ # Permission handling logic
│   ├── data/            # Data models and storage
│   └── vision/          # Computer vision modules
├── android/             # Android platform code
├── assets/              # Images and other assets
├── patches/             # Patches for dependencies
├── modules/             # Local module overrides (use with caution)
└── setup files          # Various setup scripts and configurations
```

## Development Notes

### Expo vs React Native CLI

This project supports both Expo and React Native CLI workflows:

- **Expo Workflow**: Simpler setup, easier testing, but with some limitations
  ```bash
  npx expo install  # Install dependencies
  npx expo start     # Start the development server
  ```

- **React Native CLI**: More control, direct access to native code
  ```bash
  npm install       # Install dependencies
  npm run android   # Run on Android
  npm run ios       # Run on iOS
  ```

### Module Structure

The app has a dual module system:

1. **node_modules/** - Standard npm modules installed by package.json
2. **modules/** - Optional local overrides for development purposes

The app now prioritizes modules from node_modules over local modules to avoid conflicts. If you need to modify a module, consider these approaches:

1. **Recommended: Use patch-package**
   ```bash
   # Make changes to the file in node_modules
   cd node_modules/react-native-some-module/
   # Edit files as needed
   cd ../../
   
   # Create a patch
   npx patch-package react-native-some-module
   
   # The patch will be applied automatically after npm install
   ```

2. **Advanced: Use local module override**
   - Place your modified module in the modules/ directory
   - Update settings.gradle to point to your local version
   - Remove any .DO_NOT_USE_LOCAL_MODULE marker files
   - Note: This approach is more complex and may cause conflicts

### Recommended Workflow

1. Start with the Simple Test App to verify basic functionality
2. Use the `stable-v1` branch for a stable reference point
3. For development, work with the `main` branch
4. If you encounter build issues, use the reset-environment.bat script

## Configuration Files

Key configuration files in the project:

- `android/settings.gradle` - Configure project dependencies and modules
- `android/build.gradle` - Main Android build configuration
- `android/app/build.gradle` - App-specific build configuration
- `app.json` - Expo configuration
- `metro.config.js` - Metro bundler configuration
- `babel.config.js` - Babel transpiler configuration

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT
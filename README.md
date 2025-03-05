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

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/nuwud/animal-mocap-app.git
cd animal-mocap-app
```

2. Install dependencies

```bash
npm install --legacy-peer-deps
```

3. Run the application

```bash
# For Android
npm run android

# For iOS
npm run ios

# Using Expo
npm start
```

4. If you encounter issues with patching, try:

```bash
npx patch-package
```

## Building and Running on Samsung Galaxy S24 Ultra

1. Enable USB debugging on your device
2. Connect your device via USB
3. Run the application:

```bash
npm run android
```

## Troubleshooting

If you encounter issues with TensorFlow.js compatibility, make sure the versions align:

```json
"@tensorflow/tfjs": "^3.11.0",
"@tensorflow/tfjs-converter": "^3.11.0",
"@tensorflow/tfjs-core": "^3.11.0",
"@tensorflow/tfjs-react-native": "^0.8.0"
```

For Android build issues, check that the patches are correctly applied:

```bash
npx patch-package
```

## Technology Stack

- React Native
- Expo
- TensorFlow.js
- React Native Vision Camera
- React Native Permissions
- React Native File System

## Project Structure

```
├── App.tsx              # Main app entry point
├── src/
│   ├── app/             # App UI components
│   ├── core/            # Core utilities
│   ├── data/            # Data models and storage
│   └── vision/          # Computer vision modules
├── assets/              # Images and other assets
└── patches/             # Patches for dependencies
```

## License

MIT
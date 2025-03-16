# Animal MoCap App - Expo Camera Implementation

This branch contains an implementation of the Animal MoCap app using Expo Camera and TensorFlow.js, which provides better compatibility with Android 14 devices, including the Samsung Galaxy S24 Ultra.

## Key Features

- Uses `expo-camera` instead of `react-native-vision-camera` for better Android 14 compatibility
- Integrates with TensorFlow.js for machine learning capabilities
- Automatically detects Android 14 and optimizes processing accordingly
- Simple UI showing camera feed with pose detection controls

## Installation

1. Clone the repository and switch to this branch:

```bash
git clone https://github.com/nuwud/animal-mocap-app.git
cd animal-mocap-app
git checkout feature/expo-camera-solution
```

2. Install dependencies:

```bash
npm install
```

3. Run the app on your Android device:

```bash
npm run android
```

## Implementation Details

### Components

- **ExpoCameraComponent**: Core camera component using Expo Camera with TensorFlow.js integration
- **AnimalPoseDetection**: Main component that handles the UI and pose detection logic

### Android 14 Optimizations

The app automatically detects Android 14 devices and applies the following optimizations:

- Reduces frame processing rate to prevent freezing issues
- Uses smaller tensor dimensions for better performance
- Shows a notification when running in optimized mode

### TensorFlow.js Integration

The app demonstrates basic TensorFlow.js integration:

- Initializes TensorFlow.js for use with Expo Camera
- Converts camera frames to tensors for processing
- Shows the status of TensorFlow.js initialization

## Why Expo Camera?

We switched from react-native-vision-camera to expo-camera for the following reasons:

1. **Android 14 Compatibility**: Vision Camera has known issues with Android 14 devices, particularly Samsung models
2. **Simpler Setup**: Expo Camera has fewer native dependencies and is easier to configure
3. **Reliable Performance**: Expo Camera provides more consistent performance across devices
4. **TensorFlow.js Integration**: Works well with TensorFlow.js for machine learning tasks

## Known Limitations

- Lower frame rate compared to Vision Camera (intentional for stability)
- TensorFlow.js is slightly less efficient than native TensorFlow Lite
- Animal pose model is not fully implemented yet (placeholders are included)

## Next Steps

- Implement a full animal pose detection model using TensorFlow.js
- Optimize tensor processing for better performance
- Add visualization of detected animal poses
- Implement saving and exporting of motion capture data

# Animal MoCap App Project Overview

## Project Purpose
The Animal MoCap (Motion Capture) App is designed to track and analyze animal movements using mobile device cameras. It leverages machine learning to detect and track animal poses, providing motion capture data for research, animation, or analysis purposes.

## Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile app framework
- **Expo**: Development toolkit for React Native
- **TensorFlow.js**: Machine learning framework for JavaScript
- **Expo Camera**: Camera integration for Expo applications

### Key Libraries
- **expo-camera**: Camera access and control
- **@tensorflow/tfjs-react-native**: TensorFlow integration for React Native
- **expo-gl**: OpenGL bindings for Expo (required by TensorFlow.js)

## Architecture Overview

### Component Structure
1. **ExpoCameraComponent**: Core camera component with TensorFlow.js integration
   - Handles camera initialization and permissions
   - Converts camera frames to tensors
   - Optimizes processing based on Android version

2. **AnimalPoseDetection**: Main UI component for motion capture
   - Displays camera feed with overlays
   - Shows detection status and controls
   - Manages TensorFlow initialization

### Data Flow
1. Camera captures frames
2. Frames are converted to tensors
3. Tensors are processed with TensorFlow.js
4. Results are displayed on screen
5. (Future) Motion data can be exported for analysis

## Android 14 Compatibility

The app includes specific optimizations for Android 14 devices:

1. **Automatic Detection**: Uses Platform.Version to identify Android 14
2. **Frame Rate Throttling**: Reduces processing rate on Android 14
3. **Visual Feedback**: Shows when running in optimized mode
4. **Permission Handling**: Uses Android 14 compatible permission requests

### Implementation Details
- Frame processing rate: 10 FPS on Android 14 vs 20 FPS on earlier versions
- Tensor dimensions optimized for performance (224x224)
- Memory management to prevent leaks

## Development Approach

### Previous Approach (Vision Camera)
Initially, the app used react-native-vision-camera which offered:
- High performance frame processors
- Native integrations
- Advanced camera controls

However, it had significant compatibility issues with Android 14, particularly on Samsung devices like the Galaxy S24 Ultra.

### Current Approach (Expo Camera)
The current implementation uses expo-camera which provides:
- Better Android 14 compatibility
- Simpler configuration
- Direct TensorFlow.js integration
- More stable performance across devices

While this approach may have slightly lower peak performance, it provides better reliability and user experience, especially on newer Android devices.

## Future Roadmap

### Short-term Goals
1. Implement full animal pose detection model
2. Add visualization of detected poses
3. Improve UI for camera settings and controls

### Medium-term Goals
1. Add pose data recording and export
2. Implement pose comparison features
3. Add calibration tools for different animal types

### Long-term Goals
1. Support for multiple animals in frame
2. 3D pose reconstruction
3. Integration with animation software

## Maintenance Guidelines

### Performance Monitoring
- Monitor frame processing time
- Track memory usage during extended sessions
- Test on various Android versions

### Updates and Compatibility
- Test thoroughly on Android 14+ for each update
- Keep all dependencies updated
- Follow Expo and React Native upgrade guides

### Documentation
- Maintain thorough documentation of known issues
- Document workarounds for platform-specific problems
- Update testing procedures for new features

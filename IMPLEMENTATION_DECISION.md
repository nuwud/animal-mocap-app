# Implementation Decision: Expo Camera vs. Vision Camera

This document explains the decision to switch from react-native-vision-camera to expo-camera for the Animal MoCap app, particularly focusing on Android 14 compatibility.

## Background

The original implementation used react-native-vision-camera, which offers excellent performance and features but had significant compatibility issues with Android 14, especially on Samsung devices like the Galaxy S24 Ultra.

## Issue Analysis

1. **Android 14 Compatibility**:
   - Vision Camera experiences freezing issues on Android 14 devices
   - Namespace/package detection errors in Gradle configuration
   - Requires complex workarounds to function properly

2. **Build Complexity**:
   - Vision Camera uses native modules that require precise Gradle configuration
   - Issues with multiple Gradle files and path resolution
   - Challenging to maintain consistent builds across environments

3. **Performance vs. Stability**:
   - While Vision Camera offers higher theoretical performance, stability issues on newer Android devices negated this advantage
   - Consistent, reliable performance is more important than peak performance for this application

## Solution Comparison

| Feature | Vision Camera | Expo Camera |
|---------|--------------|-------------|
| Android 14 Compatibility | Poor (requires workarounds) | Good |
| Setup Complexity | High | Low |
| Frame Processing | Very Fast (native) | Fast (JS bridge) |
| TensorFlow Integration | Via plugin | Direct with TensorFlow.js |
| Maintenance Burden | High | Low |
| API Stability | Evolving | Stable |

## Decision Factors

1. **User Experience**:
   - A camera that works reliably is better than one that occasionally freezes
   - Consistent performance across devices is essential for a motion capture app

2. **Development Efficiency**:
   - Expo Camera's simpler setup reduces development and maintenance time
   - Fewer native dependencies means fewer potential points of failure

3. **Future Proofing**:
   - Expo Camera is maintained as part of the Expo ecosystem, ensuring long-term support
   - Integration with TensorFlow.js provides a more standard approach to ML

## Implementation Strategy

The new implementation:

1. Uses expo-camera as the core camera component
2. Integrates with TensorFlow.js for ML capabilities
3. Automatically detects Android version and optimizes accordingly
4. Provides a simple, reliable UI for animal motion capture

## Performance Considerations

To maintain good performance while using Expo Camera:

1. Frame processing rate is reduced (10-15 FPS) on Android 14 devices
2. Tensor dimensions are optimized for efficient processing
3. Memory management is carefully handled to prevent leaks
4. Rendering optimizations are applied to maintain UI responsiveness

## Conclusion

While react-native-vision-camera offers better theoretical performance, its compatibility issues with Android 14 make it impractical for the current application. The expo-camera implementation provides a more reliable, maintainable solution that works consistently across devices, including the Samsung Galaxy S24 Ultra running Android 14.

This approach prioritizes stability and reliability over peak performance, which is the right tradeoff for this application.

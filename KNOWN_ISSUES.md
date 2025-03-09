# Known Issues and Solutions

This document captures the issues encountered during the development of the Animal MoCap app and provides solutions for future reference.

## Android 14 Compatibility Issues

### Issue: React Native Vision Camera Freezing on Android 14

**Problem Description:**
When using react-native-vision-camera on Samsung Galaxy S24 Ultra running Android 14, the frame processors would cause the app to freeze. This was observed particularly with frame rates above 15 FPS.

**Root Cause:**
Android 14 introduced changes to the camera architecture and background thread handling that conflict with Vision Camera's frame processor implementation.

**Solution:**
1. Switch to expo-camera which has better compatibility with Android 14
2. Implement frame rate throttling (reduced to 10 FPS on Android 14)
3. Use TensorFlow.js instead of TensorFlow Lite for frame processing

**References:**
- GitHub issue: https://github.com/mrousavy/react-native-vision-camera/issues/2712
- PR #17: https://github.com/nuwud/animal-mocap-app/pull/17

### Issue: Namespace/Package Detection in Gradle Build

**Problem Description:**
Build errors related to namespace/package detection in Gradle:
```
No package name found. We couldn't parse the namespace from neither your build.gradle[.kts] file nor your package in the AndroidManifest.xml.
```

**Root Cause:**
1. Multiple Gradle files (settings.gradle and settings.gradle.kts) causing conflicts
2. Missing namespace attribute in build.gradle
3. Missing package attribute in AndroidManifest.xml

**Solution:**
1. Standardize on a single Gradle configuration format (Groovy)
2. Add explicit namespace declaration in build.gradle:
   ```gradle
   android {
     namespace "com.animalmocapapp"
     ...
   }
   ```
3. Add package attribute to AndroidManifest.xml:
   ```xml
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       package="com.animalmocapapp">
   ```

**References:**
- Issue #15: https://github.com/nuwud/animal-mocap-app/issues/15

## Build Environment Issues

### Issue: Gradle Wrapper Errors

**Problem Description:**
Build failures with errors like:
```
Error: Could not find or load main class org.gradle.wrapper.GradleWrapperMain
```

**Root Cause:**
1. Corrupted or missing Gradle wrapper files
2. Incompatible Gradle versions

**Solution:**
1. Regenerate Gradle wrapper:
   ```bash
   cd android
   gradle wrapper --gradle-version=8.5 --distribution-type=all
   ```
2. Ensure gradle-wrapper.jar is properly included in version control
3. Use Gradle 8.5 which is compatible with the current React Native version

**References:**
- Android documentation: https://developer.android.com/build/gradle-tips

### Issue: Path Resolution for Native Modules

**Problem Description:**
Build errors indicating native modules couldn't be found:
```
A problem occurred configuring project ':react-native-vision-camera'
```

**Root Cause:**
Incorrect path resolution in settings.gradle when including native modules

**Solution:**
1. Use explicit paths in settings.gradle:
   ```gradle
   include ':react-native-vision-camera'
   project(':react-native-vision-camera').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vision-camera/android')
   ```
2. Update to the latest versions of native modules

## Motion Capture Specific Issues

### Issue: TensorFlow Integration Performance

**Problem Description:**
Poor performance when processing camera frames with TensorFlow on Android 14

**Root Cause:**
1. High resolution frames causing excessive processing load
2. Inefficient tensor conversion
3. Memory leaks from unmanaged tensors

**Solution:**
1. Resize camera frames to optimal resolution (224x224) for ML models
2. Use TensorFlow.js with proper memory management:
   ```javascript
   // Important: dispose of tensor to prevent memory leaks
   tf.dispose(nextImageTensor);
   ```
3. Implement frame processing throttling on Android 14:
   ```javascript
   const TENSOR_FRAME_RATE = isAndroid14Plus ? 10 : 20;
   ```

### Issue: Camera Permissions on Android 14

**Problem Description:**
Camera permission request flow not working properly on Android 14

**Root Cause:**
Android 14 introduced changes to permission handling, particularly for camera access

**Solution:**
1. Update app.json to include the right permissions:
   ```json
   "android": {
     "permissions": [
       "CAMERA",
       "READ_EXTERNAL_STORAGE",
       "WRITE_EXTERNAL_STORAGE",
       "READ_MEDIA_IMAGES",
       "READ_MEDIA_VIDEO"
     ]
   }
   ```
2. Use explicit permission request in the component:
   ```javascript
   const { status } = await Camera.requestCameraPermissionsAsync();
   ```

## Future Considerations

When updating React Native or camera libraries in the future:

1. **Test on Android 14+**: Always test on the latest Android version
2. **Monitor Vision Camera Updates**: Check if react-native-vision-camera resolves Android 14 issues
3. **Check Frame Processing Performance**: Monitor frame rate and processing time
4. **Evaluate Alternative Libraries**: Regularly evaluate new camera libraries for better compatibility

When implementing new ML features:
1. **Optimize Model Size**: Use smaller, optimized models for mobile
2. **Implement Memory Tracking**: Add memory usage monitoring
3. **Consider Offloading**: For complex processing, consider offloading to a server

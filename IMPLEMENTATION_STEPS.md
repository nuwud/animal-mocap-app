# Animal MoCap Implementation Steps

## Prerequisites
- Android Studio installed
- JDK 17 installed and configured
- Android SDK installed with API level 34
- A device with Android 14 (Samsung Galaxy S24 Ultra) connected via USB with USB debugging enabled

## Step 1: Clone the Repository
```bash
git clone -b fix/vision-camera-android14 https://github.com/nuwud/animal-mocap-app.git
cd animal-mocap-app
```

## Step 2: Install Dependencies
```bash
npm install
npm install react-native-worklets-core
```

## Step 3: Fix Vision Camera Namespace
Manually edit `node_modules/react-native-vision-camera/android/src/main/AndroidManifest.xml` to add:
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mrousavy.camera">
</manifest>
```

## Step 4: Building and Running the App
There are two ways to build and run the app:

### Option 1: Using Android Studio (Recommended)
1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to the `android` folder in the cloned repository
4. Let Android Studio sync the project
5. Connect your Samsung Galaxy S24 Ultra via USB
6. Click the "Run" button and select your device

### Option 2: Using Command Line
```bash
# Make sure you're in the project root directory
cd android
# Clean any previous builds
./gradlew clean
# Assemble the debug APK
./gradlew assembleDebug
# Install the APK on your connected device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting

### If you encounter Gradle wrapper issues:
1. Download the Gradle wrapper files manually from https://gradle.org/releases/
2. Extract and place the required files in the `android/gradle/wrapper` directory
3. Make sure `gradle-wrapper.properties` points to the correct version (8.5)

### If the app crashes when starting:
1. Check the logs with `adb logcat`
2. Make sure all permissions are granted on the device
3. Verify that the Vision Camera namespace is correctly set

### If the camera doesn't work on Android 14:
1. Check that the CameraComponent is detecting Android 14 correctly
2. Verify that the frame processor FPS is reduced for Android 14
3. Make sure the required camera permissions are granted

## Expected Result
When successfully implemented, the app should:
1. Start without crashing
2. Show the camera preview
3. Display "Android 14 detected" message if running on Android 14
4. Show basic frame information (resolution, format) in the UI

## Known Issues
- Vision Camera frame processors may still freeze on some Android 14 devices
- The app optimizes the frame processor FPS for Android 14 to mitigate freezing
- The TensorFlow Lite integration is prepared but not fully implemented yet

# Development Mode for Animal MoCap App

This document explains how to run the Animal MoCap app in development mode on your Samsung Galaxy S24 Ultra.

## Understanding Development Mode

When developing a React Native app, there are two main approaches:

1. **Using Expo Go (Easier)**: 
   - Uses the Expo Go app already installed on your device
   - Faster to set up and test
   - Some limitations with native modules
   - Great for initial testing and UI development

2. **Native Build (More Powerful)**:
   - Builds a complete native app
   - Full access to all native features
   - Takes longer to build
   - Required for production and advanced features

## Using Expo Go for Development

### Step 1: Start the Development Server
On your development machine:
```bash
cd animal-mocap-implementation
npx kill-port 8081  # Kill any existing Metro process
npx expo start --tunnel
```

This will start the Expo development server and create a tunnel for your device to connect through.

### Step 2: Connect Your Samsung Galaxy S24 Ultra
1. Open the Expo Go app on your device
2. Tap "Scan QR Code"
3. Scan the QR code from your terminal
4. The app should load on your device

### Step 3: Enable Development Mode on Your Device
For a better development experience:
1. Open the app in Expo Go
2. Shake your device to open the developer menu
3. Enable "Fast Refresh" for automatic updates as you change code

## Building a Native App for Development

If you need to test native features or Expo Go isn't sufficient:

### Step 1: Create a Development Build
```bash
cd animal-mocap-implementation
npx expo prebuild
cd android
./gradlew assembleDebug
```

### Step 2: Install on Your Device
```bash
cd android
./gradlew installDebug
```

### Step 3: Start the Metro Server
```bash
npx expo start
```

### Step 4: Run the App
Open the Animal MoCap app on your device. It should connect to your Metro server.

## Troubleshooting Development Mode

### Metro Server Issues
If the Metro server won't start:
```bash
npx kill-port 8081
rm -rf node_modules/.cache
npx expo start --clear
```

### Device Connection Issues
If your device can't connect:
1. Ensure both are on the same network
2. Try using your phone's hotspot
3. Check firewall settings on your development machine

### Android Specific Issues
For Samsung Galaxy S24 Ultra with Android 14:
1. Make sure Developer Options is enabled
2. Enable USB debugging
3. When connecting, select "File Transfer" mode

## Using the Android Debug Bridge (adb)

For more direct control:

### View Logs
```bash
adb logcat -s ReactNative:V ReactNativeJS:V
```

### Install APK Directly
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Launch App
```bash
adb shell am start -n com.animalmocapapp/.MainActivity
```

### Force Stop App
```bash
adb shell am force-stop com.animalmocapapp
```

## The Animal MoCap Expo Camera Configuration

The app is configured to automatically detect Android 14 and apply optimizations. These optimizations include:

1. Reduced frame processing rate (10 FPS vs 20 FPS)
2. Optimized tensor dimensions (224x224 vs higher resolution)
3. Warning indicators when in optimized mode

You can adjust these settings in:
`src/components/expo/ExpoCameraComponent.tsx`

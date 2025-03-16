# Direct Installation Instructions

This guide explains how to directly install the Animal MoCap app on your Samsung Galaxy S24 Ultra, bypassing the Expo Go QR code scanning process.

## Building a Standalone APK

### Prerequisites
- Android Studio installed on your development machine
- Android SDK and build tools installed
- USB debugging enabled on your Samsung Galaxy S24 Ultra

### Step 1: Build the APK

```bash
# Navigate to your project directory
cd animal-mocap-implementation

# Use Expo to generate native Android project files
npx expo prebuild -p android

# Navigate to the Android directory
cd android

# Build the debug APK
./gradlew assembleDebug
```

After running these commands, the APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Step 2: Install Directly to your Device

Make sure your device is connected via USB and USB debugging is enabled.

```bash
# Install the APK to your connected device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### Step 3: Launch the App

The app should now be installed on your device. You can find and launch it from your app drawer.

## Replacing Previous Installations

If you have an older version of the app installed:

```bash
# Uninstall the previous version first (if needed)
adb uninstall com.animalmocapapp

# Then install the new version
adb install app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting Installation Issues

### Common Installation Problems

1. **"App not installed" error**:
   - Make sure you've uninstalled any previous versions with conflicting signatures
   - Check if your device has enough storage space

2. **Permission issues**:
   - Make sure you have the proper USB debugging permissions
   - On your device, when connecting, select "File Transfer" mode

3. **APK not found**:
   - Double-check the path to your APK file
   - Make sure the build was successful

### Checking for Installation Issues

```bash
# View detailed logging during installation
adb install -r -d app/build/outputs/apk/debug/app-debug.apk

# Check for app installation status
adb shell pm list packages | grep animalmocapapp
```

## Creating a Release Version

For a more polished installation:

```bash
# Generate a signing key (only needed once)
keytool -genkey -v -keystore animal-mocap.keystore -alias animal-mocap -keyalg RSA -keysize 2048 -validity 10000

# Build a signed release version
./gradlew assembleRelease
```

The release APK will be at:
`android/app/build/outputs/apk/release/app-release.apk`

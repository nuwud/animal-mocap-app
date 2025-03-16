# Testing Instructions for Animal MoCap App

## Prerequisites
- Your Samsung Galaxy S24 Ultra with Expo Go app installed
- Node.js and npm installed on your development machine

## Step 1: Install Dependencies
If you haven't done so already, install the project dependencies:
```bash
npm install
```

## Step 2: Start the Expo Development Server
First, make sure no other process is using port 8081:
```bash
npx kill-port 8081
```

Then start the Expo server:
```bash
npx expo start --tunnel
```

This will start a tunnel that allows your phone to connect to your development machine. After running this command, a QR code will appear in your terminal.

## Step 3: Connect Your Device
1. Open the Expo Go app on your Samsung Galaxy S24 Ultra
2. Select "Scan QR Code" within the Expo Go app
3. Scan the QR code that appeared in your terminal
4. The app should load on your device

## Step 4: Test the Camera Functionality
1. When prompted, grant camera permissions
2. You should see the camera view with the Android 14 optimization message
3. Verify that the frame information is displayed at the bottom of the screen
4. Test the "Pause Detection" button to ensure it works

## Step 5: Check for Android 14 Optimizations
Since your Samsung Galaxy S24 Ultra runs Android 14, you should see:
1. A yellow banner at the top saying "Android 14 detected. Running with optimized settings."
2. FPS indicator showing a reduced frame rate (10 FPS for Android 14)

## Troubleshooting
If the app doesn't load properly:
1. Make sure your phone and development machine are on the same network
2. Try using a mobile hotspot from your phone and connect your PC to it
3. Check that Expo Go is up to date on your device
4. Verify that no firewall is blocking the connection

## Specific Tests for Motion Capture
Since this is a preliminary implementation, the actual motion capture functionality is limited to:
1. TensorFlow.js initialization test
2. Frame conversion to tensors
3. Optimized processing for Android 14

In the next update, we'll implement the full animal pose detection model.

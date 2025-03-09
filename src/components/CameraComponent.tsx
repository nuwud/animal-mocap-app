import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-worklets-core';

// Detect if the device is running Android 14 (API level 34) or higher
const isAndroid14Plus = Platform.OS === 'android' && parseInt(Platform.Version.toString(), 10) >= 34;

// Optimize for Android 14 by reducing frame processor FPS
const FRAME_PROCESSOR_FPS = isAndroid14Plus ? 10 : 30;

type CameraComponentProps = {
  onFrameProcessed?: (results: any) => void;
};

export const CameraComponent: React.FC<CameraComponentProps> = ({ onFrameProcessed }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  // Request camera permissions on component mount
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Simple frame processor that runs at a lower rate on Android 14
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    // Here you can add TensorFlow or other ML processing
    // For now, just return basic frame info
    const frameInfo = {
      width: frame.width,
      height: frame.height,
      timestamp: frame.timestamp,
      pixelFormat: frame.pixelFormat,
    };
    
    // Send results back to React Native UI thread
    if (onFrameProcessed) {
      runOnJS(onFrameProcessed)(frameInfo);
    }
  }, [onFrameProcessed]);

  // Android 14-specific warning
  const renderAndroid14Warning = () => {
    if (isAndroid14Plus) {
      return (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Android 14 detected. Running with optimized settings.
          </Text>
        </View>
      );
    }
    return null;
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={FRAME_PROCESSOR_FPS}
        pixelFormat="yuv" // More efficient format for processing
        resizeMode="cover"
        photo={false} // Disable photo capability if not needed
        video={false} // Disable video recording if not needed
        audio={false} // Disable audio recording
        enableZoomGesture={true}
      />
      {renderAndroid14Warning()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  warningContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 200, 0, 0.7)',
    padding: 8,
    alignItems: 'center',
  },
  warningText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

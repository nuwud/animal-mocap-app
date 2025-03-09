import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

// Create a TensorCamera component
const TensorCamera = cameraWithTensors(Camera);

// Detect if the device is running Android 14 (API level 34) or higher
const isAndroid14Plus = Platform.OS === 'android' && parseInt(Platform.Version.toString(), 10) >= 34;

// Adjust frame processing rate based on Android version
const TENSOR_FRAME_RATE = isAndroid14Plus ? 10 : 20;

type ExpoCameraProps = {
  onFrameProcessed?: (results: any) => void;
};

export const ExpoCameraComponent: React.FC<ExpoCameraProps> = ({ onFrameProcessed }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTfReady, setIsTfReady] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [frameStats, setFrameStats] = useState<{
    width: number;
    height: number;
    timestamp: number;
  } | null>(null);

  // Initialize TensorFlow.js
  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTfReady(true);
      console.log('TensorFlow.js is ready!');
    })();
  }, []);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle camera stream
  const handleCameraStream = (images: any) => {
    const loop = async () => {
      if (!images) return;

      const nextImageTensor = images.next().value;
      if (nextImageTensor) {
        // Increment frame count
        setFrameCount(prev => prev + 1);

        // Only process every few frames based on target FPS
        if (frameCount % 3 === 0) {
          // Get tensor dimensions
          const width = nextImageTensor.shape[1];
          const height = nextImageTensor.shape[0];
          const timestamp = Date.now();

          const stats = {
            width,
            height,
            timestamp
          };
          
          setFrameStats(stats);
          
          // Pass results to parent component
          if (onFrameProcessed) {
            onFrameProcessed(stats);
          }
        }

        // Important: dispose tensor to prevent memory leaks
        tf.dispose(nextImageTensor);
      }
      
      // Schedule next frame
      requestAnimationFrame(loop);
    };
    
    loop();
  };

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

  // Permission handling
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required</Text>
      </View>
    );
  }

  // Waiting for TensorFlow.js
  if (!isTfReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Initializing TensorFlow.js...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        style={StyleSheet.absoluteFill}
        type={CameraType.back}
        // Tensor related props
        cameraTextureHeight={1920}
        cameraTextureWidth={1080}
        resizeHeight={224}
        resizeWidth={224}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
        // Camera props
        ratio="16:9"
      />
      {renderAndroid14Warning()}
      {frameStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Resolution: {frameStats.width} x {frameStats.height}
          </Text>
          <Text style={styles.statsText}>
            FPS: {TENSOR_FRAME_RATE} (Android 14 optimized)
          </Text>
        </View>
      )}
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
  statsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  statsText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
});

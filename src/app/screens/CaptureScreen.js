/**
 * Capture Screen
 * 
 * Screen for capturing animal motion data.
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import * as tf from '@tensorflow/tfjs';

// Custom components
import RecordButton from '../components/RecordButton';
import InfoOverlay from '../components/InfoOverlay';
import SkeletonOverlay from '../components/SkeletonOverlay';

// Redux state
import { 
  setModelLoaded, 
  setDetecting, 
  setDetectionResult,
  startRecording,
  stopRecording,
  updateRecordingDuration,
  setFps,
  selectIsModelLoaded,
  selectIsDetecting,
  selectDetectionResult,
  selectIsRecording,
  selectRecordingDuration,
  selectFps
} from '../state/detectionSlice';

// Utilities
import { 
  requestCameraPermissions, 
  checkCameraPermissions,
  getBestBackCamera
} from '../../core/permissions/CameraPermissions';

import {
  loadAnimalDetectionModel,
  initializeTensorFlow,
  processFrame,
  ANIMAL_CONNECTIONS
} from '../../vision/AnimalDetection';

const { width, height } = Dimensions.get('window');

const CaptureScreen = ({ navigation }) => {
  // Redux state and dispatch
  const dispatch = useDispatch();
  const isModelLoaded = useSelector(selectIsModelLoaded);
  const isDetecting = useSelector(selectIsDetecting);
  const detectionResult = useSelector(selectDetectionResult);
  const isRecording = useSelector(selectIsRecording);
  const recordingDuration = useSelector(selectRecordingDuration);
  const fps = useSelector(selectFps);
  
  // Local state
  const [hasPermission, setHasPermission] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  // Refs
  const camera = useRef(null);
  const model = useRef(null);
  const animationFrame = useRef(null);
  const recordingTimer = useRef(null);
  const frameCountRef = useRef(0);
  const startTimeRef = useRef(0);
  
  // Get available camera devices
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  
  // Check and request camera permissions
  useEffect(() => {
    const setupCamera = async () => {
      // Check if we already have permissions
      const hasPermissions = await checkCameraPermissions();
      
      if (!hasPermissions) {
        // Request permissions if we don't have them
        const granted = await requestCameraPermissions();
        setHasPermission(granted);
      } else {
        setHasPermission(true);
      }
      
      // Get the best available back camera
      if (devices.back) {
        setDevice(devices.back);
      } else {
        // Try to get a specific device
        const bestCamera = await getBestBackCamera();
        if (bestCamera) {
          setDevice(bestCamera);
        }
      }
    };
    
    setupCamera();
  }, [devices]);
  
  // Initialize TensorFlow and load model
  useEffect(() => {
    let isMounted = true;
    
    const setupModel = async () => {
      try {
        setIsModelLoading(true);
        
        // Initialize TensorFlow
        await initializeTensorFlow();
        
        // Load model
        model.current = await loadAnimalDetectionModel();
        
        if (isMounted) {
          setIsModelLoading(false);
          dispatch(setModelLoaded(true));
        }
      } catch (error) {
        console.error('Error loading model:', error);
        if (isMounted) {
          setIsModelLoading(false);
        }
      }
    };
    
    setupModel();
    
    // Start time for FPS calculation
    startTimeRef.current = performance.now();
    
    return () => {
      isMounted = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, [dispatch]);
  
  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        dispatch(updateRecordingDuration());
      }, 100);
    } else if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }
    
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, [isRecording, dispatch]);
  
  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (isRecording) {
        Alert.alert(
          "Recording in progress", 
          "Do you want to stop recording and go back?",
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "Stop & Go Back", 
              onPress: () => {
                handleStopRecording();
                navigation.goBack();
              } 
            }
          ]
        );
        return true;
      }
      return false;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => backHandler.remove();
  }, [isRecording, navigation]);
  
  // Process camera frame
  const processCamera = async (frame) => {
    if (!isModelLoaded || !model.current || isDetecting) return;
    
    try {
      dispatch(setDetecting(true));
      
      // Create a tensor from the frame (for real implementation)
      // For demo, we're using mock data
      const imageTensor = tf.zeros([1, 300, 300, 3]);
      
      // Process the frame
      const result = await processFrame(model.current, imageTensor);
      
      // Update state with detection result
      if (result) {
        dispatch(setDetectionResult(result));
      }
      
      // Update FPS counter
      frameCountRef.current += 1;
      if (frameCountRef.current % 10 === 0) {
        const elapsedSec = (performance.now() - startTimeRef.current) / 1000;
        const currentFps = frameCountRef.current / elapsedSec;
        dispatch(setFps(Math.round(currentFps * 10) / 10));
      }
      
    } catch (error) {
      console.error('Frame processing error:', error);
    } finally {
      dispatch(setDetecting(false));
      
      // Schedule next frame processing
      animationFrame.current = requestAnimationFrame(processCamera);
    }
  };
  
  // Start or resume detection
  const startDetection = () => {
    if (animationFrame.current) return;
    
    // Reset FPS calculation
    frameCountRef.current = 0;
    startTimeRef.current = performance.now();
    
    // Start processing frames
    animationFrame.current = requestAnimationFrame(processCamera);
  };
  
  // Pause detection
  const pauseDetection = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };
  
  // Handle recording start/stop
  const handleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };
  
  // Start recording
  const handleStartRecording = () => {
    // Make sure detection is running
    if (!animationFrame.current) {
      startDetection();
    }
    
    // Start recording
    dispatch(startRecording());
  };
  
  // Stop recording
  const handleStopRecording = () => {
    dispatch(stopRecording());
  };
  
  // When camera is initialized
  const onCameraInitialized = () => {
    // Start detection after camera is ready and model is loaded
    if (isModelLoaded && !animationFrame.current) {
      startDetection();
    }
  };
  
  // If no permission, show permission request UI
  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            This app needs access to your camera to detect and track animal
            movements. Please grant camera permission to continue.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermissions}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // If no device available yet, show loading
  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Initializing camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          onInitialized={onCameraInitialized}
          enableZoomGesture
        />
        
        {/* Overlay for keypoints and skeleton */}
        {detectionResult && (
          <View style={styles.overlay}>
            <SkeletonOverlay
              keypoints={detectionResult.keypoints}
              connections={ANIMAL_CONNECTIONS}
            />
          </View>
        )}
        
        {/* Info overlay with detection data */}
        <InfoOverlay
          detectionInfo={detectionResult}
          isRecording={isRecording}
          recordingTime={recordingDuration}
          fps={fps}
        />
        
        {/* Loading indicator while model is loading */}
        {isModelLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFF" />
            <Text style={styles.loadingText}>Loading animal detection model...</Text>
          </View>
        )}
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        {/* Record button */}
        <RecordButton
          onPress={handleRecording}
          isRecording={isRecording}
          disabled={isModelLoading}
          size={80}
        />
        
        {/* Control buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              if (animationFrame.current) {
                pauseDetection();
              } else {
                startDetection();
              }
            }}
            disabled={isModelLoading}
          >
            <Text style={styles.controlButtonText}>
              {animationFrame.current ? 'Pause Detection' : 'Resume Detection'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    height: height * 0.75,
    width: width,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controls: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  buttonRow: {
    width: '100%',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  controlButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#999',
    fontSize: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CaptureScreen;

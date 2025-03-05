import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';

// Get window dimensions
const { width, height } = Dimensions.get('window');

const App = () => {
  // State for permissions
  const [cameraPermission, setCameraPermission] = useState(false);
  const [storagePermission, setStoragePermission] = useState(false);
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [useRealCamera, setUseRealCamera] = useState(true); // Default to real camera
  
  // Check permissions when app starts
  useEffect(() => {
    checkPermissions();
  }, []);

  // Function to check current permissions
  const checkPermissions = async () => {
    setLoading(true);
    try {
      console.log('Checking permissions...');
      // This would typically use PermissionsHandler
      const status = { camera: false, storage: false };
      setCameraPermission(status.camera);
      setStoragePermission(status.storage);
      setPermissionsChecked(true);
      console.log('Permission status:', status);
    } catch (error) {
      console.error('Error checking permissions:', error);
      Alert.alert('Error', 'Failed to check permissions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to request permissions
  const requestPermissions = async () => {
    setLoading(true);
    try {
      console.log('Requesting permissions...');
      // This would typically use PermissionsHandler
      const result = { camera: true, storage: true };
      
      setCameraPermission(result.camera);
      setStoragePermission(result.storage);
      
      // Show feedback to the user
      if (!result.camera || !result.storage) {
        Alert.alert(
          'Permissions Required',
          'This app needs camera and storage permissions to function properly. Please grant these permissions in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request permissions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle camera display
  const toggleCamera = useCallback(() => {
    if (cameraPermission) {
      setShowCamera(!showCamera);
      if (recordingActive && !showCamera) {
        // Stop recording if camera is being hidden
        setRecordingActive(false);
      }
    } else {
      // If camera permission not granted, request it
      requestPermissions();
    }
  }, [cameraPermission, showCamera, recordingActive]);

  // Function to toggle recording
  const toggleRecording = useCallback(() => {
    if (!showCamera) {
      // Turn on camera if it's not already on
      setShowCamera(true);
    }
    
    if (recordingActive) {
      // Stop recording
      setRecordingActive(false);
      Alert.alert(
        'Recording Stopped',
        'Motion capture data has been saved successfully.',
        [{ text: 'OK' }]
      );
    } else {
      // Start recording
      setRecordingActive(true);
    }
  }, [showCamera, recordingActive]);

  // Function to toggle debug panel
  const toggleDebugPanel = useCallback(() => {
    setShowDebugPanel(!showDebugPanel);
  }, [showDebugPanel]);

  // Function to toggle between real and simulated camera
  const toggleCameraMode = useCallback(() => {
    setUseRealCamera(!useRealCamera);
    // Make sure camera is closed when switching modes
    setShowCamera(false);
    setRecordingActive(false);
  }, [useRealCamera]);

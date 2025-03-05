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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      
      {/* App header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Animal MoCap</Text>
        <TouchableOpacity onPress={toggleDebugPanel} style={styles.debugButton}>
          <Text style={styles.debugButtonText}>Debug</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Main content */}
        <View style={styles.content}>
          {/* Camera view */}
          {showCamera ? (
            <View style={styles.cameraContainer}>
              <Text style={styles.placeholderText}>Camera View Placeholder</Text>
            </View>
          ) : (
            /* Welcome message if camera is not showing */
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                Welcome to Mobile Animal MoCap
              </Text>
              <Text style={styles.welcomeText}>
                A motion capture system for animals using smartphone sensors
              </Text>
              
              {/* App logo/image placeholder */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>Animal MoCap</Text>
                </View>
              </View>
            </View>
          )}
          
          {/* Permissions status display */}
          <View style={styles.permissionsContainer}>
            <Text style={styles.sectionTitle}>Permissions Status</Text>
            <View style={styles.permissionRow}>
              <Text style={styles.permissionLabel}>Camera:</Text>
              <View style={[
                styles.permissionStatus,
                cameraPermission ? styles.permissionGranted : styles.permissionDenied
              ]}>
                <Text style={styles.permissionStatusText}>
                  {cameraPermission ? 'GRANTED' : 'DENIED'}
                </Text>
              </View>
            </View>
            
            <View style={styles.permissionRow}>
              <Text style={styles.permissionLabel}>Storage:</Text>
              <View style={[
                styles.permissionStatus,
                storagePermission ? styles.permissionGranted : styles.permissionDenied
              ]}>
                <Text style={styles.permissionStatusText}>
                  {storagePermission ? 'GRANTED' : 'DENIED'}
                </Text>
              </View>
            </View>
            
            {/* Request permissions button */}
            <TouchableOpacity 
              style={styles.button}
              onPress={requestPermissions}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Request Permissions</Text>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Camera mode toggle */}
          <TouchableOpacity 
            style={[styles.button, styles.modeButton]} 
            onPress={toggleCameraMode}
          >
            <Text style={styles.buttonText}>
              {useRealCamera ? 'Switch to Simulated Camera' : 'Switch to Real Camera'}
            </Text>
          </TouchableOpacity>
          
          {/* Main controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.cameraButton, 
                showCamera ? styles.activeButton : null,
                !cameraPermission && styles.disabledButton
              ]}
              onPress={toggleCamera}
              disabled={!cameraPermission || loading}
            >
              <Text style={styles.buttonText}>
                {showCamera ? 'Hide Camera' : 'Show Camera'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button,
                recordingActive ? styles.stopButton : styles.recordButton,
                (!cameraPermission || !showCamera) && styles.disabledButton
              ]}
              onPress={toggleRecording}
              disabled={!cameraPermission || !showCamera}
            >
              <Text style={styles.buttonText}>
                {recordingActive ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Feature description */}
          <View style={styles.featureContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, {backgroundColor: '#e3f2fd'}]}>
                  <Text style={styles.featureIconText}>🐾</Text>
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Multi-Animal Detection</Text>
                  <Text style={styles.featureDescription}>
                    Automatically identifies multiple dogs and cats in the camera view
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, {backgroundColor: '#e8f5e9'}]}>
                  <Text style={styles.featureIconText}>🦴</Text>
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Skeleton Tracking</Text>
                  <Text style={styles.featureDescription}>
                    Tracks key points and joints to analyze movement patterns
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, {backgroundColor: '#fff3e0'}]}>
                  <Text style={styles.featureIconText}>🎬</Text>
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Motion Recording</Text>
                  <Text style={styles.featureDescription}>
                    Save motion data for animation or research purposes
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, {backgroundColor: '#f3e5f5'}]}>
                  <Text style={styles.featureIconText}>📊</Text>
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Data Export</Text>
                  <Text style={styles.featureDescription}>
                    Export captured motion data in standard formats
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* App footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Mobile Animal MoCap v1.0.0
        </Text>
      </View>
      
      {/* Debug Panel */}
      {showDebugPanel && (
        <View style={styles.debugPanel}>
          <TouchableOpacity 
            style={styles.closeDebugButton}
            onPress={() => setShowDebugPanel(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.debugTitle}>Debug Information</Text>
          <Text style={styles.debugText}>Camera Permission: {cameraPermission ? 'Granted' : 'Denied'}</Text>
          <Text style={styles.debugText}>Storage Permission: {storagePermission ? 'Granted' : 'Denied'}</Text>
          <Text style={styles.debugText}>Camera Mode: {useRealCamera ? 'Real' : 'Simulated'}</Text>
          <Text style={styles.debugText}>Camera Visible: {showCamera ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Recording: {recordingActive ? 'Active' : 'Inactive'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
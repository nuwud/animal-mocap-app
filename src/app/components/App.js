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

// Import our enhanced PermissionsHandler
import PermissionsHandler from '../../core/permissions/PermissionsHandler';
import PermissionsTest from './PermissionsTest';

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
  const [showPermissionsTest, setShowPermissionsTest] = useState(false); // New state for permissions test
  
  // Check permissions when app starts
  useEffect(() => {
    checkPermissions();
  }, []);

  // Function to check current permissions
  const checkPermissions = async () => {
    setLoading(true);
    try {
      console.log('Checking permissions...');
      // Use our enhanced PermissionsHandler
      const status = await PermissionsHandler.checkPermissions();
      setCameraPermission(status.camera);
      setStoragePermission(status.storage);
      setPermissionsChecked(true);
      console.log('Permission status:', status);
      
      // Log detailed permission status
      PermissionsHandler.logPermissionStatus(status);
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
      // Use our enhanced PermissionsHandler
      const status = await PermissionsHandler.requestPermissions();
      setCameraPermission(status.camera);
      setStoragePermission(status.storage);
      
      // Log detailed permission status
      PermissionsHandler.logPermissionStatus(status);
      
      // Show feedback to the user
      if (!status.camera || !status.storage) {
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

  // Function to toggle permissions test
  const togglePermissionsTest = useCallback(() => {
    setShowPermissionsTest(!showPermissionsTest);
  }, [showPermissionsTest]);

  // Function to toggle between real and simulated camera
  const toggleCameraMode = useCallback(() => {
    setUseRealCamera(!useRealCamera);
    // Make sure camera is closed when switching modes
    setShowCamera(false);
    setRecordingActive(false);
  }, [useRealCamera]);

  // If showing permissions test, render it
  if (showPermissionsTest) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#333" />
        <View style={styles.header}>
          <Text style={styles.title}>Permissions Test</Text>
          <TouchableOpacity onPress={togglePermissionsTest} style={styles.debugButton}>
            <Text style={styles.debugButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <PermissionsTest />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      
      {/* App header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Animal MoCap</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={togglePermissionsTest} style={[styles.debugButton, styles.permissionsButton]}>
            <Text style={styles.debugButtonText}>Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDebugPanel} style={styles.debugButton}>
            <Text style={styles.debugButtonText}>Debug</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.debugText}>Device: {Platform.OS === 'android' ? 'Android' : 'iOS'}</Text>
          <Text style={styles.debugText}>Version: {Platform.Version}</Text>
          <Text style={styles.debugText}>Samsung Device: {PermissionsHandler.isSamsungDevice() ? 'Yes' : 'No'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 15,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  logoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  permissionLabel: {
    fontSize: 16,
    color: '#333',
  },
  permissionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  permissionGranted: {
    backgroundColor: '#4CAF50',
  },
  permissionDenied: {
    backgroundColor: '#F44336',
  },
  permissionStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  modeButton: {
    backgroundColor: '#673AB7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  cameraButton: {
    flex: 1,
    marginRight: 10,
  },
  recordButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#F44336',
  },
  activeButton: {
    backgroundColor: '#1976D2',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  cameraContainer: {
    height: height * 0.4,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
  },
  featureContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  featureList: {
    marginTop: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#ccc',
  },
  debugButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  permissionsButton: {
    marginRight: 10,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 12,
  },
  debugPanel: {
    position: 'absolute',
    top: 70,
    right: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 10,
    padding: 15,
    maxHeight: height * 0.6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  debugTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 3,
  },
  closeDebugButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default App;
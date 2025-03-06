/**
 * Capture Screen
 * 
 * Screen for capturing animal motion data.
 * This is a placeholder that will be replaced with the actual implementation.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecordButton from '../components/RecordButton';
import InfoOverlay from '../components/InfoOverlay';

const CaptureScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [fps, setFps] = useState(0);
  
  // These will be populated by the actual detector in the future
  const placeholderDetectionInfo = {
    animal: 'Demo Mode',
    confidence: 0.85,
    keypoints: Array(12).fill().map((_, i) => ({
      id: i,
      name: `keypoint_${i}`,
      x: 0,
      y: 0,
      confidence: 0.75
    }))
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
      // In the future: save recording
    } else {
      setIsLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
        setIsRecording(true);
        // Start recording timer
        setFps(24); // Simulated frame rate
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera placeholder */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraBorder}>
          <Text style={styles.cameraPlaceholder}>
            Camera Preview
          </Text>
          {isLoading && (
            <ActivityIndicator 
              size="large" 
              color="#FFF" 
              style={styles.loadingIndicator} 
            />
          )}
        </View>
        
        {/* Info overlay */}
        <InfoOverlay 
          detectionInfo={isRecording ? placeholderDetectionInfo : null}
          isRecording={isRecording}
          recordingTime={recordingTime}
          fps={fps}
        />
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <RecordButton 
          onPress={handleRecord}
          isRecording={isRecording}
          disabled={isLoading}
          size={80}
        />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraBorder: {
    flex: 1,
    borderColor: '#444',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  cameraPlaceholder: {
    color: '#777',
    fontSize: 18,
  },
  loadingIndicator: {
    position: 'absolute',
  },
  controls: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  backButton: {
    marginTop: 20,
    padding: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CaptureScreen;

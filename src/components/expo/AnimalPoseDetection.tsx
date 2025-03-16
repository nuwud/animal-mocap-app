import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { ExpoCameraComponent } from './ExpoCameraComponent';
import * as tf from '@tensorflow/tfjs';

export const AnimalPoseDetection: React.FC = () => {
  const [frameStats, setFrameStats] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  
  // Initialize TensorFlow and load a simple model (if available)
  useEffect(() => {
    const setupTf = async () => {
      try {
        // Initialize TensorFlow.js
        await tf.ready();
        
        // For demo purposes, we'll just check if TF.js is working
        // In a real implementation, you would load your animal pose model here
        // For example: const model = await tf.loadGraphModel('path/to/model');
        
        // Create a simple tensor to verify TF.js is working
        const testTensor = tf.tensor2d([[1, 2], [3, 4]]);
        const result = testTensor.square().sum().arraySync();
        console.log('TensorFlow.js test result:', result);
        testTensor.dispose();
        
        setModelLoaded(true);
      } catch (error) {
        console.error('Error initializing TensorFlow.js:', error);
        setModelLoadError(error instanceof Error ? error.message : 'Unknown error');
      }
    };
    
    setupTf();
  }, []);
  
  // Handle processed frames from camera
  const handleFrameProcessed = useCallback((results: any) => {
    if (isDetecting) {
      setFrameStats(results);
    }
  }, [isDetecting]);

  // Toggle detection on/off
  const toggleDetection = () => {
    setIsDetecting(prev => !prev);
  };

  // Display model status
  const renderModelStatus = () => {
    if (modelLoadError) {
      return (
        <View style={styles.modelErrorContainer}>
          <Text style={styles.modelErrorText}>
            Error loading TensorFlow: {modelLoadError}
          </Text>
        </View>
      );
    }
    
    if (!modelLoaded) {
      return (
        <View style={styles.modelLoadingContainer}>
          <Text style={styles.modelLoadingText}>
            Initializing TensorFlow...
          </Text>
        </View>
      );
    }
    
    return null;
  };

  // Provide platform info
  const renderPlatformInfo = () => {
    return (
      <View style={styles.platformContainer}>
        <Text style={styles.platformText}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.platformText}>
          {Platform.OS === 'android' && parseInt(Platform.Version.toString(), 10) >= 34 
            ? 'Android 14+ detected - Optimized mode active'
            : 'Standard mode active'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ExpoCameraComponent onFrameProcessed={handleFrameProcessed} />
      
      {/* Overlay UI */}
      {renderModelStatus()}
      {renderPlatformInfo()}
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Animal MoCap</Text>
        <Text style={styles.statsText}>
          Status: {isDetecting ? 'Active' : 'Paused'}
        </Text>
        <Text style={styles.statsText}>
          Resolution: {frameStats?.width || 0} x {frameStats?.height || 0}
        </Text>
        <Text style={styles.statsText}>
          TF.js: {modelLoaded ? 'Ready' : 'Initializing...'}
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            isDetecting ? styles.buttonActive : styles.buttonInactive
          ]}
          onPress={toggleDetection}
        >
          <Text style={styles.buttonText}>
            {isDetecting ? 'Pause Detection' : 'Resume Detection'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  modelLoadingContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    padding: 8,
    alignItems: 'center',
  },
  modelLoadingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modelErrorContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 8,
    alignItems: 'center',
  },
  modelErrorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  platformContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  platformText: {
    color: 'white',
    fontSize: 12,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
  },
  statsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#FF6B6B',
  },
  buttonInactive: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

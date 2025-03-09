import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CameraComponent } from './CameraComponent';

export const AnimalPoseDetection: React.FC = () => {
  const [frameStats, setFrameStats] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  
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

  return (
    <View style={styles.container}>
      <CameraComponent onFrameProcessed={handleFrameProcessed} />
      
      {/* Overlay UI */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Resolution: {frameStats?.width || 0} x {frameStats?.height || 0}
        </Text>
        <Text style={styles.statsText}>
          Format: {frameStats?.pixelFormat || 'unknown'}
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
  statsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
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

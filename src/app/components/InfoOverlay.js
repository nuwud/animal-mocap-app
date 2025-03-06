/**
 * Info Overlay Component
 * 
 * Displays real-time information overlay with detection stats.
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const InfoOverlay = ({ 
  detectionInfo = null, 
  isRecording = false, 
  recordingTime = 0,
  fps = 0,
}) => {
  if (!detectionInfo && !isRecording && fps === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* FPS Counter */}
      <View style={styles.fpsContainer}>
        <Text style={styles.fpsText}>
          FPS: {fps.toFixed(1)}
        </Text>
      </View>

      {/* Recording indicator */}
      {isRecording && (
        <View style={styles.recordingContainer}>
          <View style={styles.recordingIndicator} />
          <Text style={styles.recordingText}>
            Recording: {formatTime(recordingTime)}
          </Text>
        </View>
      )}

      {/* Detection info */}
      {detectionInfo && (
        <View style={styles.detectionContainer}>
          <Text style={styles.detectionText}>
            Animal: {detectionInfo.animal}
          </Text>
          <Text style={styles.detectionText}>
            Confidence: {(detectionInfo.confidence * 100).toFixed(1)}%
          </Text>
          {detectionInfo.keypoints && (
            <Text style={styles.detectionText}>
              Keypoints: {detectionInfo.keypoints.length} tracked
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// Helper function to format recording time
const formatTime = (timeInMs) => {
  const totalSeconds = Math.floor(timeInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  fpsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fpsText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(200, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detectionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    maxWidth: width * 0.8,
  },
  detectionText: {
    color: '#FFF',
    fontSize: 14,
    marginVertical: 2,
  },
});

export default InfoOverlay;

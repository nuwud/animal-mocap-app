/**
 * Skeleton Overlay Component
 * 
 * Renders keypoints and skeleton connections for animal pose estimation.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonOverlay = ({ 
  keypoints = [], 
  connections = [],
  keypointColor = '#00FF00',
  keypointBorderColor = '#FFFFFF',
  lineColor = '#00FF00',
  minConfidence = 0.3,
  keypointRadius = 4,
  lineThickness = 2
}) => {
  // No keypoints to render
  if (!keypoints || keypoints.length === 0) {
    return null;
  }

  // Render keypoint markers
  const renderKeypoints = () => {
    return keypoints.map((keypoint, index) => {
      // Skip keypoints with low confidence
      if (keypoint.confidence < minConfidence) return null;
      
      // Calculate marker size based on confidence
      const size = keypointRadius + (keypoint.confidence * keypointRadius);
      
      return (
        <View
          key={`keypoint-${index}`}
          style={[
            styles.keypointMarker,
            {
              left: keypoint.x - size / 2,
              top: keypoint.y - size / 2,
              width: size,
              height: size,
              backgroundColor: keypointColor,
              borderColor: keypointBorderColor,
              opacity: keypoint.confidence,
            },
          ]}
        />
      );
    });
  };
  
  // Render skeleton lines between keypoints
  const renderConnections = () => {
    if (!connections || connections.length === 0) return null;
    
    return connections.map((connection, index) => {
      const [fromIndex, toIndex] = connection;
      
      const from = keypoints[fromIndex];
      const to = keypoints[toIndex];
      
      // Skip if either keypoint is missing or has low confidence
      if (!from || !to || from.confidence < minConfidence || to.confidence < minConfidence) {
        return null;
      }
      
      // Calculate line length and angle
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Calculate line position (center point between keypoints)
      const centerX = (from.x + to.x) / 2;
      const centerY = (from.y + to.y) / 2;
      
      return (
        <View
          key={`connection-${index}`}
          style={[
            styles.connectionLine,
            {
              left: 0,
              top: 0,
              width: length,
              height: lineThickness,
              backgroundColor: lineColor,
              transform: [
                { translateX: centerX - length / 2 },
                { translateY: centerY - lineThickness / 2 },
                { rotate: `${angle}deg` }
              ],
              opacity: Math.min(from.confidence, to.confidence),
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {renderConnections()}
      {renderKeypoints()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  keypointMarker: {
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 2,
  },
  connectionLine: {
    position: 'absolute',
    borderRadius: 1,
    zIndex: 1,
  },
});

export default SkeletonOverlay;

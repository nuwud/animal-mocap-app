/**
 * Record Button Component
 * 
 * A customizable record button for capturing motion data.
 */

import React, { useEffect } from 'react';
import { 
  TouchableOpacity, 
  View, 
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

const RecordButton = ({ 
  onPress,
  isRecording = false,
  size = 70,
  color = '#FF0000',
  disabled = false
}) => {
  // Animation value for recording pulse effect
  const pulseAnim = new Animated.Value(1);
  
  // Set up pulse animation when recording
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      // Reset animation when not recording
      pulseAnim.setValue(1);
    }
    
    // Clean up animation on unmount
    return () => {
      pulseAnim.stopAnimation();
    };
  }, [isRecording, pulseAnim]);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        { opacity: disabled ? 0.5 : 1 }
      ]}
      activeOpacity={0.7}
    >
      <Animated.View 
        style={[
          styles.outerCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: color,
            transform: [{ scale: pulseAnim }]
          }
        ]}
      />
      <View 
        style={[
          styles.innerCircle,
          {
            width: isRecording ? size * 0.4 : size * 0.7,
            height: isRecording ? size * 0.4 : size * 0.7,
            borderRadius: isRecording ? 4 : size * 0.35,
            backgroundColor: color
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    position: 'absolute'
  }
});

export default RecordButton;

import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { AnimalPoseDetection } from './src/components/expo/AnimalPoseDetection';

const SimpleTestApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimalPoseDetection />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Animal MoCap - Expo Camera</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
});

export default SimpleTestApp;

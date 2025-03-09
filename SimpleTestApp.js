import React from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { AnimalPoseDetection } from './src/components/AnimalPoseDetection';

const SimpleTestApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimalPoseDetection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default SimpleTestApp;

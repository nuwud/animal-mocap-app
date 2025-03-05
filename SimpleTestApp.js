import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function SimpleTestApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animal MoCap App</Text>
      <Text style={styles.subtitle}>Basic Test Version</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Test Button" 
          onPress={() => Alert.alert('Success', 'App is working correctly!')}
        />
      </View>
      
      <Text style={styles.infoText}>
        This is a minimal version to verify the app setup.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '80%',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

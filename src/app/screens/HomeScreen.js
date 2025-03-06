/**
 * Home Screen
 * 
 * The main landing screen for the application.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../state/appSlice';

const HomeScreen = ({ navigation }) => {
  const appMode = useSelector(selectAppMode);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Animal MoCap</Text>
          <Text style={styles.subtitle}>
            Mobile Motion Capture for Animals
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Capture')}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>📹</Text>
            </View>
            <Text style={styles.cardTitle}>Capture</Text>
            <Text style={styles.cardDescription}>
              Record animal motion using your device's camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Gallery')}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>🎬</Text>
            </View>
            <Text style={styles.cardTitle}>Gallery</Text>
            <Text style={styles.cardDescription}>
              View and manage your recorded motion captures
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>⚙️</Text>
            </View>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardDescription}>
              Configure application settings and preferences
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            App Mode: {appMode.charAt(0).toUpperCase() + appMode.slice(1)}
          </Text>
          <Text style={styles.infoText}>
            This app uses TensorFlow ML models to detect and track animal movements
            in real-time. Point your camera at a dog or cat to see it in action.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default HomeScreen;

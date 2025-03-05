import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import PermissionsHandler from '../../core/permissions/PermissionsHandler';

const PermissionsTest = () => {
  const [permissionStatus, setPermissionStatus] = useState({
    camera: false,
    storage: false,
    cameraStatus: 'unknown',
    storageStatus: {
      images: 'unknown',
      videos: 'unknown'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [log, setLog] = useState([]);

  // Add log message with timestamp
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog(prevLog => [...prevLog, `[${timestamp}] ${message}`]);
  };

  // Check permissions on component mount
  useEffect(() => {
    checkPermissions();
  }, []);

  // Function to check permissions
  const checkPermissions = async () => {
    setIsLoading(true);
    addLog('Checking permissions...');
    
    try {
      const status = await PermissionsHandler.checkPermissions();
      setPermissionStatus(status);
      
      addLog(`Camera permission: ${status.camera ? 'GRANTED' : 'DENIED'}`);
      addLog(`Storage permission: ${status.storage ? 'GRANTED' : 'DENIED'}`);
      addLog(`Raw camera status: ${status.cameraStatus}`);
      addLog(`Raw storage status (images): ${status.storageStatus.images}`);
      
      if (status.storageStatus.videos) {
        addLog(`Raw storage status (videos): ${status.storageStatus.videos}`);
      }
    } catch (error) {
      addLog(`Error checking permissions: ${error.message}`);
      console.error('Error checking permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to request permissions
  const requestPermissions = async () => {
    setIsLoading(true);
    addLog('Requesting permissions...');
    
    try {
      const status = await PermissionsHandler.requestPermissions();
      setPermissionStatus(status);
      
      addLog(`Camera permission: ${status.camera ? 'GRANTED' : 'DENIED'}`);
      addLog(`Storage permission: ${status.storage ? 'GRANTED' : 'DENIED'}`);
      addLog(`Raw camera status: ${status.cameraStatus}`);
      addLog(`Raw storage status (images): ${status.storageStatus.images}`);
      
      if (status.storageStatus.videos) {
        addLog(`Raw storage status (videos): ${status.storageStatus.videos}`);
      }
    } catch (error) {
      addLog(`Error requesting permissions: ${error.message}`);
      console.error('Error requesting permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Permissions Test</Text>
      </View>
      
      <View style={styles.permissionsContainer}>
        <Text style={styles.sectionTitle}>Permissions Status</Text>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Camera:</Text>
          <View style={[
            styles.permissionStatus,
            permissionStatus.camera ? styles.permissionGranted : styles.permissionDenied
          ]}>
            <Text style={styles.permissionStatusText}>
              {permissionStatus.camera ? 'GRANTED' : 'DENIED'}
            </Text>
          </View>
        </View>
        
        <View style={styles.permissionRow}>
          <Text style={styles.permissionLabel}>Storage:</Text>
          <View style={[
            styles.permissionStatus,
            permissionStatus.storage ? styles.permissionGranted : styles.permissionDenied
          ]}>
            <Text style={styles.permissionStatusText}>
              {permissionStatus.storage ? 'GRANTED' : 'DENIED'}
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Check Permissions"
            onPress={checkPermissions}
            disabled={isLoading}
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Request Permissions"
            onPress={requestPermissions}
            disabled={isLoading}
          />
        </View>
      </View>
      
      <View style={styles.logContainer}>
        <Text style={styles.sectionTitle}>Log</Text>
        <ScrollView style={styles.logScrollView}>
          {log.map((message, index) => (
            <Text key={index} style={styles.logMessage}>{message}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  permissionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  permissionLabel: {
    fontSize: 16,
    color: '#333',
  },
  permissionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  permissionGranted: {
    backgroundColor: '#4CAF50',
  },
  permissionDenied: {
    backgroundColor: '#F44336',
  },
  permissionStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonSpacer: {
    width: 10,
  },
  logContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  logScrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 10,
  },
  logMessage: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 3,
  },
});

export default PermissionsTest;
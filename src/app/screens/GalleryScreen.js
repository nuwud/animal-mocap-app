/**
 * Gallery Screen
 * 
 * Screen for viewing and managing recorded motion captures.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecordings } from '../state/detectionSlice';

const GalleryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const recordings = useSelector(selectRecordings);
  const [selectedRecording, setSelectedRecording] = useState(null);
  
  // Format recording duration from milliseconds to MM:SS
  const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle item press
  const handleItemPress = (recording) => {
    setSelectedRecording(recording);
    Alert.alert(
      `${recording.animal} Recording`,
      `Would you like to view or export this recording?`,
      [
        {
          text: 'View',
          onPress: () => {
            // In the future: implement viewing functionality
            Alert.alert('View Recording', 'Viewing functionality will be available in a future update.');
          },
        },
        {
          text: 'Export',
          onPress: () => {
            // In the future: implement export functionality
            Alert.alert('Export Recording', 'Export functionality will be available in a future update.');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectedRecording(null),
        },
      ]
    );
  };
  
  // Handle delete recording
  const handleDeleteRecording = (id) => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In the future: implement delete functionality
            Alert.alert('Delete Recording', 'Delete functionality will be available in a future update.');
          },
        },
      ]
    );
  };
  
  // Render individual recording item
  const renderItem = ({ item }) => {
    const animal = item.animal?.charAt(0).toUpperCase() + item.animal?.slice(1) || 'Unknown';
    
    return (
      <TouchableOpacity 
        style={styles.recordingItem}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.recordingPreview}>
          <Text style={styles.previewText}>{animal[0]}</Text>
        </View>
        <View style={styles.recordingInfo}>
          <Text style={styles.recordingName}>{animal} Motion</Text>
          <Text style={styles.recordingDetails}>
            {formatDate(item.timestamp)} • {formatDuration(item.duration)}
          </Text>
        </View>
        <View style={styles.recordingActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteRecording(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {recordings.length > 0 ? (
        <FlatList
          data={recordings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recordings yet</Text>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={() => navigation.navigate('Capture')}
          >
            <Text style={styles.captureButtonText}>
              Create Your First Recording
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  recordingItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordingPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0097a7',
  },
  recordingInfo: {
    flex: 1,
  },
  recordingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recordingDetails: {
    fontSize: 14,
    color: '#666',
  },
  recordingActions: {
    marginLeft: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#0097a7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GalleryScreen;

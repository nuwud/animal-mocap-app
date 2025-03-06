/**
 * Gallery Screen
 * 
 * Screen for viewing and managing recorded motion captures.
 * This is a placeholder that will be replaced with the actual implementation.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native';

// Placeholder data
const MOCK_RECORDINGS = [
  { id: '1', name: 'Dog walking', date: '2025-03-06', duration: '00:15', animal: 'Dog' },
  { id: '2', name: 'Cat jumping', date: '2025-03-05', duration: '00:08', animal: 'Cat' },
  { id: '3', name: 'Dog sitting', date: '2025-03-04', duration: '00:12', animal: 'Dog' },
  { id: '4', name: 'Cat playing', date: '2025-03-03', duration: '00:22', animal: 'Cat' },
];

const GalleryScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recordingItem}
      onPress={() => {
        // In the future: view recording details
        alert(`Viewing details for "${item.name}" will be implemented in a future update.`);
      }}
    >
      <View style={styles.recordingPreview}>
        <Text style={styles.previewText}>{item.animal[0]}</Text>
      </View>
      <View style={styles.recordingInfo}>
        <Text style={styles.recordingName}>{item.name}</Text>
        <Text style={styles.recordingDetails}>
          {item.date} • {item.duration}
        </Text>
      </View>
      <View style={styles.recordingActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Export</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {MOCK_RECORDINGS.length > 0 ? (
        <FlatList
          data={MOCK_RECORDINGS}
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
    backgroundColor: '#e0f7fa',
    borderRadius: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#0097a7',
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

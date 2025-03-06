/**
 * Settings Screen
 * 
 * Screen for configuring application settings.
 * This is a placeholder that will be replaced with the actual implementation.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const SettingsScreen = () => {
  // Settings state
  const [highQuality, setHighQuality] = useState(false);
  const [saveRawData, setSaveRawData] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  
  // Setting section component
  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
  
  // Setting item component
  const SettingItem = ({ title, description, value, onValueChange }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
  
  // Button component
  const Button = ({ title, onPress, type = 'primary' }) => (
    <TouchableOpacity 
      style={[
        styles.button,
        type === 'primary' ? styles.primaryButton : styles.secondaryButton
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.buttonText,
          type === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <ScrollView style={styles.container}>
      <SettingSection title="Capture Settings">
        <SettingItem
          title="High Quality Capture"
          description="Use higher resolution and framerate (uses more battery)"
          value={highQuality}
          onValueChange={setHighQuality}
        />
        <SettingItem
          title="Save Raw Data"
          description="Store raw motion data alongside processed animations"
          value={saveRawData}
          onValueChange={setSaveRawData}
        />
        <SettingItem
          title="Auto-Detect Animals"
          description="Automatically identify and track animals in frame"
          value={autoDetect}
          onValueChange={setAutoDetect}
        />
      </SettingSection>
      
      <SettingSection title="App Settings">
        <SettingItem
          title="Debug Mode"
          description="Show technical information and logs"
          value={debugMode}
          onValueChange={setDebugMode}
        />
        <SettingItem
          title="Dark Theme"
          description="Use darker colors (better for battery life)"
          value={darkTheme}
          onValueChange={setDarkTheme}
        />
      </SettingSection>
      
      <SettingSection title="Data Management">
        <Button
          title="Export All Recordings"
          onPress={() => alert('Export feature will be available in a future update')}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Clear All Recordings"
          type="secondary"
          onPress={() => alert('Clear data feature will be available in a future update')}
        />
      </SettingSection>
      
      <SettingSection title="About">
        <View style={styles.aboutSection}>
          <Text style={styles.appName}>Animal MoCap App</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 Animal Motion Research</Text>
          <Text style={styles.description}>
            This application uses TensorFlow for animal motion capture and 
            enables research into animal movement patterns and behaviors.
          </Text>
        </View>
      </SettingSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#d1d1d1',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#333',
  },
  buttonSpacer: {
    height: 8,
  },
  aboutSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SettingsScreen;

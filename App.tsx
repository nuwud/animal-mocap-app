import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import SimpleTestApp from './SimpleTestApp';
import store from './src/app/state/store';
import { setAppMode } from './src/app/state/appSlice';

// Import our navigator (commented out until we implement the screens)
// import AppNavigator from './src/app/navigation/AppNavigator';

export default function App() {
  const [useSimpleMode, setUseSimpleMode] = useState(true);
  
  // Update Redux state when simple mode changes
  useEffect(() => {
    store.dispatch(setAppMode(useSimpleMode ? 'simple' : 'full'));
  }, [useSimpleMode]);
  
  // Wrap everything in Redux Provider
  return (
    <Provider store={store}>
      <AppContent 
        useSimpleMode={useSimpleMode} 
        setUseSimpleMode={setUseSimpleMode} 
      />
    </Provider>
  );
}

// Separate component for the app content to keep the Provider at the top level
function AppContent({ useSimpleMode, setUseSimpleMode }) {
  // We'll use the simple test app by default for now
  // until we resolve the dependency issues
  
  if (useSimpleMode) {
    return (
      <SafeAreaView style={styles.container}>
        <SimpleTestApp />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Running in Simple Mode
          </Text>
          <Button 
            title="Try Full App" 
            onPress={() => setUseSimpleMode(false)}
            color="#666"
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // If full mode is selected, we'll try to import the full app
  // but for now display a message that it's not ready
  // In a future update, we'll replace this with the actual AppNavigator
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Full App In Development</Text>
        <Text style={styles.errorMessage}>
          The full version of the app is currently under development.
          Check back soon for complete functionality.
        </Text>
        <Button 
          title="Return to Simple Mode" 
          onPress={() => setUseSimpleMode(true)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d32f2f',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
});

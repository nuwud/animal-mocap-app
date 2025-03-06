import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SimpleTestApp from './SimpleTestApp';
import store from './src/app/state/store';
import { setAppMode } from './src/app/state/appSlice';
import AppNavigator from './src/app/navigation/AppNavigator';

// Define interface for AppContent props
interface AppContentProps {
  useSimpleMode: boolean;
  setUseSimpleMode: (value: boolean) => void;
  showStartupScreen: boolean;
  setShowStartupScreen: (value: boolean) => void;
}

const App: React.FC = () => {
  const [useSimpleMode, setUseSimpleMode] = useState<boolean>(true);
  const [showStartupScreen, setShowStartupScreen] = useState<boolean>(true);
  
  // Update Redux state when simple mode changes
  useEffect(() => {
    store.dispatch(setAppMode(useSimpleMode ? 'simple' : 'full'));
  }, [useSimpleMode]);
  
  // Wrap everything in Redux Provider and SafeAreaProvider
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent 
          useSimpleMode={useSimpleMode} 
          setUseSimpleMode={setUseSimpleMode}
          showStartupScreen={showStartupScreen}
          setShowStartupScreen={setShowStartupScreen}
        />
      </SafeAreaProvider>
    </Provider>
  );
};

// Separate component for the app content to keep the Provider at the top level
const AppContent: React.FC<AppContentProps> = ({ 
  useSimpleMode, 
  setUseSimpleMode,
  showStartupScreen,
  setShowStartupScreen
}) => {
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
  
  // Show startup screen first time user switches to full mode
  if (showStartupScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startupContainer}>
          <Text style={styles.startupTitle}>Welcome to Full App Mode</Text>
          <Text style={styles.startupMessage}>
            The full version includes navigation between screens,
            animal detection, and motion capture functionality.
          </Text>
          <Text style={styles.startupNote}>
            Note: This is a development preview. Some features may not be fully
            implemented yet.
          </Text>
          <View style={styles.buttonRow}>
            <Button 
              title="Continue to Full App" 
              onPress={() => setShowStartupScreen(false)}
            />
            <View style={styles.buttonSpacer} />
            <Button 
              title="Return to Simple Mode" 
              onPress={() => setUseSimpleMode(true)}
              color="#666"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  // Show the full app with navigation
  return <AppNavigator />;
};

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
  startupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
  },
  startupMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  startupNote: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonRow: {
    width: '100%',
  },
  buttonSpacer: {
    height: 16,
  },
});

export default App;
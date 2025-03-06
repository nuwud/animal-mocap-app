/**
 * App Navigator
 * 
 * Navigation configuration for the application.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import { 
  HomeScreen, 
  CaptureScreen, 
  GalleryScreen, 
  SettingsScreen 
} from '../screens';

// Create stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0, // for Android
            shadowOpacity: 0, // for iOS
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5EA',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#000',
          },
          headerBackTitleVisible: false,
          headerTintColor: '#007AFF',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Capture" 
          component={CaptureScreen} 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen} 
          options={{ 
            title: 'Recordings',
          }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            title: 'Settings',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

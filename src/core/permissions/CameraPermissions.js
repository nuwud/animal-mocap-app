/**
 * Camera Permissions
 * 
 * Handles camera permission requests for modern Android and iOS devices.
 */

import { Camera } from 'react-native-vision-camera';
import { Platform } from 'react-native';

/**
 * Request camera permissions for the application
 * Handles both iOS and Android permission flow
 * 
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const requestCameraPermissions = async () => {
  try {
    // Request camera permission using Vision Camera
    const cameraPermission = await Camera.requestCameraPermission();
    
    // Handle result
    if (cameraPermission === 'granted') {
      console.log('Camera permission granted');
      return true;
    } else if (cameraPermission === 'denied') {
      console.log('Camera permission denied');
      return false;
    } else {
      console.log('Camera permission limited or unavailable');
      return false;
    }
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

/**
 * Check if camera permissions are already granted
 * 
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const checkCameraPermissions = async () => {
  try {
    // Check camera permission status
    const cameraPermission = await Camera.getCameraPermissionStatus();
    
    // Handle result
    if (cameraPermission === 'granted') {
      console.log('Camera permission already granted');
      return true;
    } else {
      console.log('Camera permission not granted', cameraPermission);
      return false;
    }
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return false;
  }
};

/**
 * Get available camera devices
 * 
 * @returns {Promise<Array>} List of available camera devices
 */
export const getAvailableCameras = async () => {
  try {
    const devices = await Camera.getAvailableCameraDevices();
    return devices;
  } catch (error) {
    console.error('Error getting available cameras:', error);
    return [];
  }
};

/**
 * Find the best back camera device for the current platform
 * 
 * @returns {Promise<Object|null>} Camera device object or null if not found
 */
export const getBestBackCamera = async () => {
  try {
    const devices = await Camera.getAvailableCameraDevices();
    
    // Filter for back cameras
    const backCameras = devices.filter(d => d.position === 'back');
    
    if (backCameras.length === 0) {
      console.warn('No back camera found');
      return null;
    }
    
    // If on Android, prefer ultra-wide on Samsung Galaxy S24 Ultra
    if (Platform.OS === 'android' && Platform.constants.Brand === 'samsung') {
      const ultraWide = backCameras.find(d => d.hasUltraWideCamera === true);
      if (ultraWide) {
        return ultraWide;
      }
    }
    
    // Look for device with highest resolution
    const bestCamera = backCameras.reduce((best, current) => {
      const currentRes = current.formats.reduce((highest, format) => {
        const resolution = format.photoWidth * format.photoHeight;
        return resolution > highest ? resolution : highest;
      }, 0);
      
      const bestRes = best.formats.reduce((highest, format) => {
        const resolution = format.photoWidth * format.photoHeight;
        return resolution > highest ? resolution : highest;
      }, 0);
      
      return currentRes > bestRes ? current : best;
    }, backCameras[0]);
    
    return bestCamera;
  } catch (error) {
    console.error('Error finding best back camera:', error);
    return null;
  }
};

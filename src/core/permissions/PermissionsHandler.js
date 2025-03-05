import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

class PermissionsHandler {
  /**
   * Check if the required permissions are granted
   * @returns {Promise<Object>} An object with the status of each permission
   */
  static async checkPermissions() {
    try {
      const permissions = this.getPermissionsForPlatform();
      
      const cameraStatus = await check(permissions.camera);
      const storageStatus = await check(permissions.storage);
      
      return {
        camera: this.isPermissionGranted(cameraStatus),
        storage: this.isPermissionGranted(storageStatus),
      };
    } catch (error) {
      console.error('Error checking permissions:', error);
      throw error;
    }
  }
  
  /**
   * Request the required permissions
   * @returns {Promise<Object>} An object with the status of each permission after the request
   */
  static async requestPermissions() {
    try {
      const permissions = this.getPermissionsForPlatform();
      
      const cameraStatus = await request(permissions.camera);
      const storageStatus = await request(permissions.storage);
      
      return {
        camera: this.isPermissionGranted(cameraStatus),
        storage: this.isPermissionGranted(storageStatus),
      };
    } catch (error) {
      console.error('Error requesting permissions:', error);
      throw error;
    }
  }
  
  /**
   * Get the appropriate permissions based on the platform
   * @returns {Object} An object with the appropriate permissions for the current platform
   */
  static getPermissionsForPlatform() {
    if (Platform.OS === 'ios') {
      return {
        camera: PERMISSIONS.IOS.CAMERA,
        storage: PERMISSIONS.IOS.PHOTO_LIBRARY,
      };
    } else {
      return {
        camera: PERMISSIONS.ANDROID.CAMERA,
        storage: Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      };
    }
  }
  
  /**
   * Check if a permission status is granted
   * @param {string} status - The permission status
   * @returns {boolean} True if the permission is granted, false otherwise
   */
  static isPermissionGranted(status) {
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  }
}

export default PermissionsHandler;
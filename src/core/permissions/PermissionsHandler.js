import { Platform, Alert } from 'react-native';
import { 
  check, 
  request, 
  PERMISSIONS, 
  RESULTS, 
  openSettings,
  checkMultiple,
  requestMultiple
} from 'react-native-permissions';

class PermissionsHandler {
  /**
   * Check if the required permissions are granted
   * @returns {Promise<Object>} An object with the status of each permission
   */
  static async checkPermissions() {
    try {
      const permissions = this.getPermissionsForPlatform();
      
      // For Android 13+ (API level 33+), we need to check both camera and media permissions
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const statuses = await checkMultiple([
          permissions.camera,
          permissions.mediaImages,
          permissions.mediaVideo
        ]);
        
        return {
          camera: this.isPermissionGranted(statuses[permissions.camera]),
          storage: this.isPermissionGranted(statuses[permissions.mediaImages]) && 
                  this.isPermissionGranted(statuses[permissions.mediaVideo]),
          cameraStatus: statuses[permissions.camera],
          storageStatus: {
            images: statuses[permissions.mediaImages],
            videos: permissions.mediaVideo ? statuses[permissions.mediaVideo] : null
          }
        };
      } else {
        // For iOS and older Android versions
        const cameraStatus = await check(permissions.camera);
        const storageStatus = await check(permissions.storage);
        
        return {
          camera: this.isPermissionGranted(cameraStatus),
          storage: this.isPermissionGranted(storageStatus),
          cameraStatus,
          storageStatus: {
            images: storageStatus,
            videos: null
          }
        };
      }
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
      
      // For Android 13+ (API level 33+), we need to request both camera and media permissions
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        console.log('Requesting permissions for Android 13+');
        const statuses = await requestMultiple([
          permissions.camera,
          permissions.mediaImages,
          permissions.mediaVideo
        ]);
        
        const cameraGranted = this.isPermissionGranted(statuses[permissions.camera]);
        const storageGranted = this.isPermissionGranted(statuses[permissions.mediaImages]) && 
                             this.isPermissionGranted(statuses[permissions.mediaVideo]);
        
        // If any permission was denied, show a dialog to guide the user to settings
        if (!cameraGranted || !storageGranted) {
          this.showPermissionSettingsDialog();
        }
        
        return {
          camera: cameraGranted,
          storage: storageGranted,
          cameraStatus: statuses[permissions.camera],
          storageStatus: {
            images: statuses[permissions.mediaImages],
            videos: permissions.mediaVideo ? statuses[permissions.mediaVideo] : null
          }
        };
      } else {
        // For iOS and older Android versions
        console.log('Requesting permissions for iOS or older Android');
        const cameraStatus = await request(permissions.camera);
        const storageStatus = await request(permissions.storage);
        
        const cameraGranted = this.isPermissionGranted(cameraStatus);
        const storageGranted = this.isPermissionGranted(storageStatus);
        
        // If any permission was denied, show a dialog to guide the user to settings
        if (!cameraGranted || !storageGranted) {
          this.showPermissionSettingsDialog();
        }
        
        return {
          camera: cameraGranted,
          storage: storageGranted,
          cameraStatus,
          storageStatus: {
            images: storageStatus,
            videos: null
          }
        };
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      throw error;
    }
  }
  
  /**
   * Show a dialog to guide the user to the app settings
   */
  static showPermissionSettingsDialog() {
    Alert.alert(
      'Permissions Required',
      'Camera and storage permissions are required for the app to function properly. Please enable them in the app settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Settings', 
          onPress: () => openSettings().catch(() => console.log('Cannot open settings'))
        }
      ]
    );
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
      // For Android
      // Special handling for Samsung devices which might have unique requirements
      const isSamsungDevice = this.isSamsungDevice();
      
      // For Android 13+ (API level 33+)
      if (Platform.Version >= 33) {
        return {
          camera: PERMISSIONS.ANDROID.CAMERA,
          mediaImages: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          mediaVideo: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          // Still include the old storage permission for compatibility
          storage: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        };
      } 
      // For older Android versions
      else {
        return {
          camera: PERMISSIONS.ANDROID.CAMERA,
          storage: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        };
      }
    }
  }
  
  /**
   * Check if the device is a Samsung device
   * @returns {boolean} True if the device is Samsung, false otherwise
   */
  static isSamsungDevice() {
    return Platform.OS === 'android' && 
           Platform.constants && 
           Platform.constants.Brand && 
           Platform.constants.Brand.toLowerCase().includes('samsung');
  }
  
  /**
   * Check if a permission status is granted
   * @param {string} status - The permission status
   * @returns {boolean} True if the permission is granted, false otherwise
   */
  static isPermissionGranted(status) {
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  }
  
  /**
   * Log detailed permission status for debugging
   * @param {Object} permissionStatus - The permission status object
   */
  static logPermissionStatus(permissionStatus) {
    console.log('Permission status:', JSON.stringify(permissionStatus, null, 2));
    
    // Check if permissions are missing
    if (!permissionStatus.camera) {
      console.warn('Camera permission is not granted!');
    }
    
    if (!permissionStatus.storage) {
      console.warn('Storage permission is not granted!');
    }
    
    // Log the raw status values
    console.log('Camera status:', permissionStatus.cameraStatus);
    console.log('Storage status (images):', permissionStatus.storageStatus.images);
    if (permissionStatus.storageStatus.videos) {
      console.log('Storage status (videos):', permissionStatus.storageStatus.videos);
    }
  }
}

export default PermissionsHandler;
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as poseDetection from '@tensorflow-models/pose-detection';

class AnimalDetector {
  constructor() {
    this.objectDetector = null;
    this.poseDetector = null;
    this.isInitialized = false;
    this.isTfReady = false;
  }

  /**
   * Initialize TensorFlow.js and load required models
   * @returns {Promise<boolean>} True if initialization was successful
   */
  async initialize() {
    try {
      console.log('Initializing TensorFlow.js...');
      await tf.ready();
      this.isTfReady = true;
      console.log('TensorFlow.js is ready');

      console.log('Loading Object Detection model...');
      this.objectDetector = await cocoSsd.load();
      console.log('Object Detection model loaded');

      console.log('Loading Pose Detection model...');
      this.poseDetector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
        }
      );
      console.log('Pose Detection model loaded');

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing AnimalDetector:', error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Detect objects in an image
   * @param {ImageData|HTMLImageElement|HTMLCanvasElement|ImageBitmap} image - The image to detect objects in
   * @returns {Promise<Array>} Array of detected objects
   */
  async detectObjects(image) {
    if (!this.isInitialized) {
      console.warn('AnimalDetector not initialized. Call initialize() first.');
      return [];
    }

    try {
      const predictions = await this.objectDetector.detect(image);
      
      // Filter for animal classes (dog, cat, etc.)
      const animalClasses = ['dog', 'cat', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'];
      
      const animals = predictions.filter(prediction => 
        animalClasses.includes(prediction.class.toLowerCase())
      );
      
      return animals;
    } catch (error) {
      console.error('Error detecting objects:', error);
      return [];
    }
  }

  /**
   * Detect poses in an image
   * @param {ImageData|HTMLImageElement|HTMLCanvasElement|ImageBitmap} image - The image to detect poses in
   * @returns {Promise<Array>} Array of detected poses
   */
  async detectPoses(image) {
    if (!this.isInitialized) {
      console.warn('AnimalDetector not initialized. Call initialize() first.');
      return [];
    }

    try {
      const poses = await this.poseDetector.estimatePoses(image);
      return poses;
    } catch (error) {
      console.error('Error detecting poses:', error);
      return [];
    }
  }

  /**
   * Detect animals and their poses in an image
   * @param {ImageData|HTMLImageElement|HTMLCanvasElement|ImageBitmap} image - The image to process
   * @returns {Promise<Object>} Object containing detected animals and their poses
   */
  async detectAnimals(image) {
    if (!this.isInitialized) {
      console.warn('AnimalDetector not initialized. Call initialize() first.');
      return { animals: [], poses: [] };
    }

    try {
      const animals = await this.detectObjects(image);
      const poses = await this.detectPoses(image);
      
      // In a more sophisticated implementation, we would match the detected animals
      // with their corresponding poses based on bounding box overlap
      
      return {
        animals,
        poses
      };
    } catch (error) {
      console.error('Error detecting animals:', error);
      return { animals: [], poses: [] };
    }
  }

  /**
   * Release resources used by the detectors
   */
  dispose() {
    try {
      if (this.objectDetector && this.objectDetector.dispose) {
        this.objectDetector.dispose();
      }
      
      if (this.poseDetector && this.poseDetector.dispose) {
        this.poseDetector.dispose();
      }
      
      this.isInitialized = false;
      console.log('AnimalDetector resources released');
    } catch (error) {
      console.error('Error disposing AnimalDetector:', error);
    }
  }
}

export default AnimalDetector;
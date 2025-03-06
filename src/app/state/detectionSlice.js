/**
 * Detection Slice
 * 
 * Redux slice for managing animal detection state.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModelLoaded: false,
  isDetecting: false,
  detectionResult: null,
  isRecording: false,
  recordingStartTime: null,
  recordingDuration: 0,
  recordings: [],
  error: null,
  fps: 0,
};

const detectionSlice = createSlice({
  name: 'detection',
  initialState,
  reducers: {
    setModelLoaded: (state, action) => {
      state.isModelLoaded = action.payload;
    },
    setDetecting: (state, action) => {
      state.isDetecting = action.payload;
    },
    setDetectionResult: (state, action) => {
      state.detectionResult = action.payload;
    },
    startRecording: (state) => {
      state.isRecording = true;
      state.recordingStartTime = Date.now();
      state.recordingDuration = 0;
    },
    updateRecordingDuration: (state) => {
      if (state.isRecording && state.recordingStartTime) {
        state.recordingDuration = Date.now() - state.recordingStartTime;
      }
    },
    stopRecording: (state) => {
      if (state.isRecording) {
        // Add the recording to the list
        state.recordings.push({
          id: `recording_${Date.now()}`,
          duration: state.recordingDuration,
          timestamp: Date.now(),
          animal: state.detectionResult?.animal || 'unknown',
        });
      }
      state.isRecording = false;
      state.recordingStartTime = null;
    },
    setFps: (state, action) => {
      state.fps = action.payload;
    },
    clearDetection: (state) => {
      state.detectionResult = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setModelLoaded,
  setDetecting,
  setDetectionResult,
  startRecording,
  updateRecordingDuration,
  stopRecording,
  setFps,
  clearDetection,
  setError,
  clearError,
} = detectionSlice.actions;

// Export selectors
export const selectDetectionState = (state) => state.detection;
export const selectIsModelLoaded = (state) => state.detection.isModelLoaded;
export const selectIsDetecting = (state) => state.detection.isDetecting;
export const selectDetectionResult = (state) => state.detection.detectionResult;
export const selectIsRecording = (state) => state.detection.isRecording;
export const selectRecordingDuration = (state) => state.detection.recordingDuration;
export const selectRecordings = (state) => state.detection.recordings;
export const selectFps = (state) => state.detection.fps;
export const selectError = (state) => state.detection.error;

export default detectionSlice.reducer;

/**
 * App Slice
 * 
 * Redux slice for managing application-wide state.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialized: false,
  isLoading: false,
  error: null,
  appMode: 'simple', // 'simple' or 'full'
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAppMode: (state, action) => {
      state.appMode = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setInitialized,
  setLoading,
  setError,
  setAppMode,
  clearError,
} = appSlice.actions;

// Export selectors
export const selectAppState = (state) => state.app;
export const selectAppMode = (state) => state.app.appMode;
export const selectIsInitialized = (state) => state.app.initialized;
export const selectIsLoading = (state) => state.app.isLoading;
export const selectError = (state) => state.app.error;

export default appSlice.reducer;

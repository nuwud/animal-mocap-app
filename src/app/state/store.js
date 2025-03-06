/**
 * Redux Store
 * 
 * Configures and exports the Redux store for state management.
 */

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
import appReducer from './appSlice';

// Create root reducer
const rootReducer = combineReducers({
  app: appReducer,
  // Will add more slices in future commits
});

// Create and export store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

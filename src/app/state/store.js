/**
 * Redux Store
 * 
 * Configures and exports the Redux store for state management.
 */

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
// Will add these in future commits

// Create root reducer
const rootReducer = combineReducers({
  // Will add slices in future commits
  app: (state = { initialized: false }, action) => {
    if (action.type === 'APP_INITIALIZED') {
      return { ...state, initialized: true };
    }
    return state;
  }
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

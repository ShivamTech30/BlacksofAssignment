// import { configureStore } from '@reduxjs/toolkit';
// import contactReducer from './contactSlice';

// export const store = configureStore({
//   reducer: {
//     contact: contactReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
// import contactReducer, { ContactState } from './contactSlice';

// Define the root state type by combining all reducers
interface RootState {
  // contact: ContactState;
}

// Define the dispatch type
export type AppDispatch = typeof store.dispatch;

// Configure the store
export const store = configureStore({
  reducer: {
    // contact: contactReducer,
  },
});

// Export the root state type for use in components or hooks
export type { RootState };
export default store;
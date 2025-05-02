import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { Store } from '@reduxjs/toolkit'; // Import Store type from Redux Toolkit
// import { store } from './store/store'; // Assuming store is typed in store.ts
import App from './App'; // Assuming App is a React component
import './index.css';
// import './animated.css';

// Get the root element and assert its type (non-null since it's required)
const rootElement = document.getElementById('root') as HTMLElement;

// Create the root and render the app with TypeScript typing
createRoot(rootElement).render(
  // Use React.StrictMode for additional development checks
  <React.StrictMode>
    {/* Provider connects the Redux store to the React app */}
    {/* <Provider store={store as Store}> */}
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        {/* App is the main application component */}
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
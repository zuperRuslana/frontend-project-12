import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { Provider as ReduxProvider } from 'react-redux';
import store from './slices/index.js'
import App from './App.jsx'
import rollbarConfig from './utils/rollbar.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us



createRoot(document.getElementById('root')).render(
  <RollbarProvider config={rollbarConfig}>
  <ErrorBoundary>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ErrorBoundary>
</RollbarProvider>
)

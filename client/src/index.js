// src/index.js
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');
const app = (
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app); // For react-snap (pre-rendering)
} else {
  createRoot(container).render(app);
}

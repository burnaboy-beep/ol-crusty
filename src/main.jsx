import React from 'react';
import { createRoot } from 'react-dom/client';
import OlCrustyApp from './OlCrustyApp.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OlCrustyApp />
  </React.StrictMode>
);

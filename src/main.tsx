import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { APIProvider } from './contexts/Api';
import { AuthProvider } from './contexts/Auth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </AuthProvider>
  </React.StrictMode>
);

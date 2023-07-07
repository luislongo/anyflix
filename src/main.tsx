import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { APIProvider } from './contexts/Api';
import { AuthProvider } from './contexts/Auth';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
const redirectUri = window.location.origin;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider {...{ domain, clientId, redirectUri }}>
    <AuthProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </AuthProvider>
  </Auth0Provider>
);

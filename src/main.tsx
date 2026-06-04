import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppSettingsProvider } from './providers/AppSettingsProvider';
import { CookieConsentProvider } from './providers/CookieConsentProvider';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppSettingsProvider>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </AppSettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

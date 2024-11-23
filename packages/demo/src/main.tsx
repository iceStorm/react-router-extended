import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import AppRouter from './router';

import './styles.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <Helmet titleTemplate="%s | react-router-extended"></Helmet>

      <AppRouter />
    </HelmetProvider>
  </StrictMode>
);

createRoot(document.getElementById('root') as HTMLElement).render(app);

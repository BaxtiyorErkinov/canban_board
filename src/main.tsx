import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layout/App';
import './index.css';
import { QueryProvider } from './utils';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);

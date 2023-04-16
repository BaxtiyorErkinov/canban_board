import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './layout/App';

import { QueryProvider } from './utils';
import BoardProvider from './utils/BoardContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </QueryProvider>
  </React.StrictMode>,
);

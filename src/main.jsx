import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { TasksProvider } from './state/TasksContext.jsx';

// Global styles
import './index.css';
import './styles/ui.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

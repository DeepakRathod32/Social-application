import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { App } from './components';
import { AuthProvider, PostsProvider } from './providers';
// toast.configure();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);

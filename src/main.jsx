import React from 'react';
import ReactDOM from 'react-dom/client';

const loader = document.getElementById('loader');

function removeLoader() {
  if (!loader) return;
  loader.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
  loader.style.opacity = '0';
  loader.style.visibility = 'hidden';
  setTimeout(() => loader.remove(), 1000);
}

async function startApp() {
  const App = (await import('./App')).default;

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  setTimeout(removeLoader, 1200);
}

startApp();

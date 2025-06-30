import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'

// ✅ Telegram WebApp must be ready!
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

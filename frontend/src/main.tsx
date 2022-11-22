import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TrustContextProvider from "./contexts/TrustContext";
import ProfileContextProvider from "./contexts/ProfileContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TrustContextProvider>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </TrustContextProvider>
  </React.StrictMode>
)

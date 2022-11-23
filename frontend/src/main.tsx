import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TrustContextProvider from "./contexts/TrustContext";
import UserContextProvider from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TrustContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </TrustContextProvider>
  </React.StrictMode>
)

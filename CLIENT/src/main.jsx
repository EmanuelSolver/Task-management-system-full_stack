import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext/context.jsx'
import { NavigatorContextProvider } from './context/navigationContext/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <UserProvider>
      
      <NavigatorContextProvider>
          <App />
      </NavigatorContextProvider>
        
    </UserProvider>
    
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { storage } from './utils/storage.js'
import { setAuthorizationHeader } from './api/client.js'
import { ToastContainer } from 'react-toastify'

const accessToken = storage.get("auth_task_app");

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


        <App />
        <ToastContainer />
      </Router>
    
    </Provider>
    
  </React.StrictMode>,
)

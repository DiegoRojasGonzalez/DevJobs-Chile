import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Menu from './menu.jsx'
import App from './app'
import Footer from './footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Menu/>
    <App/>
    <Footer/>
    
  </React.StrictMode>,
)

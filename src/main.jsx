import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
{/*} import App from './App.jsx' */}
{/*
import Personal from './components/personal.jsx'
import Education from './components/edu.jsx'
 */}

import Display from './components/displayCV.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/*  <App /> */}
  <Display />
   
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Display from './components/displayCards'


createRoot(document.getElementById('root')).render(


  <StrictMode>
    <Display />
  </StrictMode>,

)

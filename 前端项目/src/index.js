import React from 'react'
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux'
import RouterIndex from './router/index'
import './index.scss'

createRoot(document.getElementById('root')).render(<RouterIndex/>)
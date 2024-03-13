import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import './utils/firebase'
import Layer from './layer/Layer'
import { AuthProvider } from './context/Auth/AuthContext'
import { TaskProvider } from './context/task/TaskContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <Layer>
          <App />
        </Layer>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', async (_event, message) => {
  console.log(message)
})



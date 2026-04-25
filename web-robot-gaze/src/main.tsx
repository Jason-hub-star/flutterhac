import { createRoot } from 'react-dom/client'
import App from './App'

// StrictMode removed: MediaPipe + React 18 double-mount causes init race condition
createRoot(document.getElementById('root')!).render(<App />)

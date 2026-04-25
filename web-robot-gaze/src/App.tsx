import { Suspense } from 'react'
import AppErrorBoundary from './components/AppErrorBoundary'
import FallbackUI from './components/FallbackUI'
import GazeTracker from './components/GazeTracker'

export default function App() {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<FallbackUI reason="loading" />}>
        <GazeTracker />
      </Suspense>
    </AppErrorBoundary>
  )
}

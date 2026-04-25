import { Suspense } from 'react'
import GazeTracker from './components/GazeTracker'
import FallbackUI from './components/FallbackUI'

export default function App() {
  return (
    <Suspense fallback={<FallbackUI reason="loading" />}>
      <GazeTracker />
    </Suspense>
  )
}

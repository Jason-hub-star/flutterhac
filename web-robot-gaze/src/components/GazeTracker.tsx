import { useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import CameraPermission from './CameraPermission'
import RobotModel from './RobotModel'
import FallbackUI from './FallbackUI'
import { useMediaPipe } from '../hooks/useMediaPipe'

export default function GazeTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleVideoReady = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      videoRef.current = ref.current
    },
    [],
  )

  const { irisRef, status, error } = useMediaPipe(videoRef)

  if (status === 'loading') return <FallbackUI reason="loading" />
  if (status === 'error')   return <FallbackUI reason="mediapipe-error" message={error} />

  return (
    <>
      <CameraPermission onReady={handleVideoReady} />

      {/* Tracking status indicator — reads irisRef on each React render (not per-frame) */}
      <TrackingBadge irisRef={irisRef} />

      <Canvas
        camera={{ position: [0, 0.3, 3], fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 4, 3]} intensity={1.5} />
        <pointLight position={[-3, 2, -2]} intensity={0.5} color="#4466ff" />
        <Environment preset="night" />
        <RobotModel irisRef={irisRef} />
        <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} />
      </Canvas>
    </>
  )
}

const BADGE_STYLE: React.CSSProperties = {
  position: 'fixed', top: 16, left: 16,
  fontFamily: 'monospace', fontSize: 12,
  background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 6,
  pointerEvents: 'none', zIndex: 10,
}

function TrackingBadge({ irisRef }: { irisRef: React.RefObject<{ leftIris: unknown }> }) {
  const tracking = !!irisRef.current?.leftIris
  return (
    <div style={{ ...BADGE_STYLE, color: tracking ? '#00ffcc' : '#555' }}>
      {tracking ? '● tracking' : '○ no face'}
    </div>
  )
}

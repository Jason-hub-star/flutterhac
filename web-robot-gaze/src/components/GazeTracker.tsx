import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CameraPermission from './CameraPermission'
import RobotModel from './RobotModel'
import DebugOverlay from './DebugOverlay'
import { useMediaPipe } from '../hooks/useMediaPipe'
import type { MPStatus } from '../hooks/useMediaPipe'
import type { IrisData } from '../types/gaze'

export default function GazeTracker() {
  const videoRef              = useRef<HTMLVideoElement | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [debugVisible, setDebugVisible] = useState(false)

  const handleVideoReady = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      videoRef.current = ref.current
      setVideoReady(true)
    },
    [],
  )

  const { irisRef, status, error } = useMediaPipe(videoRef, videoReady)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'd' || e.key === 'D') setDebugVisible(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <CameraPermission onReady={handleVideoReady} />
      <StatusOverlay status={status} error={error} irisRef={irisRef} />
      <DebugOverlay videoRef={videoRef} irisRef={irisRef} visible={debugVisible} />

      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 50 }}
        style={{ width: '100vw', height: '100vh', background: '#0d0d1a' }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0d0d1a']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 3]} intensity={2.5} />
        <directionalLight position={[-3, 3, -2]} intensity={0.8} color="#6688ff" />

        <RobotModel irisRef={irisRef} />
        <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} />
      </Canvas>
    </>
  )
}

const BASE: React.CSSProperties = {
  position: 'fixed', top: 16, left: 16,
  fontFamily: 'monospace', fontSize: 12,
  padding: '4px 10px', borderRadius: 6,
  pointerEvents: 'none', zIndex: 10,
  background: 'rgba(0,0,0,0.6)',
}

function StatusOverlay({
  status, error, irisRef,
}: {
  status: MPStatus
  error: string
  irisRef: React.RefObject<IrisData>
}) {
  if (status === 'loading') return <div style={{ ...BASE, color: '#aaa' }}>⏳ AI 로딩 중…</div>
  if (status === 'error')   return <div style={{ ...BASE, color: '#f66' }}>⚠️ {error.slice(0, 50)}</div>
  const tracking = !!irisRef.current?.facialTransformMatrix
  return (
    <div style={{ ...BASE, color: tracking ? '#00ffcc' : '#555' }}>
      {tracking ? '● tracking' : '○ no face'}
      <span style={{ color: '#333', marginLeft: 8 }}>D=debug</span>
    </div>
  )
}

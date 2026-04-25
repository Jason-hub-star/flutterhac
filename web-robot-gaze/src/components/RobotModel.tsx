import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSmoothGaze } from '../hooks/useSmoothGaze'
import type { IrisData } from '../types/gaze'

const EMPTY_IRIS: IrisData = { leftIris: null, rightIris: null, landmarks: null }

interface Props {
  irisRef: React.RefObject<IrisData>
}

// Eye mesh component — owns its own ref and reads smoothed angles via useFrame
function Eye({ position, smoothRef }: {
  position: [number, number, number]
  smoothRef: React.RefObject<{ pitch: number; yaw: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matRef  = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current || !smoothRef.current) return
    meshRef.current.rotation.order = 'ZYX'
    meshRef.current.rotation.x = smoothRef.current.pitch
    meshRef.current.rotation.y = smoothRef.current.yaw

    // Gentle pulse when tracking
    const pulse = Math.sin(clock.elapsedTime * 2.5) * 0.15 + 0.6
    if (matRef.current) matRef.current.emissiveIntensity = pulse
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.04, 20, 20]} />
      <meshStandardMaterial
        ref={matRef}
        color="#0a0a0f"
        emissive={new THREE.Color(0x00ffcc)}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  )
}

export default function RobotModel({ irisRef }: Props) {
  const tick = useSmoothGaze()

  // Per-eye angle refs — written by tick(), read by each Eye's useFrame
  const leftAngles  = useRef({ pitch: 0, yaw: 0 })
  const rightAngles = useRef({ pitch: 0, yaw: 0 })

  // Run smoothing each frame and push results into angle refs
  useFrame(() => {
    const angles = tick(irisRef.current ?? EMPTY_IRIS)
    leftAngles.current.pitch  = angles.left.pitch
    leftAngles.current.yaw    = angles.left.yaw
    rightAngles.current.pitch = angles.right.pitch
    rightAngles.current.yaw   = angles.right.yaw
  })

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e', metalness: 0.7, roughness: 0.3,
  }), [])

  const headMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#16213e', metalness: 0.6, roughness: 0.4,
  }), [])

  return (
    <group>
      {/* Torso */}
      <mesh position={[0, -0.6, 0]} material={bodyMat}>
        <boxGeometry args={[0.9, 1.2, 0.45]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.1, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.12, 0.15, 0.25, 12]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.55, 0]} material={headMat}>
        <boxGeometry args={[0.65, 0.6, 0.55]} />
      </mesh>

      {/* Eye sockets (slightly inset) */}
      <mesh position={[-0.15, 0.58, 0.27]} material={bodyMat}>
        <cylinderGeometry args={[0.055, 0.055, 0.06, 16]} rotation-x={Math.PI / 2} />
      </mesh>
      <mesh position={[0.15, 0.58, 0.27]} material={bodyMat}>
        <cylinderGeometry args={[0.055, 0.055, 0.06, 16]} rotation-x={Math.PI / 2} />
      </mesh>

      {/* Left Eye */}
      <Eye position={[-0.15, 0.58, 0.29]} smoothRef={leftAngles} />

      {/* Right Eye */}
      <Eye position={[0.15, 0.58, 0.29]} smoothRef={rightAngles} />

      {/* Shoulders */}
      <mesh position={[-0.6, -0.15, 0]} material={bodyMat}>
        <sphereGeometry args={[0.15, 12, 12]} />
      </mesh>
      <mesh position={[0.6, -0.15, 0]} material={bodyMat}>
        <sphereGeometry args={[0.15, 12, 12]} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.62, -0.65, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 10]} />
      </mesh>
      <mesh position={[0.62, -0.65, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 10]} />
      </mesh>
    </group>
  )
}

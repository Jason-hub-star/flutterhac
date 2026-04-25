import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSmoothGaze } from '../hooks/useSmoothGaze'
import type { IrisData } from '../types/gaze'

const EMPTY_IRIS: IrisData = { leftIris: null, rightIris: null, landmarks: null, facialTransformMatrix: null }

interface Props {
  irisRef: React.RefObject<IrisData>
}

/**
 * Eye component: individual sphere mesh that responds to iris tracking.
 * Rotates independently within the eye socket.
 */
function Eye({ position, smoothRef }: {
  position: [number, number, number]
  smoothRef: React.RefObject<{ pitch: number; yaw: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matRef  = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current || !smoothRef.current) return

    // ZYX rotation order: applied as Rz * Ry * Rx
    // This ensures gimbal lock is avoided and rotations feel natural
    meshRef.current.rotation.order = 'ZYX'
    meshRef.current.rotation.x = smoothRef.current.pitch
    meshRef.current.rotation.y = smoothRef.current.yaw

    // Pulse effect on eye emissive intensity
    const pulse = Math.sin(clock.elapsedTime * 2.5) * 0.2 + 0.8
    if (matRef.current) matRef.current.emissiveIntensity = pulse
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.042, 20, 20]} />
      <meshStandardMaterial
        ref={matRef}
        color="#001a10"
        emissive={new THREE.Color(0x00ffcc)}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.0}
      />
    </mesh>
  )
}

/**
 * Head group: contains head mesh, eye sockets, and eyes.
 * Rotates as a unit to follow user's head pose (pitch/yaw/roll).
 * Eyes still rotate within their sockets relative to the head.
 */
function HeadGroup({
  headRef,
  leftAngles,
  rightAngles,
}: {
  headRef: React.RefObject<THREE.Group>
  leftAngles: React.RefObject<{ pitch: number; yaw: number }>
  rightAngles: React.RefObject<{ pitch: number; yaw: number }>
}) {
  const headMat = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#2e3d5c',
    specular: '#7788bb',
    shininess: 80,
  }), [])

  const socketMat = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#1a2535',
    shininess: 20,
  }), [])

  useFrame(() => {
    if (!headRef.current) return

    // ZYX rotation order for consistent gimbal lock avoidance
    headRef.current.rotation.order = 'ZYX'
    // Note: pitch/yaw/roll are stored per-frame but applied here in the group ref
    // The actual rotation values are set by the parent useFrame
  })

  return (
    <group ref={headRef} position={[0, 0.58, 0]}>
      {/* Head cube */}
      <mesh material={headMat}>
        <boxGeometry args={[0.65, 0.62, 0.55]} />
      </mesh>

      {/* Left eye socket */}
      <mesh position={[-0.16, 0.02, 0.27]} rotation={[Math.PI / 2, 0, 0]} material={socketMat}>
        <cylinderGeometry args={[0.058, 0.058, 0.06, 16]} />
      </mesh>

      {/* Right eye socket */}
      <mesh position={[0.16, 0.02, 0.27]} rotation={[Math.PI / 2, 0, 0]} material={socketMat}>
        <cylinderGeometry args={[0.058, 0.058, 0.06, 16]} />
      </mesh>

      {/* Left eye: positioned relative to head group origin */}
      <Eye position={[-0.16, 0.05, 0.30]} smoothRef={leftAngles} />

      {/* Right eye: positioned relative to head group origin */}
      <Eye position={[0.16, 0.05, 0.30]} smoothRef={rightAngles} />
    </group>
  )
}

export default function RobotModel({ irisRef }: Props) {
  const tick = useSmoothGaze()
  const headRef = useRef<THREE.Group>(null!)
  const leftAngles = useRef({ pitch: 0, yaw: 0 })
  const rightAngles = useRef({ pitch: 0, yaw: 0 })

  useFrame(() => {
    const gazeOutput = tick(irisRef.current ?? EMPTY_IRIS)

    // Update head rotation
    if (headRef.current) {
      headRef.current.rotation.order = 'ZYX'
      headRef.current.rotation.x = gazeOutput.head.pitch
      headRef.current.rotation.y = gazeOutput.head.yaw
      headRef.current.rotation.z = gazeOutput.head.roll
    }

    // Update eye positions for iris tracking
    leftAngles.current.pitch = gazeOutput.left.pitch
    leftAngles.current.yaw = gazeOutput.left.yaw
    rightAngles.current.pitch = gazeOutput.right.pitch
    rightAngles.current.yaw = gazeOutput.right.yaw
  })

  // Materials (memoized)
  const bodyMat = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#3a4a6b',
    specular: '#8899cc',
    shininess: 60,
  }), [])

  return (
    <group>
      {/* Torso */}
      <mesh position={[0, -0.55, 0]} material={bodyMat}>
        <boxGeometry args={[0.9, 1.2, 0.45]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.12, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.12, 0.15, 0.26, 12]} />
      </mesh>

      {/* Head group: rotates as a unit to follow user's head pose */}
      <HeadGroup
        headRef={headRef}
        leftAngles={leftAngles}
        rightAngles={rightAngles}
      />

      {/* Left shoulder */}
      <mesh position={[-0.6, -0.1, 0]} material={bodyMat}>
        <sphereGeometry args={[0.16, 14, 14]} />
      </mesh>

      {/* Right shoulder */}
      <mesh position={[0.6, -0.1, 0]} material={bodyMat}>
        <sphereGeometry args={[0.16, 14, 14]} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.63, -0.62, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 10]} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.63, -0.62, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 10]} />
      </mesh>

      {/* Chest accent line */}
      <mesh position={[0, -0.4, 0.228]}>
        <boxGeometry args={[0.5, 0.04, 0.01]} />
        <meshStandardMaterial emissive={new THREE.Color(0x0088ff)} emissiveIntensity={1.2} color="#000" />
      </mesh>
    </group>
  )
}

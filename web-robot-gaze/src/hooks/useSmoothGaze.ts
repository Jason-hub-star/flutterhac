import { useRef } from 'react'
import { lerp } from '../utils/smoothing'
import { matrix4x4ToEuler } from '../utils/gazemath'
import type { IrisData, GazeAngles } from '../types/gaze'

// Eye smoothing: fast, responsive micro-movements
const EYE_TRACK_ALPHA   = 0.15
const EYE_NO_FACE_ALPHA = 0.10
const EYE_SCALE         = 0.6  // head movement → eye movement scale-down

// Head smoothing: slower, more inertia for natural head motion
const HEAD_TRACK_ALPHA   = 0.08  // slower convergence
const HEAD_NO_FACE_ALPHA = 0.06
const HEAD_SCALE         = 0.95  // head gets full rotation, slight dampening
const HEAD_MAX_PITCH     = Math.PI / 3   // ±60° pitch (nod)
const HEAD_MAX_YAW       = Math.PI / 2.5 // ±72° yaw (turn)
const HEAD_MAX_ROLL      = Math.PI / 4   // ±45° roll (tilt)

export interface GazeOutput {
  head: GazeAngles
  left: GazeAngles
  right: GazeAngles
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export function useSmoothGaze() {
  const current = useRef<GazeOutput>({
    head:  { pitch: 0, yaw: 0, roll: 0 },
    left:  { pitch: 0, yaw: 0, roll: 0 },
    right: { pitch: 0, yaw: 0, roll: 0 },
  })

  function tick(irisData: IrisData): GazeOutput {
    const matrix = irisData.facialTransformMatrix

    if (matrix && matrix.length >= 16 && irisData.landmarks) {
      const { pitch, yaw, roll } = matrix4x4ToEuler(matrix)

      // Head rotation: full body movement, clamped
      const headPitch = clamp(pitch * HEAD_SCALE, -HEAD_MAX_PITCH, HEAD_MAX_PITCH)
      const headYaw   = clamp(yaw * HEAD_SCALE, -HEAD_MAX_YAW, HEAD_MAX_YAW)
      const headRoll  = clamp(roll * HEAD_SCALE, -HEAD_MAX_ROLL, HEAD_MAX_ROLL)

      current.current.head.pitch = lerp(current.current.head.pitch, headPitch, HEAD_TRACK_ALPHA)
      current.current.head.yaw   = lerp(current.current.head.yaw,   headYaw,   HEAD_TRACK_ALPHA)
      current.current.head.roll  = lerp(current.current.head.roll,  headRoll,  HEAD_TRACK_ALPHA)

      // Eye movement: scaled-down relative to head
      const eyePitch = pitch * EYE_SCALE
      const eyeYaw   = yaw   * EYE_SCALE

      current.current.left.pitch  = lerp(current.current.left.pitch,  eyePitch, EYE_TRACK_ALPHA)
      current.current.left.yaw    = lerp(current.current.left.yaw,    eyeYaw,   EYE_TRACK_ALPHA)
      current.current.left.roll   = roll
      current.current.right.pitch = lerp(current.current.right.pitch, eyePitch, EYE_TRACK_ALPHA)
      current.current.right.yaw   = lerp(current.current.right.yaw,   eyeYaw,   EYE_TRACK_ALPHA)
      current.current.right.roll  = roll
    } else {
      // No face detected: smoothly return to center
      current.current.head.pitch  = lerp(current.current.head.pitch,  0, HEAD_NO_FACE_ALPHA)
      current.current.head.yaw    = lerp(current.current.head.yaw,    0, HEAD_NO_FACE_ALPHA)
      current.current.head.roll   = lerp(current.current.head.roll,   0, HEAD_NO_FACE_ALPHA)

      current.current.left.pitch  = lerp(current.current.left.pitch,  0, EYE_NO_FACE_ALPHA)
      current.current.left.yaw    = lerp(current.current.left.yaw,    0, EYE_NO_FACE_ALPHA)
      current.current.right.pitch = lerp(current.current.right.pitch, 0, EYE_NO_FACE_ALPHA)
      current.current.right.yaw   = lerp(current.current.right.yaw,   0, EYE_NO_FACE_ALPHA)
    }

    return current.current
  }

  return tick
}

// MediaPipe Face Landmarker — landmark indices
export const LM = {
  LEFT_IRIS:        468,
  RIGHT_IRIS:       473,
  LEFT_EYE_OUTER:   33,
  LEFT_EYE_INNER:   133,
  RIGHT_EYE_OUTER:  362,
  RIGHT_EYE_INNER:  263,
} as const

type Point = { x: number; y: number; z: number }

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

/**
 * Convert iris center position (relative to eye corners) into
 * pitch/yaw Euler angles suitable for Three.js mesh.rotation.
 *
 * All coordinates are in MediaPipe normalized image space (0..1).
 * MAX_ANGLE = 30° — matches typical human eye rotation range.
 */
export function irisToEuler(
  iris: Point,
  cornerOuter: Point,
  cornerInner: Point,
): { pitch: number; yaw: number } {
  const eyeCenterX = (cornerOuter.x + cornerInner.x) / 2
  const eyeCenterY = (cornerOuter.y + cornerInner.y) / 2
  const eyeWidth = Math.abs(cornerOuter.x - cornerInner.x)

  if (eyeWidth < 0.001) return { pitch: 0, yaw: 0 }

  const relX = clamp((iris.x - eyeCenterX) / (eyeWidth / 2), -1, 1)
  const relY = clamp((iris.y - eyeCenterY) / (eyeWidth / 2), -1, 1)

  const MAX_ANGLE = Math.PI / 6 // 30°

  return {
    yaw:   relX * MAX_ANGLE,
    pitch: -relY * MAX_ANGLE, // invert Y: image down → 3D up
  }
}

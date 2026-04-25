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

  const MAX_ANGLE = Math.PI / 6

  return {
    yaw:   relX * MAX_ANGLE,
    pitch: -relY * MAX_ANGLE,
  }
}

/**
 * Extract Euler angles (ZYX convention) from MediaPipe's 4x4 column-major
 * facial transformation matrix.
 *
 * MediaPipe facial transformation matrix structure (column-major):
 * - Column 0 (m[0,1,2,3]): right vector of canonical face
 * - Column 1 (m[4,5,6,7]): up vector of canonical face
 * - Column 2 (m[8,9,10,11]): forward vector of canonical face
 * - Column 3 (m[12,13,14,15]): translation (position)
 *
 * Layout: m[col*4 + row]
 * Rotation part forms the 3×3 transformation from face-canonical to world space.
 *
 * ZYX Euler decomposition (applied as: Rz(roll) * Ry(yaw) * Rx(pitch)):
 * - r20 = -sin(yaw)
 * - r21 = cos(yaw) * sin(pitch)
 * - r22 = cos(yaw) * cos(pitch)
 * - r10 = cos(yaw) * sin(roll)
 * - r00 = cos(yaw) * cos(roll)
 */
export function matrix4x4ToEuler(m: number[]): { pitch: number; yaw: number; roll: number } {
  // r(row,col) = m[col*4 + row]
  const r20 = m[2]   // -sin(yaw)
  const r21 = m[6]   //  cos(yaw)*sin(pitch)
  const r22 = m[10]  //  cos(yaw)*cos(pitch)
  const r10 = m[1]   //  cos(yaw)*sin(roll)
  const r00 = m[0]   //  cos(yaw)*cos(roll)

  const yaw   = Math.asin(clamp(-r20, -1, 1))
  const pitch = Math.atan2(r21, r22)
  const roll  = Math.atan2(r10, r00)

  return { pitch, yaw, roll }
}

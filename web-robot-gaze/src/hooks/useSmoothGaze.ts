import { useRef } from 'react'
import { lerp } from '../utils/smoothing'
import { irisToEuler, LM } from '../utils/gazemath'
import type { IrisData, GazeAngles } from '../types/gaze'

const TRACK_ALPHA   = 0.25  // tracking: responsive enough, smooth enough
const NO_FACE_ALPHA = 0.25  // no face: quick return to center

export function useSmoothGaze() {
  const current = useRef<{ left: GazeAngles; right: GazeAngles }>({
    left:  { pitch: 0, yaw: 0 },
    right: { pitch: 0, yaw: 0 },
  })

  function tick(irisData: IrisData): { left: GazeAngles; right: GazeAngles } {
    const lm = irisData.landmarks

    if (irisData.leftIris && irisData.rightIris && lm && lm.length > 480) {
      const rawL = irisToEuler(
        irisData.leftIris,
        lm[LM.LEFT_EYE_OUTER],
        lm[LM.LEFT_EYE_INNER],
      )
      const rawR = irisToEuler(
        irisData.rightIris,
        lm[LM.RIGHT_EYE_OUTER],
        lm[LM.RIGHT_EYE_INNER],
      )

      current.current.left.pitch  = lerp(current.current.left.pitch,  rawL.pitch, TRACK_ALPHA)
      current.current.left.yaw    = lerp(current.current.left.yaw,    rawL.yaw,   TRACK_ALPHA)
      current.current.right.pitch = lerp(current.current.right.pitch, rawR.pitch, TRACK_ALPHA)
      current.current.right.yaw   = lerp(current.current.right.yaw,   rawR.yaw,   TRACK_ALPHA)
    } else {
      current.current.left.pitch  = lerp(current.current.left.pitch,  0, NO_FACE_ALPHA)
      current.current.left.yaw    = lerp(current.current.left.yaw,    0, NO_FACE_ALPHA)
      current.current.right.pitch = lerp(current.current.right.pitch, 0, NO_FACE_ALPHA)
      current.current.right.yaw   = lerp(current.current.right.yaw,   0, NO_FACE_ALPHA)
    }

    return current.current
  }

  return tick
}

import { useEffect, useRef, useState } from 'react'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import type { IrisData } from '../types/gaze'
import { LM } from '../utils/gazemath'

export type MPStatus = 'loading' | 'ready' | 'error'

const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
const WASM_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm'

async function createLandmarker(delegate: 'GPU' | 'CPU') {
  const fileset = await FilesetResolver.forVisionTasks(WASM_URL)
  return FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL_URL, delegate },
    runningMode: 'VIDEO',
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: true,
    numFaces: 1,
  })
}

export function useMediaPipe(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoReady: boolean,
) {
  const [status, setStatus]     = useState<MPStatus>('loading')
  const [error, setError]       = useState('')
  const irisRef                 = useRef<IrisData>({
    leftIris: null, rightIris: null, landmarks: null, facialTransformMatrix: null,
  })
  const landmarkerRef           = useRef<FaceLandmarker | null>(null)
  const rafRef                  = useRef<number>(0)
  const lastTimeRef             = useRef(-1)

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        let lm: FaceLandmarker
        try {
          lm = await createLandmarker('GPU')
        } catch {
          lm = await createLandmarker('CPU')
        }
        if (cancelled) { lm.close(); return }
        landmarkerRef.current = lm
        setStatus('ready')
      } catch (e) {
        if (!cancelled) {
          setError(String(e))
          setStatus('error')
        }
      }
    }

    init()
    return () => { cancelled = true }
  }, [])

  // videoReady=true is set AFTER videoRef.current is assigned, so this is safe
  useEffect(() => {
    if (status !== 'ready' || !videoReady) return
    const lm    = landmarkerRef.current
    const video = videoRef.current
    if (!lm || !video) return

    function loop() {
      if (!lm || !video) return
      if (video.readyState >= 2 && video.currentTime !== lastTimeRef.current) {
        lastTimeRef.current = video.currentTime
        try {
          const result = lm.detectForVideo(video, performance.now())
          const face   = result.faceLandmarks?.[0]
          const mxData = result.facialTransformationMatrixes?.[0]?.data

          if (face && face.length > 0) {
            irisRef.current = {
              leftIris:  face.length > 480 ? face[LM.LEFT_IRIS]  : null,
              rightIris: face.length > 480 ? face[LM.RIGHT_IRIS] : null,
              landmarks: face,
              facialTransformMatrix: mxData ? Array.from(mxData) : null,
            }
          } else {
            irisRef.current = { leftIris: null, rightIris: null, landmarks: null, facialTransformMatrix: null }
          }
        } catch {
          // detection errors are non-fatal
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [status, videoReady, videoRef])

  useEffect(() => {
    return () => { landmarkerRef.current?.close() }
  }, [])

  return { irisRef, status, error }
}

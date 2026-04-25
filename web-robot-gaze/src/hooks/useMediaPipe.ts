import { useEffect, useRef, useState } from 'react'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import type { IrisData } from '../types/gaze'
import { LM } from '../utils/gazemath'

type Status = 'loading' | 'ready' | 'error'

export function useMediaPipe(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError]   = useState('')
  const irisRef   = useRef<IrisData>({ leftIris: null, rightIris: null, landmarks: null })
  const landmarkerRef = useRef<FaceLandmarker | null>(null)
  const rafRef        = useRef<number>(0)
  const lastTimeRef   = useRef(-1)

  // Init MediaPipe
  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        const fileset = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm',
        )
        const lm = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          numFaces: 1,
        })
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

  // Detection loop — starts once MediaPipe is ready and video is playing
  useEffect(() => {
    if (status !== 'ready') return
    const lm = landmarkerRef.current
    const video = videoRef.current
    if (!lm || !video) return

    function loop() {
      if (!lm || !video) return
      if (video.readyState >= 2 && video.currentTime !== lastTimeRef.current) {
        lastTimeRef.current = video.currentTime
        const result = lm.detectForVideo(video, performance.now())
        const face = result.faceLandmarks?.[0]

        if (face && face.length > 480) {
          irisRef.current = {
            leftIris:  face[LM.LEFT_IRIS],
            rightIris: face[LM.RIGHT_IRIS],
            landmarks: face,
          }
        } else {
          irisRef.current = { leftIris: null, rightIris: null, landmarks: null }
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [status, videoRef])

  // Cleanup landmarker on unmount
  useEffect(() => {
    return () => { landmarkerRef.current?.close() }
  }, [])

  return { irisRef, status, error }
}

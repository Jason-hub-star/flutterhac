import { useEffect, useRef, useState } from 'react'
import FallbackUI from './FallbackUI'

interface Props {
  onReady: (videoRef: React.RefObject<HTMLVideoElement | null>) => void
}

export default function CameraPermission({ onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [denied, setDenied] = useState(false)
  const notified = useRef(false)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 } } })
      .then(stream => {
        const el = videoRef.current
        if (!el) return
        el.srcObject = stream
        el.onloadedmetadata = () => {
          el.play()
          if (!notified.current) {
            notified.current = true
            onReady(videoRef)
          }
        }
      })
      .catch(() => setDenied(true))

    return () => {
      const el = videoRef.current
      if (el?.srcObject) {
        ;(el.srcObject as MediaStream).getTracks().forEach(t => t.stop())
        el.srcObject = null
      }
    }
  }, [onReady])

  if (denied) return <FallbackUI reason="no-camera" />

  return (
    <video
      ref={videoRef}
      playsInline
      muted
      style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
    />
  )
}

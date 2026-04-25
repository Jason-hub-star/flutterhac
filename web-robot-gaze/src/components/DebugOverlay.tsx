import { useEffect, useRef } from 'react'
import type { IrisData } from '../types/gaze'

interface Props {
  videoRef: React.RefObject<HTMLVideoElement | null>
  irisRef:  React.RefObject<IrisData>
  visible:  boolean
}

export default function DebugOverlay({ videoRef, irisRef, visible }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!visible) return
    let raf: number

    function draw() {
      const canvas = canvasRef.current
      const video  = videoRef.current
      if (!canvas || !video || video.readyState < 2) {
        raf = requestAnimationFrame(draw)
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const W = canvas.width
      const H = canvas.height

      ctx.save()
      ctx.translate(W, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0, W, H)
      ctx.restore()

      const data = irisRef.current
      const lm   = data?.landmarks

      if (lm) {
        ctx.fillStyle = 'rgba(0,255,204,0.7)'
        for (let i = 0; i < lm.length; i++) {
          const x = (1 - lm[i].x) * W
          const y = lm[i].y * H
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = '#ff4400'
        if (data?.leftIris) {
          ctx.beginPath()
          ctx.arc((1 - data.leftIris.x) * W, data.leftIris.y * H, 4, 0, Math.PI * 2)
          ctx.fill()
        }
        if (data?.rightIris) {
          ctx.beginPath()
          ctx.arc((1 - data.rightIris.x) * W, data.rightIris.y * H, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const tracking = !!data?.facialTransformMatrix
      ctx.fillStyle = tracking ? '#00ffcc' : '#ff4444'
      ctx.font = '11px monospace'
      ctx.fillText(tracking ? '● tracking' : '○ no face', 6, 14)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [visible, videoRef, irisRef])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16,
      zIndex: 20,
      border: '1px solid #00ffcc44',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: 'block', width: 240, height: 180, background: '#111' }}
      />
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        color: '#555',
        fontSize: 10,
        fontFamily: 'monospace',
        padding: '2px 6px',
        textAlign: 'center',
      }}>
        D — debug 닫기
      </div>
    </div>
  )
}

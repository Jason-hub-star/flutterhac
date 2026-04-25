interface Props {
  reason: 'no-camera' | 'mediapipe-error' | 'loading' | 'render-error'
  message?: string
}

const MESSAGES = {
  'loading':         '🤖 MediaPipe 로딩 중...',
  'no-camera':       '카메라 권한이 거부됐어요. 브라우저 주소창 자물쇠 → 카메라 허용 후 새로고침.',
  'mediapipe-error': 'MediaPipe 초기화 실패. 인터넷 연결 확인 후 새로고침.',
  'render-error':    '렌더링 중 오류가 발생했어요. 새로고침 후 다시 시도해 주세요.',
}

export default function FallbackUI({ reason, message }: Props) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0a0f',
      color: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1.5rem', fontFamily: 'monospace',
    }}>
      <div style={{ fontSize: '3rem' }}>👁️</div>
      <p style={{ maxWidth: 380, textAlign: 'center', lineHeight: 1.6, color: '#aaa' }}>
        {MESSAGES[reason]}{message ? ` (${message})` : ''}
      </p>
      {reason !== 'loading' && (
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.6rem 1.6rem', borderRadius: 8,
            border: '1px solid #444', background: 'transparent',
            color: '#fff', cursor: 'pointer', fontFamily: 'monospace',
          }}
        >
          새로고침
        </button>
      )}
    </div>
  )
}

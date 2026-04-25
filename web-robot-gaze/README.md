# web-robot-gaze

실시간 홍채 추적 → 3D 로봇 눈 동기화 데모. 해커톤 Wild Card 트랙.

**스택:** React 18 + TypeScript + Vite + Three.js + MediaPipe  
**Flutter 없음** — 순수 웹 앱.

---

## 빠른 시작 (다른 컴퓨터에서 바로 실행)

```bash
# 1. 레포 최신 상태로
git pull origin main

# 2. 이 폴더로 이동
cd web-robot-gaze

# 3. 의존성 설치 (처음 한 번만)
npm install

# 4. 개발 서버 실행
npm run dev
```

→ 브라우저에서 `http://localhost:5173` 열기  
→ 카메라 권한 허용  
→ 로봇 눈이 내 눈을 따라 움직이면 성공

---

## 전제 조건

- Node.js 18 이상 (`node --version` 확인)
- npm 9 이상 (`npm --version` 확인)
- 크롬 또는 엣지 최신 버전 (MediaPipe WASM 최적)
- 웹캠 (내장 카메라 OK)

---

## 의존성

```json
{
  "three": "^0.165",
  "@react-three/fiber": "^8",
  "@react-three/drei": "^9",
  "@mediapipe/tasks-vision": "^0.10.9",
  "react": "^18",
  "react-dom": "^18"
}
```

---

## 프로젝트 구조

```
src/
├── components/
│   ├── GazeTracker.tsx      # 메인 오케스트레이터
│   ├── RobotModel.tsx       # 로봇 3D + 눈 회전
│   ├── CameraPermission.tsx # 웹캠 접근
│   └── FallbackUI.tsx       # 에러 처리
├── hooks/
│   ├── useMediaPipe.ts      # 홍채 감지 루프
│   └── useSmoothGaze.ts     # 스무딩
├── utils/
│   ├── gazemath.ts          # 홍채→Euler 수식
│   └── smoothing.ts         # lerp, MovingAverage
├── App.tsx
└── main.tsx
```

---

## 동작 원리

1. 웹캠 → `getUserMedia` → hidden `<video>`
2. MediaPipe `FaceLandmarker` → 홍채 중심 좌표(#468, #473) 추출
3. 눈 코너 대비 상대 오프셋 → Euler 각도(pitch/yaw) 변환
4. `lerp + MovingAverage` 스무딩
5. `useFrame()` 매 프레임 → 로봇 눈 `mesh.rotation` 업데이트

---

## 트러블슈팅

| 증상 | 해결 |
|------|------|
| 카메라 권한 거부 | 브라우저 주소창 자물쇠 → 카메라 허용 후 새로고침 |
| 로봇 눈이 안 움직임 | 콘솔에서 MediaPipe 로드 에러 확인, 인터넷 연결 필요 (WASM CDN) |
| FPS 낮음 | `useMediaPipe.ts`에서 `delegate: 'GPU'` → `'CPU'` 변경 |
| 화면이 검은색 | Three.js Canvas 초기화 실패 — 브라우저 WebGL 지원 확인 |

---

## 전체 스펙

→ [`docs/specs/ROBOT-GAZE-SPEC.md`](../docs/specs/ROBOT-GAZE-SPEC.md)

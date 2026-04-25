# 기술 설계 명세서: 실시간 시선 동기화 3D 로봇 시스템

**작성일:** 2026-04-25  
**프로젝트:** `web-robot-gaze/` (해커톤 Wild Card 트랙 데모)  
**스택:** React 18 + TypeScript + Vite + Three.js + MediaPipe (Flutter 미사용)

---

## 1. 개요

내장 웹캠으로 사용자의 홍채 위치를 실시간 감지하여, Three.js 3D 로봇 모델의 눈동자 회전과 동기화하는 독립형 웹 애플리케이션. 해커톤 Wild Card 트랙의 30초 "wow moment" 데모용.

| 항목 | 내용 |
|------|------|
| 입력 | 내장 웹캠 (Standard RGB, 720p+) |
| 추적 대상 | 사용자 홍채 중심 좌표 |
| 출력 | Three.js 로봇 눈 메시 실시간 회전 |
| 목표 FPS | 맥북 ≥ 30, 윈도우 ≥ 20 |
| 데모 시간 | 30초 무중단 안정 실행 |

---

## 2. 기술 스택 결정

Flutter 미사용 이유:
- MediaPipe JS SDK는 브라우저 WASM 네이티브로 동작 → Flutter WebView 우회 불필요
- Three.js/React Three Fiber 생태계가 이 용도에 최적
- Flutter Web 레이어 오버헤드 없이 해커톤 속도 최적

| 레이어 | 기술 | 버전 |
|--------|------|------|
| 빌드 | Vite + @vitejs/plugin-react | ^5 |
| UI | React + TypeScript | ^18 / ^5 |
| 3D 렌더링 | Three.js + React Three Fiber | ^0.165 / ^8 |
| 3D 헬퍼 | @react-three/drei | ^9 |
| AI 감지 | @mediapipe/tasks-vision | ^0.10.9 |
| 배포 | 정적 빌드 → Vercel / GitHub Pages | - |

---

## 3. 3D 모델 전략

GLB 변환 없이 **Three.js Primitive**로 즉시 구성:

```
로봇 바디 구성:
  몸통 — BoxGeometry(1.0, 1.5, 0.5)
  머리 — BoxGeometry(0.6, 0.6, 0.6)
  눈   — SphereGeometry(r=0.025) × 2  [이미시브 발광, 좌/우 독립 회전]
  팔   — CylinderGeometry (시간 여유 시)
```

향후 SpaceRobotKyle FBX(`/Users/family/jason/11/Assets/UnityTechnologies/SpaceRobotKyle/Models/KyleRobot.fbx`) → Blender → GLB 변환 후 drop-in 교체 가능.

---

## 4. 프로젝트 구조

```
web-robot-gaze/
├── public/
├── src/
│   ├── components/
│   │   ├── GazeTracker.tsx      # 메인 오케스트레이터 (MediaPipe + 3D 통합)
│   │   ├── RobotModel.tsx       # 로봇 primitive + 눈 메시 회전
│   │   ├── CameraPermission.tsx # 웹캠 getUserMedia + hidden <video>
│   │   └── FallbackUI.tsx       # 에러/권한거부 상태 UI
│   ├── hooks/
│   │   ├── useMediaPipe.ts      # FaceLandmarker 초기화 + detectForVideo 루프
│   │   └── useSmoothGaze.ts     # Lerp(α=0.15) + MovingAverage(window=5)
│   ├── utils/
│   │   ├── gazemath.ts          # 홍채 → Euler 각도 변환 수식
│   │   └── smoothing.ts         # lerp(), MovingAverageFilter
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 5. 핵심 수식: 홍채 → Euler 각도 변환

### MediaPipe 랜드마크 인덱스
| 포인트 | 인덱스 |
|--------|--------|
| 좌 홍채 중심 | 468 |
| 우 홍채 중심 | 473 |
| 좌 눈 외안각 | 33 |
| 좌 눈 내안각 | 133 |
| 우 눈 외안각 | 362 |
| 우 눈 내안각 | 263 |

### 변환 공식

```typescript
function irisToEuler(iris, cornerOuter, cornerInner): { pitch, yaw } {
  const eyeCenterX = (cornerOuter.x + cornerInner.x) / 2;
  const eyeCenterY = (cornerOuter.y + cornerInner.y) / 2;
  const eyeWidth   = Math.abs(cornerOuter.x - cornerInner.x);

  // 정규화: 눈 너비 기준 상대 오프셋 [-1, 1]
  const relX = clamp((iris.x - eyeCenterX) / (eyeWidth / 2), -1, 1);
  const relY = clamp((iris.y - eyeCenterY) / (eyeWidth / 2), -1, 1);

  const MAX_ANGLE = Math.PI / 6; // 30도

  return {
    yaw:   relX * MAX_ANGLE,   // Y축 회전 (좌우)
    pitch: -relY * MAX_ANGLE,  // X축 회전 (상하, 좌표계 반전)
  };
}
```

Three.js 적용 시 `mesh.rotation.order = 'ZYX'` 필수.

### 스무딩 파이프라인

```
raw iris coords
  → irisToEuler() → [pitch_raw, yaw_raw]
  → MovingAverageFilter(window=5)
  → lerp(current, filtered, α=0.15)  ← useFrame() 매 프레임
  → mesh.rotation.x / .y
```

---

## 6. 시스템 아키텍처

```
웹캠 스트림 (getUserMedia)
  └─ hidden <video> element
      └─ useMediaPipe.ts
          └─ FaceLandmarker.detectForVideo(video, timestamp)
              └─ faceLandmarks[0][468], [473]  ← 홍채 중심
                  └─ gazemath.ts: irisToEuler()
                      └─ useSmoothGaze.ts: lerp + MovingAvg
                          └─ RobotModel.tsx: useFrame() → mesh.rotation 업데이트
                              └─ Three.js Canvas → 브라우저 렌더링
```

---

## 7. MediaPipe 설정

```typescript
FaceLandmarker.createFromOptions(filesetResolver, {
  baseOptions: {
    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
    delegate: 'GPU',  // 성능 미달 시 'CPU'로 변경
  },
  runningMode: 'VIDEO',
  outputFaceBlendshapes: false,
  outputFacialTransformationMatrixes: false,
  numFaces: 1,
})
```

WASM CDN: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm`

---

## 8. 폴백 전략

| 시나리오 | 처리 |
|---------|------|
| 카메라 권한 거부 | `FallbackUI` + 새로고침 안내 |
| 얼굴 3초 미감지 | 눈동자 중앙(0, 0) 고정 |
| MediaPipe 로드 실패 | 에러 메시지 + reload 버튼 |
| 메모리 누수 방지 | 컴포넌트 언마운트 시 `faceLandmarker.close()` 호출 |

---

## 9. 성능 기준 및 Worker Thread 판단

| FPS | 조치 |
|-----|------|
| ≥ 30 (맥북) | Worker Thread 불필요 |
| 20-29 (맥북) | delegate: 'CPU' 로 변경 후 재측정 |
| < 20 (윈도우) | OffscreenCanvas Worker 도입 고려 (WebGL context 이슈 주의) |

---

## 10. 이미시브 눈 효과

```typescript
new THREE.MeshStandardMaterial({
  color: 0x111111,
  emissive: new THREE.Color(0x00ffcc),
  emissiveIntensity: 0.7,
})
```

감지 신뢰도 기반 intensity 변화 (선택 사항):
- 감지 중: `emissiveIntensity = 0.7`
- 미감지: `emissiveIntensity = 0.2` (서서히 lerp)

---

## 11. 구현 페이즈 요약

| 페이즈 | 내용 | 예상 시간 | 자기리뷰 |
|--------|------|----------|---------|
| 0 | 문서화 + 커밋/푸시 | 1h | Opus |
| 1 | Vite 스캐폴드 + 3D primitive 렌더링 | 2-3h | Opus |
| 2 | MediaPipe 연동 + 홍채 감지 확인 | 2-3h | Opus |
| 3 | 시선 동기화 (gazemath + useFrame) | 2-3h | Opus |
| 4 | 스무딩 + 폴백 UI | 1-2h | Opus |
| 5 | 이미시브 효과 + 최종 마무리 | 1h | Opus |
| 6 | 성능 검증 (DevTools FPS 측정) | 1h | - |

**총 예상 시간:** 10-15h (1인 개발)

---

## 12. 데모 스크립트 (30초)

```
"한 가지 더 보여드릴게요."
→ 브라우저 탭 전환 → 카메라 허용
→ 로봇 눈이 내 눈을 따라 움직이기 시작

"MediaPipe 홍채 감지 + Three.js 실시간 동기화.
 클라이언트 사이드 전용, API 호출 없음, 30FPS."
[15초 직접 체험]
"이게 'AI harness가 UI를 직접 움직인다'는 의미예요."
```

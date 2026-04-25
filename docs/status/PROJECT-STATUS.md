# Project Status

## Current Stage

- 상태: **web-robot-gaze 구현 완료 / 얼굴+고개 싱크 동작 중**
- 날짜: 2026-04-25
- 목적: Wild Card 트랙 — 실시간 얼굴 포즈 기반 3D 로봇 고개+눈 동기화 데모

---

## 프로젝트 방향 결정 (2026-04-25)

| 항목 | 결정 |
|------|------|
| Wild Card 기능 | 실시간 얼굴 포즈 동기화 3D 로봇 (`web-robot-gaze/`) |
| 스택 | React 18 + TypeScript + Vite + Three.js + MediaPipe |
| Flutter 사용 여부 | **이 기능에 미사용** — 순수 웹 앱으로 구현 |
| 3D 모델 | Three.js primitive (BoxGeometry 몸통/머리, SphereGeometry 눈) |
| 트래킹 방식 | ~~홍채 기반~~ → **얼굴 변환 행렬 (facialTransformationMatrix)** |

---

## 구현 완료 항목

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 0 | 문서화 + Git 커밋/푸시 | ✅ |
| Phase 1 | Vite 스캐폴딩 + Three.js 3D 로봇 렌더링 | ✅ |
| Phase 2 | MediaPipe FaceLandmarker 연동 + 카메라 권한 | ✅ |
| Phase 3 | 시선 동기화 (얼굴 포즈 → 로봇 고개/눈) | ✅ |
| Phase 4 | Lerp 스무딩 + 폴백 UI | ✅ |
| Phase 5 | 이미시브 발광 눈 + 펄스 효과 | ✅ |
| Phase 6 | 디버그 오버레이 (D키 토글) | ✅ |

---

## 현재 아키텍처

```
useMediaPipe (videoReady 게이트)
  └─ FaceLandmarker.detectForVideo()
       └─ facialTransformationMatrixes[0].data (4×4 col-major)
            └─ matrix4x4ToEuler() → pitch / yaw / roll
                 └─ useSmoothGaze() → GazeOutput
                      ├─ head: alpha=0.08 (느린 관성)
                      └─ eye:  alpha=0.15 (빠른 미세움직임)
                           └─ RobotModel
                                ├─ HeadGroup <group ref> → rotation.x/y/z
                                └─ Eye × 2 → rotation.x/y
```

### 핵심 설계 결정

| 항목 | 값 | 이유 |
|------|-----|------|
| HEAD_SCALE | 0.95 | 거의 1:1 미러링 |
| EYE_SCALE | 0.6 | 눈은 고개보다 작게 움직임 |
| HEAD_TRACK_ALPHA | 0.08 | 자연스러운 관성감 |
| EYE_TRACK_ALPHA | 0.15 | 빠른 반응 |
| HEAD_MAX_YAW | ±72° | 극단적 회전 방지 |
| rotation.order | ZYX | 짐벌락 회피 |
| yaw 부호 | `-yaw` | 미러 모드 — 사용자와 같은 방향으로 고개 회전 |

---

## 실행 방법

```bash
git pull origin main
cd web-robot-gaze
npm install        # 처음 한 번
npm run dev        # http://localhost:5173
```

- 카메라 허용 → 좌상단 `● tracking` 확인
- 고개를 좌우/위아래로 움직이면 로봇 고개가 실시간 동기화
- `D` 키: 웹캠 디버그 오버레이 토글 (랜드마크 점 + 트래킹 상태)

---

## 테스트 체크리스트

- [x] `● tracking` 표시 확인
- [x] 고개 왼쪽 → 로봇 고개 왼쪽 (미러 모드 적용 완료)
- [x] 고개 끄덕임 → 로봇 pitch 반응
- [x] 고개 기울임 → 로봇 roll 반응
- [x] 얼굴 가리면 → 로봇이 중앙으로 서서히 복원
- [x] D키 → 웹캠 오버레이 표시/숨김 (기본값: 표시)

---

## Blockers

없음. 데모 준비 완료.

---

## Next Move (데모 준비)

```
"이 로봇이 지금 제 얼굴을 보고 있어요.
 MediaPipe 얼굴 포즈 추적 + Three.js 실시간 렌더링.
 클라이언트 사이드 전용, API 호출 없음, 30FPS 이상."
```

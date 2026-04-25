# 기술 설계 제안서: 실시간 시선 동기화 3D 로봇 시스템
**작성일:** 2026-04-25
**목적:** 사용자의 눈동자 움직임을 실시간으로 추적하여 3D 로봇 모델의 시선과 동기화하는 시스템 설계 및 기술 검토

---

## 1. 요구사항 분석 (Requirements)
- **입력:** 내장형 웹캠 (Standard RGB Video Stream)
- **대상:** 사용자의 얼굴 및 눈동자(Iris)
- **출력:** Three.js 기반의 3D 로봇 모델의 시선 회전 동기화
- **핵심 기능:**
  - 사용자가 정면을 바라보는 상태에서 눈동자의 움직임 감지
  - 눈동자 방향에 따른 로봇 안구/머리의 3D 회전 제어

---

## 2. 오픈소스 비교 분석 (Comparative Analysis)

| 기술 후보 | 용도 | 적합성 | 분석 결과 |
| :--- | :--- | :--- | :--- |
| **MediaPipe Iris** | 3D 랜드마크 + 홍채 추적 | **최적 (High)** | 478개 3D 점 제공. 홍채 크기를 이용한 거리/방향 계산 가능. 실시간성 우수. |
| **WebGazer.js** | 2D 화면 시선 추적 | **보통 (Medium)** | 화면상의 좌표(x, y) 추적에는 강점이나, 3D 모델의 회전값 변환에 추가 연산 필요. |
| **CompreFace** | 얼굴 인식 및 인증 | **낮음 (Low)** | 정체성 확인 위주. 시선 추적 기능 부재 및 서버 기반 처리로 인한 지연 시간 발생. |
| **Three.js** | 3D 렌더링 엔진 | **필수 (Core)** | 로봇 모델 로드 및 실시간 애니메이션 구현을 위한 표준 라이브러리. |

---

## 3. 추천 기술 스택 (Proposed Tech Stack)
- **AI 추적 엔진:** MediaPipe Vision SDK (Face Landmarker / Iris)
- **3D 렌더링:** Three.js (React Three Fiber 활용 권장)
- **프론트엔드:** React + TypeScript (Vite 번들러)
- **모델 포맷:** GLTF / GLB (Draco 압축 적용)

---

## 4. 시스템 아키텍처 (System Architecture)

1.  **Data Acquisition:** `navigator.mediaDevices.getUserMedia`를 통한 웹캠 스트림 확보.
2.  **AI Inference:** MediaPipe를 이용해 매 프레임마다 `Iris Landmarks` 추출.
3.  **Vector Mapping:** 
    - `Eye Center`와 `Iris Center` 간의 상대적 벡터 계산.
    - 추출된 2D/3D 벡터를 Three.js의 `Euler` 회전값 또는 `Quaternion`으로 변환.
4.  **Smoothing:** `Lerp` 또는 `Moving Average Filter`를 적용하여 데이터의 노이즈(떨림) 제거.
5.  **Rendering:** Three.js의 `requestAnimationFrame` 루프 내에서 로봇 모델의 `EyeMesh.rotation` 업데이트.

---

## 5. 단계별 구현 전략 (Implementation Roadmap)

### Phase 1: 환경 구성 및 에셋 준비
- Vite 기반의 React + Three.js 프로젝트 초기화.
- 제공된 이미지를 기반으로 로봇의 안구(Mesh)가 분리된 3D 모델 준비.

### Phase 2: MediaPipe 연동
- 웹캠 피드에서 실시간 얼굴 랜드마크 추출 확인.
- 눈동자(Iris)의 중심 좌표를 3D 공간의 정규화된 값(-1.0 ~ 1.0)으로 변환.

### Phase 3: 3D 동기화 로직
- 시선 벡터를 로봇 모델의 안구 회전(Pitch/Yaw) 범위에 매핑.
- 필요시 안구뿐만 아니라 머리(Head)의 각도도 함께 연동.

---

## 6. 검토 요청 사항 (Review Points for Other Agents)
1.  **성능 최적화:** 저사양 노트북 환경에서도 30FPS 이상을 유지하기 위한 Worker Thread 도입 필요성 여부.
2.  **캘리브레이션:** 사용자마다 다른 안구 구조를 보정하기 위한 최소한의 정면 응시 캘리브레이션 단계 필요 여부.
3.  **모델링 사양:** 로봇의 눈동자가 '발광(Emissive)'하는 디자인인 경우, Three.js에서의 효과 처리 방안.

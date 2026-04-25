# Project Status

## Current Stage

- 상태: wild-card-spec-complete / web-robot-gaze-ready-to-implement
- 날짜: 2026-04-25
- 목적: Wild Card 트랙 — 실시간 홍채 추적 3D 로봇 눈 동기화 데모 구현 준비 완료

---

## 프로젝트 방향 결정 (2026-04-25)

| 항목 | 결정 |
|------|------|
| Wild Card 기능 | 실시간 시선 동기화 3D 로봇 (`web-robot-gaze/`) |
| 스택 | React 18 + TypeScript + Vite + Three.js + MediaPipe |
| Flutter 사용 여부 | **이 기능에 미사용** — 순수 웹 앱으로 구현 |
| 3D 모델 | Three.js SphereGeometry primitive (GLB 변환 없이 즉시 사용) |
| 문서 | `docs/specs/ROBOT-GAZE-SPEC.md` 완성 |

---

## What Is Ready

**환경:**
- GitHub 원격 저장소 연결
- VS Code + Flutter/Dart CLI (Flutter 메인 앱용)
- Android cmdline-tools + licenses 승인
- flutter create / flutter test 스모크 검증 완료

**Wild Card 트랙 (신규):**
- 기술 설계 명세서 완성 (`docs/specs/ROBOT-GAZE-SPEC.md`)
- `web-robot-gaze/` 디렉토리 생성 + README 작성
- 시선 벡터 수식 설계 완료
- 구현 페이즈 (0-6) + 각 페이즈 Opus 자기리뷰 계획 수립

---

## What Is Not Ready Yet

- `web-robot-gaze/` 앱 코드 스캐폴드 (Phase 1)
- MediaPipe 연동 구현 (Phase 2)
- 시선 동기화 로직 (Phase 3)
- 스무딩 + 폴백 (Phase 4)
- 이미시브 눈 효과 (Phase 5)
- 성능 검증 (Phase 6)
- 메인 Flutter 앱 코드 (별도 진행)

---

## Blockers

- `web-robot-gaze/` Phase 1 미시작 (다음 단계)
- 다른 컴퓨터에서 진행 예정 → `git pull origin main` 후 README 따라 실행

---

## Next Move

```bash
git pull origin main
cd web-robot-gaze
npm install          # 처음 한 번
npm run dev          # 개발 서버
```

전체 구현 순서: → `docs/specs/ROBOT-GAZE-SPEC.md` 참고

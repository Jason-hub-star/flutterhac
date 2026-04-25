# Project Completion Spec Template

아래 템플릿은 Flutter 해커톤 현장에서 빠르게 채워 넣기 위한 완성 명세서 골격이다.

---

## 1. Project Snapshot

- 프로젝트명:
- 한 줄 피치:
- 팀 구성:
- 오늘 날짜:
- 제출 마감:
- 주력 트랙:
- 보조 트랙:

## 2. Track Intent

### AI Harness

- 어떤 에이전트/자동화를 실제로 보여줄 것인가:
- 사용자가 직접 느끼는 자동화 가치:
- 데모 중 눈에 띄는 30초:
- 실패 시 수동 fallback:

### Widget Craft

- 가장 완성도를 보여줄 핵심 화면:
- 디자인 원칙 3개:
- 인터랙션 포인트:
- 반응형/접근성 고려:

### Wild Card

- 심사위원이 "이건 예상 못 했다"라고 느낄 요소:
- 왜 단순 gimmick이 아닌가:
- 기술적 난이도와 구현 범위:

## 3. Problem And User

- 해결하려는 문제:
- 핵심 사용자:
- 기존 대안의 한계:
- 이번 해커톤 버전에서 검증할 가설:

## 4. Demo Story

- 오프닝 문장:
- 사용자가 처음 들어왔을 때 보는 화면:
- 첫 번째 핵심 행동:
- AI/자동화가 등장하는 지점:
- 와우 포인트:
- 종료 장면:

## 5. Scope

### Must Have

- [ ] 핵심 유저 플로우 1
- [ ] 핵심 유저 플로우 2
- [ ] 핵심 유저 플로우 3

### Nice To Have

- [ ] 보너스 기능 1
- [ ] 보너스 기능 2

### Explicitly Out

- 이번 빌드에서 제외할 것 1
- 이번 빌드에서 제외할 것 2

## 6. Product Surface

- 타깃 플랫폼: `iOS / Android / Web / macOS / Windows` 중 선택
- 데모 기본 플랫폼:
- 보조 데모 플랫폼:
- 오프라인 대응 필요 여부:

### Primary Screens

1. 화면 이름:
   - 목적:
   - 입력:
   - 출력:
2. 화면 이름:
   - 목적:
   - 입력:
   - 출력:
3. 화면 이름:
   - 목적:
   - 입력:
   - 출력:

## 7. Technical Plan

### Suggested Default Stack

- Flutter stable
- 상태관리:
- 라우팅:
- 모델/직렬화:
- 백엔드 또는 BaaS:
- AI 연결 방식:
- 로컬 저장소:

### Proposed Structure

```text
lib/
  app/
  features/
  shared/
  services/
test/
integration_test/
assets/
```

### Architecture Notes

- UI 레이어:
- 상태 흐름:
- API/데이터 레이어:
- 에러 처리:
- 로깅/분석:

## 8. AI Harness Plan

- 사용자 입력:
- 에이전트가 결정하는 일:
- 툴 호출 또는 외부 API:
- 구조화된 출력 형식:
- 안전장치:
- 실패 복구 방식:

### Harness Proof Checklist

- [ ] 프롬프트 입력 → 구조화된 결과
- [ ] 구조화된 결과 → 실제 UI 반영
- [ ] 재시도 또는 fallback 동작
- [ ] 데모용 샘플 데이터 준비

## 9. Widget Craft Plan

- 디자인 키워드 3개:
- 핵심 컬러:
- 타이포 방향:
- 카드/리스트/폼 패턴:
- 애니메이션 사용 원칙:
- 빈 상태/에러 상태 처리:

### Visual Quality Checklist

- [ ] 첫 화면이 3초 안에 설득력 있다
- [ ] 핵심 컴포넌트 위계가 명확하다
- [ ] 모바일 폭에서도 정보가 무너지지 않는다
- [ ] 최소 1개 화면은 심사위원이 캡처하고 싶을 정도로 인상적이다

## 10. Wild Card Plan

- 창의적 시도 설명:
- 구현 핵심:
- 심사 포인트:
- 실패해도 본체가 망가지지 않는 분리 방식:

## 11. Repo And Workflow

- GitHub 저장소:
- 브랜치 전략:
- 이슈/체크리스트 운영:
- 데모 데이터 위치:
- 비밀값 관리 방식:

### Machine Split

- MacBook 담당:
- Windows 담당:
- 공용 동기화 방식:
- Windows 사용자를 위한 별도 설치/실행 배려:

## 12. Time Plan

### T-0 ~ T+2h

- 가장 먼저 끝내야 하는 일:

### T+2h ~ T+6h

- 핵심 플로우 연결:

### T+6h ~ T+10h

- AI/자동화 고도화:

### Final Polish

- UI 다듬기:
- 버그 컷:
- 발표 리허설:

## 13. Validation

### Minimum Quality Gate

- [ ] `flutter doctor`
- [ ] `flutter analyze`
- [ ] `flutter test`
- [ ] 핵심 데모 흐름 수동 점검
- [ ] 실제 발표 기기에서 1회 리허설

### Demo Readiness

- [ ] 네트워크 실패 대응 문구
- [ ] 샘플 입력 세트
- [ ] 발표 순서 스크립트
- [ ] 스크린샷/영상 백업

## 14. Submission Package

- 앱 설명 1문단:
- 트랙별 강조 문장:
- 스크린샷 3장:
- 데모 영상 필요 여부:
- 심사위원 안내 메모:

## 15. Risks And Fallbacks

- 리스크:
  - fallback:
- 리스크:
  - fallback:
- 리스크:
  - fallback:

## 16. Next 5 Actions

1. 
2. 
3. 
4. 
5. 

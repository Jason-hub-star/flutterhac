# Stack Recipes

## Recipe A — Safest Default

- Flutter stable
- `flutter_riverpod`
- `go_router`
- `freezed`
- `build_runner`
- Firebase optional

추천 상황:

- 화면 3개 이상
- API 또는 AI 응답 모델이 여러 개
- 발표까지 최소 반나절 이상 남음

## Recipe B — Fastest Demo

- Flutter stable
- 기본 상태관리 또는 최소 provider
- 라우팅 최소화
- AI는 단일 API 호출 + 구조화 응답

추천 상황:

- 오늘 안에 발표
- 가장 중요한 것은 데모 완주

## Recipe C — AI Showpiece

- Flutter stable
- `flutter_riverpod`
- `go_router`
- `genui` 또는 구조화된 UI 생성 계층
- 확실한 fallback 화면

추천 상황:

- `AI Harness`와 `Wild Card`를 동시에 노릴 때
- 안정적인 백업 시나리오가 있을 때

## Rule Of Thumb

- 모르면 Recipe A
- 시간이 너무 없으면 Recipe B
- 창의적 데모가 핵심이면 Recipe C

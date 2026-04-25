# Execution Checklist

## P0 — Immediate

- [ ] 주력 트랙 1개와 보조 트랙 1개를 확정한다
- [ ] `PROJECT-COMPLETION-SPEC-TEMPLATE.md`를 실제 프로젝트용으로 채운다
- [x] MacBook에 Flutter SDK를 설치한다
- [x] `flutter doctor`를 통과시킨다
- [ ] Windows 팀원 노트북에서 Android 또는 Windows 타깃 1개를 연다
- [ ] Windows 데스크톱이 필요하면 Visual Studio C++ 워크로드까지 설치한다

## P1 — Core Product

- [ ] 앱 스캐폴드를 만든다
- [ ] 핵심 화면 1개를 완성한다
- [ ] 핵심 유저 플로우 1개를 끝까지 연결한다
- [ ] 데모용 시드 데이터를 준비한다

## P1 — AI Harness

- [ ] 자동화 대상 작업을 한 문장으로 정의한다
- [ ] 입력 → 모델 → 구조화된 출력 흐름을 만든다
- [ ] UI에 결과를 반영한다
- [ ] 실패 시 fallback을 준비한다

## P2 — Widget Craft

- [ ] 핵심 표면의 타이포/여백/컬러를 정리한다
- [ ] 빈 상태/로딩/에러 상태를 만든다
- [ ] 모바일 실제 기기에서 확인한다

## P2 — Wild Card

- [ ] 놀라운 장면 1개를 설계한다
- [ ] 본체와 분리된 안전한 실험으로 구현한다

## P3 — Hardening

- [ ] `flutter analyze`
- [ ] `flutter test`
- [ ] 필요 시 `integration_test`
- [ ] 발표 스크립트와 데모 순서를 정리한다
- [ ] 제출 자산을 정리한다
- [ ] Windows 팀원 기준 재현 절차가 문서대로 되는지 점검한다

## Verified On This MacBook

- [x] `code --version`
- [x] `flutter --version`
- [x] `dart --version`
- [x] `flutter create` 스모크 앱 생성
- [x] `flutter analyze` 스모크 통과
- [x] `flutter test` 스모크 통과
- [ ] Android Studio 재시작 후 Flutter 플러그인 로드 확인

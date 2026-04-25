# Hackathon Project Spec Draft

이 문서는 현재 상황을 반영한 초안이다. 프로젝트 이름과 문제정의만 채우면 바로 실행 문서로 전환할 수 있다.

## 1. Project Snapshot

- 프로젝트명: TBD
- 한 줄 피치: AI 하네스와 완성도 높은 Flutter UI를 결합해 실제 작업을 줄여주는 앱
- 팀 구성: MacBook 1명 + Windows 노트북 1명
- 오늘 날짜: 2026-04-25
- 주력 트랙: AI Harness
- 보조 트랙: Widget Craft
- 차별화 트랙: Wild Card

## 2. Current Constraints

- VS Code는 설치돼 있을 수 있으나 `code` CLI는 아직 확인되지 않았다.
- Flutter와 Dart는 아직 설치되지 않았다.
- 원격 GitHub 저장소는 연결됐지만 아직 앱 코드는 없다.
- 해커톤에서는 설치/환경 문제로 데모가 멈추지 않게 해야 한다.

## 3. Recommended Product Shape

- 플랫폼 기본값: Android 또는 Web 중 발표가 가장 쉬운 한 플랫폼 우선
- 앱 형태: 단일 Flutter 앱
- 핵심 유저 플로우: 1개
- 보조 플로우: 1-2개
- AI가 실제로 줄여주는 반복 작업: 1개
- Wild Card 장면: 1개

## 4. Track Plan

### AI Harness

- 입력값을 구조화해서 받는다.
- AI가 중간 판단 또는 초안 생성을 담당한다.
- 결과를 채팅이 아니라 실제 UI/작업 흐름에 반영한다.
- fallback은 샘플 데이터 또는 수동 입력으로 보장한다.

### Widget Craft

- 첫 화면 1개를 강하게 만든다.
- 폰트, 여백, 컬러, 카드 구조를 일관되게 가져간다.
- 로딩/빈 상태/에러 상태까지 챙긴다.

### Wild Card

- 에이전트가 UI를 재구성하거나, 비정형 입력을 제품 흐름으로 바꾸는 장면을 둔다.
- 본체 기능과 분리된 안전한 토글형 기능으로 만든다.

## 5. Suggested Stack

- Flutter stable
- 상태관리: `flutter_riverpod`
- 라우팅: `go_router`
- 모델/직렬화: `freezed` + `build_runner`
- AI 연결: 구조화된 응답을 내는 API 또는 `genui`
- 백엔드: 필요 최소한만

## 6. Machine Split

### MacBook

- 명세
- 아키텍처
- Codex 자동화
- 핵심 구현
- 발표 시나리오

### Windows

- Android 또는 Windows 실행 확인
- 실제 기기/해상도 테스트
- 속도 확인
- 보조 데이터 처리
- Windows desktop이 필요할 때만 Visual Studio C++ 워크로드 추가

## 7. First 8 Actions

1. 프로젝트 이름과 문제정의를 확정한다.
2. 발표 플랫폼 1개를 고정한다.
3. Flutter를 설치하고 `flutter doctor`를 통과시킨다.
4. `flutter create`로 앱 스캐폴드를 만든다.
5. 메인 화면 1개를 만든다.
6. 핵심 유저 플로우 1개를 연결한다.
7. AI 하네스를 붙인다.
8. Widget Craft와 Wild Card를 마지막에 다듬는다.

## 8. Demo Definition Of Done

- [ ] 첫 화면이 설득력 있다
- [ ] 핵심 플로우가 중간 끊김 없이 동작한다
- [ ] AI 하네스가 실제 작업을 줄여준다
- [ ] 인터넷 또는 모델 실패 대비 fallback이 있다
- [ ] 발표 기기에서 1회 이상 리허설했다

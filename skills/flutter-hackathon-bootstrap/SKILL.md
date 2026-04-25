---
name: flutter-hackathon-bootstrap
description: Use this skill when bootstrapping or steering a Flutter hackathon project across a MacBook and a Windows teammate, especially when you need to fill a completion spec, choose a practical Flutter stack, plan for AI Harness / Widget Craft / Wild Card tracks, and keep docs plus execution status aligned.
---

# Flutter Hackathon Bootstrap

이 스킬은 Flutter 해커톤 프로젝트를 "문서 정리만 된 상태"에서 "바로 구현 가능한 상태"로 끌고 갈 때 사용한다.

## Read In This Order

1. `ai-context/START-HERE.md`
2. `docs/specs/PROJECT-COMPLETION-SPEC-TEMPLATE.md`
3. `docs/ref/TRACK-STRATEGY.md`
4. `docs/ref/FLUTTER-HACKATHON-REFERENCE.md`
5. `docs/setup/BOOTSTRAP-SETUP.md`
6. `docs/status/PROJECT-STATUS.md`
7. `docs/status/EXECUTION-CHECKLIST.md`

필요하면 아래 참고도 읽는다.

- `references/doc-map.md`
- `references/stack-recipes.md`

## Primary Goals

1. 주력 트랙과 데모 서사를 빨리 고정한다.
2. 완성 명세서 템플릿을 실제 프로젝트 명세로 바꾼다.
3. Flutter 설치/검증/앱 스캐폴드까지 막힘 없이 이어준다.
4. 진행 중인 구현이 트랙 전략과 어긋나지 않게 잡아준다.

## Default Decision Rules

- 짧은 해커톤에서는 멀티플랫폼 욕심보다 발표 플랫폼 1개를 먼저 고정한다.
- 앱 하나로 끝낼 수 있으면 단일 앱 구조를 우선한다.
- 상태가 조금만 복잡해져도 `flutter_riverpod`를 쓰는 편이 안전하다.
- 화면이 3개 이상이면 `go_router` 도입을 우선 검토한다.
- `genui` 같은 실험적 AI UI는 `AI Harness` 또는 `Wild Card` 증거가 필요할 때만 넣고, 반드시 fallback 화면을 둔다.
- `melos`는 패키지가 3개 이상 생기기 전에는 미룬다.

## Working Flow

### 1. Lock The Story

- 앱이 해결하는 문제를 1문장으로 쓴다.
- 주력 트랙 1개와 보조 트랙 1개를 정한다.
- 심사위원이 기억할 장면 2개를 정한다.

### 2. Fill The Spec

- `docs/specs/PROJECT-COMPLETION-SPEC-TEMPLATE.md`를 기준으로 실제 명세서를 만든다.
- `Must Have` 3개를 넘기지 않는다.
- `Explicitly Out`를 분명하게 적는다.

### 3. Open The Toolchain

- `docs/setup/BOOTSTRAP-SETUP.md` 순서대로 Flutter를 설치한다.
- `flutter doctor`를 기준 검증으로 쓴다.
- `flutter`, `dart`, `code` 중 무엇이 막히는지 상태 문서에 남긴다.

### 4. Bootstrap The App

- 가장 안전한 기본값은 `flutter create`로 시작하는 것이다.
- 앱 구조는 `lib/app`, `lib/features`, `lib/shared`, `lib/services` 정도로만 나눈다.
- 먼저 메인 화면 1개와 핵심 플로우 1개를 끝낸다.

### 5. Keep Docs Alive

- 구현이 시작되면 `docs/status/PROJECT-STATUS.md`를 갱신한다.
- 다음 행동은 항상 `docs/status/EXECUTION-CHECKLIST.md`에 남긴다.

## When To Escalate

- 발표 기기에서 실행이 안 되면 기능 추가를 멈추고 환경 검증으로 되돌아간다.
- AI 기능이 불안정하면 UI 고도화보다 fallback 설계를 먼저 한다.
- Wild Card 때문에 본체가 흔들리면 실험 기능을 별도 플래그로 분리한다.

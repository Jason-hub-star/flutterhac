# Flutter Hackathon Reference

이 문서는 Flutter 해커톤에서 바로 참고할 수 있도록 공식 문서와 대표 오픈소스를 압축 정리한 큐레이션이다.

## Official Docs

### Flutter Setup And Core Workflow

- Flutter 설치 시작점: [Get started with Flutter](https://docs.flutter.dev/get-started/install/macos/web)
- VS Code 기반 설치: [Install Flutter using VS Code](https://docs.flutter.dev/install/with-vs-code)
- macOS에서 Android 개발: [Start building Flutter Android apps on macOS](https://docs.flutter.dev/get-started/install/macos/mobile-android?tab=first-start)
- macOS에서 iOS 개발: [Make iOS apps](https://docs.flutter.dev/get-started/install/macos/mobile-ios)
- VS Code 사용 가이드: [Visual Studio Code](https://docs.flutter.dev/tools/vs-code)
- DevTools: [Flutter and Dart DevTools](https://docs.flutter.dev/tools/devtools/overview)

### Product Architecture

- 아키텍처 개요: [Architecting Flutter apps](https://docs.flutter.dev/app-architecture)
- 추천 구조: [Guide to app architecture](https://docs.flutter.dev/app-architecture/guide)
- 공통 개념: [Common architecture concepts](https://docs.flutter.dev/app-architecture/concepts)
- 엔진/프레임워크 구조 이해: [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)

### UI And Implementation

- 실전 레시피 모음: [Cookbook](https://docs.flutter.dev/cookbook)
- 테스트 드라이브: [Test drive](https://docs.flutter.dev/get-started/test-drive)
- 테스트 개요: [Testing Flutter apps](https://docs.flutter.dev/testing/overview)
- 통합 테스트: [Check app functionality with an integration test](https://docs.flutter.dev/testing/integration-tests)
- 프로파일링: [Measure performance with an integration test](https://docs.flutter.dev/cookbook/testing/integration/profiling)

### Package And Release Basics

- 패키지 메타데이터: [The pubspec file](https://dart.dev/tools/pub/pubspec)
- 패키지 허브: [pub.dev](https://pub.dev/)
- macOS 릴리스: [Build and release a macOS app](https://docs.flutter.dev/deployment/macos)

### AI-Related Official References

- GenUI 시작: [Get started with the GenUI SDK for Flutter](https://docs.flutter.dev/ai/genui/get-started)
- GenUI 개념: [GenUI SDK main components and concepts](https://docs.flutter.dev/ai/genui/components)
- Firebase 연결: [Add Firebase to your Flutter app](https://firebase.google.com/docs/flutter/setup)

## Curated Open Source

아래 목록은 "다 써라"가 아니라, 해커톤에서 효과 대비 학습비가 좋은 것 위주다.

### `flutter/samples`

- 링크: [flutter/samples](https://github.com/flutter/samples)
- 용도: 공식 예제, 기능별 빠른 레퍼런스, 데모 앱 참고
- 추천 상황: 새로운 UI/플랫폼 기능을 빨리 붙일 때

### `flutter_riverpod`

- 링크: [flutter_riverpod](https://pub.dev/packages/flutter_riverpod)
- 용도: 상태관리, 비동기 상태, 의존성 분리
- 추천 상황: 화면 3개 이상, API/캐시/에러 상태가 섞일 때
- 메모: 짧은 해커톤에서도 구조를 잃지 않게 도와준다

### `go_router`

- 링크: [go_router](https://pub.dev/packages/go_router)
- 용도: 선언형 라우팅
- 추천 상황: 딥링크, 셸 라우트, 탭 구조, URL 기반 웹 지원
- 메모: Flutter 팀 계열에서 관리하는 안전한 기본 선택지

### `freezed` + `build_runner`

- 링크: [freezed](https://pub.dev/packages/freezed)
- 링크: [build_runner](https://pub.dev/packages/build_runner)
- 용도: 모델 정의, 불변 객체, 유니온 타입, 코드 생성
- 추천 상황: API 응답 모델이 3개 이상일 때
- 메모: 명세와 모델이 빨리 늘어나는 해커톤에서 실수 방지에 유리하다

### `melos`

- 링크: [melos](https://github.com/invertase/melos)
- 용도: Dart/Flutter 멀티패키지 워크스페이스 운영
- 추천 상황: 앱 하나 + 공용 패키지 + 실험 패키지처럼 구조가 커질 때
- 메모: 24시간 해커톤이라면 단일 앱이 기본이고, 패키지가 3개 이상일 때만 도입한다

### `Very Good CLI`

- 링크: [very_good_cli](https://github.com/VeryGoodOpenSource/very_good_cli)
- 용도: 의견이 들어간 Flutter 프로젝트 부트스트랩
- 추천 상황: 테스트, 구조, lints를 빠르게 갖춘 출발점이 필요할 때
- 메모: 시간이 너무 짧으면 기본 `flutter create` 후 필요한 것만 추가하는 편이 더 빠를 수 있다

### `genui`

- 링크: [genui](https://pub.dev/packages/genui)
- 용도: 생성형 UI, 대화형 UI 표면, AI가 구조화된 UI를 그리는 실험
- 추천 상황: `AI Harness`와 `Wild Card`를 동시에 노릴 때
- 메모: 와우 포인트가 강하지만, 데모 fallback 설계가 반드시 필요하다

## Recommended Default Stack For This Hackathon

시간 대비 안정성과 확장성의 균형을 기준으로 한 기본값이다.

- 앱 구조: 단일 Flutter 앱
- 상태관리: `flutter_riverpod`
- 라우팅: `go_router`
- 모델링: `freezed` + `build_runner`
- 백엔드: Firebase 또는 얇은 HTTP API
- AI 표면: 빠른 데모는 일반 API 호출 + 구조화 응답, 공격적인 차별화는 `genui`

## Decision Guide

### 6시간 이하

- `flutter create`
- 라우팅 최소화
- 상태관리도 단순하게 시작
- AI는 한 가지 강한 플로우만

### 12시간 전후

- `flutter_riverpod` + `go_router`
- 최소 단위 테스트와 수동 데모 시나리오
- 발표용 데이터 시드 준비

### 1일 이상

- `freezed`/`build_runner` 도입
- `integration_test`로 핵심 플로우 자동화
- 필요 시 `melos` 또는 별도 패키지 분리

## Practical Warnings

- Flutter를 처음 설치하는 날에는 iOS와 Android를 동시에 완벽하게 열려고 하지 않는 편이 빠르다.
- 발표 기기 1개를 먼저 고정하고, 나머지 플랫폼은 보조 전략으로 둔다.
- AI 기능은 온라인 의존성이 크므로 샘플 입력과 fallback 화면을 반드시 준비한다.
- 심사에서는 코드의 우아함보다 데모의 안정성과 서사가 더 크게 보인다.

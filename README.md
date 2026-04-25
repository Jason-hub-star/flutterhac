# Flutter Hackathon Bootstrap

Flutter 해커톤에서 바로 사용할 수 있는 문서/스킬/운영 뼈대다.

## Included

- `docs/specs/PROJECT-COMPLETION-SPEC-TEMPLATE.md`: 프로젝트 완성 명세서 템플릿
- `docs/ref/TRACK-STRATEGY.md`: 3개 트랙 대응 전략
- `docs/ref/FLUTTER-HACKATHON-REFERENCE.md`: 공식 문서와 대표 오픈소스 큐레이션
- `docs/setup/BOOTSTRAP-SETUP.md`: GitHub/맥북/윈도우/Flutter 초기 세팅 가이드
- `docs/setup/WINDOWS-TEAMMATE-HANDOFF.md`: 윈도우 팀원 전용 빠른 온보딩 가이드
- `docs/status/PROJECT-STATUS.md`: 현재 상태판
- `docs/status/EXECUTION-CHECKLIST.md`: 실행 체크리스트
- `skills/flutter-hackathon-bootstrap/`: Codex 재사용 스킬

## Recommended Start

1. `ai-context/START-HERE.md`를 읽는다.
2. `docs/specs/PROJECT-COMPLETION-SPEC-TEMPLATE.md`를 기준으로 실제 프로젝트 명세서를 작성한다.
3. `docs/setup/BOOTSTRAP-SETUP.md` 순서대로 개발 환경을 연다.
4. 윈도우 팀원은 `docs/setup/WINDOWS-TEAMMATE-HANDOFF.md`부터 따라간다.
5. `docs/ref/TRACK-STRATEGY.md`를 보고 주력 트랙과 보조 트랙을 고정한다.
6. 구현이 시작되면 `docs/status/PROJECT-STATUS.md`와 `docs/status/EXECUTION-CHECKLIST.md`를 계속 갱신한다.

## Current Snapshot

- 원격 GitHub 저장소 `flutterhac`는 연결되어 있다.
- 이 MacBook에서는 `git`, `code`, `flutter`, `dart` CLI가 모두 동작한다.
- VS Code 1.117.0과 Flutter 3.41.7이 설치됐다.
- Android SDK `cmdline-tools`와 Android 라이선스 승인이 완료돼 Android toolchain이 정상 인식된다.
- Android 개발에서는 `VS Code`를 주 편집기로, `Android Studio`를 SDK Manager / emulator / Android 전용 점검용 IDE로 쓰는 구성이 안정적이다.
- Android Studio 사용자 플러그인 디렉터리에 `Flutter`와 `Dart` 플러그인 파일을 배치했다.
- 이미 열려 있던 Android Studio 인스턴스는 한 번 재시작해야 플러그인이 활성화된다.
- 아직 iOS/macOS 네이티브 개발용 `Xcode` 전체 설치와 `CocoaPods`는 남아 있다.
- Windows 데스크톱 타깃이 필요하면 VS Code 외에 Visual Studio C++ 툴체인도 준비해야 한다.

# Flutter Hackathon Repo

이 저장소는 Flutter 해커톤용 프로젝트 부트스트랩, 명세, 운영 문서, 재사용 스킬을 함께 관리한다.

## Loading Order

1. `AGENTS.md`
2. `ai-context/START-HERE.md`
3. `docs/specs/PROJECT-COMPLETION-SPEC-TEMPLATE.md`
4. `docs/ref/TRACK-STRATEGY.md`
5. `docs/ref/FLUTTER-HACKATHON-REFERENCE.md`
6. `docs/setup/BOOTSTRAP-SETUP.md`
7. `docs/status/PROJECT-STATUS.md`
8. `docs/status/EXECUTION-CHECKLIST.md`
9. `skills/flutter-hackathon-bootstrap/SKILL.md`

## Execution Rules

1. 추측하지 말고 실제 파일과 설치 상태를 확인한다.
2. 중요한 도구 호출 전에는 목적을 한 줄로 밝힌다.
3. 문서 변경 직후 무엇이 바뀌었는지 1-2줄 검증한다.
4. 문서에는 절대경로를 쓰지 않는다.
5. 해커톤에서는 속도보다 데모 신뢰도를 우선한다.
6. Flutter가 설치된 뒤에는 `flutter doctor`, `flutter analyze`, `flutter test`를 기본 검증 순서로 사용한다.
7. 아직 Flutter가 설치되지 않았다면, 구현 대신 설치 블로커와 다음 행동을 문서화한다.
8. Windows 사용자가 따라야 하는 단계는 macOS 절차와 분리해서 명확히 적는다.

## Default Working Model

- MacBook: 명세, 구조 설계, iOS/macOS 관점 검증, Codex 기반 자동화
- Windows 노트북: Android/Windows 관점 검증, 빠른 기기 테스트, 필요 시 OCR/보조 런타임
- Windows 데스크톱 타깃을 쓰면 Visual Studio와 VS Code를 구분해서 안내한다.
- Git: 코드와 문서의 단일 진실원
- 공유 폴더 또는 클라우드 동기화: 스크린샷, 레퍼런스 이미지, 데모 자산

# Windows Teammate Handoff

이 문서는 Windows 노트북을 쓰는 팀원이 해커톤 현장에서 가장 덜 막히는 경로로 빠르게 합류하도록 돕는 전용 가이드다.

## 1. Best Default

가장 안전한 기본값은 아래 순서다.

1. `Android` 타깃 먼저 연다.
2. 앱 실행이 확인되면 Git 동기화와 화면 확인 루프를 붙인다.
3. 정말 필요할 때만 `Windows desktop` 타깃을 추가한다.

## 2. Important Distinction

- `VS Code`: 코드 편집기
- `Visual Studio`: Windows 데스크톱 빌드에 필요한 별도 툴체인

둘은 다른 프로그램이다. Windows 데스크톱까지 빌드하지 않을 거면 초반에는 VS Code만으로도 충분할 수 있다.

## 3. Android-First Setup

권장 설치 순서:

1. Git for Windows
2. VS Code
3. Flutter extension
4. Flutter SDK
5. Android Studio
6. Android emulator 또는 실제 Android 기기

공식 레퍼런스:

- [Install Flutter using VS Code](https://docs.flutter.dev/install/with-vs-code)
- [Start building Flutter Android apps on Windows](https://docs.flutter.dev/get-started/install/windows/mobile)

## 4. Fast Validation

PowerShell에서 아래 순서로 확인한다.

```powershell
flutter doctor -v
flutter devices
```

다음 중 하나가 보이면 좋다.

- Android emulator
- 실제 Android device
- 필요 시 `windows`

## 5. If Windows Desktop Is Needed

Windows 데스크톱 앱까지 열려면 아래가 추가로 필요하다.

1. Windows용 Visual Studio 설치
2. `Desktop development with C++` 워크로드 선택
3. 다시 `flutter doctor -v`
4. `flutter devices`에서 `windows` 확인

공식 레퍼런스:

- [Set up Windows development](https://docs.flutter.dev/platform-integration/windows/setup)

## 6. Git And Collaboration Flow

권장 흐름:

1. 저장소 clone
2. 기본 브랜치 pull
3. 앱 실행 확인
4. 화면/기능 단위로 작업
5. 스크린샷과 막힌 지점을 바로 공유

기본 명령:

```powershell
git clone https://github.com/Jason-hub-star/flutterhac.git
cd flutterhac
git pull
```

## 7. Team Split Suggestion

### Windows Teammate Owns

- Android 실행 확인
- 실제 기기 또는 에뮬레이터 검증
- 해상도 이슈 확인
- 데모 기기 쪽 안정성 점검

### MacBook Owner Owns

- 명세
- AI 하네스
- 구조 설계
- 발표 스토리와 최종 통합

## 8. What To Do If Blocked

- `flutter` 명령이 없으면: VS Code 설치 후 SDK가 PATH에 들어갔는지 확인
- Android device가 안 보이면: `flutter doctor -v`, `flutter devices`, USB 디버깅 확인
- Windows desktop이 안 보이면: Visual Studio C++ 워크로드 설치 여부 확인
- 시간이 없으면: Windows desktop은 버리고 Android 또는 Web 한 타깃으로 고정

## 9. Done Definition

- [ ] `flutter doctor -v` 주요 오류가 없다
- [ ] `flutter devices`에 최소 1개 타깃이 보인다
- [ ] 저장소를 pull할 수 있다
- [ ] 앱을 한 번 실행했다
- [ ] 팀과 동일한 데모 타깃을 알고 있다

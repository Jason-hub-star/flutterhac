# Bootstrap Setup

## 1. Current Local Reality

이번 작업 시점의 로컬 확인 기준:

- `git`: 사용 가능
- `flutter`: 미설치 또는 PATH 미연결
- `dart`: 미설치 또는 PATH 미연결
- `code`: VS Code 앱은 있을 수 있으나 CLI는 미연결

즉, 지금은 "개발 시작 전 부트스트랩 단계"다.

## 2. GitHub First Setup

원격 저장소 `flutterhac`는 비어 있었고, 현재 로컬 작업 트리와 연결되었다.

기본 명령 흐름:

```bash
git clone https://github.com/Jason-hub-star/flutterhac.git
cd flutterhac
git status
```

첫 스캐폴드 커밋 이후에는 아래 흐름으로 밀면 된다.

```bash
git add .
git commit -m "chore: bootstrap flutter hackathon workspace"
git push -u origin main
```

## 3. MacBook Setup

공식 기준은 Flutter 설치 문서를 따른다.

- 빠른 설치: VS Code 기반 설치 문서
- 실제 개발: macOS Android/iOS 개발 문서

권장 순서:

1. Flutter SDK 설치
2. Xcode 설치 및 첫 실행
3. Android Studio 설치
4. 터미널 재시작
5. `flutter doctor`

예상 검증 명령:

```bash
flutter doctor
flutter doctor -v
```

## 4. Windows Teammate Setup

팀원 노트북은 Android 또는 Windows 데스크톱 테스트의 주력으로 두는 편이 효율적이다.

권장 순서:

1. VS Code 또는 Android Studio 설치
2. Flutter SDK 설치
3. Android toolchain 연결
4. `flutter doctor`
5. 실제 에뮬레이터 또는 기기 1개 연결

### Windows Friendly Default

가장 덜 막히는 기본값은 `Android` 먼저, `Windows desktop`은 필요할 때만 여는 것이다.

- Android만 필요하면: VS Code + Flutter + Android Studio 조합으로 충분하다.
- Windows 데스크톱까지 필요하면: VS Code와 별도로 Windows용 Visual Studio를 설치해야 한다.
- Visual Studio Code와 Visual Studio는 다른 프로그램이다.

### Windows Desktop Caveat

Windows 데스크톱 앱을 빌드하거나 실행하려면 Visual Studio의 `Desktop development with C++` 워크로드가 필요하다.

권장 검증 명령:

```powershell
flutter doctor -v
flutter devices
```

`flutter devices` 결과에 `windows`가 보이면 Windows 데스크톱 타깃 인식까지 된 것이다.

## 5. VS Code Note

`code` CLI가 안 잡히면 VS Code 내부에서 `Shell Command: Install 'code' command in PATH`를 실행해 CLI를 연결한다.

CLI가 없어도 앱 자체는 직접 열 수 있다.

## 6. Recommended Hackathon Repo Shape

```text
flutterhac/
  lib/
  test/
  integration_test/
  assets/
  docs/
    specs/
    ref/
    setup/
    status/
  skills/
```

## 7. Machine Split

### MacBook

- 명세 작성
- 구조 설계
- Codex 자동화
- iOS/macOS 검증
- 발표 스크립트 정리

### Windows

- Android 또는 Windows 앱 실행
- 실제 기기 연결 테스트
- 퍼포먼스/해상도 차이 확인
- 필요 시 OCR/데이터 전처리 보조
- 발표 직전에는 Android와 Windows 중 실제 데모에 쓸 타깃 1개를 고정

## 8. Suggested Bootstrap Path

### Fastest Safe Path

1. 문서 템플릿부터 채운다.
2. 발표할 핵심 플랫폼 1개를 고정한다.
3. `flutter create`로 앱을 만든다.
4. 메인 화면 1개와 핵심 플로우 1개를 먼저 끝낸다.
5. AI 하네스를 붙인다.
6. 마지막에 Widget Craft와 Wild Card를 얹는다.

Windows 팀원이 빠르게 따라오게 하려면 Android 에뮬레이터 또는 실기기 1개를 먼저 성공시키고, 그 뒤에 Windows 데스크톱 타깃을 열어도 된다.

## 9. Initial Commands After Flutter Install

```bash
flutter create .
flutter pub get
flutter run
flutter analyze
flutter test
```

만약 현재 폴더에 이미 문서가 있으므로 앱만 별도 디렉토리로 둘 생각이면 아래처럼 간다.

```bash
flutter create app
cd app
flutter pub get
flutter run
```

## 10. When To Introduce More Tooling

- `flutter_riverpod`: 상태가 커질 때 즉시 도입
- `go_router`: 화면 3개 이상이면 도입
- `freezed`/`build_runner`: API 모델이 늘어나면 도입
- `integration_test`: 발표 핵심 플로우를 자동 검증하고 싶을 때 도입
- `melos`: 패키지가 3개 이상일 때만 도입

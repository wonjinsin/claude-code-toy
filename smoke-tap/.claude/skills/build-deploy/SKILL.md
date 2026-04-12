---
name: build-deploy
description: "Smoke Tap 앱의 iOS 빌드/배포. Expo prebuild, 패치 스크립트, xcodebuild, 시뮬레이터/실기기 설치. '빌드', 'build', '설치', 'install', '기기', 'device', '시뮬레이터', 'simulator', 'prebuild', '실행', 'run' 키워드 시 사용."
---

# Build & Deploy

Smoke Tap iOS 앱의 빌드 및 배포 가이드.

## 빌드 파이프라인

### 전체 (클린 빌드)

```bash
# 1. Prebuild + 패치 (한 줄)
npm run prebuild:ios

# 2. 시뮬레이터 빌드 (컴파일 에러 확인용)
npx expo run:ios

# 3. 실기기 빌드/설치
npx expo run:ios --device "00008110-000C0D813C42401E"
```

### 수동 기기 빌드 (expo run:ios 실패 시)

```bash
# 1. xcodebuild
cd ios && xcodebuild -workspace SmokeTap.xcworkspace \
  -scheme SmokeTap \
  -destination "id=00008110-000C0D813C42401E" \
  -configuration Debug build

# 2. 설치
xcrun devicectl device install app \
  --device "00008110-000C0D813C42401E" \
  "$(xcodebuild -workspace SmokeTap.xcworkspace -scheme SmokeTap -showBuildSettings | grep BUILT_PRODUCTS_DIR | awk '{print $3}')/SmokeTap.app"

# 3. 실행
xcrun devicectl device process launch \
  --device "00008110-000C0D813C42401E" com.example.smoketap
```

### 코드만 변경 (네이티브 변경 없음)

```bash
npx expo start  # Metro 번들러만 시작, 리빌드 불필요
```

## 기기 정보

| 항목 | 값 |
|------|-----|
| 모델 | iPhone 13 (iPhone14,5) |
| iOS | 26.3.1 |
| UDID | 00008110-000C0D813C42401E |
| CoreDevice UUID | 8B3ADB7B-64AD-5735-8A4E-36D27B4FAB20 |
| Team ID | 2KDMC5JZXC |

## 에러 진단

| 에러 | 원인 | 해결 |
|------|------|------|
| `aps-environment` 서명 에러 | expo-widgets가 Push 추가 | `withRemovePushNotifications` 플러그인 확인 |
| `database is locked` | 이전 빌드 프로세스 | `pkill -f xcodebuild` |
| `developer disk image` | iOS 26 호환 | `xcrun devicectl`로 직접 설치 |
| `ambiguous implicit access` | ExpoModulesCore import | `internal import ExpoModulesCore` 사용 |
| `containerBackground` iOS 17 | 가용성 체크 누락 | `if #available(iOS 17.0, *)` 래핑 |
| `Multiple commands produce` | 중복 prebuild | `--clean` 플래그 사용 |
| 위젯 파일 누락 | expo-widgets 덮어쓰기 | `node scripts/patch-widget.js` 재실행 |

## npm scripts

```json
{
  "prebuild:ios": "expo prebuild --platform ios --clean && node scripts/patch-widget.js",
  "patch-widget": "node scripts/patch-widget.js"
}
```

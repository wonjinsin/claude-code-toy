---
name: native-bridge
description: "Smoke Tap 앱의 iOS 네이티브 통합. Swift 코드, Config Plugin, expo-widgets, App Groups, pbxproj 조작, ExpoModulesCore 모듈. '네이티브', 'Swift', '위젯', 'widget', 'config plugin', 'App Groups', '네이티브 모듈', 'prebuild', 'pbxproj' 키워드 시 사용."
---

# Native Bridge

Smoke Tap 앱의 iOS 네이티브 통합 가이드. expo-widgets + App Groups + ExpoModulesCore 조합.

## 아키텍처

```
[위젯 탭]
    → RecordTapIntent (AppIntent)
    → SharedTapStore.recordTap() (UserDefaults: pendingTaps +1)
    → WidgetCenter.reloadTimelines()

[앱 포그라운드 진입]
    → getPendingCount() (ExpoModulesCore → SharedTapStoreMainApp)
    → addTap() × pending count
    → clearPending()
    → setBaseCount(todayCount) (위젯 표시용)
```

## expo-widgets 덮어쓰기 문제

expo-widgets는 prebuild 시 `ExpoWidgetsTarget/` 디렉토리를 재생성한다. 따라서:

1. 위젯 Swift 파일(`SharedTapStore.swift`, `RecordTapIntent.swift`, `SmokeTapWidget.swift`)은 `scripts/patch-widget.js`로 prebuild **이후** 작성한다
2. `ExpoModulesProvider.swift`는 빌드 시 재생성되므로 Xcode Run Script 빌드 단계 + `scripts/patch-expo-modules-provider.js`로 매 빌드마다 패치한다
3. 메인앱 Swift 파일(`SharedTapStoreMainApp.swift`, `SharedTapStoreModule.swift`)은 `withDangerousMod`으로 prebuild 중 작성 가능하다 (덮어씌워지지 않음)

## Config Plugin 패턴

```js
// withDangerousMod: 파일 시스템 직접 조작
config = withDangerousMod(config, ['ios', async (config) => {
  fs.mkdirSync(dir, { recursive: true }); // 디렉토리 없을 수 있음
  fs.writeFileSync(path, content);
  return config;
}]);

// withXcodeProject: pbxproj 조작
config = withXcodeProject(config, (config) => {
  const proj = config.modResults;
  // proj.pbxFileReferenceSection(), proj.pbxBuildFileSection() 직접 수정
  // proj.addSourceFile()은 불안정 — 직접 섹션 조작 선호
  return config;
});
```

## Swift 코드 규칙

- `internal import ExpoModulesCore` — public import 하면 access level 충돌
- ExpoModulesCore Module 클래스: `class` (not `public class`)
- App Groups ID: `group.com.example.smoketap`
- iOS 17+ API(`containerBackground`, `AppIntent`)는 `@available` 또는 `if #available`로 래핑
- 위젯 배경: `widgetBackground()` View extension으로 iOS 16 호환

## 새 네이티브 모듈 추가 체크리스트

1. `ios/SmokeTap/{Module}MainApp.swift` — 네이티브 로직
2. `ios/SmokeTap/{Module}Module.swift` — ExpoModulesCore Module 정의
3. `modules/{Module}.ts` — JS 브릿지 (`requireNativeModule`)
4. `plugins/with{Module}.js` — Config Plugin (파일 작성 + Xcode 등록)
5. `scripts/patch-expo-modules-provider.js` 수정 — 모듈 등록 추가
6. `app.json`의 `plugins` 배열에 추가

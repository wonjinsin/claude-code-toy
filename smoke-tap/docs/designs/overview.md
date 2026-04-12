# Smoke Tap — 앱 개요

## 한 줄 설명

흡연 횟수를 탭 한 번으로 기록하고, 7일 통계로 습관을 파악하는 iOS 앱.

---

## 핵심 철학

- **판단 없음**: 줄이거나 늘려야 한다는 메시지 없이 숫자만 기록
- **부담 없음**: 탭 한 번이 전부. 입력 폼, 이유, 메모 없음
- **가볍고 정제됨**: 다크 테마, 앰버 액센트, 숫자가 주인공

---

## 화면 구성 (3탭)

### 1. 홈 (메인 탭)

| 요소 | 설명 |
|------|------|
| 날짜 표시 | 오늘 날짜 (요일 포함) pill 형태로 상단 표시 |
| 오늘 횟수 | 대형 숫자로 중앙 표시 (예: `5 회`) |
| + 버튼 | 탭하면 즉시 카운트 +1, AsyncStorage에 영구 저장 |
| 마지막 기록 시각 | 가장 최근 탭 시각 (예: `마지막: 오후 3:24`) |

### 2. 통계 탭

| 요소 | 설명 |
|------|------|
| 주간 요약 카드 | 이번 주 총 횟수 / 일 평균 / 최고 기록일 |
| 7일 막대 차트 | 최근 7일의 일별 흡연 횟수. 오늘은 앰버색으로 강조 |
| 날짜 범위 | 차트 우측 상단에 `M.D – M.D` 형식 표시 |

### 3. 설정 탭

| 요소 | 설명 |
|------|------|
| 앱 버전 | 현재 버전 표시 (`app.json`의 `version` 값) |
| 앱 태그라인 | `SMOKE TAP — 흡연 기록 앱` |

---

## iOS 홈 화면 위젯

- **크기**: Small (systemSmall)
- **표시 내용**: 오늘 흡연 횟수 + `+` 버튼
- **탭 동작**: 앱을 열지 않고 위젯 내에서 즉시 카운트 +1 (iOS 17+)
- **동기화**:
  - 앱 → 위젯: `addTap()` 호출 시 `updateSnapshot()`으로 위젯 카운트 갱신
  - 위젯 → 앱: `addUserInteractionListener`로 탭 이벤트 수신 후 AsyncStorage에 영구 저장

> **제약**: 앱이 완전히 종료된 상태에서 위젯 탭 시, 위젯 화면은 즉시 갱신되지만 앱 재실행 전까지 AsyncStorage에 저장되지 않음.

---

## 데이터 모델

```ts
type TapRecord = {
  id: string;        // Unix ms 기반 고유 ID
  timestamp: number; // Unix ms (기기 로컬 시간 기준)
};

type DailyStat = {
  date: string;  // 'YYYY-MM-DD' (기기 로컬 날짜)
  count: number;
};

type WeeklySummary = {
  total: number;
  dailyAvg: number;
  peakDay: number;
};
```

- 모든 기록은 `records: TapRecord[]` 배열로 관리
- 파생 통계(오늘 횟수, 7일 통계 등)는 컴포넌트 구독 시 실시간 계산
- 저장소: AsyncStorage (`tap-storage` 키, Zustand persist 미들웨어)

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Expo SDK 55, React Native 0.83 |
| 라우터 | Expo Router (파일 기반) |
| 상태 관리 | Zustand v5 + AsyncStorage persist |
| 위젯 | expo-widgets (alpha) + @expo/ui/swift-ui |
| 스타일 | StyleSheet (NativeWind는 미사용 상태) |
| 언어 | TypeScript strict |
| 플랫폼 | iOS only |
| Bundle ID | `com.example.smoketap` |

---

## 파일 구조

```
app/
  _layout.tsx              # 루트 레이아웃 (위젯 동기화 훅 포함)
  (tabs)/
    _layout.tsx            # 탭 네비게이션 (홈/통계/설정)
    index.tsx              # 홈 화면
    stats.tsx              # 통계 화면
    settings.tsx           # 설정 화면

components/
  common/AppHeader.tsx     # SMOKE TAP 로고 헤더
  stats/BarChart.tsx       # 7일 막대 차트

store/
  useTapStore.ts           # 전체 상태 (records, addTap, 통계 함수)

widgets/
  SmokeTapWidget.tsx       # iOS 홈 화면 위젯 컴포넌트

constants/
  colors.ts                # 디자인 토큰 (웜 다크 팔레트)

i18n/
  index.ts                 # t() 번역 함수
  locales/ko.json          # 한국어 문자열

types/
  tap.ts                   # TapRecord, DailyStat, WeeklySummary

ios/
  ExpoWidgetsTarget/       # 위젯 네이티브 extension (prebuild 생성)
  SmokeTap.xcworkspace     # Xcode 빌드 진입점
```

---

## 디자인 시스템

| 토큰 | 값 | 용도 |
|------|----|------|
| `BG` | `#121110` | 배경 (웜 블랙) |
| `CARD` | `#1e1c1a` | 카드 배경 |
| `ACCENT` | `#e8991a` | 핵심 강조색 (앰버) |
| `TEXT_PRIMARY` | `#f0ece6` | 주요 텍스트 (웜 화이트) |
| `TEXT_SECONDARY` | `#8c8580` | 보조 텍스트 |
| `TEXT_MUTED` | `#5c5854` | 약한 텍스트 |
| `BORDER` | `#2e2c2a` | 구분선 |

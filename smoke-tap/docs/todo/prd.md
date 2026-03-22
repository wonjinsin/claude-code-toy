# Smoke Tap — PRD (Product Requirements Document)

> 작성일: 2026-03-22
> 기반 코드: Expo iOS boilerplate (현재 레포)

---

## 개요

**Smoke Tap**은 흡연 횟수를 버튼 하나로 간편하게 기록하고, 날짜별 통계를 확인할 수 있는 iOS 앱이다.
외부 서버나 DB 없이 기기 내부(AsyncStorage)에만 저장하며, 다국어 확장이 가능한 구조로 설계한다.

---

## 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| 프레임워크 | Expo (managed) + React Native | 기존 boilerplate 유지 |
| 라우팅 | Expo Router | 파일 기반 |
| 스타일링 | NativeWind v4 | 기존 유지 |
| 상태 관리 | Zustand + AsyncStorage persist | 기존 패키지 재사용 |
| i18n | expo-localization + 경량 JSON | 초기 한국어, 구조는 다국어 대비 |
| 날짜/시각 포맷 | Intl.DateTimeFormat | 기기 로케일 자동 적용 |
| 차트 | 커스텀 React Native View | 외부 라이브러리 없음 |

---

## 화면 요구사항

### 탭 1 — 메인 (`app/(tabs)/index.tsx`)

| 항목 | 내용 |
|------|------|
| + 버튼 | 화면 중앙 대형 원형 버튼 (80×80) |
| 오늘 횟수 | 오늘 날짜 기준 탭 횟수 표시 (`오늘 N회`) |
| 마지막 탭 시각 | 기기 로케일 시각 포맷으로 표시 (`마지막: 오후 3:24`) |
| 기록 없을 때 | "아직 기록 없음" 텍스트 표시 |

```
┌──────────────────────────────┐
│                              │
│         오늘 12회            │
│                              │
│   ┌──────────────────────┐   │
│   │          +           │   │
│   └──────────────────────┘   │
│                              │
│     마지막: 오후 3:24        │
│                              │
└──────────────────────────────┘
```

---

### 탭 2 — 통계 (`app/(tabs)/stats.tsx`)

| 항목 | 내용 |
|------|------|
| 기간 | 오늘 포함 지난 7일 |
| 차트 형태 | 막대 차트 (커스텀 View) |
| 막대 위 | 횟수 숫자 표시 |
| 막대 아래 | 날짜 레이블 (기기 로케일 — 예: 3/22) |
| 데이터 없는 날 | 높이 0 막대로 표시 |

```
┌──────────────────────────────┐
│  지난 7일                    │
│                              │
│        12                    │
│  ██                          │
│  ██  9  ██                   │
│  ██  ██  ██  ██  ██  ██  ██  │
│  3/16 17 18 19 20 21 22      │
└──────────────────────────────┘
```

---

### 탭 3 — 설정 (`app/(tabs)/settings.tsx`)

| 항목 | 내용 |
|------|------|
| 앱 버전 | `expo-constants`로 읽어 표시 |

---

## 데이터 모델

```typescript
// types/tap.ts
type TapRecord = {
  id: string;        // timestamp 기반 고유 ID
  timestamp: number; // Unix milliseconds (기기 로컬 시각)
}

type DailyStat = {
  date: string;  // 'YYYY-MM-DD' (기기 로컬 날짜 기준)
  count: number;
}
```

---

## i18n 구조

```json
// i18n/locales/ko.json
{
  "tabs": { "main": "메인", "stats": "통계", "settings": "설정" },
  "main": {
    "todayCount": "오늘 {{count}}회",
    "lastTap": "마지막: {{time}}",
    "noTapYet": "아직 기록 없음"
  },
  "stats": { "title": "지난 7일", "noData": "데이터 없음" },
  "settings": { "appVersion": "앱 버전" }
}
```

---

## 폴더 구조 (변환 후)

```
smoke-tap/
├── app/
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── _layout.tsx      # 3탭 정의
│       ├── index.tsx        # 메인 탭
│       ├── stats.tsx        # 통계 탭
│       └── settings.tsx     # 설정 탭
├── store/
│   └── useTapStore.ts       # 탭 기록 + computed
├── types/
│   └── tap.ts
├── constants/
│   └── colors.ts
├── i18n/
│   ├── index.ts
│   └── locales/
│       └── ko.json
└── components/
    └── stats/
        └── BarChart.tsx     # 커스텀 7일 막대 차트
```

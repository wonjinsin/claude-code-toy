---
name: feature-dev
description: "Smoke Tap 앱의 React Native 기능 개발. 새 화면 추가, 상태 관리, 컴포넌트 작성, 디자인 토큰 적용. '기능 추가', '화면 만들어', '컴포넌트', '상태', 'store', 'zustand', '탭', '통계', '설정' 키워드 시 사용."
---

# Feature Development

Smoke Tap 앱의 React Native/TypeScript 기능 개발 가이드.

## 프로젝트 구조

```
app/(tabs)/index.tsx    — 홈 (카운터)
app/(tabs)/stats.tsx    — 통계 (7일 차트)
app/(tabs)/settings.tsx — 설정
app/_layout.tsx         — 루트 레이아웃 (위젯 동기화)
components/common/      — 공통 컴포넌트
components/stats/       — 통계 전용 컴포넌트
store/useTapStore.ts    — Zustand 상태 관리
constants/colors.ts     — 디자인 토큰
```

## 상태 관리 패턴

Zustand v5 + AsyncStorage persist:

```ts
// 셀렉터 기반 구독 (필수)
const count = useTapStore((s) => getTodayCount(s.records));
const records = useTapStore((s) => s.records); // 리액티브 구독

// 전체 구독 금지
const store = useTapStore(); // BAD
```

파생 통계(`getDailyStats`, `getWeeklyStats`)는 안정적 함수 참조이므로, 리액티비티를 위해 `records`를 별도 구독한다.

## 디자인 토큰

```ts
import { C } from '../constants/colors';

// 반드시 C 객체 사용
backgroundColor: C.BG       // #121110
color: C.TEXT_PRIMARY        // #f0ece6
borderColor: C.BORDER        // #2e2c2a
```

## 디자인 원칙 (.impeccable.md)

1. 숫자가 주인공 — 카운트가 가장 크고 눈에 띄어야 함
2. 액센트는 한 화면에 한 번 — `C.ACCENT` (#e8991a)
3. 장식 없음 — 기능하지 않는 UI 요소 제거
4. 웜 톤 다크 — 차가운 그레이 금지

## 새 화면 추가 체크리스트

1. `app/(tabs)/new-screen.tsx` 생성
2. `app/(tabs)/_layout.tsx`에 탭 등록
3. 디자인 토큰 적용 (`C.*`)
4. 필요 시 store 확장 (`store/useTapStore.ts`)

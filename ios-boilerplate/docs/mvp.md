# React Native iOS Boilerplate — 구현 계획

## Context

개인 신규 프로젝트의 시작점으로 사용할 React Native iOS boilerplate를 처음부터 구성한다.
참조 이미지 3장(금융/교육/세탁 앱 스타일)에서 공통 UI 패턴을 추출하여 범용 boilerplate를 설계한다.
인증은 제외하며, 실제 동작하는 더미 데이터와 함께 복사해서 바로 쓸 수 있는 수준의 코드를 목표로 한다.

## 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Expo (managed) | 빠른 개발, 향후 위젯 확장 가능 |
| 라우팅 | Expo Router | 파일 기반, Expo 네이티브 통합 |
| 스타일링 | NativeWind v4 | TailwindCSS 문법, 빠른 UI 개발 |
| 상태관리 | Zustand | 가볍고 심플, persist 지원 |
| 데이터 패칭 | TanStack Query v5 | 캐싱/로딩/에러 자동 관리 |
| 아이콘 | @expo/vector-icons (Ionicons) | Expo 내장 |
| 언어 | TypeScript (strict) | 타입 안전성 |

## 폴더 구조

```
ios-boilerplate/
├── app/
│   ├── _layout.tsx              # Root: QueryClientProvider + Stack
│   └── (tabs)/
│       ├── _layout.tsx          # 5탭 정의 + 탭바 커스터마이징
│       ├── index.tsx            # 홈 탭
│       ├── list.tsx             # 목록 탭
│       ├── community.tsx        # 커뮤니티 탭 (FAB)
│       ├── history.tsx          # 이용내역 탭
│       └── profile.tsx          # 내 정보 탭
├── components/
│   ├── common/
│   │   ├── NotificationBanner.tsx
│   │   ├── SegmentTabs.tsx
│   │   ├── SkeletonBox.tsx
│   │   ├── FAB.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── StatCard.tsx
│   │   └── EmptyState.tsx
│   └── home/
│       ├── UserProfileHeader.tsx
│       ├── ServiceIconGrid.tsx
│       ├── ServiceIconItem.tsx
│       ├── ContentCard.tsx
│       ├── HeroHeader.tsx
│       ├── AddressRow.tsx
│       └── ReviewCard.tsx
├── store/
│   ├── useAppStore.ts           # 배너 dismiss, 세그먼트 탭 상태
│   ├── useUserStore.ts          # 유저 프로필 상태
│   └── useNotificationStore.ts  # 알림/배지 상태
├── hooks/
│   ├── useHomeData.ts           # 홈 병렬 쿼리
│   ├── useNotifications.ts      # 알림 쿼리 + store 동기화
│   ├── useSegmentContent.ts     # 세그먼트 탭 조건부 쿼리
│   └── useServices.ts           # 서비스 목록 쿼리
├── services/
│   └── mockApi.ts               # 더미 API (setTimeout 딜레이)
├── constants/
│   ├── colors.ts                # 색상 팔레트
│   ├── typography.ts            # 폰트 사이즈/웨이트
│   ├── spacing.ts               # 스페이싱 토큰
│   └── mockData.ts              # 전체 더미 데이터
├── types/
│   ├── user.ts
│   ├── service.ts
│   ├── notification.ts
│   ├── content.ts
│   └── navigation.ts
├── docs/
│   └── mvp.md                   # MVP 전체 문서 (단일 파일)
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── global.css
└── tsconfig.json
```

## 구현 단계

### Step 1: 프로젝트 초기화

```bash
cd /Users/WonjinSin/Documents/project/claude-code-toy/ios-boilerplate
npx create-expo-app@latest . --template blank-typescript
npx expo install expo-router expo-constants expo-linking expo-status-bar \
  react-native-safe-area-context react-native-screens
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install zustand @tanstack/react-query
npm install clsx tailwind-merge
```

### Step 2: 설정 파일 생성

- `app.json` — scheme, expo-router 플러그인, typedRoutes
- `babel.config.js` — `nativewind/babel` 플러그인
- `metro.config.js` — `withNativeWind(config, { input: './global.css' })`
- `tailwind.config.js` — content glob, 색상 팔레트 확장
- `global.css` — `@tailwind base/components/utilities`
- `tsconfig.json` — strict, `@/*` 경로 별칭

### Step 3: 타입 정의 (types/)

- `user.ts`: UserProfile (id, name, description, avatarUrl, membershipTier)
- `service.ts`: ServiceItem (id, label, icon, iconColor, iconBgColor)
- `notification.ts`: Notification (id, type, title, isRead, isDismissable)
- `content.ts`: ContentCard, ReviewItem, StatItem
- `navigation.ts`: TabParamList

### Step 4: 상수 & 목데이터 (constants/)

- `colors.ts`: primary(#007AFF), background(#F2F2F7), surface(#FFF), 시맨틱 색상
- `typography.ts`: hero(28/700), sectionTitle(20/700), body(14/400), label(11/500)
- `spacing.ts`: xs(4), sm(8), md(16), lg(24), xl(32)
- `mockData.ts`:
  - MOCK_USER, MOCK_NOTIFICATIONS
  - MOCK_PRIMARY_SERVICES (4개: 가격표, 이용방법, 이벤트, 상세과정)
  - MOCK_SECONDARY_SERVICES (4개: 추가케어, 프리미엄, 수선, 천연세제)
  - MOCK_STATS (총강의:463, 완료:0, 진행률:0%)
  - MOCK_REVIEWS, MOCK_CONTENT_CARDS, MOCK_SEGMENT_TABS

### Step 5: Mock API (services/mockApi.ts)

setTimeout으로 300~800ms 딜레이 시뮬레이션:
- `fetchUserProfile()`, `fetchNotifications()`
- `fetchPrimaryServices()`, `fetchSecondaryServices()`
- `fetchContentCards()`, `fetchStats()`, `fetchReviews()`
- `fetchSegmentContent(tab: string)`

### Step 6: Zustand 스토어 (store/)

- `useAppStore.ts`: dismissedBannerIds(persist), activeSegmentTab
- `useUserStore.ts`: profile(초기값 MOCK_USER), setProfile, clearProfile
- `useNotificationStore.ts`: notifications[], unreadCount(computed), markAsRead

**주의**: Zustand persist는 `AsyncStorage` 사용. `@react-native-async-storage/async-storage` 설치 필요.

### Step 7: TanStack Query 훅 (hooks/)

- `useHomeData.ts`: useQuery 3개 병렬 (user, primaryServices, contentCards)
- `useNotifications.ts`: useQuery + useEffect로 store 동기화 (v5에서 onSuccess 제거됨)
- `useSegmentContent.ts`: `enabled: !!activeTab` 조건부 쿼리
- `useServices.ts`: primary/secondary 서비스 쿼리

### Step 8: 공통 컴포넌트 (components/common/)

**SkeletonBox** (먼저 구현):
- Animated.loop로 opacity shimmer (0.3→0.7→0.3)
- Props: width, height, borderRadius, className

**NotificationBanner**:
- Props: notification, onDismiss
- UI: `bg-blue-50 border-l-4 border-blue-500 flex-row items-center px-4 py-3 mx-4 my-2 rounded-lg`
- Animated.timing으로 위로 슬라이드 아웃

**SegmentTabs**:
- Props: tabs[], activeTab, onTabChange, variant('underline'|'pill')
- Animated.Value로 언더라인 이동 애니메이션

**FAB**:
- Props: onPress, icon('add'), color, position('bottomCenter'|'bottomRight')
- position: 'absolute', 하단 고정, 그림자 효과

**SectionHeader**: title + 우측 액션 버튼
**StatCard**: stats[3] → 3열 숫자+라벨 카드
**EmptyState**: 빈 상태 일러스트 + 메시지

### Step 9: 홈 컴포넌트 (components/home/)

**UserProfileHeader**:
- Props: user, unreadNotificationCount, isLoading, onNotificationPress
- isLoading 시 SkeletonBox 표시
- avatarUrl=null이면 이니셜 아바타 (회색 원 + 이름 첫 글자)
- unreadCount>0이면 빨간 배지

**ServiceIconItem**:
- 56x56 둥근 사각형 카드 (`rounded-2xl`)
- 아이콘 + 라벨 텍스트

**ServiceIconGrid**:
- Props: services[], layout('row'|'grid'), onServicePress
- 기본 'row': ScrollView horizontal

**ContentCard**:
- type='banner': 전체 너비 이미지 배너
- type='large': 이미지 + 제목 + CTA 버튼
- type='review': ReviewCard 렌더링

**HeroHeader**: 대형 타이틀 텍스트 (fontSize 28, bold)
**AddressRow**: 주소 텍스트 + chevron 아이콘
**ReviewCard**: 작성자, 날짜, 서비스 유형, 별점, 코멘트

### Step 10: 앱 레이아웃 (app/_layout.tsx)

```tsx
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
```

### Step 11: 탭 레이아웃 (app/(tabs)/_layout.tsx)

5탭 설정:

| idx | name | 탭라벨 | 아이콘(active/inactive) |
|-----|------|--------|------------------------|
| 0 | index | 홈 | home / home-outline |
| 1 | list | 목록 | grid / grid-outline |
| 2 | community | 커뮤니티 | add-circle / add-circle-outline |
| 3 | history | 이용내역 | receipt / receipt-outline |
| 4 | profile | 내 정보 | person / person-outline |

커뮤니티 탭(idx 2): tabBarIcon에서 큰 원형 버튼 스타일로 렌더링 (FAB 효과)
tabBarActiveTintColor: '#007AFF', tabBarInactiveTintColor: '#8E8E93'

### Step 12: 탭 화면 구현

**index.tsx (홈)**:
```
ScrollView
├── NotificationBanner
├── UserProfileHeader (useHomeData + useNotificationStore)
├── ServiceIconGrid (MOCK_PRIMARY_SERVICES)
├── SectionHeader
└── ContentCard × 3
```

**list.tsx**: SegmentTabs + FlatList(ContentCard)
**community.tsx**: SectionHeader + StatCard + SegmentTabs + FlatList + FAB
**history.tsx**: SegmentTabs("전체"/"진행중"/"완료") + FlatList(ReviewCard)
**profile.tsx**: UserProfileHeader(large) + 메뉴 목록(알림설정, 개인정보처리방침, 이용약관, 앱버전)

### Step 13: 문서 작성 (docs/mvp.md — 단일 파일)

다음 섹션을 포함하는 단일 마크다운 파일:
1. **프로젝트 개요** — 목적, 기술 스택 테이블
2. **Quick Start** — 설치 및 실행 명령어
3. **폴더 구조** — 전체 디렉토리 트리 + 각 파일 역할
4. **컴포넌트 가이드** — 핵심 컴포넌트 Props + 사용 예시
5. **상태관리 가이드** — Zustand 스토어 구조 + selector 패턴
6. **API 훅 가이드** — TanStack Query 훅 목록 + 실제 API 교체 방법

## 주요 주의사항

1. **TanStack Query v5**: `onSuccess` 콜백 제거됨 → `useEffect(() => { if (data) action(data) }, [data])` 패턴 사용
2. **NativeWind v4**: `metro.config.js`에 `withNativeWind` 래핑 필수, `global.css` import 필요
3. **Expo Router**: `package.json`의 `main` 필드를 `"expo-router/entry"`로 설정
4. **Zustand persist**: `@react-native-async-storage/async-storage` 별도 설치 및 `createJSONStorage` 사용

## 검증 방법

```bash
# iOS 시뮬레이터 실행
npx expo start --ios

# 확인 항목:
# 1. 탭바 5개 탭 정상 전환
# 2. 홈 화면 로딩 시 SkeletonBox 표시 후 실제 컨텐츠 렌더링
# 3. 공지 배너 dismiss 동작 + 앱 재시작 후 dismiss 상태 유지 (persist)
# 4. 세그먼트 탭 전환 시 content 변경
# 5. NativeWind 스타일 정상 적용 (배경색, 카드 그림자 등)
# 6. TypeScript 오류 없음 (npx tsc --noEmit)
```

## 핵심 파일 목록

- `app/_layout.tsx` — Provider 계층 진입점
- `app/(tabs)/_layout.tsx` — 탭바 구성
- `constants/mockData.ts` — 전체 더미 데이터 중앙 관리
- `components/home/ServiceIconGrid.tsx` — 3개 레퍼런스 공통 핵심 UI
- `tailwind.config.js` — NativeWind 색상 팔레트 (잘못되면 전체 스타일 무효)
- `services/mockApi.ts` — 실제 API 교체 시 이 파일만 수정

# iOS Boilerplate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 금융/교육/세탁 앱 레퍼런스에서 추출한 공통 UI 패턴을 기반으로, 더미 데이터와 함께 즉시 복사해서 쓸 수 있는 React Native iOS boilerplate를 구성한다.

**Architecture:** Expo Router 파일 기반 라우팅으로 5탭 구조를 구성하고, TanStack Query가 mockApi에서 데이터를 가져오며, Zustand가 전역 UI 상태(배너 dismiss, 세그먼트 탭, 알림 뱃지)를 관리한다. NativeWind v4로 TailwindCSS 문법 스타일링, TypeScript strict 모드로 타입 안전성 확보.

**Tech Stack:** Expo (managed) + Expo Router + NativeWind v4 + Zustand + TanStack Query v5 + @expo/vector-icons (Ionicons) + TypeScript strict

---

## File Structure

```
ios-boilerplate/
├── app/
│   ├── _layout.tsx              # QueryClientProvider + Stack root
│   └── (tabs)/
│       ├── _layout.tsx          # 5탭 정의 + tabBar 커스터마이징
│       ├── index.tsx            # 홈 탭
│       ├── list.tsx             # 목록 탭
│       ├── community.tsx        # 커뮤니티 탭 (FAB)
│       ├── history.tsx          # 이용내역 탭
│       └── profile.tsx          # 내 정보 탭
├── components/
│   ├── common/
│   │   ├── SkeletonBox.tsx      # shimmer 로딩 박스
│   │   ├── NotificationBanner.tsx
│   │   ├── SegmentTabs.tsx
│   │   ├── FAB.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── StatCard.tsx
│   │   └── EmptyState.tsx
│   └── home/
│       ├── UserProfileHeader.tsx
│       ├── ServiceIconItem.tsx
│       ├── ServiceIconGrid.tsx
│       ├── ContentCard.tsx
│       ├── HeroHeader.tsx
│       ├── AddressRow.tsx
│       └── ReviewCard.tsx
├── store/
│   ├── useAppStore.ts
│   ├── useUserStore.ts
│   └── useNotificationStore.ts
├── hooks/
│   ├── useHomeData.ts
│   ├── useNotifications.ts
│   ├── useSegmentContent.ts
│   └── useServices.ts
├── services/
│   └── mockApi.ts
├── constants/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── mockData.ts
├── types/
│   ├── user.ts
│   ├── service.ts
│   ├── notification.ts
│   ├── content.ts
│   └── navigation.ts
├── docs/
│   ├── mvp.md
│   └── task-by-superpowers/
│       └── 2026-03-21-ios-boilerplate.md
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── global.css
└── tsconfig.json
```

---

### Task 0: Save This Plan Document

**Files:**
- Create: `docs/task-by-superpowers/2026-03-21-ios-boilerplate.md`

- [ ] **Step 1: 디렉토리 생성 후 플랜 파일 저장**

```bash
mkdir -p docs/task-by-superpowers
cp /Users/WonjinSin/.claude/plans/merry-tickling-sky.md docs/task-by-superpowers/2026-03-21-ios-boilerplate.md
```

Expected: `docs/task-by-superpowers/2026-03-21-ios-boilerplate.md` 생성됨

---

### Task 1: Project Initialization

**Files:**
- Modify: `package.json` (main 필드)
- Create: `app.json`, `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`, `tsconfig.json`

- [ ] **Step 1: Expo 프로젝트 초기화**

```bash
cd /Users/WonjinSin/Documents/project/claude-code-toy/ios-boilerplate
npx create-expo-app@latest . --template blank-typescript
```

Expected: `package.json`, `app.json`, `App.tsx`, `tsconfig.json` 등 기본 파일 생성됨

- [ ] **Step 2: Expo Router 및 필수 패키지 설치**

```bash
npx expo install expo-router expo-constants expo-linking expo-status-bar \
  react-native-safe-area-context react-native-screens
```

Expected: `package.json`에 의존성 추가됨

- [ ] **Step 3: NativeWind + Tailwind 설치**

```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

- [ ] **Step 4: Zustand + TanStack Query + 유틸 설치**

```bash
npm install zustand @tanstack/react-query
npm install @react-native-async-storage/async-storage
npm install clsx tailwind-merge
```

- [ ] **Step 5: `package.json` main 필드 수정**

`package.json`의 `"main"` 필드를 `"expo-router/entry"`로 변경:

```json
{
  "main": "expo-router/entry"
}
```

- [ ] **Step 6: `app.json` 설정**

```json
{
  "expo": {
    "name": "ios-boilerplate",
    "slug": "ios-boilerplate",
    "scheme": "ios-boilerplate",
    "version": "1.0.0",
    "platforms": ["ios"],
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.example.iosboilerplate"
    }
  }
}
```

- [ ] **Step 7: `babel.config.js` 설정**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

- [ ] **Step 8: `metro.config.js` 설정**

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

- [ ] **Step 9: `tailwind.config.js` 설정**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        background: '#F2F2F7',
        surface: '#FFFFFF',
        textPrimary: '#1C1C1E',
        textSecondary: '#8E8E93',
        border: '#C6C6C8',
        danger: '#FF3B30',
        success: '#34C759',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 10: `global.css` 생성**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: `tsconfig.json` 설정**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 12: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음 (App.tsx 등 기본 파일 기준)

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: initialize expo project with router, nativewind, zustand, tanstack-query"
```

---

### Task 2: Type Definitions

**Files:**
- Create: `types/user.ts`, `types/service.ts`, `types/notification.ts`, `types/content.ts`, `types/navigation.ts`

- [ ] **Step 1: `types/user.ts` 작성**

```ts
export type MembershipTier = 'free' | 'premium' | 'vip';

export interface UserProfile {
  id: string;
  name: string;
  description: string;
  avatarUrl: string | null;
  membershipTier: MembershipTier;
}
```

- [ ] **Step 2: `types/service.ts` 작성**

```ts
export interface ServiceItem {
  id: string;
  label: string;
  icon: string; // Ionicons name
  iconColor: string;
  iconBgColor: string;
}
```

- [ ] **Step 3: `types/notification.ts` 작성**

```ts
export type NotificationType = 'info' | 'warning' | 'promo';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  isRead: boolean;
  isDismissable: boolean;
}
```

- [ ] **Step 4: `types/content.ts` 작성**

```ts
export type ContentCardType = 'banner' | 'large' | 'review';

export interface ContentCard {
  id: string;
  type: ContentCardType;
  title: string;
  imageUrl?: string;
  ctaLabel?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  date: string;
  serviceType: string;
  rating: number; // 1-5
  comment: string;
}

export interface StatItem {
  label: string;
  value: string;
}
```

- [ ] **Step 5: `types/navigation.ts` 작성**

```ts
export type TabParamList = {
  index: undefined;
  list: undefined;
  community: undefined;
  history: undefined;
  profile: undefined;
};
```

- [ ] **Step 6: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 7: Commit**

```bash
git add types/
git commit -m "feat: add TypeScript type definitions"
```

---

### Task 3: Constants & Mock Data

**Files:**
- Create: `constants/colors.ts`, `constants/typography.ts`, `constants/spacing.ts`, `constants/mockData.ts`

- [ ] **Step 1: `constants/colors.ts` 작성**

```ts
export const Colors = {
  primary: '#007AFF',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  danger: '#FF3B30',
  success: '#34C759',
  overlay: 'rgba(0,0,0,0.4)',
} as const;
```

- [ ] **Step 2: `constants/typography.ts` 작성**

```ts
export const Typography = {
  hero: { fontSize: 28, fontWeight: '700' as const },
  sectionTitle: { fontSize: 20, fontWeight: '700' as const },
  title: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  label: { fontSize: 11, fontWeight: '500' as const },
} as const;
```

- [ ] **Step 3: `constants/spacing.ts` 작성**

```ts
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
```

- [ ] **Step 4: `constants/mockData.ts` 작성**

```ts
import { UserProfile } from '@/types/user';
import { ServiceItem } from '@/types/service';
import { Notification } from '@/types/notification';
import { ContentCard, ReviewItem, StatItem } from '@/types/content';

export const MOCK_USER: UserProfile = {
  id: '1',
  name: '김민준',
  description: '프리미엄 멤버',
  avatarUrl: null,
  membershipTier: 'premium',
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'promo',
    title: '🎉 신규 회원 20% 할인 쿠폰이 도착했습니다!',
    isRead: false,
    isDismissable: true,
  },
  {
    id: 'n2',
    type: 'info',
    title: '서비스 점검 안내: 3월 25일 02:00 ~ 04:00',
    isRead: false,
    isDismissable: true,
  },
];

export const MOCK_PRIMARY_SERVICES: ServiceItem[] = [
  { id: 's1', label: '가격표', icon: 'pricetag', iconColor: '#007AFF', iconBgColor: '#EBF3FF' },
  { id: 's2', label: '이용방법', icon: 'help-circle', iconColor: '#34C759', iconBgColor: '#EAFAF0' },
  { id: 's3', label: '이벤트', icon: 'gift', iconColor: '#FF9500', iconBgColor: '#FFF4E5' },
  { id: 's4', label: '상세과정', icon: 'list', iconColor: '#AF52DE', iconBgColor: '#F5EAFF' },
];

export const MOCK_SECONDARY_SERVICES: ServiceItem[] = [
  { id: 's5', label: '추가케어', icon: 'sparkles', iconColor: '#FF2D55', iconBgColor: '#FFE5EA' },
  { id: 's6', label: '프리미엄', icon: 'star', iconColor: '#FFD700', iconBgColor: '#FFFBE5' },
  { id: 's7', label: '수선', icon: 'construct', iconColor: '#5856D6', iconBgColor: '#EEEEFF' },
  { id: 's8', label: '천연세제', icon: 'leaf', iconColor: '#30D158', iconBgColor: '#E8FAF0' },
];

export const MOCK_STATS: StatItem[] = [
  { label: '총 강의', value: '463' },
  { label: '완료', value: '0' },
  { label: '진행률', value: '0%' },
];

export const MOCK_SEGMENT_TABS = ['전체', '진행중', '완료'];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    authorName: '이수진',
    date: '2026.03.15',
    serviceType: '프리미엄 코스',
    rating: 5,
    comment: '정말 꼼꼼하게 처리해주셨어요. 다음에도 이용할게요!',
  },
  {
    id: 'r2',
    authorName: '박지호',
    date: '2026.03.10',
    serviceType: '기본 코스',
    rating: 4,
    comment: '깔끔하고 빨랐습니다. 만족합니다.',
  },
];

export const MOCK_CONTENT_CARDS: ContentCard[] = [
  { id: 'c1', type: 'banner', title: '봄맞이 특별 케어 이벤트', imageUrl: undefined },
  { id: 'c2', type: 'large', title: '프리미엄 코스 신청하기', ctaLabel: '자세히 보기' },
  { id: 'c3', type: 'large', title: '이달의 추천 서비스', ctaLabel: '확인하기' },
];
```

- [ ] **Step 5: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 6: Commit**

```bash
git add constants/ types/
git commit -m "feat: add constants and mock data"
```

---

### Task 4: Mock API

**Files:**
- Create: `services/mockApi.ts`

- [ ] **Step 1: `services/mockApi.ts` 작성**

```ts
import {
  MOCK_USER, MOCK_NOTIFICATIONS, MOCK_PRIMARY_SERVICES,
  MOCK_SECONDARY_SERVICES, MOCK_CONTENT_CARDS, MOCK_STATS, MOCK_REVIEWS,
} from '@/constants/mockData';
import { UserProfile } from '@/types/user';
import { ServiceItem } from '@/types/service';
import { Notification } from '@/types/notification';
import { ContentCard, ReviewItem, StatItem } from '@/types/content';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export async function fetchUserProfile(): Promise<UserProfile> {
  await delay(rand(300, 600));
  return MOCK_USER;
}

export async function fetchNotifications(): Promise<Notification[]> {
  await delay(rand(200, 400));
  return MOCK_NOTIFICATIONS;
}

export async function fetchPrimaryServices(): Promise<ServiceItem[]> {
  await delay(rand(300, 500));
  return MOCK_PRIMARY_SERVICES;
}

export async function fetchSecondaryServices(): Promise<ServiceItem[]> {
  await delay(rand(300, 500));
  return MOCK_SECONDARY_SERVICES;
}

export async function fetchContentCards(): Promise<ContentCard[]> {
  await delay(rand(400, 700));
  return MOCK_CONTENT_CARDS;
}

export async function fetchStats(): Promise<StatItem[]> {
  await delay(rand(300, 500));
  return MOCK_STATS;
}

export async function fetchReviews(): Promise<ReviewItem[]> {
  await delay(rand(400, 800));
  return MOCK_REVIEWS;
}

export async function fetchSegmentContent(tab: string): Promise<ReviewItem[]> {
  await delay(rand(300, 600));
  if (tab === '진행중') return [];
  if (tab === '완료') return [];
  return MOCK_REVIEWS;
}
```

- [ ] **Step 2: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 3: Commit**

```bash
git add services/
git commit -m "feat: add mock API with simulated network delay"
```

---

### Task 5: Zustand Stores

**Files:**
- Create: `store/useAppStore.ts`, `store/useUserStore.ts`, `store/useNotificationStore.ts`

> **주의**: `@react-native-async-storage/async-storage`가 Task 1에서 설치됨

- [ ] **Step 1: `store/useAppStore.ts` 작성**

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  dismissedBannerIds: string[];
  activeSegmentTab: string;
  dismissBanner: (id: string) => void;
  setActiveSegmentTab: (tab: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dismissedBannerIds: [],
      activeSegmentTab: '전체',
      dismissBanner: (id) =>
        set((state) => ({
          dismissedBannerIds: [...state.dismissedBannerIds, id],
        })),
      setActiveSegmentTab: (tab) => set({ activeSegmentTab: tab }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ dismissedBannerIds: state.dismissedBannerIds }),
    }
  )
);
```

- [ ] **Step 2: `store/useUserStore.ts` 작성**

```ts
import { create } from 'zustand';
import { UserProfile } from '@/types/user';
import { MOCK_USER } from '@/constants/mockData';

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  profile: MOCK_USER,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: MOCK_USER }),
}));
```

- [ ] **Step 3: `store/useNotificationStore.ts` 작성**

```ts
import { create } from 'zustand';
import { Notification } from '@/types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return { notifications, unreadCount: notifications.filter((n) => !n.isRead).length };
    }),
}));
```

- [ ] **Step 4: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 5: Commit**

```bash
git add store/
git commit -m "feat: add zustand stores (app, user, notification)"
```

---

### Task 6: TanStack Query Hooks

**Files:**
- Create: `hooks/useHomeData.ts`, `hooks/useNotifications.ts`, `hooks/useSegmentContent.ts`, `hooks/useServices.ts`

> **주의**: TanStack Query v5에서 `onSuccess` 제거됨 → `useEffect`로 store 동기화

- [ ] **Step 1: `hooks/useHomeData.ts` 작성**

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, fetchPrimaryServices, fetchContentCards } from '@/services/mockApi';

export function useHomeData() {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
  });

  const primaryServices = useQuery({
    queryKey: ['services', 'primary'],
    queryFn: fetchPrimaryServices,
    staleTime: 1000 * 60 * 10,
  });

  const contentCards = useQuery({
    queryKey: ['contentCards'],
    queryFn: fetchContentCards,
    staleTime: 1000 * 60 * 5,
  });

  return { user, primaryServices, contentCards };
}
```

- [ ] **Step 2: `hooks/useNotifications.ts` 작성**

```ts
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/services/mockApi';
import { useNotificationStore } from '@/store/useNotificationStore';

export function useNotifications() {
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (query.data) {
      setNotifications(query.data);
    }
  }, [query.data]);

  return query;
}
```

- [ ] **Step 3: `hooks/useSegmentContent.ts` 작성**

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchSegmentContent } from '@/services/mockApi';
import { useAppStore } from '@/store/useAppStore';

export function useSegmentContent() {
  const activeTab = useAppStore((s) => s.activeSegmentTab);

  return useQuery({
    queryKey: ['segmentContent', activeTab],
    queryFn: () => fetchSegmentContent(activeTab),
    enabled: !!activeTab,
    staleTime: 1000 * 60 * 3,
  });
}
```

- [ ] **Step 4: `hooks/useServices.ts` 작성**

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchPrimaryServices, fetchSecondaryServices } from '@/services/mockApi';

export function useServices() {
  const primary = useQuery({
    queryKey: ['services', 'primary'],
    queryFn: fetchPrimaryServices,
    staleTime: 1000 * 60 * 10,
  });

  const secondary = useQuery({
    queryKey: ['services', 'secondary'],
    queryFn: fetchSecondaryServices,
    staleTime: 1000 * 60 * 10,
  });

  return { primary, secondary };
}
```

- [ ] **Step 5: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 6: Commit**

```bash
git add hooks/
git commit -m "feat: add tanstack query hooks for data fetching"
```

---

### Task 7: Common Components

**Files:**
- Create: `components/common/SkeletonBox.tsx`, `NotificationBanner.tsx`, `SegmentTabs.tsx`, `FAB.tsx`, `SectionHeader.tsx`, `StatCard.tsx`, `EmptyState.tsx`

- [ ] **Step 1: `components/common/SkeletonBox.tsx` 작성**

```tsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

interface Props {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonBox({ width, height, borderRadius = 8, style }: Props) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[{ width, height, borderRadius, backgroundColor: '#E5E5EA', opacity }, style]}
    />
  );
}
```

- [ ] **Step 2: `components/common/NotificationBanner.tsx` 작성**

```tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '@/types/notification';

interface Props {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export function NotificationBanner({ notification, onDismiss }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;

  const handleDismiss = () => {
    Animated.timing(translateY, {
      toValue: -80,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onDismiss(notification.id));
  };

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <View className="bg-blue-50 border-l-4 border-blue-500 flex-row items-center px-4 py-3 mx-4 my-2 rounded-lg">
        <Text className="flex-1 text-sm text-blue-800">{notification.title}</Text>
        {notification.isDismissable && (
          <TouchableOpacity onPress={handleDismiss}>
            <Ionicons name="close" size={18} color="#1D4ED8" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}
```

- [ ] **Step 3: `components/common/SegmentTabs.tsx` 작성**

```tsx
import React, { useRef } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  variant?: 'underline' | 'pill';
}

export function SegmentTabs({ tabs, activeTab, onTabChange, variant = 'underline' }: Props) {
  if (variant === 'pill') {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-2">
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-primary' : 'bg-surface border border-border'}`}
            >
              <Text className={`text-sm font-medium ${activeTab === tab ? 'text-white' : 'text-textSecondary'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-row border-b border-border">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          className="flex-1 items-center py-3"
        >
          <Text className={`text-sm font-medium ${activeTab === tab ? 'text-primary' : 'text-textSecondary'}`}>
            {tab}
          </Text>
          {activeTab === tab && (
            <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

- [ ] **Step 4: `components/common/FAB.tsx` 작성**

```tsx
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  position?: 'bottomCenter' | 'bottomRight';
}

export function FAB({ onPress, icon = 'add', color = '#007AFF', position = 'bottomRight' }: Props) {
  const positionStyle: ViewStyle =
    position === 'bottomCenter'
      ? { position: 'absolute', bottom: 24, alignSelf: 'center' }
      : { position: 'absolute', bottom: 24, right: 24 };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        positionStyle,
        {
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: color,
          alignItems: 'center', justifyContent: 'center',
          shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
        },
      ]}
    >
      <Ionicons name={icon} size={28} color="white" />
    </TouchableOpacity>
  );
}
```

- [ ] **Step 5: `components/common/SectionHeader.tsx` 작성**

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function SectionHeader({ title, actionLabel, onActionPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Text className="text-lg font-bold text-textPrimary">{title}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onActionPress}>
          <Text className="text-sm text-primary">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

- [ ] **Step 6: `components/common/StatCard.tsx` 작성**

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { StatItem } from '@/types/content';

interface Props {
  stats: StatItem[];
}

export function StatCard({ stats }: Props) {
  return (
    <View className="flex-row bg-surface mx-4 rounded-2xl shadow-sm overflow-hidden">
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          className={`flex-1 items-center py-4 ${index < stats.length - 1 ? 'border-r border-border' : ''}`}
        >
          <Text className="text-xl font-bold text-textPrimary">{stat.value}</Text>
          <Text className="text-xs text-textSecondary mt-1">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
```

- [ ] **Step 7: `components/common/EmptyState.tsx` 작성**

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({ message = '데이터가 없습니다', icon = 'document-outline' }: Props) {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <Ionicons name={icon} size={48} color="#C6C6C8" />
      <Text className="mt-3 text-sm text-textSecondary">{message}</Text>
    </View>
  );
}
```

- [ ] **Step 8: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 9: Commit**

```bash
git add components/common/
git commit -m "feat: add common components (skeleton, banner, tabs, fab, etc.)"
```

---

### Task 8: Home Components

**Files:**
- Create: `components/home/UserProfileHeader.tsx`, `ServiceIconItem.tsx`, `ServiceIconGrid.tsx`, `ContentCard.tsx`, `HeroHeader.tsx`, `AddressRow.tsx`, `ReviewCard.tsx`

- [ ] **Step 1: `components/home/UserProfileHeader.tsx` 작성**

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '@/types/user';
import { SkeletonBox } from '@/components/common/SkeletonBox';

interface Props {
  user?: UserProfile;
  unreadNotificationCount?: number;
  isLoading?: boolean;
  onNotificationPress?: () => void;
}

export function UserProfileHeader({ user, unreadNotificationCount = 0, isLoading, onNotificationPress }: Props) {
  if (isLoading) {
    return (
      <View className="flex-row items-center px-4 py-4">
        <SkeletonBox width={48} height={48} borderRadius={24} />
        <View className="ml-3 gap-2">
          <SkeletonBox width={120} height={16} />
          <SkeletonBox width={80} height={12} />
        </View>
      </View>
    );
  }

  const initial = user?.name?.charAt(0) ?? '?';

  return (
    <View className="flex-row items-center px-4 py-4">
      <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
        <Text className="text-lg font-bold text-white">{initial}</Text>
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-textPrimary">{user?.name ?? '-'}</Text>
        <Text className="text-xs text-textSecondary">{user?.description ?? ''}</Text>
      </View>
      <TouchableOpacity onPress={onNotificationPress} className="relative">
        <Ionicons name="notifications-outline" size={24} color="#1C1C1E" />
        {unreadNotificationCount > 0 && (
          <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger items-center justify-center">
            <Text className="text-white text-xs font-bold">
              {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
```

- [ ] **Step 2: `components/home/ServiceIconItem.tsx` 작성**

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceItem } from '@/types/service';

interface Props {
  item: ServiceItem;
  onPress?: (item: ServiceItem) => void;
}

export function ServiceIconItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress?.(item)} className="items-center mx-3">
      <View
        style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: item.iconBgColor }}
        className="items-center justify-center"
      >
        <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
      </View>
      <Text className="text-xs text-textPrimary mt-1 text-center">{item.label}</Text>
    </TouchableOpacity>
  );
}
```

- [ ] **Step 3: `components/home/ServiceIconGrid.tsx` 작성**

```tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ServiceItem } from '@/types/service';
import { ServiceIconItem } from './ServiceIconItem';

interface Props {
  services: ServiceItem[];
  layout?: 'row' | 'grid';
  onServicePress?: (item: ServiceItem) => void;
}

export function ServiceIconGrid({ services, layout = 'row', onServicePress }: Props) {
  if (layout === 'grid') {
    return (
      <View className="flex-row flex-wrap px-4 py-2">
        {services.map((item) => (
          <View key={item.id} className="w-1/4 mb-4">
            <ServiceIconItem item={item} onPress={onServicePress} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-1 py-2">
      {services.map((item) => (
        <ServiceIconItem key={item.id} item={item} onPress={onServicePress} />
      ))}
    </ScrollView>
  );
}
```

- [ ] **Step 4: `components/home/ReviewCard.tsx` 작성**

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReviewItem } from '@/types/content';

interface Props {
  review: ReviewItem;
}

export function ReviewCard({ review }: Props) {
  return (
    <View className="bg-surface rounded-2xl p-4 mx-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-semibold text-textPrimary">{review.authorName}</Text>
        <Text className="text-xs text-textSecondary">{review.date}</Text>
      </View>
      <Text className="text-xs text-textSecondary mb-2">{review.serviceType}</Text>
      <View className="flex-row mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Ionicons key={i} name={i < review.rating ? 'star' : 'star-outline'} size={14} color="#FFD700" />
        ))}
      </View>
      <Text className="text-sm text-textPrimary">{review.comment}</Text>
    </View>
  );
}
```

- [ ] **Step 5: `components/home/ContentCard.tsx` 작성**

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContentCard as ContentCardType } from '@/types/content';

interface Props {
  card: ContentCardType;
  onPress?: () => void;
}

export function ContentCard({ card, onPress }: Props) {
  if (card.type === 'banner') {
    return (
      <TouchableOpacity onPress={onPress} className="mx-4 mb-3 h-36 bg-blue-100 rounded-2xl items-center justify-center">
        <Text className="text-base font-bold text-primary">{card.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} className="bg-surface mx-4 mb-3 rounded-2xl p-4 shadow-sm">
      <Text className="text-base font-semibold text-textPrimary mb-3">{card.title}</Text>
      {card.ctaLabel && (
        <View className="self-start bg-primary px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-medium">{card.ctaLabel}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
```

- [ ] **Step 6: `components/home/HeroHeader.tsx` 작성**

```tsx
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export function HeroHeader({ title, subtitle }: Props) {
  return (
    <View className="px-4 py-6">
      <Text style={{ fontSize: 28, fontWeight: '700' }} className="text-textPrimary">{title}</Text>
      {subtitle && <Text className="text-sm text-textSecondary mt-1">{subtitle}</Text>}
    </View>
  );
}
```

- [ ] **Step 7: `components/home/AddressRow.tsx` 작성**

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  address: string;
  onPress?: () => void;
}

export function AddressRow({ address, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center px-4 py-3">
      <Ionicons name="location-outline" size={18} color="#8E8E93" />
      <Text className="flex-1 text-sm text-textPrimary ml-2">{address}</Text>
      <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
    </TouchableOpacity>
  );
}
```

- [ ] **Step 8: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 9: Commit**

```bash
git add components/home/
git commit -m "feat: add home components (profile header, service grid, content card, etc.)"
```

---

### Task 9: App Layout & Tab Navigation

**Files:**
- Create: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`
- Delete: `App.tsx` (create-expo-app 기본 파일, expo-router 사용 시 불필요)

- [ ] **Step 1: `App.tsx` 삭제 (있는 경우)**

```bash
rm -f App.tsx
```

- [ ] **Step 2: `app/_layout.tsx` 작성**

```tsx
import '../global.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 3: `app/(tabs)/_layout.tsx` 작성**

```tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#C6C6C8' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: '목록',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarLabel: '커뮤니티',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 48, height: 48, borderRadius: 24,
                backgroundColor: '#007AFF',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 8,
                shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
              }}
            >
              <Ionicons name="add" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: '이용내역',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '내 정보',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

- [ ] **Step 4: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: add root layout with QueryClientProvider and 5-tab navigation"
```

---

### Task 10: Tab Screens

**Files:**
- Create: `app/(tabs)/index.tsx`, `list.tsx`, `community.tsx`, `history.tsx`, `profile.tsx`

- [ ] **Step 1: `app/(tabs)/index.tsx` 작성**

```tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useHomeData } from '@/hooks/useHomeData';
import { useNotificationStore } from '@/store/useNotificationStore';
import { useAppStore } from '@/store/useAppStore';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationBanner } from '@/components/common/NotificationBanner';
import { UserProfileHeader } from '@/components/home/UserProfileHeader';
import { ServiceIconGrid } from '@/components/home/ServiceIconGrid';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ContentCard } from '@/components/home/ContentCard';

export default function HomeScreen() {
  useNotifications(); // store sync
  const { user, primaryServices, contentCards } = useHomeData();
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const dismissedIds = useAppStore((s) => s.dismissedBannerIds);
  const dismissBanner = useAppStore((s) => s.dismissBanner);

  const visibleBanners = notifications.filter(
    (n) => n.isDismissable && !dismissedIds.includes(n.id)
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {visibleBanners.map((n) => (
          <NotificationBanner key={n.id} notification={n} onDismiss={dismissBanner} />
        ))}
        <UserProfileHeader
          user={user.data}
          isLoading={user.isLoading}
          unreadNotificationCount={unreadCount}
        />
        <ServiceIconGrid services={primaryServices.data ?? []} />
        <SectionHeader title="추천 콘텐츠" actionLabel="전체보기" />
        {(contentCards.data ?? []).map((card) => (
          <ContentCard key={card.id} card={card} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: `app/(tabs)/list.tsx` 작성**

```tsx
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { useSegmentContent } from '@/hooks/useSegmentContent';
import { SegmentTabs } from '@/components/common/SegmentTabs';
import { ContentCard } from '@/components/home/ContentCard';
import { EmptyState } from '@/components/common/EmptyState';
import { MOCK_SEGMENT_TABS } from '@/constants/mockData';

export default function ListScreen() {
  const activeTab = useAppStore((s) => s.activeSegmentTab);
  const setActiveTab = useAppStore((s) => s.setActiveSegmentTab);
  const { data = [] } = useSegmentContent();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <SegmentTabs tabs={MOCK_SEGMENT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState message="해당 항목이 없습니다" />}
        renderItem={() => null}
      />
    </SafeAreaView>
  );
}
```

- [ ] **Step 3: `app/(tabs)/community.tsx` 작성**

```tsx
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import { fetchStats, fetchReviews } from '@/services/mockApi';
import { MOCK_SEGMENT_TABS } from '@/constants/mockData';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatCard } from '@/components/common/StatCard';
import { SegmentTabs } from '@/components/common/SegmentTabs';
import { ReviewCard } from '@/components/home/ReviewCard';
import { FAB } from '@/components/common/FAB';
import { EmptyState } from '@/components/common/EmptyState';

export default function CommunityScreen() {
  const activeTab = useAppStore((s) => s.activeSegmentTab);
  const setActiveTab = useAppStore((s) => s.setActiveSegmentTab);
  const { data: stats = [] } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
  const { data: reviews = [] } = useQuery({ queryKey: ['reviews'], queryFn: fetchReviews });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <SectionHeader title="커뮤니티" />
            <StatCard stats={stats} />
            <SegmentTabs
              tabs={MOCK_SEGMENT_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </>
        }
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
      <FAB onPress={() => {}} position="bottomRight" />
    </SafeAreaView>
  );
}
```

- [ ] **Step 4: `app/(tabs)/history.tsx` 작성**

```tsx
import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/services/mockApi';
import { SegmentTabs } from '@/components/common/SegmentTabs';
import { ReviewCard } from '@/components/home/ReviewCard';
import { EmptyState } from '@/components/common/EmptyState';

const TABS = ['전체', '진행중', '완료'];

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const { data: reviews = [] } = useQuery({ queryKey: ['reviews'], queryFn: fetchReviews });

  const filtered = activeTab === '전체' ? reviews : [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <SegmentTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState message="이용 내역이 없습니다" />}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </SafeAreaView>
  );
}
```

- [ ] **Step 5: `app/(tabs)/profile.tsx` 작성**

```tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@/store/useUserStore';
import { UserProfileHeader } from '@/components/home/UserProfileHeader';

const MENU_ITEMS = [
  { id: 'm1', label: '알림 설정', icon: 'notifications-outline' },
  { id: 'm2', label: '개인정보 처리방침', icon: 'document-text-outline' },
  { id: 'm3', label: '이용약관', icon: 'reader-outline' },
  { id: 'm4', label: '앱 버전', icon: 'information-circle-outline', value: '1.0.0' },
] as const;

export default function ProfileScreen() {
  const profile = useUserStore((s) => s.profile);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <UserProfileHeader user={profile} />
        <View className="mt-4">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-surface px-4 py-4 border-b border-border"
            >
              <Ionicons name={item.icon} size={20} color="#8E8E93" />
              <Text className="flex-1 ml-3 text-sm text-textPrimary">{item.label}</Text>
              {item.value ? (
                <Text className="text-sm text-textSecondary">{item.value}</Text>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#C6C6C8" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 6: TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 7: Commit**

```bash
git add app/(tabs)/
git commit -m "feat: add all 5 tab screens (home, list, community, history, profile)"
```

---

### Task 11: Final Verification

- [ ] **Step 1: 전체 TypeScript 검증**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 2: iOS 시뮬레이터 실행**

```bash
npx expo start --ios
```

- [ ] **Step 3: 체크리스트 수동 검증**

```
☐ 탭바 5개 탭 정상 전환
☐ 홈 화면 로딩 시 SkeletonBox 표시 후 실제 컨텐츠 렌더링
☐ 공지 배너 dismiss → 앱 재시작 후 dismiss 상태 유지 (AsyncStorage persist)
☐ 세그먼트 탭 전환 시 content 변경
☐ NativeWind 스타일 정상 적용 (배경색, 카드 그림자 등)
☐ 커뮤니티 탭 아이콘 원형 FAB 스타일
☐ FAB 버튼 우측 하단 고정
```

- [ ] **Step 4: 최종 Commit**

```bash
git add -A
git commit -m "chore: complete ios boilerplate mvp"
```

---

## 주요 주의사항

1. **TanStack Query v5**: `onSuccess` 제거됨 → `useEffect(() => { if (data) action(data) }, [data])` 패턴
2. **NativeWind v4**: `metro.config.js`에 `withNativeWind` 래핑 필수, `app/_layout.tsx`에 `import '../global.css'` 필수
3. **Expo Router**: `package.json`의 `main` 필드를 `"expo-router/entry"`로 설정
4. **Zustand persist**: `createJSONStorage(() => AsyncStorage)` 사용
5. **실제 API 교체**: `services/mockApi.ts`의 fetch 함수만 교체하면 됨 (queryKey/인터페이스 유지)
6. **공유 세그먼트 탭 상태**: `useAppStore.activeSegmentTab`은 `list.tsx`와 `community.tsx`가 공유함. 독립적인 탭 상태가 필요하면 `history.tsx`처럼 로컬 `useState`로 분리할 것

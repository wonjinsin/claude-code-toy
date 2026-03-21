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

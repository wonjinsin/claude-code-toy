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

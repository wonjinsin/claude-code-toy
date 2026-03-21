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

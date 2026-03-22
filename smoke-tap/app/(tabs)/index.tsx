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

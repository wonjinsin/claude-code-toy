import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
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

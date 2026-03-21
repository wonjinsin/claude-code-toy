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

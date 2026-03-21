import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { useSegmentContent } from '@/hooks/useSegmentContent';
import { SegmentTabs } from '@/components/common/SegmentTabs';
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

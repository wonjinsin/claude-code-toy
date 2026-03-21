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

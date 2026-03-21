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

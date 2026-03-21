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

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/services/mockApi';
import { useNotificationStore } from '@/store/useNotificationStore';

export function useNotifications() {
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (query.data) {
      setNotifications(query.data);
    }
  }, [query.data]);

  return query;
}

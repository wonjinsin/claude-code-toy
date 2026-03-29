import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { addUserInteractionListener } from 'expo-widgets';
import SmokeTapWidget from '../widgets/SmokeTapWidget';
import { useTapStore } from '../store/useTapStore';

function toLocalDateString(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getTodayCount(records: { timestamp: number }[]): number {
  const today = toLocalDateString(Date.now());
  return records.filter((r) => toLocalDateString(r.timestamp) === today).length;
}

function useWidgetSync() {
  const addTap = useTapStore((s) => s.addTap);

  useEffect(() => {
    // Widget → App: 위젯 버튼 탭 이벤트 수신 → AsyncStorage에 영구 저장
    const subscription = addUserInteractionListener((event) => {
      if (event.target === 'add-tap') {
        addTap();
      }
    });
    return () => subscription.remove();
  }, [addTap]);

  useEffect(() => {
    // App → Widget: store 변경 시 위젯에 정확한 카운트 동기화
    const unsubscribe = useTapStore.subscribe((state) => {
      SmokeTapWidget.updateSnapshot({ count: getTodayCount(state.records) });
    });

    // 앱 시작 시 현재 카운트 즉시 주입
    SmokeTapWidget.updateSnapshot({
      count: getTodayCount(useTapStore.getState().records),
    });

    return unsubscribe;
  }, []);
}

export default function RootLayout() {
  useWidgetSync();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

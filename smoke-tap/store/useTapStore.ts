import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TapRecord, DailyStat } from '../types/tap';

type TapState = {
  records: TapRecord[];
  addTap: () => void;
  getTodayCount: () => number;
  getLastTapTime: () => number | null;
  getDailyStats: (days: number) => DailyStat[];
};

// Returns 'YYYY-MM-DD' in device local timezone
function toLocalDateString(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const useTapStore = create<TapState>()(
  persist(
    (set, get) => ({
      records: [],

      addTap: () =>
        set((state) => ({
          records: [
            ...state.records,
            { id: String(Date.now()), timestamp: Date.now() },
          ],
        })),

      getTodayCount: () => {
        const today = toLocalDateString(Date.now());
        return get().records.filter(
          (r) => toLocalDateString(r.timestamp) === today
        ).length;
      },

      getLastTapTime: () => {
        const { records } = get();
        return records.length ? records[records.length - 1].timestamp : null;
      },

      getDailyStats: (days: number): DailyStat[] => {
        const { records } = get();
        const stats: DailyStat[] = [];
        for (let i = days - 1; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          d.setHours(0, 0, 0, 0);
          const dateStr = toLocalDateString(d.getTime());
          const count = records.filter(
            (r) => toLocalDateString(r.timestamp) === dateStr
          ).length;
          stats.push({ date: dateStr, count });
        }
        return stats;
      },
    }),
    {
      name: 'tap-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

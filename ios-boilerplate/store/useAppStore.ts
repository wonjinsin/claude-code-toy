import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  dismissedBannerIds: string[];
  activeSegmentTab: string;
  dismissBanner: (id: string) => void;
  setActiveSegmentTab: (tab: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dismissedBannerIds: [],
      activeSegmentTab: '전체',
      dismissBanner: (id) =>
        set((state) => ({
          dismissedBannerIds: [...state.dismissedBannerIds, id],
        })),
      setActiveSegmentTab: (tab) => set({ activeSegmentTab: tab }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ dismissedBannerIds: state.dismissedBannerIds }),
    }
  )
);

import { create } from 'zustand';
import { UserProfile } from '@/types/user';
import { MOCK_USER } from '@/constants/mockData';

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  profile: MOCK_USER,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: MOCK_USER }),
}));

export type MembershipTier = 'free' | 'premium' | 'vip';

export interface UserProfile {
  id: string;
  name: string;
  description: string;
  avatarUrl: string | null;
  membershipTier: MembershipTier;
}

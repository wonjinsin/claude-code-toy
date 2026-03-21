import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '@/types/user';
import { SkeletonBox } from '@/components/common/SkeletonBox';

interface Props {
  user?: UserProfile;
  unreadNotificationCount?: number;
  isLoading?: boolean;
  onNotificationPress?: () => void;
}

export function UserProfileHeader({ user, unreadNotificationCount = 0, isLoading, onNotificationPress }: Props) {
  if (isLoading) {
    return (
      <View className="flex-row items-center px-4 py-4">
        <SkeletonBox width={48} height={48} borderRadius={24} />
        <View className="ml-3 gap-2">
          <SkeletonBox width={120} height={16} />
          <SkeletonBox width={80} height={12} />
        </View>
      </View>
    );
  }

  const initial = user?.name?.charAt(0) ?? '?';

  return (
    <View className="flex-row items-center px-4 py-4">
      <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
        <Text className="text-lg font-bold text-white">{initial}</Text>
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-textPrimary">{user?.name ?? '-'}</Text>
        <Text className="text-xs text-textSecondary">{user?.description ?? ''}</Text>
      </View>
      <TouchableOpacity onPress={onNotificationPress} className="relative">
        <Ionicons name="notifications-outline" size={24} color="#1C1C1E" />
        {unreadNotificationCount > 0 && (
          <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger items-center justify-center">
            <Text className="text-white text-xs font-bold">
              {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

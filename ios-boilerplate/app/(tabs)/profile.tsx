import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@/store/useUserStore';
import { UserProfileHeader } from '@/components/home/UserProfileHeader';

const MENU_ITEMS = [
  { id: 'm1', label: '알림 설정', icon: 'notifications-outline', value: undefined },
  { id: 'm2', label: '개인정보 처리방침', icon: 'document-text-outline', value: undefined },
  { id: 'm3', label: '이용약관', icon: 'reader-outline', value: undefined },
  { id: 'm4', label: '앱 버전', icon: 'information-circle-outline', value: '1.0.0' },
] as const;

export default function ProfileScreen() {
  const profile = useUserStore((s) => s.profile);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <UserProfileHeader user={profile} />
        <View className="mt-4">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-surface px-4 py-4 border-b border-border"
            >
              <Ionicons name={item.icon} size={20} color="#8E8E93" />
              <Text className="flex-1 ml-3 text-sm text-textPrimary">{item.label}</Text>
              {item.value ? (
                <Text className="text-sm text-textSecondary">{item.value}</Text>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#C6C6C8" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

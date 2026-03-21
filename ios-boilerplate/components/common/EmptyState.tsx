import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({ message = '데이터가 없습니다', icon = 'document-outline' }: Props) {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <Ionicons name={icon} size={48} color="#C6C6C8" />
      <Text className="mt-3 text-sm text-textSecondary">{message}</Text>
    </View>
  );
}

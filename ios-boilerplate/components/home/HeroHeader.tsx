import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export function HeroHeader({ title, subtitle }: Props) {
  return (
    <View className="px-4 py-6">
      <Text style={{ fontSize: 28, fontWeight: '700' }} className="text-textPrimary">{title}</Text>
      {subtitle && <Text className="text-sm text-textSecondary mt-1">{subtitle}</Text>}
    </View>
  );
}

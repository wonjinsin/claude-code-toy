import React from 'react';
import { Text, View } from 'react-native';
import { StatItem } from '@/types/content';

interface Props {
  stats: StatItem[];
}

export function StatCard({ stats }: Props) {
  return (
    <View className="flex-row bg-surface mx-4 rounded-2xl shadow-sm overflow-hidden">
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          className={`flex-1 items-center py-4 ${index < stats.length - 1 ? 'border-r border-border' : ''}`}
        >
          <Text className="text-xl font-bold text-textPrimary">{stat.value}</Text>
          <Text className="text-xs text-textSecondary mt-1">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

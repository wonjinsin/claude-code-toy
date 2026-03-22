import React from 'react';
import { View, Text } from 'react-native';
import type { DailyStat } from '../../types/tap';

type Props = {
  data: DailyStat[];
};

const BAR_MAX_HEIGHT = 120;

export default function BarChart({ data }: Props) {
  // Always render bars for all days; maxCount guard prevents division by zero
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <View className="flex-row items-end justify-around px-4 pb-4">
      {data.map((item) => {
        const barHeight = (item.count / maxCount) * BAR_MAX_HEIGHT;
        // Format: M/D (no leading zero)
        const [, month, day] = item.date.split('-');
        const label = `${parseInt(month)}/${parseInt(day)}`;

        return (
          <View key={item.date} className="items-center">
            <Text className="text-xs text-gray-600 mb-1">
              {item.count > 0 ? item.count : ''}
            </Text>
            <View
              style={{ height: Math.max(barHeight, 2), width: 28 }}
              className="bg-blue-500 rounded-t-md"
            />
            <Text className="text-xs text-gray-500 mt-1">{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

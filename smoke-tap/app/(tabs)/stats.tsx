import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';
import BarChart from '../../components/stats/BarChart';

export default function StatsScreen() {
  const getDailyStats = useTapStore((s) => s.getDailyStats);
  const data = getDailyStats(7);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-8 pb-4">
        <Text className="text-2xl font-bold text-gray-800">
          {t('stats.title')}
        </Text>
      </View>
      <View className="flex-1 justify-center">
        <BarChart data={data} />
      </View>
    </SafeAreaView>
  );
}

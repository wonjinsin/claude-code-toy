import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';

function formatTime(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(ts));
}

export default function MainScreen() {
  const addTap = useTapStore((s) => s.addTap);
  const getTodayCount = useTapStore((s) => s.getTodayCount);
  const getLastTapTime = useTapStore((s) => s.getLastTapTime);

  const todayCount = getTodayCount();
  const lastTapTime = getLastTapTime();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center gap-8">
        <Text className="text-4xl font-bold text-gray-800">
          {t('main.todayCount', { count: todayCount })}
        </Text>

        <TouchableOpacity
          onPress={addTap}
          className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center shadow-lg"
          activeOpacity={0.7}
        >
          <Text className="text-white text-5xl font-light leading-none">+</Text>
        </TouchableOpacity>

        <Text className="text-base text-gray-500">
          {lastTapTime
            ? t('main.lastTap', { time: formatTime(lastTapTime) })
            : t('main.noTapYet')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

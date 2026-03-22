import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { t } from '../../i18n';

export default function SettingsScreen() {
  const version = Constants.expoConfig?.version ?? '—';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-8">
        <Text className="text-2xl font-bold text-gray-800 mb-8">
          {t('tabs.settings')}
        </Text>
        <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
          <Text className="text-base text-gray-700">
            {t('settings.appVersion')}
          </Text>
          <Text className="text-base text-gray-400">{version}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';
import BarChart from '../../components/stats/BarChart';

export default function StatsScreen() {
  const getDailyStats = useTapStore((s) => s.getDailyStats);
  const data = getDailyStats(7);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('stats.title')}</Text>
      </View>
      <View style={styles.chartArea}>
        <BarChart data={data} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartArea: {
    flex: 1,
    justifyContent: 'center',
  },
});

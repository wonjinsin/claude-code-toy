import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';
import { C } from '../../constants/colors';
import AppHeader from '../../components/common/AppHeader';
import BarChart from '../../components/stats/BarChart';

function toLocalDateString(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getWeekRange(): string {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  const fmt = (d: Date) => `${d.getMonth() + 1}.${d.getDate()}`;
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function StatsScreen() {
  useTapStore((s) => s.records); // subscribe for reactivity
  const getDailyStats = useTapStore((s) => s.getDailyStats);
  const getWeeklyStats = useTapStore((s) => s.getWeeklyStats);

  const data = getDailyStats(7);
  const weekly = getWeeklyStats();
  const todayDate = toLocalDateString(Date.now());

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      {/* Title row */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{t('stats.title')}</Text>
        <Text style={styles.dateRange}>{getWeekRange()}</Text>
      </View>

      {/* Weekly summary card */}
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardLabel}>{t('stats.weeklyTotal')}</Text>
          <Text style={styles.cardHero}>{weekly.total}회</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardBottomRow}>
          <View style={styles.cardStat}>
            <Text style={styles.cardLabel}>{t('stats.dailyAvg')}</Text>
            <Text style={styles.cardStatValue}>{weekly.dailyAvg}회</Text>
          </View>
          <View style={styles.cardStatDivider} />
          <View style={styles.cardStat}>
            <Text style={styles.cardLabel}>{t('stats.peakDay')}</Text>
            <Text style={styles.cardStatValue}>{weekly.peakDay}회</Text>
          </View>
        </View>
      </View>

      {/* Section label */}
      <Text style={styles.sectionLabel}>{t('stats.last7days')}</Text>

      {/* Bar chart */}
      <BarChart data={data} todayDate={todayDate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.BG,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: C.TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  dateRange: {
    fontSize: 13,
    color: C.TEXT_MUTED,
    letterSpacing: 0.2,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: C.CARD,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 28,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: C.TEXT_MUTED,
    letterSpacing: 1,
  },
  cardHero: {
    fontSize: 26,
    fontWeight: '700',
    color: C.TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: C.BORDER,
    marginBottom: 14,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStat: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  cardStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: C.BORDER,
  },
  cardStatValue: {
    fontSize: 18,
    fontWeight: '600',
    color: C.TEXT_PRIMARY,
    letterSpacing: -0.3,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: C.TEXT_MUTED,
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
});

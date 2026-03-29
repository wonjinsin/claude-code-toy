import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';
import { C } from '../../constants/colors';

function toLocalDateString(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatTime(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(ts));
}

function formatDate(): string {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());
}

export default function MainScreen() {
  const addTap = useTapStore((s) => s.addTap);
  const todayCount = useTapStore((s) => {
    const today = toLocalDateString(Date.now());
    return s.records.filter((r) => toLocalDateString(r.timestamp) === today).length;
  });
  const lastTapTime = useTapStore((s) =>
    s.records.length ? s.records[s.records.length - 1].timestamp : null
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Date pill */}
      <View style={styles.dateWrapper}>
        <View style={styles.datePill}>
          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
      </View>

      {/* Center content */}
      <View style={styles.content}>
        <Text style={styles.todayLabel}>{t('main.today')}</Text>

        <View style={styles.heroRow}>
          <Text style={styles.heroNumber}>{todayCount}</Text>
          <Text style={styles.heroUnit}>{t('main.unit')}</Text>
        </View>

        <TouchableOpacity onPress={addTap} style={styles.button} activeOpacity={0.75}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.lastTapText}>
          {lastTapTime
            ? t('main.lastTap', { time: formatTime(lastTapTime) })
            : t('main.noTapYet')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.BG,
  },
  dateWrapper: {
    alignItems: 'center',
    paddingTop: 12,
  },
  datePill: {
    backgroundColor: C.CARD,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  dateText: {
    fontSize: 13,
    color: C.TEXT_MUTED,
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  todayLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: C.TEXT_MUTED,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: -8,
  },
  heroNumber: {
    fontSize: 108,
    fontWeight: '700',
    color: C.TEXT_PRIMARY,
    lineHeight: 116,
    letterSpacing: -4,
  },
  heroUnit: {
    fontSize: 22,
    fontWeight: '400',
    color: C.TEXT_SECONDARY,
    marginTop: 28,
    marginLeft: 6,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  plusText: {
    color: '#0c0b0a',
    fontSize: 40,
    fontWeight: '400',
    lineHeight: 48,
  },
  lastTapText: {
    fontSize: 13,
    color: C.TEXT_MUTED,
    letterSpacing: 0.2,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTapStore } from '../../store/useTapStore';
import { t } from '../../i18n';

function formatTime(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(ts));
}

function toLocalDateString(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
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
      <View style={styles.content}>
        <Text style={styles.countText}>
          {t('main.todayCount', { count: todayCount })}
        </Text>

        <TouchableOpacity onPress={addTap} style={styles.button} activeOpacity={0.7}>
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
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  countText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  button: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  plusText: {
    color: '#ffffff',
    fontSize: 52,
    fontWeight: '300',
    lineHeight: 60,
  },
  lastTapText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

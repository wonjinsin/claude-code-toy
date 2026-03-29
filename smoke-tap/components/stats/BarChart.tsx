import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { DailyStat } from '../../types/tap';
import { C } from '../../constants/colors';

type Props = {
  data: DailyStat[];
  todayDate: string; // 'YYYY-MM-DD'
};

const BAR_MAX_HEIGHT = 148;
const BAR_MIN_HEIGHT = 4;

export default function BarChart({ data, todayDate }: Props) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.barsRow}>
        {data.map((item) => {
          const isToday = item.date === todayDate;
          const barHeight =
            item.count === 0
              ? BAR_MIN_HEIGHT
              : Math.max((item.count / maxCount) * BAR_MAX_HEIGHT, BAR_MIN_HEIGHT);

          const [, month, day] = item.date.split('-');
          const label = `${parseInt(month)}/${parseInt(day)}`;

          const barColor =
            item.count === 0
              ? C.CARD
              : isToday
              ? C.ACCENT
              : C.ACCENT_DIM;

          return (
            <View key={item.date} style={styles.barItem}>
              <Text style={[styles.countLabel, { color: isToday ? C.TEXT_PRIMARY : C.TEXT_SECONDARY }]}>
                {item.count > 0 ? item.count : ''}
              </Text>
              <View
                style={[
                  styles.bar,
                  { height: barHeight, backgroundColor: barColor },
                  isToday && styles.barToday,
                ]}
              />
              <Text style={[styles.dateLabel, isToday && styles.dateLabelToday]}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barItem: {
    alignItems: 'center',
  },
  countLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 5,
    height: 14,
  },
  bar: {
    width: 32,
    borderRadius: 5,
  },
  barToday: {
    shadowColor: C.ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  dateLabel: {
    fontSize: 11,
    color: C.TEXT_MUTED,
    marginTop: 7,
    letterSpacing: 0.2,
  },
  dateLabelToday: {
    color: C.ACCENT,
    fontWeight: '500',
  },
});

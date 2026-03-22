import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { DailyStat } from '../../types/tap';

type Props = {
  data: DailyStat[];
};

const BAR_MAX_HEIGHT = 140;
const BAR_MIN_HEIGHT = 4;

export default function BarChart({ data }: Props) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const allZero = data.every((d) => d.count === 0);

  return (
    <View style={styles.wrapper}>
      <View style={styles.barsRow}>
        {data.map((item) => {
          const barHeight = allZero
            ? BAR_MIN_HEIGHT
            : Math.max((item.count / maxCount) * BAR_MAX_HEIGHT, item.count > 0 ? BAR_MIN_HEIGHT : BAR_MIN_HEIGHT);

          const [, month, day] = item.date.split('-');
          const label = `${parseInt(month)}/${parseInt(day)}`;
          const isZero = item.count === 0;

          return (
            <View key={item.date} style={styles.barItem}>
              <Text style={styles.countLabel}>
                {item.count > 0 ? item.count : ''}
              </Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    backgroundColor: isZero ? '#e5e7eb' : '#3b82f6',
                  },
                ]}
              />
              <Text style={styles.dateLabel}>{label}</Text>
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
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
    height: 16,
  },
  bar: {
    width: 32,
    borderRadius: 4,
  },
  dateLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 6,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { t } from '../../i18n';
import { C } from '../../constants/colors';
import AppHeader from '../../components/common/AppHeader';

export default function SettingsScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <Text style={styles.title}>{t('settings.title')}</Text>

      {/* Version card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{t('settings.appVersion')}</Text>
          <Text style={styles.rowValue}>{version}</Text>
        </View>
      </View>

      {/* Tagline */}
      <View style={styles.footer}>
        <Text style={styles.tagline}>{t('settings.tagline')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.BG,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: C.TEXT_PRIMARY,
    letterSpacing: -0.5,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: C.CARD,
    borderRadius: 14,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  rowLabel: {
    fontSize: 15,
    color: C.TEXT_PRIMARY,
  },
  rowValue: {
    fontSize: 14,
    color: C.TEXT_MUTED,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  tagline: {
    fontSize: 11,
    color: C.TEXT_MUTED,
    letterSpacing: 1.5,
  },
});

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function SectionHeader({ title, actionLabel, onActionPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Text className="text-lg font-bold text-textPrimary">{title}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onActionPress}>
          <Text className="text-sm text-primary">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

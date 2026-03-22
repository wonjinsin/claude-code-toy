import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  position?: 'bottomCenter' | 'bottomRight';
}

export function FAB({ onPress, icon = 'add', color = '#007AFF', position = 'bottomRight' }: Props) {
  const positionStyle: ViewStyle =
    position === 'bottomCenter'
      ? { position: 'absolute', bottom: 24, alignSelf: 'center' }
      : { position: 'absolute', bottom: 24, right: 24 };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        positionStyle,
        {
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: color,
          alignItems: 'center', justifyContent: 'center',
          shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
        },
      ]}
    >
      <Ionicons name={icon} size={28} color="white" />
    </TouchableOpacity>
  );
}

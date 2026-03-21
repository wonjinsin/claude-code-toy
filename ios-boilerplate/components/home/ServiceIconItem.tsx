import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceItem } from '@/types/service';

interface Props {
  item: ServiceItem;
  onPress?: (item: ServiceItem) => void;
}

export function ServiceIconItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress?.(item)} className="items-center mx-3">
      <View
        style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: item.iconBgColor }}
        className="items-center justify-center"
      >
        <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
      </View>
      <Text className="text-xs text-textPrimary mt-1 text-center">{item.label}</Text>
    </TouchableOpacity>
  );
}

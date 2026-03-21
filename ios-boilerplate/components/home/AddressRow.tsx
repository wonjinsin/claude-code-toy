import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  address: string;
  onPress?: () => void;
}

export function AddressRow({ address, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center px-4 py-3">
      <Ionicons name="location-outline" size={18} color="#8E8E93" />
      <Text className="flex-1 text-sm text-textPrimary ml-2">{address}</Text>
      <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
    </TouchableOpacity>
  );
}

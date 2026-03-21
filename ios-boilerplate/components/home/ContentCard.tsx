import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContentCard as ContentCardType } from '@/types/content';

interface Props {
  card: ContentCardType;
  onPress?: () => void;
}

export function ContentCard({ card, onPress }: Props) {
  if (card.type === 'banner') {
    return (
      <TouchableOpacity onPress={onPress} className="mx-4 mb-3 h-36 bg-blue-100 rounded-2xl items-center justify-center">
        <Text className="text-base font-bold text-primary">{card.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} className="bg-surface mx-4 mb-3 rounded-2xl p-4 shadow-sm">
      <Text className="text-base font-semibold text-textPrimary mb-3">{card.title}</Text>
      {card.ctaLabel && (
        <View className="self-start bg-primary px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-medium">{card.ctaLabel}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

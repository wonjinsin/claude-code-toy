import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReviewItem } from '@/types/content';

interface Props {
  review: ReviewItem;
}

export function ReviewCard({ review }: Props) {
  return (
    <View className="bg-surface rounded-2xl p-4 mx-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-semibold text-textPrimary">{review.authorName}</Text>
        <Text className="text-xs text-textSecondary">{review.date}</Text>
      </View>
      <Text className="text-xs text-textSecondary mb-2">{review.serviceType}</Text>
      <View className="flex-row mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Ionicons key={i} name={i < review.rating ? 'star' : 'star-outline'} size={14} color="#FFD700" />
        ))}
      </View>
      <Text className="text-sm text-textPrimary">{review.comment}</Text>
    </View>
  );
}

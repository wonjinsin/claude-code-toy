import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '@/types/notification';

interface Props {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export function NotificationBanner({ notification, onDismiss }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;

  const handleDismiss = () => {
    Animated.timing(translateY, {
      toValue: -80,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onDismiss(notification.id));
  };

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <View className="bg-blue-50 border-l-4 border-blue-500 flex-row items-center px-4 py-3 mx-4 my-2 rounded-lg">
        <Text className="flex-1 text-sm text-blue-800">{notification.title}</Text>
        {notification.isDismissable && (
          <TouchableOpacity onPress={handleDismiss}>
            <Ionicons name="close" size={18} color="#1D4ED8" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

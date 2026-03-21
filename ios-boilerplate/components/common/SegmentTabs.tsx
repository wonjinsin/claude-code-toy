import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  variant?: 'underline' | 'pill';
}

export function SegmentTabs({ tabs, activeTab, onTabChange, variant = 'underline' }: Props) {
  if (variant === 'pill') {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-2">
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-primary' : 'bg-surface border border-border'}`}
            >
              <Text className={`text-sm font-medium ${activeTab === tab ? 'text-white' : 'text-textSecondary'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-row border-b border-border">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          className="flex-1 items-center py-3"
        >
          <Text className={`text-sm font-medium ${activeTab === tab ? 'text-primary' : 'text-textSecondary'}`}>
            {tab}
          </Text>
          {activeTab === tab && (
            <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

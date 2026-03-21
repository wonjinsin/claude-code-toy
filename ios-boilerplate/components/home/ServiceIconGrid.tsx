import React from 'react';
import { ScrollView, View } from 'react-native';
import { ServiceItem } from '@/types/service';
import { ServiceIconItem } from './ServiceIconItem';

interface Props {
  services: ServiceItem[];
  layout?: 'row' | 'grid';
  onServicePress?: (item: ServiceItem) => void;
}

export function ServiceIconGrid({ services, layout = 'row', onServicePress }: Props) {
  if (layout === 'grid') {
    return (
      <View className="flex-row flex-wrap px-4 py-2">
        {services.map((item) => (
          <View key={item.id} className="w-1/4 mb-4">
            <ServiceIconItem item={item} onPress={onServicePress} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-1 py-2">
      {services.map((item) => (
        <ServiceIconItem key={item.id} item={item} onPress={onServicePress} />
      ))}
    </ScrollView>
  );
}

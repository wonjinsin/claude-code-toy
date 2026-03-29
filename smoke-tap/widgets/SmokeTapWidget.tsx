import { Text, VStack, Button } from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
  buttonStyle,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, WidgetBase } from 'expo-widgets';

type SmokeTapProps = {
  count: number;
};

const SmokeTapWidget = (p: WidgetBase<SmokeTapProps>) => {
  'widget';

  return (
    <VStack spacing={6} modifiers={[padding(12)]}>
      <Text
        modifiers={[
          font({ size: 11, weight: 'semibold' }),
          foregroundStyle('#5c5854'),
        ]}
      >
        오늘
      </Text>
      <Text
        modifiers={[
          font({ size: 48, weight: 'bold' }),
          foregroundStyle('#f0ece6'),
        ]}
      >
        {p.count}
      </Text>
      <Text
        modifiers={[
          font({ size: 12 }),
          foregroundStyle('#8c8580'),
        ]}
      >
        회
      </Text>
      <Button
        label="+"
        target="add-tap"
        modifiers={[
          buttonStyle('borderedProminent'),
          foregroundStyle('#0c0b0a'),
        ]}
        onPress={() => ({ count: p.count + 1 })}
      />
    </VStack>
  );
};

export default createWidget('SmokeTapWidget', SmokeTapWidget);

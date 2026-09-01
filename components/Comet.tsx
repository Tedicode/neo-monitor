import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export function Comet() {
  const progress = useRef(new Animated.Value(0)).current;

  const TRAVEL_DURATION = 8000;
  const PAUSE_DURATION = 15000;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: TRAVEL_DURATION,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(PAUSE_DURATION),
      ])
    ).start();
  }, [progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, width + 60],
  });
  
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, height * 0.4],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <Animated.Text
      style={[
        styles.comet,
        {
          transform: [{ translateX }, { translateY }, { scaleY: -1 }, { scaleX: 1 }, { rotate: '75deg' }],
          opacity,
        },
      ]}
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
    >
      ☄️
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  comet: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 28,
  },
});
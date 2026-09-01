import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

export function RotatingEarth() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text style={[styles.earth, { transform: [{ rotate: spin }] }]}>
      🌍
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  earth: { fontSize: 32 },
});
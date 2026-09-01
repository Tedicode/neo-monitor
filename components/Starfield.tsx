import { View, StyleSheet } from 'react-native';

const STAR_COUNT = 40;

const stars = Array.from({ length: STAR_COUNT }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.6 + 0.4,
}));

export function Starfield() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((star, index) => (
        <View
          key={index}
          style={[
            styles.star,
            {
              left: star.left as `${number}%`,
              top: star.top as `${number}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
});
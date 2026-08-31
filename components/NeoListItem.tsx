import { View, Text, StyleSheet } from 'react-native';
import { NearEarthObject } from '../types';

interface Props {
  neo: NearEarthObject;
}

export function NeoListItem({ neo }: Props) {
  // Assumes at least one close_approach_data entry — safe here, since the
  // feed endpoint only returns objects that have an approach on the queried day.
  const approach = neo.close_approach_data[0];

  const minFt = Math.round(neo.estimated_diameter.feet.estimated_diameter_min);
  const maxFt = Math.round(neo.estimated_diameter.feet.estimated_diameter_max);
  const velocityMph = Math.round(Number(approach.relative_velocity.miles_per_hour));
  const missDistanceMiles = Math.round(Number(approach.miss_distance.miles));
  const hazardText = neo.is_potentially_hazardous_asteroid ? 'Potentially hazardous' : 'Not hazardous';

  return (
    <View
      style={styles.row}
      accessible={true}
      accessibilityLabel={`${neo.name}. ${hazardText}. Diameter ${minFt} to ${maxFt} feet. Velocity ${velocityMph.toLocaleString()} miles per hour. Miss distance ${missDistanceMiles.toLocaleString()} miles.`}
    >
      <Text style={styles.name}>{neo.name}</Text>
      <Text>Diameter: {minFt}–{maxFt} ft</Text>
      <Text>Velocity: {velocityMph.toLocaleString()} mph</Text>
      <Text>Miss distance: {missDistanceMiles.toLocaleString()} miles</Text>
      <Text>{hazardText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
});
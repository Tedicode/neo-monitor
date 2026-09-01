import { View, Text, StyleSheet } from 'react-native';
import { NearEarthObject } from '../types';
import { colors, spacing, fontSize } from '../theme';

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
  const isHazardous = neo.is_potentially_hazardous_asteroid;
  const hazardText = isHazardous ? 'Potentially hazardous' : 'Not hazardous';

  return (
    <View
      style={styles.row}
      accessible={true}
      accessibilityLabel={`${neo.name}. ${hazardText}. Diameter ${minFt} to ${maxFt} feet. Velocity ${velocityMph.toLocaleString()} miles per hour. Miss distance ${missDistanceMiles.toLocaleString()} miles.`}
    >
      <Text style={styles.name}>{neo.name}</Text>
      <Text style={styles.detail}>Diameter: {minFt}–{maxFt} ft</Text>
      <Text style={styles.detail}>Velocity: {velocityMph.toLocaleString()} mph</Text>
      <Text style={styles.detail}>Miss distance: {missDistanceMiles.toLocaleString()} miles</Text>
      <Text style={[styles.hazard, isHazardous ? styles.hazardTrue : styles.hazardFalse]}>
        {hazardText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: fontSize.itemName,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  detail: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  hazard: {
    fontSize: fontSize.body,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  hazardTrue: {
    color: colors.hazardous,
  },
  hazardFalse: {
    color: colors.safe,
  },
});
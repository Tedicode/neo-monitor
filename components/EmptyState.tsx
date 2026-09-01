import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

export function EmptyState() {
  return (
    <View style={styles.emptyContainer} accessible={true} accessibilityLabel="No asteroids found for this date">
      <Text style={styles.emptyEmoji}>🔭</Text>
      <Text style={styles.emptyText}>No asteroids found for this date</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
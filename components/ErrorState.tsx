import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

type ErrorStateProps = {
  error: string;
};

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <View style={styles.errorContainer} accessible={true} accessibilityLabel={`Lost the signal. ${error}`}>
      <Text style={styles.errorEmoji}>🛰️</Text>
      <Text style={styles.errorTitle}>Lost the signal</Text>
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  errorTitle: {
    fontSize: fontSize.itemName,
    fontWeight: 'bold',
    color: colors.hazardous,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
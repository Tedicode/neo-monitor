import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { colors, spacing, fontSize } from '../theme';
import { RotatingEarth } from './RotatingEarth';

type DatePickerRowProps = {
  selectedDate: Date;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
};

export function DatePickerRow({ selectedDate, onDateChange }: DatePickerRowProps) {
  return (
    <View style={styles.pickerRow}>
      <RotatingEarth />
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={onDateChange}
          accessibilityLabel="Select date to view near-Earth objects"
          themeVariant="dark"
          accentColor={colors.accent}
          textColor={colors.textPrimary}
        />
      ) : (
        <Pressable
          onPress={() =>
            DateTimePickerAndroid.open({
              value: selectedDate,
              mode: 'date',
              onChange: onDateChange,
            })
          }
          style={styles.dateButton}
          accessibilityRole="button"
          accessibilityLabel={`Select date to view near-Earth objects. Currently ${selectedDate.toDateString()}`}
        >
          <Text style={styles.dateButtonText}>{selectedDate.toDateString()}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  dateButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
  },
});
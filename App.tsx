import { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Platform, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNeoFeed } from './hooks/useNeoFeed';
import { NeoListItem } from './components/NeoListItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from './theme';

export default function App() {
 const[selectedDate, setSelectedDate] = useState<Date>(new Date());

 const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
   if(date){
     setSelectedDate(date)
   }
 }

 const { neos, loading, refreshing, error, refetch } = useNeoFeed(selectedDate)

  
  return ( 
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} accessibilityLabel="Loading near-Earth objects" />
          </View>
        )}
        {error && <Text>Error: {error}</Text>}
        {!loading && !error && (
          <>
            <Text style={styles.title}>Asteroid Monitor</Text>
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
            <Text style={styles.dateText}>{neos.length} objects found near Earth on {selectedDate.toDateString()}</Text>
            <FlatList
              data={neos}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <NeoListItem neo={item}/>}
              style={styles.list}
              ListEmptyComponent={<Text>No Asteroids found for this date</Text>}
              refreshing={refreshing}
              onRefresh={refetch}
            />
            <Text style={styles.subtitle}>Powered by NASA’s Open APIs</Text>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: fontSize.meta,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  dateText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    margin: spacing.lg,
  },
  list: {
    width: '100%',
    flex: 1,
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

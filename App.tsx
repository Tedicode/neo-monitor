import { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { useNeoFeed } from './hooks/useNeoFeed';
import { colors, spacing, fontSize } from './theme';
import { Starfield } from './components/Starfield';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { DatePickerRow } from './components/DatePickerRow';
import { NeoListItem } from './components/NeoListItem';

export default function App() {
 const [selectedDate, setSelectedDate] = useState<Date>(new Date());

 const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
   if(date){
     setSelectedDate(date)
   }
 }

 const { neos, loading, refreshing, error, refetch } = useNeoFeed(selectedDate)

  
  return ( 
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Starfield />
        <StatusBar style="light" />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} accessibilityLabel="Loading near-Earth objects" />
          </View>
        )}
        {error && <ErrorState error={error} />}
        {!loading && !error && (
          <>
            <DatePickerRow selectedDate={selectedDate} onDateChange={onDateChange} />
            <Text style={styles.title}>Asteroid Watch</Text>
            {neos.length > 0 && (
              <Text style={styles.dateText}>
                {neos.length} objects approaching Earth{'\n'} ({selectedDate.toDateString()})
              </Text>
            )}
            <FlatList
              data={neos}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <NeoListItem neo={item}/>}
              style={styles.list}
              ListEmptyComponent={<EmptyState />}
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
    fontStyle: 'italic',
    color: colors.accent,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
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
  }
});

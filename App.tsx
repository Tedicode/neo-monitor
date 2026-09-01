import { useState } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNeoFeed } from './hooks/useNeoFeed';
import { FlatList } from 'react-native';
import { NeoListItem } from './components/NeoListItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

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
      {loading && <ActivityIndicator size="large" accessibilityLabel="Loading near-Earth objects" />}
{error && <Text>Error: {error}</Text>}
{!loading && !error && (
  <>
    <Text style={styles.title}>Asteroid Monitor</Text>
    <DateTimePicker value={selectedDate} mode="date" onChange={onDateChange} accessibilityLabel="Select date to view near-Earth objects"/>
    <Text style={styles.dateText}>{neos.length} objects found near Earth on {selectedDate.toDateString()}</Text>
    <FlatList
      data={neos}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <NeoListItem neo={item}/>}
      style={{width: '100%', flex: 1}}
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
   backgroundColor: 'lightpink',
   alignItems: 'center',
   justifyContent: 'flex-start',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   color: 'black',
   textAlign: 'center',
   marginBottom: 20
 },
 subtitle: {
   fontSize: 16,
   color: 'white',
   textAlign: 'center',
   marginBottom: 20,
 },
 dateText: {
   fontSize: 16,
   color: 'black',
   textAlign: 'center',
   margin: 20,
 },
});

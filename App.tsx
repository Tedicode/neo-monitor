import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNeoFeed } from './hooks/useNeoFeed';

export default function App() {
 const[selectedDate, setSelectedDate] = useState<Date>(new Date());

 const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
   if(date){
     setSelectedDate(date)
   }
 }

const { neos, loading, error } = useNeoFeed(selectedDate)  

  
  return ( 
    <View style={styles.container}>
      {loading && <Text>Loading</Text>}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && (
        <>
     
          <Text style={styles.title}>Asteroid Monitor</Text>
          <Text style={styles.subtitle}>Powered by NASA’s Open APIs</Text>
          <Text style={styles.dateText}>{neos.length} objects found near Earth on {selectedDate.toDateString()}</Text>
          <DateTimePicker value={selectedDate} mode="date" onChange={onDateChange} />
        </>
      )}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'lightpink',
   alignItems: 'center',
   justifyContent: 'center',
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

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function App() {
 const[selectedDate, setSelectedDate] = useState<Date>(new Date());

 const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
   if(date){
     setSelectedDate(date)
   }
 }
 const apiKey = process.env.EXPO_PUBLIC_NASA_API_KEY;
  // const apiKey = 'an invalid api key';

  function formatDateForApi(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

 const fetchAsteroids = async (date: Date) => {
  
   const dateString = formatDateForApi(date)

   try {
     const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateString}&end_date=${dateString}&api_key=${apiKey}`);
     return response;
   } catch (error) {
     console.error('Error fetching asteroids:', error);
   }
 }

 useEffect(() => {
   fetchAsteroids(selectedDate)
   .then(res => {
     if(!res?.ok) throw new Error(`Error fetching asteroids: ${res?.status}`)
     else return res.json()
   }).then(data => console.log(data))
   .catch(error => {
     console.error(error);
   });
 }, [selectedDate]);

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Near Earth Object Monitor</Text>
     <Text style={styles.subtitle}>Powered by NASA’s Open APIs</Text>
     <Text style={styles.dateText}>View asteroids for: {selectedDate.toDateString()}</Text>
     <DateTimePicker value={selectedDate} mode="date" onChange={onDateChange} />
 
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
   marginBottom: 20,
 },
});

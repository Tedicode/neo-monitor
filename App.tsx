import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function App() {
  const[selectedDate, setSelectedDate] = useState<Date>(new Date());

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if(date){
      setSelectedDate(date)
    }
  }
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

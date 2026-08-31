import {useState, useEffect} from 'react';
import { NearEarthObject } from "../types";



function formatDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useNeoFeed = (date: Date) => {
    const dateString = formatDateForApi(date)
    const [neos, setNeos] = useState<NearEarthObject[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)


    useEffect(() => {
        const apiKey = process.env.EXPO_PUBLIC_NASA_API_KEY;
        // const apiKey = 'an invalid api key';
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateString}&end_date=${dateString}&api_key=${apiKey}`

        setLoading(true)
        setError(null)

        fetch(url)
        .then(res => {
            if(!res?.ok) throw new Error(`Fetching asteroids: ${res?.status}`)
            return res.json()
          })   
          .then(data => setNeos(data.near_earth_objects[dateString] ?? []))
          .catch(error => {
            setError(error.message);
          }).finally(() => setLoading(false));

          
        }, [dateString])
        
        return { neos, loading, error }
    

}


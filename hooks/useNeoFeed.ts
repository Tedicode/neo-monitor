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
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const fetchNeos = () => {
        const apiKey = process.env.EXPO_PUBLIC_NASA_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateString}&end_date=${dateString}&api_key=${apiKey}`

        setError(null)

        return fetch(url)
            .then(res => {
                if (!res?.ok) throw new Error(`Fetching asteroids: ${res?.status}`)
                return res.json()
            })
            .then(data => setNeos(data.near_earth_objects[dateString] ?? []))
            .catch(error => {
                setError(error.message);
            });
    }

    useEffect(() => {
        setLoading(true)
        fetchNeos().finally(() => setLoading(false))
    }, [dateString])

    const refetch = () => {
        setRefreshing(true)
        fetchNeos().finally(() => setRefreshing(false))
    }

    return { neos, loading, refreshing, error, refetch }
}
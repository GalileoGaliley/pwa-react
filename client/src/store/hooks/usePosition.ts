import { useState, useEffect } from 'react';

export const usePosition = () => {
  const [position, setPosition] = useState<{lat: number, lon: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setPosition({lat: latitude, lon: longitude})
    }, ({message}) => {
      setError(message)
    });
  }, []);

  return {data: position, error: error };
}

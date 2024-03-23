import { useState, useEffect } from 'react';

export interface PosData {lat: number, lon: number }
export const usePosition = () => {
  const [position, setPosition] = useState<PosData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }
    const onChange = ({lat, lon}: PosData) => {
      setPosition({lat, lon});
    };
    const onError = (err: string) => {
      setError(err);
    };
    const watcher =
      geo.watchPosition((data) =>
        onChange({
          lat: data.coords.latitude,
          lon: data.coords.longitude
        }),
        (err) => onError(err.message)
      );

    return () => geo.clearWatch(watcher);
  }, []);

  return {data: position, error: error };
}

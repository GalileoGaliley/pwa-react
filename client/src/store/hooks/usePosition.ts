
export const usePosition = ({setPosition, setError}:{setPosition: any, setError: any}) => {

  const interval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setPosition({lat: latitude, lon: longitude})
    }, ({message}) => {
      setError(message)
    });
  }, 1000)
  return interval;
}

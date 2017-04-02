import { AppRegistry } from 'react-native';

export async function getGeolocation(): Promise<Coordinates> {
  return new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => { resolve(position.coords); },
      (error) => { reject(error); },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  });
}
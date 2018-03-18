import { PermissionsAndroid } from 'react-native';

export default async function requestGeoLocation() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ShipNow Location Permission',
        'message': 'Location required to use app.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use geolocation")
    } else {
      console.log("Geolocation permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

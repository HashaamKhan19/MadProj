import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
  Platform,
  Alert,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Callout,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

export default function App() {
  const [cordinates, setCordinates] = useState([
    {
      name: 1,
      latitude: 33.67634176447553,
      longitude: 73.14546229002697,
      image: require('../assets/nursery/nursery1.jpg'),
    },
    {
      name: 2,
      latitude: 33.66991587115518,
      longitude: 73.14886928696632,
      image: require('../assets/nursery/nursery2.jpg'),
    },
    {
      name: 3,
      latitude: 33.65079263383125,
      longitude: 73.1409451235657,
      image: require('../assets/nursery/nursery4.jpg'),
    },
    {
      name: 4,
      latitude: 33.647184589465844,
      longitude: 73.1394856451605,
      image: require('../assets/nursery/nursery5.jpg'),
    },
    {
      name: 5,
      latitude: 33.6382184744302,
      longitude: 73.14161883127173,
      image: require('../assets/nursery/nursery6.jpg'),
    },
    {
      name: 6,
      latitude: 33.62819214345509,
      longitude: 73.1498572906066,
      image: require('../assets/nursery/nursery1.jpg'),
    },
    {
      name: 7,
      latitude: 33.69345841840744,
      longitude: 73.2141190018706,
      image: require('../assets/nursery/nursery4.jpg'),
    },
  ]);

  const [initialPosition, setInitialPosition] = useState(null);
  // componentDidMount = () => {
  //   requestLocationPermission();
  // };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (response === 'granted') {
        locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);
      if (response === 'granted') {
        locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        setInitialPosition(region);
      },
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 10000000000000000000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        // ref={map => {
        //   _map = map;
        // }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={initialPosition}>
        <Polygon coordinates={cordinates} fillColor={'rgba(100,100,200,0.3)'} />
        <Marker
          coordinate={{
            latitude: 33.656815,
            longitude: 73.15726,
          }}
          title={'Home'}
        />

        {cordinates.map((markers, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: markers.latitude,
                longitude: markers.longitude,
              }}>
              <Callout>
                <Text style={{color: 'black'}}>Nursery</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 850,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

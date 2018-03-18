import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MyOrdersComponent extends Component {

  constructor() {
    super();
    this.state = this.getInitialState();
    this.drone = {
      title: 'Package',
      latlng: {
        latitude: 49.1371497,
        longitude: -123.1674575
      },
      description: 'Bleh'
    }
  }

  getInitialState() {
  return {
    region: {
      latitude: 49.2634490,
      longitude: -123.1382215,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
        latlng: {
          latitude: 49.2634490,
          longitude: -123.1382215
        },
        title: 'You are here',
        description: 'This is your current location'
      },
      {
        latlng: {
          latitude: 49.1371497,
          longitude: -123.1674575
        },
        title: `Gary's actual house`,
        description: 'I know where you live'
      }
    ]
  };
}

getPackageLocation = async () =>{
  fetch( 'http://10.104.11.145:3000/packageLocation/1', {
    method: 'GET',
  })
  .then( response => response.json() )
  .then( ( { status, lat: latitude, long: longitude, availability } )=>{
    if (status == "arrived") console.log(status);
    else {console.log( availability );
    this.drone = {
      title: 'Package',
      description: 'Your package location',
      latlng: {
        latitude,
        longitude
      }
    };
  }
  } );
}

onRegionChangeComplete(region) {
  this.getPackageLocation();
  // this.drone = {
  //   title: 'PackageChanged',
  //   latlng: {
  //     latitude: region.latitude,
  //     longitude: region.longitude
  //   },
  //   description: 'Blehh'
  // }
  this.setState({ region });
}

render() {

  return (
    <Container>
    <View style={ styles.container }>
    <MapView
    style={styles.map}
    region={this.state.region}
    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
    <Marker
      coordinate={this.state.markers[0].latlng}
      title={this.state.markers[0].title}
      description={this.state.markers[0].description}/>
    <Marker
      coordinate={this.drone.latlng}
      title={this.drone.title}
      description={this.drone.description}/>
      </MapView>
    </View>
    <Button onPress={this.getPackageLocation} title='Track Package'/>
    </Container>
  );
  }

componentDidMount() {
this.interval = setInterval(() => {
  console.log('should get package location')
  this.getPackageLocation()
}, 1000);
}
componentWillUnmount() {
clearInterval(this.interval);
}

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

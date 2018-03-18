import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import SERVER_IP from './ip';

var droneImage = require('./images/drone.png')

export default class OrdersMapComponent extends Component {

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
    this.orderId;
    this.orderLat;
    this.orderLon;
    this.floor;
    this.stationPath = [];
    this.consumerPath = [];
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
    console.log( '(orders-map) getting package location for orderId =', this.orderId);
    fetch(`http://${ SERVER_IP }:3000/packageLocation/${ this.orderId }`, {
      method: 'GET',
    })
    .then( response => response.json() )
    .then( ( { status, lat: latitude, long: longitude, availability } )=>{
      if (status == "arrived") console.log(status);
      else {
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

  getDronePath = async () =>{

    console.log( 'order lat =', this.orderLat )
    console.log( 'order lon =', this.orderLon )

    fetch( `http://${ SERVER_IP }:3000/getPaths?lat=${ this.orderLat }&long=${ this.orderLon }`, {
      method: 'GET'
    } )
    .then( response => response.json() )
    .then( response=> {
    this.stationPath
      = response.stationToWarehousePath
        .map( ( { lat: latitude, long: longitude } )=>( { latitude, longitude } ) );
    this.consumerPath
      = response.warehouseToConsumerPath
        .map( ( { lat, long } )=>( { latitude: parseFloat( lat ), longitude: parseFloat( long ) } ) );
    console.log(this.consumerPath);
  } );
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  render() {

    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    this.orderId = params.order.orderId;
    this.orderLat = params.order.lat;
    this.orderLon = params.order.long;
    this.floor = Math.floor( params.order.alt / 15 )

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
        description={this.drone.description}
        image={droneImage}
        centerOffset={{x:-15, y:-10}}
        anchor={{x:0.5, y:0.5}}/>
      <Polyline
       coordinates={this.stationPath}
       strokeWidth={2}
       strokeColor="#283be2"
      />
      <Polyline
       coordinates={this.consumerPath}
       strokeWidth={2}
       strokeColor="#283be2"
      />
        </MapView>
      </View>
      <Button onPress={this.getDronePath.bind(this)} title='Track Package'/>
      <View style={{marginTop: 400, marginLeft: 75}}><Text style={{fontSize: 36}}>Drone to arrive on floor {this.floor}</Text></View>
      </Container>
    );
    }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getPackageLocation()
      this.setState( this.state );
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

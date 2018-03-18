import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default class ItemDetailComponent extends Component {

  render() {

    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles.container}>
      <MapView
      style={styles.map}
      region={{
        latitude: 49.154888,
        longitude: -123.08190,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}}>
        </MapView>
  </View>
    );
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

import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Button, Image, View } from 'react-native';
import MapView from 'react-native-maps';

export default class ItemDetailComponent extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;

    placeOrder = async () =>{
      fetch( 'http://10.104.11.145:3000/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: 123,
          long: 123,
          alt: 100
        } )
      } )
      .then( ( response )=>{
        console.log( response.json() )
      } )
      .catch( ( error )=>{
        console.log( error );
      } );
    }

    return (
      <Container>

      </Container>
    );
  }
}

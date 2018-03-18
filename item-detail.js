import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Button, Image, View } from 'react-native';

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
        <Text>Doge Title</Text>
        <Image source={require('./images/doge.jpg')} style={{ height: 200, width: 200 }} />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: '80%'
          }}
        />  
        <Text>Doge Babies</Text>
        <Button onPress={placeOrder} title="Ship To Me" color="#f0c14b"/>
      </Container>
    );
  }
}
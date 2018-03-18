import React, { Component } from 'react';
import { Title, Container, Text, Header, Body, Footer, Content, Left, Center } from 'native-base';
import { Button, Image, View } from 'react-native';

export default class ItemDetailComponent extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    placeOrder = async (item) => {
      // item not used for the placing of order

      fetch('http://10.104.11.145:3000/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: 123,
          long: 123,
          alt: 100
        })
      })
        .then((response) => {

          const orderId = response;
          // store orderId 
          console.log('Storing order of item=', item, 'as orderid=', orderId);
          return AsyncStorage.setItem(orderId, item);

        })
        .then(() => {

          console.log('--Finished storing order in local database--');

        })
        .catch((error) => {
          console.log(error);
        });
    }

    let item = params.item;
    if (!item) {
      item = {
        name: 'Item Not Found'
      }
    }

    return (
      <Container>
        <View>
          <Text>{' '}</Text>
          <Text>{params ? item.name : 'Item Not Found'}</Text>
          <Text>{' '}</Text>

          <Image
            style={{ flex: 1, height: undefined, width: undefined }}
            source={{ uri: item.url }}
            resizeMode="contain" />

          <Text>{' '}</Text>
          <Text>{' '}</Text>
          <Text>{' '}</Text>
          <Text>{' '}</Text>

          <Text>Note: Not eligible for Optimus Prime. Offers with free Prime shipping available from other sellers.</Text>
          <Text>In Stock.</Text>
          <Text>Get it as soon as April 10 - May 1 when you choose Standard Shipping at checkout.</Text>
          <Text>Ships from and sold by Nomads.</Text>
          <Text>{' '}</Text>
          <Text>Deliver to Arthur Lee - Vancouver V8C 5D9</Text>
        </View>

        <Button onPress={placeOrder.bind(null, item)} title="Ship To Me" color="#f0c14b" style={{ height: '100px' }} />
      </Container>
    );
  }
}
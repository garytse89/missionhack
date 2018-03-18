import React, { Component } from 'react';
import { Title, Container, Text, Header, Body, Footer, Content, Left, Center } from 'native-base';
import { AsyncStorage, Button, Image, View } from 'react-native';

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
        .then((response) => response.text())
        .then((responseText)=>{

          console.log('RESPONSE.TEXT', responseText );

          const orderId = responseText;
          // store orderId 
          console.log('Storing the order of item=', item.name, 'as orderid=', orderId);
          return AsyncStorage.setItem(orderId, item.name);

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
      <Container style={{ padding: 10, backgroundColor: '#fff' }}>
        <View>
          <Text>{' '}</Text>
          <Text style={{ fontSize: 20 }}>{params ? item.name : 'Item Not Found'}</Text>
          <Text>{' '}</Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: -20 }}>
          <Image
            source={item.image}
            resizeMode="contain" />
        </View>
        <View>

          <Text>{' '}</Text>
          <Text>{' '}</Text>
          <Text>{' '}</Text>
          <Text>{' '}</Text>

          <View style={{
            paddingBottom: 5 }}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Note:</Text> Not eligible for Optimus Prime. Offers with free Prime shipping available from other sellers.
            </Text>
          </View>
          
          <View style={{
            paddingBottom: 5
          }}>
            <Text style={{ fontSize: 18, color: 'green' }}>In Stock.</Text>
          </View>
          
          <View style={{
            paddingBottom: 5
          }}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Get it as soon as April 10 - May 1</Text> when you choose Standard Shipping at checkout.
            </Text>
          </View>

          <Text>Ships from and sold by <Text style={{ color: 'blue' }}>Nomads</Text>.</Text>
          <Text>{' '}</Text>
          <Text style={{ color: 'blue' }}>Deliver to Arthur Lee - Vancouver V8C 5D9</Text>
        </View>
        
        <View style={{ padding: 10 }}>
          <Button onPress={placeOrder.bind(null, item)} title="Ship To Me" color="#f0c14b" style={{ height: '100px' }} />
        </View>
      </Container>
    );
  }
}
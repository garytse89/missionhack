import React, { Component } from 'react';
import { Title, Container, Text, Header, Body, Footer, Content, Left, Center } from 'native-base';
import { AsyncStorage, Button, Image, View, ToastAndroid } from 'react-native';
import SERVER_IP from './ip';

export default class ItemDetailComponent extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const gl = navigator.geolocation;

    placeOrder = async (item) => {
      gl.getCurrentPosition( ( { coords } )=>{
        console.log('Success!', coords.latitude, coords.longitude, coords.altitude )

        fetch(`http://${ SERVER_IP }:3000/placeOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: coords.latitude,
            long: coords.longitude,
            alt: coords.altitude
          })
        })
          .then((response) => response.json())
          .then((responseText)=>{
          const orderId = responseText.toString();
          // store orderId
          console.log('Storing the order of item=', item.name, 'as orderid=', orderId);
          return AsyncStorage.setItem(orderId, JSON.stringify( {
            orderId,
            itemName: item.name,
            lat: coords.latitude,
            long: coords.longitude,
            alt: coords.altitude
          } ) );
        })
        .then(() => {

          console.log('--Finished storing order in local database--');
          ToastAndroid.show('You have ordered a ' + item.name + ', it should be arriving shortly by flight!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          )
        })
          .catch(console.log);

    } ) }

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

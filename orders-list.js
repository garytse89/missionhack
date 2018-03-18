import React, { Component } from 'react';
import { Body, Button, Left, Right, Card, CardItem, Icon, List, ListItem, Container, Image, Text, Thumbnail } from 'native-base';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Items from './Items';
import MapView, { Marker } from 'react-native-maps';

export default class OrderListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentWillMount() {
        console.log('componentwillmount')
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            let keys = await AsyncStorage.getAllKeys();
            console.log('keys=',keys);
            let orders = await AsyncStorage.multiGet( keys );
            console.log('orders=', orders);
            Object.assign( this.state, { orders, loaded: true } );

            console.log('state after load', this.state);
            
            this.forceUpdate()
        } catch (error) {
            console.error( error );
        }
    };

  render() {

    if (!this.state.loaded) {
        return (
            <View><Text>Loading...</Text></View>
        );
    }

    const orderCards = [];

    for( let i=0; i<this.state.orders.length; i++ ){

        const order = this.state.orders[ i ];
        const [ orderId, itemName ] = order;

        const itemImage = Items.find( ( { name } )=>name === itemName ).image;

        orderCards.push(
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail small source={ itemImage } />
                    </Left>
                    <Body>
                        <Text>{itemName}</Text>
                        <Text note>Order #{orderId}</Text>
                    </Body>
                    <Right>
                        <Icon style={{ color: '#000' }} name="ios-arrow-forward-outline" />
                    </Right>
                </CardItem>
            </Card>
        );
    }

    return (
        <Container>
            { orderCards }
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

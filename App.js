import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';
import OrdersMapComponent from './orders-map';
import OrdersListComponent from './orders-list';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';

import {
  DrawerNavigator, navigationOptions, StackNavigator
} from 'react-navigation';

const Stacc = StackNavigator({
  Home: {
    screen: ShoppingListComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',  // Title to appear in status bar
      headerLeft: <Icon name="menu" size={35} onPress={() => navigation.navigate('DrawerOpen')} />
    })
  },
  Item: {
    screen: ItemDetailComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'View Item',  // Title to appear in status bar
      headerLeft: <Icon name="menu" size={35} onPress={() => navigation.navigate('DrawerOpen')} />
    })
  }
});

const OrderStack = StackNavigator({
  List: {
    screen: OrdersListComponent,
    navigationOptions: ({ navigation }) =>({
      title: 'My Orders',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') } />
    })
  },
  Map: {
    screen: OrdersMapComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Tracking',
      headerLeft: <Icon name="menu" size={35} onPress={() => navigation.navigate('DrawerOpen')} />
    })
  }
});

const Navigation = DrawerNavigator({
  Home: {
    screen: Stacc,
    navigationOptions: {
      title: 'Home' // Text shown in left menu
    }
  },
  // Item: {
  //   screen: ItemStack,
  //   navigationOptions: {
  //     title: 'Items'  // Text shown in left menu
  //   }
  // },
  Order: {
    screen: OrderStack,
    navigationOptions: {
      title: 'My Orders'
    }
  }
});


class App extends Component {
  render() {
    return (
      <Navigation></Navigation>
    );
  }
}

export default App;

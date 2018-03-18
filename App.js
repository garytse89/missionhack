import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Left, Header, Content, Title, Button, Right,
  Body, Item, Icon, Input, Text, Container } from 'native-base';

import {
  DrawerNavigator, navigationOptions, StackNavigator
} from 'react-navigation';

const ItemStack = StackNavigator({
  Item: {
    screen: ItemDetailComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Items',  // Title to appear in status bar
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') } />
    })
  }
});

const HomeStack = StackNavigator({
  Home: {
    screen: ShoppingListComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',  // Title to appear in status bar
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') } />
    })
  }
});

const Navigation = DrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: 'Home' // Text shown in left menu
    }
  },
  Item: {
    screen: ItemStack,
    navigationOptions: {
      title: 'Items',  // Text shown in left menu
    }
  }
});


class App extends Component {
  //
  // toggleDrawer() {
  //   // drawerPosition = drawerPosition == 'left' ? 'right' : 'left';
  //   ItemStack;
  // }

  render() {
    return (
      <Navigation></Navigation>
    );
  }
}

export default App;

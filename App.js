import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';

import React, { Component } from 'react';
import { Button } from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

const Navigation = StackNavigator({
  Home: { screen: ShoppingListComponent },
  Item: { screen: ItemDetailComponent }
});

class App extends Component {
  render() {
    return <Navigation />;
  }
}

export default App;
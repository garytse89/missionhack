import React, { Component } from 'react';

import {
  StackNavigator,
} from 'react-navigation';

import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';

const App = StackNavigator({
  Home: { screen: ShoppingListComponent }, // HOME
  Item: { screen: ItemDetailComponent }
});

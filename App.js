import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Left, Header, Content, Title, Button, Right,
  Body, Item, Icon, Input, Text, Container } from 'native-base';


import {
  DrawerNavigator,
} from 'react-navigation';

const Navigation = DrawerNavigator({
  Home: { screen: ShoppingListComponent },
  Item: { screen: ItemDetailComponent }
});

class App extends Component {

  toggleDrawer() {
    console.log('button pressed');
  }

  render() {
    return (
      <Container>
        <Header style={{justifyContent: 'flex-start' }}>
          <Left>
            <Button iconLeft onPress={()=>this.toggleDrawer()} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
        </Header>
        <Navigation>
        </Navigation>
      </Container>
    );
  }
}

export default App;

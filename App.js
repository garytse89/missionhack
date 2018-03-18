import ShoppingListComponent from './shopping-list';
import ItemDetailComponent from './item-detail';

import React, { Component } from 'react';
// import { Button } from 'react-native';
import { Left, Header, Content, Title, Button,
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
      <Header>
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

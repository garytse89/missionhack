import React, { Component } from 'react';
import { Left, Container, Header, Content, Title, Body, Item, Button, Icon, Input, Text } from 'native-base';
import { List, ListItem, Thumbnail } from 'native-base';
import { StyleSheet, View} from 'react-native';

import Items from './Items';

export default class ShoppingListComponent extends Component {

  viewItem( item ) {
    const { navigate } = this.props.navigation;
    navigate( 'Item', { item } )
  }

  render() {
    return (
      <Container style={{
        backgroundColor: '#fff'
      }}>
      <Header><View><Text style={styles.titleText}>Our drones deliver right to you</Text>
      <Text style={styles.baseText}>Anywhere, any time, any floor</Text></View></Header>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-cart" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <List dataArray={Items}
            renderRow={(item) =>
              <ListItem onPress={this.viewItem.bind(this, item)}>
                <Thumbnail square source={item.image} />
                <Text>{'    ' + item.name}</Text>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    color:'#fff',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
});

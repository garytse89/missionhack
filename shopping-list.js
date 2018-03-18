import React, { Component } from 'react';
import { Left, Container, Header, Content, Title, Body, Item, Button, Icon, Input, Text } from 'native-base';
import { List, ListItem, Thumbnail } from 'native-base';
import { StyleSheet, View, ScrollView } from 'react-native';

export default class ShoppingListComponent extends Component {

  viewItem( itemName ) {
    const { navigate } = this.props.navigation;
    console.log( 'sending', itemName );
    navigate( 'Item', { itemName: itemName } )
  }

  render() {
    return (
      <Container>
      <Header><View><Text style={styles.titleText}>Our drones deliver right to you</Text>
      <Text style={styles.baseText}>Anywhere, any time, any floor</Text></View></Header>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <List>
            <ListItem onPress={ this.viewItem.bind(this, 'HairDryer') }>
              <Thumbnail square size={80} source={ require('./images/HairDryer.png') } />
              <Body>
                <Text>Hair Dryer</Text>
              </Body>
            </ListItem>
            <ListItem onPress={ this.viewItem.bind(this, 'Headphones') }>
              <Thumbnail square size={80} source={require('./images/Headphones.png')} />
              <Body>
                <Text>Headphones</Text>
              </Body>
            </ListItem>
            <ListItem onPress={ this.viewItem.bind(this, 'Phone') }>
              <Thumbnail square size={80} source={require('./images/Phone.png')} />
              <Body>
                <Text>Phone</Text>
              </Body>
            </ListItem>
            <ListItem onPress={ this.viewItem.bind(this, 'Router') }>
              <Thumbnail square size={80} source={require('./images/Router.png')} />
              <Body>
                <Text>Router</Text>
              </Body>
            </ListItem>
            <ListItem onPress={ this.viewItem.bind(this, 'Vacuum') }>
              <Thumbnail square size={80} source={require('./images/Vacuum.png')} />
              <Body>
                <Text>Vacuum</Text>
              </Body>
            </ListItem>
                        <ListItem onPress={ this.viewItem.bind(this, 'Shoes') }>
                          <Thumbnail square size={80} source={require('./images/shoes.png')} />
                          <Body>
                            <Text>Shoes</Text>
                          </Body>
                        </ListItem>
                                    <ListItem onPress={ this.viewItem.bind(this, 'MacBook') }>
                                      <Thumbnail square size={80} source={require('./images/macbookpro.png')} />
                                      <Body>
                                        <Text>MacBook</Text>
                                      </Body>
                                    </ListItem>
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

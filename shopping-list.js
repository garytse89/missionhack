import React, { Component } from 'react';
import { Left, Container, Header, Content, Title, Body, Item, Button, Icon, Input, Text } from 'native-base';
import { List, ListItem, Thumbnail } from 'native-base';

export default class ShoppingListComponent extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
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
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'https://www.weshareapps.com/wp-content/uploads/2017/06/unnamed-4-52.png' }} />
              <Body>
                <Text>Anna</Text>
                <Text note>Just Nomad Things.</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
              <Body>
                <Text>Shri</Text>
                <Text note></Text>
              </Body>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
              <Body>
                <Text>Gary</Text>
                <Text note>Its time to build a difference . .</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
              <Body>
                <Text>Will</Text>
                <Text note>Its time to build a difference . .</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
              <Body>
                <Text>Gary</Text>
                <Text note>Its time to build a difference . .</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

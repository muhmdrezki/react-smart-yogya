import React, { Component } from 'react';
import { Container, H2, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
export default class SettingsPage extends Component {
  render() {
    const titlePage = {
      marginTop: '4%',
      marginBottom: '3%',
      marginLeft: '4%',
      fontWeight: '100',
      fontFamily : Platform.OS === 'android' ? 'sans-serif-light' : undefined
    };
    return (
      <Container>
        <Content>
          <H2 style={titlePage}> Pengaturan </H2>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF0000" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="power" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
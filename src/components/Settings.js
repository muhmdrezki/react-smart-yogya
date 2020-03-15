import React, { Component } from 'react';
import {Alert} from 'react-native';
import { Container, H2, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class Settings extends Component {

  constructor(props) {
    super(props);
    
  }

  logout() {
    Alert.alert(
      'Warning',
      'Yakin akan logout ?',
      [
        {text: 'Tidak'},
        {text: 'OK', onPress: () => this.logoutProcess()},
      ],
      {cancelable: false},
    );
  }

  logoutProcess() {
    AsyncStorage.removeItem('token', (err, res) => {
      this.props.navigation.navigate("Login")
    });
  }

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
          <ListItem icon onPress={this.logout.bind(this)}>
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
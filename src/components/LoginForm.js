import React, { Component } from 'react'
import { Container, Header, Content, Input, Item, Button, Body, Toast, Label, Text } from 'native-base';

import { API_URL } from 'react-native-dotenv'

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default class FormLogin extends Component {
  
  constructor(props) {
    super(props);
    // Form Handling
    this.emailInput = this.emailInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }
    
  /**
   * Form Handling 
   */
  emailInput(value) {
    this.setState({ email : value });
  }
  passwordInput(value) {
    this.setState({ password: value });
  }

  showToast(text, btnText, type) {
    Toast.show({
      text: text,
      buttonText: btnText,
      type: type
    })
  }

  login() {
    axios.post(API_URL + 'login', {
      'email' : this.state.email,
      'password' : this.state.password
    }, '')
    .then(res => {
      if(res.data.token) {
        alert('Login Berhasil');
        navigation.navigate("Home");
      }
    }).catch(err => {
      alert(err);
    });
  }

  render() {
    /* styling */
    const appContainer = {
      padding : '5%'
    };
    const formControl = {
      marginBottom : '5%'
    };
    /* styling */
    /* jsx */
    return (
      <Container>
        <Content style={appContainer}>
          <Item stackedLabel style={formControl}>
            <Label> Email </Label>
            <Input onChangeText={this.emailInput}/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Password </Label>
            <Input secureTextEntry onChangeText={this.passwordInput}/>
          </Item>
          <Button onPress={this.login.bind(this)} rounded block primary title="Login" style={{ marginBottom: '5%' }}><Text>Login</Text></Button>
          {/* <ToHome screenName="Home"/> */}
          <ToRegister screenName="Register"/>
        </Content>
      </Container>
    )
    /* jsx */
  }
}

function ToRegister({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button bordered rounded block primary title="Register" 
    onPress={() => navigation.navigate(screenName)}><Text>Register</Text></Button>
  );
}

function ToHome({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button rounded block primary title="Login"
    onPress={() => navigation.navigate(screenName)} style={{ marginBottom: '5%' }}><Text>Login</Text></Button>
  );
}
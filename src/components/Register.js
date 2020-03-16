import React, { Component } from 'react'
import { Container, Header, Content, Input, Item, Button, Body, Title, Label, Text } from 'native-base';

import { API_URL } from 'react-native-dotenv'

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.nameInput = this.nameInput.bind(this);
    this.cityInput = this.cityInput.bind(this);
    this.emailInput = this.emailInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.confPasswordInput = this.confPasswordInput.bind(this);
    this.state = {
      name: '',
      city: '',
      email: '',
      password: '',
      confirm_password: ''
    };
  }

    /**
   * Form Handling 
   */
  nameInput(value) {
    this.setState({ name : value });
  }
  cityInput(value) {
    this.setState({ city : value });
  }
  emailInput(value) {
    this.setState({ email: value });
  }
  passwordInput(value) {
    this.setState({ password: value });
  }
  confPasswordInput(value) {
    this.setState({ confirm_password: value });
  }

  register() {
    axios.post(API_URL + 'register', {
      'name' : this.state.name,
      'city' : this.state.city,
      'email' : this.state.email,
      'password' : this.state.password,
      'password_confirmation' : this.state.confirm_password
    }, '')
    .then(res => {
      if(res.data.token) {
        this.storeData(res.data.token);        
      }
    }).catch(err => {
      alert(err);
    });
  }

  storeData = async(token) => {
    try {
      await AsyncStorage.setItem('token', token);
      alert('Register Berhasil')
      this.props.navigation.navigate("Home");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
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
            <Label> Name </Label>
            <Input onChangeText={this.nameInput}/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> City </Label>
            <Input onChangeText={this.cityInput}/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Email </Label>
            <Input onChangeText={this.emailInput}/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Password </Label>
            <Input secureTextEntry onChangeText={this.passwordInput}/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Confirm Password </Label>
            <Input secureTextEntry onChangeText={this.confPasswordInput}/>
          </Item>
          <Button onPress={this.register.bind(this)} rounded block danger style={formControl}><Text> Register </Text></Button>
        </Content>
      </Container>
    )
    /* jsx */
  }
}
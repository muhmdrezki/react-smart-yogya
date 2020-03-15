/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import { Container } from 'native-base';

import LoginPage from "./src/pages/LoginPage";
import Register from "./src/pages/Signup";
import Home from "./src/pages/HomePage";

class HomeScreen extends Component {
  render() {
    return (
      <Home navigation={this.props.navigation}/>
    );
  }
}

class LoginScreen extends Component {
  render() {
    return (
      <LoginPage navigation={this.props.navigation}/>
    );
  }
}

class RegisterScreen extends Component {
  render() {
    return (
      <Register/>
    );
  }
}

const stack = createStackNavigator();
export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  };
  render() {
    return (
      <Container>
        <NavigationContainer>
          <stack.Navigator screenOptions={{ 
            headerStyle: {
              backgroundColor: '#c22b2b',
            },
            headerTintColor: '#fff',
          }}>
          <stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
          <stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }}/>
          <stack.Screen name="Home" component={HomeScreen} 
            options={{ 
              headerTitleStyle: { fontSize: 25,
                fontFamily : Platform.OS === 'android' ? 'sans-serif-light' : undefined
              },
              title: "YOGYAKARTA SMART CITY",
              headerTitleAlign:"center",
              headerLeft: null
            }}
          />
          </stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}

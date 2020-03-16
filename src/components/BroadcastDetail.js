import React, { Component } from 'react';
import {Alert, Image} from 'react-native';
import { Container, H2, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export default class BroadcastDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      broadcast : ''
    }
  }

  getBroadcast() {
    AsyncStorage.getItem('token', (err, token) => {
      AsyncStorage.getItem('broadcastId', (err, res) => {
          var config = {
            headers : {
              "Authorization" : "Bearer " + token
            }
          }
          if(res) {
            axios.get( API_URL + "broadcast/" + res, config)
            .then(res => {
              if(res.data.status) {
                this.setState({ broadcast: res.data.data });
              }
            }).catch(err => {
              alert(err);
            })
          }
      });
   
    });
  }

  componentDidMount() {
    this.getBroadcast()
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
          <View>
            <Image source={{uri: this.state.broadcast.image}} style={{height: 350, width: null, flex: 1}}/>
          </View>
          <H2 style={titlePage}>{ this.state.broadcast.title }</H2>
          <Text style={{ marginLeft: '5%' }}>By Admin</Text>
          <Text style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}>{ this.state.broadcast.body }</Text>
        </Content>
      </Container>
    );
  }
}
import React, { Component } from 'react';
import {Alert, Image} from 'react-native';
import { Container, H2, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, View } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export default class ArticleDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article : ''
    }
  }

  getArticle() {
    AsyncStorage.getItem('token', (err, token) => {
      AsyncStorage.getItem('articleId', (err, res) => {
          var config = {
            headers : {
              "Authorization" : "Bearer " + token
            }
          }
          if(res) {
            axios.get( API_URL + "article/" + res, config)
            .then(res => {
              if(res.data.status) {
                this.setState({ article: res.data.data });
              }
            }).catch(err => {
              alert(err);
            })
          }
      });
   
    });
  }

  componentDidMount() {
    this.getArticle()
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
            <Image source={{uri: this.state.article.image}} style={{height: 350, width: null, flex: 1}}/>
          </View>
          <H2 style={titlePage}>{ this.state.article.title }</H2>
          <Text style={{ marginLeft: '5%' }}>By Admin</Text>
          <Text style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}>{ this.state.article.body }</Text>
          </Content>
      </Container>
    );
  }
}
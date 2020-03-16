import React, { Component } from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import { Container, H2, Spinner, Content, Button, ListItem, Text, Left, Body, Right, List, Thumbnail } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export default class BroadcastPage extends Component {

  getBroadCast() {
    AsyncStorage.getItem('token', (err, result) => {
      var config = {
        headers : {
          "Authorization" : "Bearer " + result
        }
      }
      axios.get( API_URL + 'broadcast', config)
      .then(res => {
        if(res.data.status) {
          this.setState({ broadcast_list : res.data.data });
          this.setState({ broadcast_load : false })
        }
      }).catch(err => {
        alert(err);
      })
    });
  }
  detailBroadcast = async(id) => {
    try {
      await AsyncStorage.setItem('broadcastId', JSON.stringify(id));
      this.props.navigation.navigate("BroadcastDetail");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      broadcast_load: true,
      broadcast_list : [
        { id: 1, image: "https://source.unsplash.com/1280x720/?nature" },
        { id: 2, image: "https://source.unsplash.com/1280x720/?water" },
        { id: 3, image: "https://source.unsplash.com/1280x720/?girl" },
        { id: 4, image: "https://source.unsplash.com/1280x720/?tree" }
      ]
    }
  }

  componentWillMount() {
    this.getBroadCast();  
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
          <H2 style={titlePage}> Pengumuman </H2>
          <ScrollView>
          { this.state.broadcast_load ? <Spinner color="red"/> : this.state.broadcast_list.map((item) => {
            return (
              <List key={item.id}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: item.image }} />
                  </Left>
                  <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{item.body}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <TouchableOpacity onPress={ () => this.detailBroadcast(item.id)}>
                        <Text>Read More </Text>
                      </TouchableOpacity>
                    </Button>
                  </Right>
                </ListItem>
              </List>
              );
            }) }
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
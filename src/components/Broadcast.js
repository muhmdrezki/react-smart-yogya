import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Container, H2, Content, Button, ListItem, Text, Left, Body, Right, List, Thumbnail } from 'native-base';

import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export default class BroadcastPage extends Component {

  getBroadCast() {
    var config = {
      headers : {
        "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveW9neWEudGVjaHNvbHV0aW9uaWQuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTg0MTk3NTQzLCJleHAiOjE1ODQyMDExNDMsIm5iZiI6MTU4NDE5NzU0MywianRpIjoiT3M3T2NGdGtqcjI0blowTSIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.SWLRl2AFKfu7VIKLGu3hygsMPY8c9deGTik0Oyugnzg"
      }
    }
    axios.get( API_URL + 'broadcast', config)
    .then(res => {
      if(res.data.status) {
        this.setState({
          broadcast_list : res.data.data
        });
      }
    }).catch(err => {
      alert(err);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
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
          { this.state.broadcast_list.map((item) => {
            return (
              <List key={item.id}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: item.image }} />
                  </Left>
                  <Body>
                    <Text> {item.title} </Text>
                    <Text note numberOfLines={1}> {item.body} </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>Read More </Text>
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
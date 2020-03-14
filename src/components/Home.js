import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Settings } from 'react-native'; 
import { Container, Content, List, ListItem, Right, Button, H2, Card, CardItem, Left, Thumbnail, Body, Text, Badge, Icon, Footer, FooterTab } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";

import ProfilePage from '../pages/ProfilePage';
import BroadcastPage from '../pages/BroadcastPage';
import SettingsPage from '../pages/SettingsPage';

import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

class MainContent extends Component {

  getArticles() {
    var config = {
      headers : {
        "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveW9neWEudGVjaHNvbHV0aW9uaWQuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTg0MTk3NTQzLCJleHAiOjE1ODQyMDExNDMsIm5iZiI6MTU4NDE5NzU0MywianRpIjoiT3M3T2NGdGtqcjI0blowTSIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.SWLRl2AFKfu7VIKLGu3hygsMPY8c9deGTik0Oyugnzg"
      }
    }
    axios.get( API_URL + 'articles', config)
    .then(res => {
      if(res.data.status) {
        this.setState({
          newest_articles : res.data.data
        });
      }
    }).catch(err => {
      alert(err);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      carousel: [
        "https://source.unsplash.com/1280x720/?nature",
        "https://source.unsplash.com/1280x720/?water",
        "https://source.unsplash.com/1280x720/?girl",
        "https://source.unsplash.com/1280x720/?tree"
      ],
      // newest_articles: [
      //   { id: 1, image: "https://source.unsplash.com/1280x720/?nature" },
      //   { id: 2, image: "https://source.unsplash.com/1280x720/?water" },
      //   { id: 3, image: "https://source.unsplash.com/1280x720/?girl" },
      //   { id: 4, image: "https://source.unsplash.com/1280x720/?tree" }
      // ],
      newest_articles: [],
      other_articles : [
        { id: 1, image: "https://source.unsplash.com/1280x720/?nature" },
        { id: 2, image: "https://source.unsplash.com/1280x720/?water" },
        { id: 3, image: "https://source.unsplash.com/1280x720/?girl" },
        { id: 4, image: "https://source.unsplash.com/1280x720/?tree" },
      ]
    }
  }

  componentWillMount() {
    this.getArticles();
  };

  render() {
    /* styling */
    const titlePage = {
      marginTop: '4%',
      marginBottom: '3%',
      marginLeft: '4%',
      fontWeight: '100',
      fontFamily : Platform.OS === 'android' ? 'sans-serif-light' : undefined
    };
    /* styling */
    return (
      <Content>
        <SliderBox images={this.state.carousel} sliderBoxHeight={250} />
        <H2 style={titlePage}> Artikel Baru </H2>
        <SafeAreaView>
          <ScrollView horizontal>
          { this.state.newest_articles.map((item, index) => {
            return (
              <Card key={item.id}>
                <CardItem cardBody>
                  <Image source={{uri: item.image}} style={{height: 150, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Left>
                    <Body>
                      <Text> { item.title } </Text>
                      <Text note> Article's Body </Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            );
          }) }
          </ScrollView>
        </SafeAreaView>
        <H2 style={titlePage}> Pengumuman Terbaru </H2>
          <ScrollView>
          { this.state.other_articles.map((item, key) => {
            return (
              <List key={item.id}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: item.image }} />
                  </Left>
                  <Body>
                    <Text> Article's Title </Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
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
      );
    }

  }

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_tab: 'home'
    }
  }

  renderSelectedTab() {
    switch (this.state.selected_tab) {
      case 'home' :
        return (<MainContent/>);
        break;
      case 'profile':
        return (<Content><ProfilePage/></Content>);
        break;
      case 'broadcast':
        return (<Content><BroadcastPage/></Content>);
        break;
      case 'setting':
        return (<Content><SettingsPage/></Content>);
        break;
      default:
    }
  }
  
  render() {
    /* jsx */
    return (
      <Container>
          { this.renderSelectedTab() }
          <Footer>
            <FooterTab>
            <Button vertical active={this.state.selected_tab === 'home'}
                onPress={() => this.setState({selected_tab: 'home'})}>
                <Icon name="home" />
                <Text>Beranda</Text>
              </Button>
              <Button vertical active={this.state.selected_tab === 'profile'}
                onPress={() => this.setState({selected_tab: 'profile'})}>
                <Icon name="person" />
                <Text>Profil</Text>
              </Button>
              <Button vertical active={this.state.selected_tab === 'broadcast'}
                 onPress={() => this.setState({selected_tab: 'broadcast'})}>
                <Icon name="ios-megaphone" />
                <Text>Pengumuman</Text>
              </Button>
              <Button vertical active={this.state.selected_tab === 'setting'}
                onPress={() => this.setState({selected_tab: 'setting'})}>
                <Icon active name="settings" />  
                <Text>Pengaturan</Text>
              </Button>
            </FooterTab>
          </Footer>
      </Container>
    )
    /* jsx */
  }
}
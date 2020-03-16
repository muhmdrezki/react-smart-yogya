import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Settings, StyleSheet  } from 'react-native'; 
import { Container, Spinner, Content, List, ListItem, Right, Button, H2, Card, CardItem, Left, Thumbnail, Body, Text, Badge, Icon, Footer, FooterTab } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";

import ProfilePage from '../pages/ProfilePage';
import BroadcastPage from '../pages/BroadcastPage';
import SettingsPage from '../pages/SettingsPage';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { TouchableOpacity } from 'react-native-gesture-handler';

class MainContent extends Component {

  getArticles() {
    AsyncStorage.getItem('token', (err, result) => {
      var config = {
        headers : {
          "Authorization" : "Bearer " + result
        }
      }
      axios.get( API_URL + 'articles', config)
      .then(res => {
        if(res.data.status) {
          this.setState({ newest_articles : res.data.data });
          this.setState({ newest_load: false });
        }
      }).catch(err => {
        if(err.response.status) {
          this.props.navigation.navigate("Login");
        }
      })
    });
  }

  getBroadcast() {
    AsyncStorage.getItem('token', (err, result) => {
      if(result) {
        var config = {
          headers : {
            "Authorization" : "Bearer " + result
          }
        }
        axios.get( API_URL + 'broadcast-home', config).
        then(res => {
          if(res.data.status) {
            this.setState({ other_articles: res.data.data })
            this.setState({ other_load: false });
          }
        }).catch(err => {
          if(err.response.status) {
            this.props.navigation.navigate("Login");
          }
        })
      }
    });
  }

  detail = async(id) => {
    try {
      await AsyncStorage.setItem('articleId', JSON.stringify(id));
      this.props.navigation.navigate("ArticleDetail");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
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
      newest_articles: [],
      newest_load: true,
      other_articles : [],
      other_load: true
    }
  }

  componentWillMount() {
    this.getArticles();
    this.getBroadcast();
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
        { this.state.newest_load ? <Spinner color="red"/> : <SafeAreaView>
          <ScrollView horizontal>
          { this.state.newest_articles.map((item, index) => {
            return (
                <Card key={item.id}>
                  <TouchableOpacity onPress={ () => this.detail(item.id)}>
                    <CardItem cardBody>
                      <Image source={{uri: item.image}} style={{height: 150, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text> { item.truncated_title } </Text>
                          <Text note> { item.truncated_body } </Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
            );
          }) }
          </ScrollView>
        </SafeAreaView> }
        <H2 style={titlePage}> Pengumuman Terbaru </H2>
          <ScrollView>
          { this.state.other_load ? <Spinner color="red"/> : this.state.other_articles.map((item, key) => {
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
        return (<MainContent navigation={this.props.navigation}/>);
        break;
      case 'profile':
        return (<Content><ProfilePage/></Content>);
        break;
      case 'broadcast':
        return (<Content><BroadcastPage/></Content>);
        break;
      case 'setting':
        return (<Content><SettingsPage navigation={this.props.navigation}></SettingsPage></Content>);
        break;
      default:
    }
  }
  
  render() {
    const styles = StyleSheet.create({
      footer: {
        backgroundColor: '#c22b2b',
      },
      textContent: {
        fontSize: 20,
        color: 'red',
      },
    });
    /* jsx */
    return (
      <Container>
          { this.renderSelectedTab() }
          <Footer>
            <FooterTab style={styles.footer}>
            <Button vertical
                onPress={() => this.setState({selected_tab: 'home'})}>
                <Icon style={{ color: '#fff' }} name="home" />
                <Text style={{ color: '#fff' }}>Beranda</Text>
              </Button>
              <Button vertical
                onPress={() => this.setState({selected_tab: 'profile'})}>
                <Icon style={{ color: '#fff' }} name="person" />
                <Text style={{ color: '#fff' }}>Profil</Text>
              </Button>
              <Button vertical
                 onPress={() => this.setState({selected_tab: 'broadcast'})}>
                <Icon style={{ color: '#fff' }} name="ios-megaphone" />
                <Text style={{ color: '#fff' }}>Pengumuman</Text>
              </Button>
              <Button vertical
                onPress={() => this.setState({selected_tab: 'setting'})}>
                <Icon style={{ color: '#fff' }} active name="settings" />  
                <Text style={{ color: '#fff' }}>Pengaturan</Text>
              </Button>
            </FooterTab>
          </Footer>
      </Container>
    )
    /* jsx */
  }
}
import React, { Component } from 'react'
import { Image } from 'react-native';
import { Container, H3, H2, H1, Header, Content, Icon, Item, Button, Body, Title, Label, Text, View } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
     location : ''
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
			position => {
        const location = JSON.stringify(position);
				this.setState({ location });
			},
			error => alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
  }

  render() {
    /* styling */
    const personName = {
      fontWeight: '100',
      fontFamily : Platform.OS === 'android' ? 'sans-serif-light' : undefined
    };
    const personAddress = {
      marginTop: '2%',
      marginBottom: '5%',
      fontWeight: '100',
      fontFamily : Platform.OS === 'android' ? 'sans-serif-light' : undefined
    };
    /* styling */

    /* jsx */
    return (
      <Container>
        <View style={{ alignItems: 'center', justifyContents: 'center', backgroundColor: '#F5F5F5' }}>
          <Image source={{uri: "https://source.unsplash.com/1280x720/?girl"}} style={{ width: 200, height: 200, borderRadius: 100, marginTop: '5%', marginBottom: '5%' }}/>
          <H1 style={personName}> Devi Nur Fauziah </H1>
          <H3 style={personAddress}>Sarijadi, Bandung </H3>
        </View>
        <View>
          <Text>{ this.state.location }</Text>
        </View>
      </Container>
    )
    /* jsx */
  }
}
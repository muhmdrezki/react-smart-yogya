import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native';
import { Container, H3, H2, H1, Header, Content, Icon, Item, Button, Body, Title, Label, Text, View } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude : 28.579660,
      longitude : 77.321110
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
			position => {
        const loc = JSON.stringify(position);
        alert(position.coords.latitude + '-' + position.coords.longitude)
        this.setState({ latitude : position.coords.latitude });
        this.setState({ longitude : position.coords.longitude });
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
    const styles = StyleSheet.create({  
      MainContainer: {  
        position: 'absolute',  
        top: 310,  
        left: 0,  
        right: 0,  
        bottom: 0,  
        alignItems: 'center',  
        justifyContent: 'flex-end',  
      },  
      mapStyle: {  
        position: 'absolute',  
        top: 0,  
        left: 0,  
        right: 0,  
        bottom: 0,  
      },  
    });
    /* styling */

    /* jsx */
    return (
      <Container>
        <View style={{ alignItems: 'center', justifyContents: 'center', backgroundColor: '#F5F5F5' }}>
          <Image source={{uri: "https://source.unsplash.com/1280x720/?girl"}} style={{ width: 200, height: 200, borderRadius: 100, marginTop: '5%', marginBottom: '5%' }}/>
          <H1 style={personName}> Devi Nur Fauziah </H1>
          <H3 style={personAddress}>Sarijadi, Bandung </H3>
        </View>
        <View style={styles.MainContainer}>
          {/* <Text>{ this.state.location }</Text> */}
          <MapView  
            style={styles.mapStyle}  
            showsUserLocation={false}  
            zoomEnabled={true}  
            zoomControlEnabled={true}  
            initialRegion={{  
              latitude: this.state.latitude,   
              longitude: this.state.longitude,  
              latitudeDelta: 0.0922,  
              longitudeDelta: 0.0421,  
            }}>  
    
            <Marker  
              coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}  
              title={"JavaTpoint"}  
              description={"Java Training Institute"}  
            />  
          </MapView>  
        </View>
      </Container>
    )
    /* jsx */
    
  }
}
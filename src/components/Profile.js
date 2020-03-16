import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native';
import { Container, H3, Text, H1, Spinner, View } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude : 28.579660,
      longitude : 77.321110,
      location_load : true,
      user : ''
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
			position => {
        if(position) {
          this.setState({ latitude : position.coords.latitude });
          this.setState({ longitude : position.coords.longitude });
          this.setState({ location_load : false });
        }
			},
			error => alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
  }

  getCurrentUser() {
    AsyncStorage.getItem('token', (err, result) => {
      if(result) {
        var config = {
          headers : {
            "Authorization" : "Bearer " + result
          }
        }
        axios.get( API_URL + "user", config)
        .then(res => {
          if(res.data.user) {
            this.setState({ user: res.data.user });
            this.getCurrentLocation();
          }
        }).catch(err => {
          alert(err);
        })
      }
    });
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
          <Image source={{uri: "https://i.pravatar.cc/150?img=3"}} style={{ width: 200, height: 200, borderRadius: 100, marginTop: '5%', marginBottom: '5%' }}/>
          <H1 style={personName}> { this.state.user.name ? this.state.user.name : '' } </H1>
          <H3 style={personAddress}> { this.state.user.city ? this.state.user.city : '' } </H3>
        </View>
        { this.state.location_load ? <View><Spinner color="red"/><H3 style={{ textAlign: 'center' }}>Mencari Lokasi Anda</H3></View> : <View style={styles.MainContainer}>
          <MapView  
            style={styles.mapStyle}  
            showsUserLocation={false}  
            zoomEnabled={true}  
            zoomControlEnabled={true}  
            region={{
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
        </View> }
      </Container>
    )
    /* jsx */
    
  }
}
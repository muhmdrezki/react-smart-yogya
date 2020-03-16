import React, { Component } from 'react'
import BroadcastDetail from '../components/BroadcastDetail'
import AsyncStorage from '@react-native-community/async-storage';

export default class BroadcastDetailPage extends React.Component {
  render() {
    return (
      <BroadcastDetail navigation={this.props.navigation}></BroadcastDetail>
    );
  }
}
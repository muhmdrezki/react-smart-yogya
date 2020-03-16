import React, { Component } from 'react'
import Broadcast from '../components/Broadcast'

export default class BroadcastPage extends Component {
  render() {
    return (
      <Broadcast navigation={this.props.navigation}></Broadcast>
    );
  }
}

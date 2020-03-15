import React, { Component } from 'react'
import Home from '../components/Home'

export default class HomePage extends Component {
  render() {
    return (
      <Home navigation={this.props.navigation}></Home>
    );
  }
}

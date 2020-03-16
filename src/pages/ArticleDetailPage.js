import React, { Component } from 'react'
import ArticleDetail from '../components/ArticleDetail'
import AsyncStorage from '@react-native-community/async-storage';

export default class ArticleDetailPage extends React.Component {
  render() {
    return (
      <ArticleDetail navigation={this.props.navigation}></ArticleDetail>
    );
  }
}
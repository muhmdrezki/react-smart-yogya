import React, { Component } from 'react'
import { Container, Header, Content, Input, Item, Button, Body, Title, Label, Text } from 'native-base';

export default class SignupPage extends Component {
  render() {
    /* styling */
    const appContainer = {
      padding : '5%'
    };
    const formControl = {
      marginBottom : '5%'
    };
    /* styling */

    /* jsx */
    return (
      <Container>
        <Content style={appContainer}>
          <Item stackedLabel style={formControl}>
            <Label> Name </Label>
            <Input/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Username </Label>
            <Input/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Password </Label>
            <Input secureTextEntry/>
          </Item>
          <Item stackedLabel style={formControl}>
            <Label> Confirm Password </Label>
            <Input secureTextEntry/>
          </Item>
          <Button rounded block primary style={formControl}><Text> Register </Text></Button>
        </Content>
      </Container>
    )
    /* jsx */
  }
}
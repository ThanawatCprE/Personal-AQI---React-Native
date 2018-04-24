import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import  FooterTabs  from './src/components/footer';

import { Col, Row, Grid } from 'react-native-easy-grid';
export default class App extends React.Component {
  render() {
    return (
    <Container >
    
        <FooterTabs  />

    </Container>
    );
  }
}
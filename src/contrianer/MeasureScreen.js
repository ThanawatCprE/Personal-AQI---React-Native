import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
import DeviceID from '../components/deviceid'
import AQIGauge from '../components/aqigauge'
import Suggestion from '../components/suggestion'
class MeasureScreen extends React.Component {
  render() {
    return (
      <Container>
      <DeviceID/>
      <AQIGauge/>
      <Suggestion/>
      </Container>
    );
  }
}

export default MeasureScreen;
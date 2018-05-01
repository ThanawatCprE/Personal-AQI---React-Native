import React from 'react';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {  StyleSheet, Text, View,YellowBox } from 'react-native';
class DeviceID extends React.Component {
  render() {
  	var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var min = new Date().getMinutes();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var datetime = date + ' ' + monthNames[month] + ' ' + year + '  ' + hour + ':' + min;
    return (
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', paddingTop:30}}>
        <Text>{datetime}</Text>
      </View>
    );
  }
}
export default DeviceID;
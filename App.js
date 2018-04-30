//import React, {Component} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
// import  FooterTabs  from './src/components/footer';
// import Choose from './src/components/choose'
// import { Col, Row, Grid } from 'react-native-easy-grid';
// export default class App extends React.Component {
//   render() {
//     return (
//     <Container >
//         <Choose />

//     </Container>
//     );
//   }
// }
import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import Choose from './src/components/choose';
import FooterTabs from './src/components/footer';
import TableAQI from './src/components/tableaqi';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top:50 }}>
        <Choose/>
      </View>
    );
  }
}

class MeasureScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Measure</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

class InfoScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex:1,
          flexDirection: 'column',
          paddingTop: 50,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View style={{flex: 0.1}}>
          <Text style={{fontSize:30}}>Definition AQI</Text>
        </View>
        <View style={{flex: 0.25}}>
          <Text style={{fontSize:15}}>      An air quality index (AQI) is a number used by government agencies 
          to communicate to the public how polluted the air currently is or how polluted it is forecast to become. 
          As the AQI increases, an increasingly large percentage of the population is likely to experience increasingly 
          severe adverse health effects.</Text>
        </View>
        <View style={{flex: 0.6, top:20}}>
          <TableAQI/>
        </View>

      </View>
    );
  }
}
//<Text style={{position:'absolute',fontSize:30, left:20, top:50,flex:0.3,backgroundColor:'pink'}}>Definition AQI</Text>
//<Text style={{position:'absolute',fontSize:15, left:20, top:100,flex:0.3,backgroundColor:'pink'}}>An air quality index (AQI) is a number used </Text>

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Measure: { screen: MeasureScreen },
    MyAir: { screen: MapScreen },
    Info: { screen: InfoScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Measure') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'MyAir') {
          iconName = `ios-flag${focused ? '' : '-outline'}`;
        } else if (routeName === 'Info') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color="#3399ff"/>;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3399ff',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

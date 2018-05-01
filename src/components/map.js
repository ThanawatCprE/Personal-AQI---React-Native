import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ListView
} from 'react-native';


import { Constants, MapView, Location, Permissions } from 'expo';
import firebase from './configFirebase';

class Map extends React.Component {
  constructor(props) {
    super(props);

    // console.log(firebase.name);
    // console.log(firebase.database());

    this.state = {
    	mapRegion: { latitude: 13.8298856, longitude: 100.5984373, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
	    locationResult: null,
	    location: {coords: { latitude: 13.8298856, longitude:100.5984373},latitudeDelta: 0.003, longitudeDelta: 0.003 },
    	marker:[],
      AQI: {
        value:0
      },
     
    };

    this.deviceRef = firebase.database().ref().child('Device');
    this.aqiRef = firebase.database().ref().child('AQI').orderByKey().limitToLast(1);
  }
componentWillMount() {
  this._getAQI(this.aqiRef);
  this._getLocationMarker(this.deviceRef);
} 
componentDidMount() {
    this._getLocationAsync();
}

  _MapRegionChange = location => {
    console.log("test")
    this.setState({ location:{
      coords:{
        latitude:location.latitude,
        longitude:location.longitude
      },
      latitudeDelta:location.latitudeDelta,
      longitudeDelta:location.longitudeDelta
    } 
  });
    // console.log(mapRegion)
    // this._getLocationAsync();
  };

  // **** get location ****

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   location={...location,latitudeDelta: 0.003, longitudeDelta: 0.003}
   console.log(location);
   this.setState({ locationResult: JSON.stringify(location), location });
  
 };
 
 // **** warning  add marker ***
 _warning = async (aqi) => {
  // if(aqi>150){
        this._getAQI(this.aqiRef);
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords)
        Alert.alert(
          'Save AQI value for location ?',
          'This AQI value :' + aqi.toString(),
          [
            {text: 'Sure', onPress: () => { 
              const  checkPoint={
                aqi,
                coordinate:location.coords
              }
              this.deviceRef.push(checkPoint);  
              this._getLocationMarker(this.deviceRef);
            }
          },
            {text: 'no Thank', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ]
        )
      // }
  }

// **** check for color of marker from aqi value *****

 _checkPoint_color = (aqi) => {
    if(aqi > 300){
      return "#330000"
    }
    else if(aqi > 200){
      return "#660066"
    }
    else if(aqi > 150){
      return "#ff0000"
    }
    else if(aqi > 100){
      return "#ff6600"
    }
    else if(aqi > 50){
      return "#ffff00"
    }
    else{
      return "#009933"
    }
 }
 
 // **** get data aqi from firebase *****
  _getAQI = (aqiRef) => {
 // setInterval(function(){
    aqiRef.on('value', (snap) => {
      var AQI = [];
      snap.forEach((child) => {
        AQI.push({
          value: child.val().value,
          timestamp: child.val().timestamp,
          _key: child.key
        });
      });
      // console.log(AQI[0]);
      this.setState({
         AQI:AQI[0]
      });
      // console.log(this.state.AQI);
    });
  // },5000)
  } 

 // **** get value of location from firebase 
 _getLocationMarker(deviceRef) {
 
    deviceRef.on('value', (snap) => {
      var marker = [];
      snap.forEach((child) => {
        marker.push({
          aqi: child.val().aqi,
          coordinate: child.val().coordinate,
          _key: child.key
        });
      });
      // console.log(marker)
      this.setState({
         marker
      });
    });

  } 

 // **** show maker *****

 checkPoint_show = () => {
  if(this.state.marker.length != 0){
     return ( 
      this.state.marker.map((el, index) => <MapView.Marker key={index}   title={"AQI"} description={"value => "+el.aqi.toString()} pinColor={this._checkPoint_color(el.aqi)} coordinate={el.coordinate}/>)
      )
  }
 }

  render() {
    let location = this.state.location;
    let aqi = this.state.AQI;
    // console.log(aqi)
    return (
        <View style={styles.container}>
          <MapView
            provider={"google"}
            style={styles.map}
           	region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: location.latitudeDelta, longitudeDelta: location.longitudeDelta }}
            onRegionChangeComplete={this._MapRegionChange}
            // onUserLocationChange={this._getAQI(this.aqiRef)}
            showsUserLocation={true}
            // followsUserLocation={true}
            showsMyLocationButton={true}
          >

          {this.checkPoint_show()}
          </MapView>
          <View style={styles.base}>
            <View style={styles.baseBottom}>
              <Text >AQI: {aqi.value}</Text>
            </View> 
          </View>  
          <View style={styles.buttonPosition} >
            <TouchableOpacity onPress = {() => this._warning(aqi.value)} style = {styles.button}>
              <Text>Save</Text>
            </TouchableOpacity> 
          </View>
        </View>

    );
  }
}
  
  // <Text>
  // Location: {this.state.locationResult}
  // </Text>  
  
Map.propTypes = {
  provider: MapView.ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
  	flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
  buttonPosition:{
    position:'absolute',
    top:'10%',
    left:'2%'
  },
  button: {
      backgroundColor: '#A9A9A9',
      width: 100,
      height: 25,
      borderRadius: 50,
      alignItems: 'center',
   },
  base: {
    position:'absolute',
    top:'5%',
    left:'2%',
  },
  baseBottom: {
    backgroundColor: '#FFFFFF',
    opacity:0.7,
    height: 25,
    width: 100,
    alignItems: 'center',
  }

});
export default Map;

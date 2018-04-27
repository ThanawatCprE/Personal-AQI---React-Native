import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      marker:{
        title:"Bank",
        latlng:{
          latitude:LATITUDE,
          longitude:LONGITUDE
        },
        description:"test"
      }
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
          >
          <Marker
      coordinate={this.state.marker.latlng}
      title={this.state.marker.title}
      description={this.state.marker.description}
    />
          </MapView>
        </View>
      </View>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
});
export default Map;
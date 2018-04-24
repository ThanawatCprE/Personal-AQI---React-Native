import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
export default class Map extends Component {
  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <View>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          showsUserLocation = {true}
          mapType={"hybrid"}
          onRegionChange={this._handleMapRegionChange}
        />
      </View>
    );
  }
}

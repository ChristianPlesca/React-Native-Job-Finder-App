import React, { Component } from 'react';
import _ from 'lodash';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

class MapScreen extends Component {
    state = {
        region: {
            longitude: null,
            latitude: null,
            longitudeDelta: 0.10,
            latitudeDelta: 0.09
        },
        userLocation: null,
        locationError: null,
    };

    async componentDidMount() {
        try {
            const { granted } = await Location.requestPermissionsAsync();
            if (!granted) {
                this.setState({
                    region: {
                        longitude: 0.1278,
                        latitude: 51.5074,
                        longitudeDelta: 5,
                        latitudeDelta: 5,
                    }
                });
             } else {
                const location = await Location.getCurrentPositionAsync({});
                this.setState({
                    region:
                    {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        longitudeDelta: 0.10,
                        latitudeDelta: 0.09,
                    }
            });
            }
        } catch (e) {
            //console.log(e)
        }
    }
    render() {
        if (_.isNull(this.state.region.latitude && this.state.region.latitude)) {
            return (<ActivityIndicator
                        animating
                        color={'#2B7A78'}
                        size={'large'}
                        style={styles.activityIndicatorStyle} 
            />
          );
        }
        return (
            <View style={styles.container}>
              <MapView 
                style={styles.map} 
                region={this.state.region} 
              />
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    activityIndicatorStyle: {
        flex: 1,
    },
  });

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MapScreen);

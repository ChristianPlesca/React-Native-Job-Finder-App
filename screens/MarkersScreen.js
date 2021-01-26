import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';

class MarkersScreen extends Component {
    render() {
        return (
            <View>
            <MapView
                style={styles.map}
                region={{longitude: 0.1278,
                        latitude: 51.5074,
                        longitudeDelta: 5,
                        latitudeDelta: 5, }}
            >
            <Marker
                    coordinate={{
                        latitude: 51.5074,
                        longitude: 0.1278,
                    }}
                title={'Sample Marker'}
                description={'Just a Marker'}
                    />
                    </MapView>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

export default MarkersScreen;
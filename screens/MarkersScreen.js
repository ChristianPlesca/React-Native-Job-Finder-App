import React, { Component } from 'react';
// eslint-disable-next-line import/no-duplicates
import MapView from 'react-native-maps';
// eslint-disable-next-line no-duplicate-imports
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';

class MarkersScreen extends Component {

    renderMarkers = () => (
        this.props.results.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.company.display_name}
                description={`Salary Min - ${marker.salary_min} Salary Max - ${marker.salary_max}`}
            />
        ))
    )


    render() {
        if (this.props.results.length === 0) {
                Alert.alert(
                    'We are Sorry',
                    'We could not find any results for this location, please try to set your location',
                    [
                        { text: 'I understand', onPress: () => this.props.navigation.goBack() }
                    ],
                    { cancelable: false }
                )
            return (
                <MapView
                    style={styles.map}
                    region={{
                    longitude: 0.1278,
                    latitude: 51.5074,
                    longitudeDelta: 5.5,
                    latitudeDelta: 5.5,
                    }}
                />
            )
        }
        return (
            <View>
            <MapView
                style={styles.map}
                region={{
                longitude: this.props.results[0].longitude,
                latitude: this.props.results[0].latitude,
                longitudeDelta: 5.5,
                latitudeDelta: 5.5,
            }}
            >
                    {this.renderMarkers()}
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

const mapStateToProps = ({ job }) => ({
    results: job.results,
});

export default connect(mapStateToProps)(MarkersScreen);
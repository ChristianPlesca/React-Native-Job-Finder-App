import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
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
        return (
            <View>
            <MapView
                style={styles.map}
                region={{longitude: this.props.results[0].longitude,
                        latitude: this.props.results[0].latitude,
                        longitudeDelta: 5.5,
                        latitudeDelta: 5.5, }}
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
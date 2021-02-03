import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-paper';
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
                // eslint-disable-next-line max-len
                'We could not find any results for this location, please try to set your location',
                [
                    { text: 'I understand', onPress: () => this.props.navigation.goBack() }
                ],
                { cancelable: false }
            );
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
            );
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
                <View style={styles.buttonContainer}>
                <Button
                    dark
                    style={styles.buttonStyle}
                    icon={'cards-outline'}
                    mode="contained"
                    onPress={() => this.props.navigation.navigate('TabNav', { screen: 'Deck' })}
                >
                    {this.props.results.length} jobs found
            </Button>
            </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonStyle: {
        marginHorizontal: 20,
        width: Dimensions.get('window').width - 70,
        height: 55,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 7,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0
    },
});

const mapStateToProps = ({ job }) => ({
    results: job.results,
});

export default connect(mapStateToProps)(MarkersScreen);

import React, { Component } from 'react';
import _ from 'lodash';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Dimensions, StyleSheet, Modal, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { jobTitleChange, setCountry, clearErrorMessage } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends Component {
    state = {
        mapLoaded: false,
        region: {
            longitude: null,
            latitude: null,
            longitudeDelta: 0.10,
            latitudeDelta: 0.09
        },
        color: 'red',
        colorTitleSearch: 'black',
        modalVisible: true,
        showsUserLocation: false,
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('modalVisible');
        if (token === 'True') {
            this.setState({ modalVisible: false });
        }
        try {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                this.setState({
                    region: {
                        longitude: 0.1278,
                        latitude: 51.5074,
                        longitudeDelta: 5,
                        latitudeDelta: 5,
                    },
                    showsUserLocation: false,
                });
            } else {
                try {
                    const location = await Location.getCurrentPositionAsync({});
                this.setState({
                    region:
                    {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        longitudeDelta: 0.10,
                        latitudeDelta: 0.09,
                    },
                    showsUserLocation: true
                });
                } catch (e) {
                    this.setState({
                        region: {
                            longitude: 0.1278,
                            latitude: 51.5074,
                            longitudeDelta: 5,
                            latitudeDelta: 5,
                        },
                        showsUserLocation: false
                    });
            }
            }
        } catch (e) {
            console.log(e);
        }
    }
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    onInputChange = (text) => {
        this.props.jobTitleChange(text);
    }

    onCompleteModal = async () => {
        this.setState({ modalVisible: false });
        await AsyncStorage.setItem('modalVisible', 'True');
    }

    onSearchJob = () => {
        const { searchQuery, navigation } = this.props;
        const { region } = this.state;
        this.props.setCountry(region, searchQuery, navigation);
    }

    renderSearchButton = () => {
        if (this.props.loading) {
            return (
                <Button
                    dark
                    loading
                    style={styles.buttonStyle}
                    mode="contained"
                >
                    Searching ...
                </Button>
            );
        }

        return (
            <Button
                dark
                style={styles.buttonStyle}
                icon={'map-search-outline'}
                mode="contained"
                onPress={this.onSearchJob}
            >
                Search
            </Button>
        );
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
        } else if (this.props.contryUnsuported) {
            Alert.alert(
                'Country Unsuported',
                'We are really sorry but we dont yet support services for your country.',
                [
                  { text: 'I understand', onPress: () => this.props.clearErrorMessage() }
                ],
                { cancelable: false }
              );
        }
        return (
            <View style={styles.container}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent
                        visible={this.state.modalVisible}
                    >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalTextTitle}>Guide</Text>
                        <Text style={styles.modalText}>
                            To get started drag the map into a 
                            position you would like to find jobs, then
                            enter a job title in the input down below ones 
                            youre ready just press the search button.
                        </Text>
                        <Button
                            dark
                            style={styles.buttonStyle}
                            icon={'check-bold'}
                            mode="contained"
                            onPress={() => this.onCompleteModal()}
                        >
                            I Understand
                        </Button>
                    </View>
                    </View>
                </Modal>
                </View>
              <MapView
                showsUserLocation={this.state.showsUserLocation}
                style={styles.map} 
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}
              />
                <View style={styles.buttonContainer}>
                    <TextInput
                        theme={{
                            colors: {
                                placeholder: '#2B7A78', text: '#2B7A78',
                            }
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            marginHorizontal: 40,
                            fontSize: 18,
                            marginBottom: 20,
                        }}
                    placeholder="What job are you looking for ?"
                    value={this.props.searchQuery}
                    underlineColor="#2B7A78"
                    onChangeText={text => this.onInputChange(text)}
                    left={
                        <TextInput.Icon
                            color='#2B7A78'
                            name="pen"
                            size={35}
                            style={{ marginTop: 10, marginLeft: -15 }}
                        />
                    }
                    />
              {this.renderSearchButton()}
            </View>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    },
    buttonStyle: {
        marginHorizontal: 20,
        width: SCREEN_WIDTH - 80,
        alignSelf: 'center',
        padding: 5,
        borderRadius: 7,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        width: SCREEN_WIDTH - 20,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 18,
        marginBottom: 25,
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 30,
      },
    modalTextTitle: {
        fontSize: 20,
        color: '#2B7A78',
        fontWeight: 'bold',
        marginBottom: 20,
      }
  });

const mapStateToProps = ({ job }) => ({
    searchQuery: job.searchQuery,
    contryUnsuported: job.contryUnsuported,
    loading: job.loading,
});

export default connect(mapStateToProps,
    {
        jobTitleChange,
        setCountry,
        clearErrorMessage,
    })(MapScreen);

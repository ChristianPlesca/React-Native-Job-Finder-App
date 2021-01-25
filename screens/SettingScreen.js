import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SettingsScreen extends Component {
    render() {
        return (
            <View>
                <Button
                    dark
                    style={styles.buttonStyle}
                    icon={'logout'}
                    mode="contained"
                    onPress={() => { this.props.logOut(this.props.navigation); }}
                >
                Log Out
            </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 50,
        marginHorizontal: 20,
        marginBottom: 30,
        width: SCREEN_WIDTH - 80,
        alignSelf: 'center',
        padding: 5,
        borderRadius: 7,
    },
});

export default connect(null, { logOut })(SettingsScreen);

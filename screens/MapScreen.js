import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class MapScreen extends Component {
    render() {
        return (
            <View>
                <Text>MapScreen</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MapScreen);

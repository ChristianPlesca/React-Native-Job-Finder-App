import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

class ReviewScreen extends Component {
    render() {
        const { appbarHeader, containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <Appbar.Header style={appbarHeader}>
                    <Appbar.Content
                        title="Review"
                        color={'#DEF2F1'}
                        subtitle={'Review Your Saved Jobs'} 
                    />
                    <Appbar.Action
                        icon="cogs"
                        size={35}
                        onPress={() => this.props.navigation.navigate('SettingsStack')} 
                    />
                    </Appbar.Header>
                <Text>Review Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        //marginTop: 24,
    },
    appbarHeader: {
        height: 40,
        marginTop: 35,
        marginBottom: 15,
        backgroundColor: '#2B7A78'
    }
});

export default ReviewScreen;

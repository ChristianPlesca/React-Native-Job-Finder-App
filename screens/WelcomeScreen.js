import React, { Component } from 'react';
import { View, Button } from 'react-native';

class WelcomeScreen extends Component {
    render() {
      return (
        <View style={{ marginTop: 100 }}>
          <Button 
            title="Navigate" 
            onPress={() => this.props.navigation.navigate('TabNav', { screen: 'Home' })} 
          />
        </View>
    );
    }
}

export default WelcomeScreen;

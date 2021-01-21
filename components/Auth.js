import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FacebookSocialButton, GoogleSocialButton } from "react-native-social-buttons";

const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
    state = {
        colorPassword: '#C5C6C7',
        colorEmail: '#C5C6C7',
        hidePass: true,
        color: '#C5C6C7'
    }
    onEmailChanged = (text) => {
      this.props.onEmailChanged(text);
    }
    onPasswordChanged = (text) => {
      this.props.onPasswordChanged(text);
    }
    renderButton = () => {
        if (this.props.loading) {
          return (
            <Button
              dark
              loading
              style={styles.buttonStyle}
              mode="contained"
              >
                LOADING ...
            </Button>
          )
        }
        return (
            <Button
              dark
              style={styles.buttonStyle}
              icon={this.props.authButtonIcon}
              mode="contained"
              onPress={() => {}}
             >
              {this.props.authButtonText}
            </Button>
          );
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <LinearGradient
                    colors={['#2E3047', '#2E3047', '#3C3F58']}
                    style={styles.linearGradient}
                >
                    <Image
            style={styles.imageStyle}
            source={require('../images/logo.png')}
          />
                <TextInput
                    style={{backgroundColor:'transparent', marginHorizontal:30, fontSize:18}}
                    label="Email"
                    value={this.state.email}
                    selectionColor='#2B7A78'
                    underlineColor="#C5C6C7"
                    onFocus={() => this.setState({ colorEmail: "#2B7A78" })}
                    onChangeText={text => this.onEmailChanged(text)}
                    left={
                        <TextInput.Icon
                            color={this.state.colorEmail}
                            name="email"
                            size={35}
                            style={{marginTop:10, marginLeft: -20 }}
                        />
                    }
                />
                <TextInput
                    style={{ marginTop: 10, backgroundColor: 'transparent', marginHorizontal: 30, fontSize: 18}}
                    label="Password"
                    secureTextEntry={this.state.hidePass ? true : false}
                    value={this.state.password}
                    underlineColor="#C5C6C7"
                    onFocus={() => this.setState({colorPassword:"#2B7A78"})}
                    onChangeText={text => this.onPasswordChanged(text)}
                    left={
                        <TextInput.Icon
                            color={this.state.colorPassword}
                            name="account-lock"
                            size={35}
                            style={{ marginLeft: -20 }}
                        />
                    }
                    right={
                        <TextInput.Icon
                            color={this.state.color}
                            name={this.state.hidePass ? 'eye-off-outline' : 'eye'}
                            size={35}
                            style={{ marginTop: 10, marginLeft: -20 }}
                            onPress={() => {
                                this.state.hidePass
                                ? this.setState({hidePass: false, color: '#2B7A78'})
                                : this.setState({hidePass: true, color: '#C5C6C7'});
                            }}
                        />
                    }
                    />
                     
                    {this.renderButton()}
                    <Button
                        color="#C5C6C7"
                        onPress={this.props.onSwitchAccountPress}>
                        {this.props.switchLink}
                    </Button>
                    <View style={{ marginVertical: 10, alignItems: 'center'}}>
                        <Text style={{ fontSize: 20 }}>OR</Text>
                        <Ionicons
                            color={'#2B7A78'}
                            name="arrow-down-circle"
                            size={45}
                        />
                    </View>
                    <FacebookSocialButton
                        onPress={() => { }}
                        buttonViewStyle={styles.socialButtonStyle} 
                        textStyle={{ fontSize: 16 }}
                    />
                    <GoogleSocialButton 
                        onPress={() => { }}
                        buttonViewStyle={styles.socialButtonStyle}
                        textStyle={{ fontSize: 16 }}
                    />
                    </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        marginTop: 50,
        marginHorizontal: 20,
        marginBottom: 30,
        width: SCREEN_WIDTH - 80,
        alignSelf: 'center',
        padding: 5,
        borderRadius: 7,
    },
    imageStyle: {
        alignSelf: 'center',
        width: 230,
        height: 210,
        marginBottom: 30,
        
    },
    socialButtonStyle: {
        alignSelf: 'center',
        borderWidth: 0,
        width: SCREEN_WIDTH - 140,
        height: 45,
        marginBottom: 10,
    },
});


export default AuthScreen;

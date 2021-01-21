import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged } from '../actions';
import Auth from '../components/Auth';

class LogInScreen extends Component {
    render() {
        return (
            <Auth
                authButtonText='Log in'
                authButtonIcon="login"
                switchLink="Don't Have an Account? Sign Up"
                onSwitchAccountPress={() => this.props.navigation.navigate('SignUpScreen')}
                onEmailChanged={(text) => this.props.emailChanged(text)}
                onPasswordChanged={(text) => this.props.passwordChanged(text)}
            />
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading
});


export default connect(mapStateToProps, { emailChanged, passwordChanged })(LogInScreen);

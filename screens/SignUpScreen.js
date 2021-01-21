import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged } from '../actions';
import Auth from '../components/Auth';

class LogInScreen extends Component {
    render() {
        return (
            <Auth
                authButtonText='Sign Up'
                authButtonIcon="account-check"
                switchLink="Have an account already? Log In"
                onSwitchAccountPress={() => this.props.navigation.navigate('LogInScreen')}
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

import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    loginUser,
    loginGoogle,
    clearForm,
    loginFacebook,
} from '../actions';
import Auth from '../components/Auth';


class LogInScreen extends Component {
    render() {
        const { email, password, navigation } = this.props;
        return (
            <Auth
                authButtonText='Log in'
                authButtonIcon="login"
                switchLink="Don't Have an Account? Sign Up"
                onSwitchAccountPress={() => {
                    this.props.navigation.navigate('SignUpScreen');
                    this.props.clearForm();
                }}
                onEmailChanged={(text) => this.props.emailChanged(text)}
                onPasswordChanged={(text) => this.props.passwordChanged(text)}
                email={this.props.email}
                password={this.props.password}
                loading={this.props.loading}
                onSubmit={() => this.props.loginUser({ email, password, navigation })}
                facebookButtonSubmit={() => this.props.loginFacebook(navigation)}
                googleButtonSubmit={() => this.props.loginGoogle(navigation)}
                error={this.props.error}
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


export default connect(mapStateToProps,
    {
        emailChanged,
        passwordChanged,
        loginUser,
        loginGoogle,
        clearForm,
        loginFacebook
    })(LogInScreen);

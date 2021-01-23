import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signUpUser, clearForm, loginGoogle } from '../actions';
import Auth from '../components/Auth';

class LogInScreen extends Component {
    render() {
        const { email, password, navigation } = this.props;
        return (
            <Auth
                authButtonText='Sign Up'
                authButtonIcon="account-check"
                switchLink="Have an account already? Log In"
                onSwitchAccountPress={() => {
                    this.props.navigation.navigate('LogInScreen');
                    this.props.clearForm();
                }}
                onEmailChanged={(text) => this.props.emailChanged(text)}
                onPasswordChanged={(text) => this.props.passwordChanged(text)}
                onSubmit={() => this.props.signUpUser({ email, password, navigation })}
                email={this.props.email}
                password={this.props.password}
                loading={this.props.loading}
                error={this.props.error}
                googleButtonSubmit={() => this.props.loginGoogle(navigation)}
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
        signUpUser,
        clearForm,
        loginGoogle
    })(LogInScreen);

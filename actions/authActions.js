import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    AUTH_FAILED,
    LOGIN_USER,
    SIGN_UP_USER,
    LOGIN_GOOGLE_SUCCESS,
    CLEAR_FORM,
    LOGIN_FACEBOOK_SUCCESS,
} from './types';
import { logInGoogleInit, facebookAppId } from '../config/firebaseAuthConfig';

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text,
  });

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text,
});


export const loginFacebook = (navigation) => (dispatch) => {
  Facebook.initializeAsync({ appId: facebookAppId });
  Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile', 'email'],
  }).then((user) => {
    if (user.type === 'success') {
      loginFacebookSuccess(dispatch, user.userId, navigation);
    }
  })
    .catch((err) => loginFail(dispatch, err));
};

export const loginGoogle = (navigation) => (dispatch) => {
    Google.logInAsync(logInGoogleInit)
      .then((user) => {
        if (user.type === 'success') {
          loginGoogleSuccess(dispatch, user, navigation);
        }
      })
      .catch((error) => loginFail(dispatch, error));
  };

export const clearForm = () => (dispatch) => {
  dispatch({ type: CLEAR_FORM });
};
  
export const signUpUser = ({ email, password, navigation }) => (dispatch) => {
    dispatch({ type: SIGN_UP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => signUpUserSuccess(dispatch, user, navigation))
      .catch((error) => loginFail(dispatch, error));
  };

export const loginUser = ({ email, password, navigation }) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => loginUserSuccess(dispatch, user, navigation))
      .catch((error) => loginFail(dispatch, error));
};
  
const loginFacebookSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_FACEBOOK_SUCCESS,
    payload: user,
  });
  navigation.navigate('TabNav');
};


const loginGoogleSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_GOOGLE_SUCCESS,
    payload: user,
  });
  navigation.navigate('TabNav');
};

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  navigation.navigate('TabNav');
};

const loginFail = (dispatch, error) => {
  dispatch({
    type: AUTH_FAILED,
    payload: error.message,
  });
};

const signUpUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: SIGN_UP_USER_SUCCESS,
    payload: user,
  });
  navigation.navigate('LogInScreen');
};

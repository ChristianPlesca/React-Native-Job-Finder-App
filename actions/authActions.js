import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
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
} from './types';
import { logInGoogleInit } from '../config/firebaseAuthConfig';

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text,
  });

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text,
});

export const loginGoogle = (navigation) => (dispatch) => {
    Google.logInAsync(logInGoogleInit)
      .then((user) => {
        if (user.type === 'success') {
          loginGoogleSuccess(dispatch, user, navigation);
        }
      })
      .catch((error) => loginGoogleFail(dispatch, error));
  };

export const clearForm = () => (dispatch) => {
  dispatch({ type: CLEAR_FORM });
};
  
export const signUpUser = ({ email, password, navigation }) => (dispatch) => {
    dispatch({ type: SIGN_UP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => signUpUserSuccess(dispatch, user, navigation))
      .catch((error) => signUpFail(dispatch, error));
  };

export const loginUser = ({ email, password, navigation }) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => loginUserSuccess(dispatch, user, navigation))
      .catch((error) => loginUserFail(dispatch, error));
  };

const loginGoogleFail = (dispatch, error) => {
  dispatch({
    type: AUTH_FAILED,
    payload: error.message
  });
};

const loginGoogleSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_GOOGLE_SUCCESS,
    payload: user,
  });
  navigation.navigate('TabNav');
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: AUTH_FAILED,
    payload: error.message,
  });
};

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  navigation.navigate('TabNav');
};

const signUpFail = (dispatch, error) => {
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

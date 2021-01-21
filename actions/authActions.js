import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    AUTH_FAILED,
    LOGIN_USER,
    SIGN_UP_USER,
} from './types';


export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text,
  });

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text,
  });

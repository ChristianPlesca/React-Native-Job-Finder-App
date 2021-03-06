import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    LOGIN_GOOGLE_SUCCESS,
    AUTH_FAILED,
    LOGIN_USER,
    SIGN_UP_USER,
    CLEAR_FORM,
    LOGIN_FACEBOOK_SUCCESS,
    SET_TOKEN,
    CLEAR_STATE,
} from '../actions/types';
  
const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    token: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
          return { ...state, password: action.payload };
      case SIGN_UP_USER_SUCCESS:
          return { ...state, error: '', loading: false };
      case SIGN_UP_USER:
          return { ...state, loading: true, error: '' };
      case AUTH_FAILED:
          return { ...state, error: action.payload, loading: false };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: '',
                loading: false,
                email: '',
                password: '',
            };
      case LOGIN_USER:
          return { ...state, loading: true, error: '' };
      case LOGIN_GOOGLE_SUCCESS:
          return { ...state, user: action.payload, error: '', loading: false };
      case CLEAR_FORM:
            return { ...state, user: null, password: '', email: '', error: '' };
      case LOGIN_FACEBOOK_SUCCESS: 
          return { ...state, user: action.payload, error: '', loading: false };
      case SET_TOKEN:
          return { ...state, token: action.payload };
      case CLEAR_STATE:
            return { ...state, user: null, password: '', email: '', token: '', loading: false };
      default:
        return state;
    }
};


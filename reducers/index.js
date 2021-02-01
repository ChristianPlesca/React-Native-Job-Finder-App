import { combineReducers } from 'redux';
import authReducer from './authReducer';
import jobReducer from './jobReducer';
import likesReducer from './likesReducer';

export default combineReducers({
    auth: authReducer,
    job: jobReducer,
    likedJobs: likesReducer,
});

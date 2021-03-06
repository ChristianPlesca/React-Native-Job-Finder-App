import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import { geoCodeApi, jobAppID, jobAppKEY } from '../config/firebaseAuthConfig';
import {
    FETCH_JOBS,
    JOB_TITLE_CHANGE,
    ERROR, CLEAR_ERROR,
    INITLIALIZE_FETCH,
    LIKED_JOB,
    CLEAR_JOBS
} from './types';

const ROOT_URL = 'https://api.adzuna.com/v1/api/jobs/';


export const jobTitleChange = (text) => (dispatch) => {
        dispatch({
            type: JOB_TITLE_CHANGE,
            payload: text,
        });
};
    
export const clearErrorMessage = () => (dispatch) => {
        dispatch({
            type: CLEAR_ERROR
        });
    };

const fetchJobs = async (country, postalCode, searchQuery, dispatch, navigation) => {
    dispatch({ type: INITLIALIZE_FETCH });
    // eslint-disable-next-line max-len
    const URL = `${ROOT_URL}${country}/search/1?app_id=${jobAppID}&app_key=${jobAppKEY}&results_per_page=10&what=${searchQuery}&where=${postalCode}&content-type=application/json`;
    try {
        const { data } = await axios.get(URL);
        dispatch({
            type: FETCH_JOBS,
            payload: data.results
        });
        navigation.navigate('TabNav', { screen: 'Markers' });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: true,
        });
    }
};

export const setCountry = (region, searchQuery, navigation) => (dispatch) => {
    Geocoder.init(geoCodeApi);
    Geocoder.from(region)
        .then(json => {
            let country;
            let postalCode;
            const location = json.results[0].address_components;
            for (let i = 0; i < location.length; i++) {
                if (location[i].types[0] === 'country') {
                    country = location[i].short_name.toLowerCase();
                } else if (location[i].types[0] === 'postal_code') {
                    postalCode = location[i].short_name;
                }
            }
            fetchJobs(country, postalCode, searchQuery, dispatch, navigation);
        }).catch((e) => {
            console.log(e);       
        });
};
    
export const likeJob = (job) => ({
        payload: job,
        type: LIKED_JOB
    });

export const clearLikedJobs = () => ({ type: CLEAR_JOBS });


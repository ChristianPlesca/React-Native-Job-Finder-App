import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import Geocoder from 'react-native-geocoding';
import { geoCodeApi, jobAppID, jobAppKEY } from '../config/firebaseAuthConfig';
import { FETCH_JOBS, JOB_TITLE_CHANGE } from './types';

const ROOT_URL = 'https://api.adzuna.com/v1/api/jobs/';


export const jobTitleChange = (text) => (dispatch) => {
        dispatch({
            type: JOB_TITLE_CHANGE,
            payload: text,
        });
    };

const fetchJobs = async (country, postalCode, searchQuery, dispatch, navigation) => {
    console.log(navigation)
    const URL = `${ROOT_URL}${country}/search/1?app_id=${jobAppID}&app_key=${jobAppKEY}&results_per_page=10&what=${searchQuery}&where=${postalCode}&content-type=application/json`;
    try {
        const { data } = await axios.get(URL);
        dispatch({
            type: FETCH_JOBS,
            payload: data.results
        });
        navigation.navigate('TabNav', { screen: 'Markers' })
    } catch (e) {
        console.log(e);
    }
};

export const setCountry = (region, searchQuery, navigation) => {
    return (dispatch) => {
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
        }).catch(error => {
            console.log(error)
        });
    }
};

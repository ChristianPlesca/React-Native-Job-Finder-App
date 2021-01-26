import axios from 'axios';
import { FETCH_JOBS, JOB_TITLE_CHANGE } from './types';


export const jobTitleChange = (text) => (dispatch) => {
        dispatch({
            type: JOB_TITLE_CHANGE,
            payload: text,
        });
    };

// export const fetchJobs = (region) => async (dispatch) => {
       
//    }
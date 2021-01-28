import {
    FETCH_JOBS,
    JOB_TITLE_CHANGE,
    ERROR,
    CLEAR_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    searchQuery: '',
    results: [],
    contryUnsuported: false,
    noResultsFound: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JOB_TITLE_CHANGE:
            return { ...state, searchQuery: action.payload };
        case FETCH_JOBS:
            return { ...state, results: action.payload };
        case ERROR:
            return { ...state, contryUnsuported: action.payload };
        case CLEAR_ERROR:
            return { ...state, contryUnsuported: false, noResultsFound: false };
        default:
            return state;
    }
};


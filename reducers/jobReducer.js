import {
    FETCH_JOBS,
    JOB_TITLE_CHANGE,
    ERROR,
    CLEAR_ERROR,
    INITLIALIZE_FETCH
} from '../actions/types';

const INITIAL_STATE = {
    searchQuery: '',
    results: [],
    loading: false,
    contryUnsuported: false,
    noResultsFound: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INITLIALIZE_FETCH:
            return { ...state, loading: true };
        case JOB_TITLE_CHANGE:
            return { ...state, searchQuery: action.payload };
        case FETCH_JOBS:
            return { ...state, results: action.payload, loading: false };
        case ERROR:
            return { ...state, contryUnsuported: action.payload, loading: false };
        case CLEAR_ERROR:
            return { ...state, contryUnsuported: false, noResultsFound: false };
        default:
            return state;
    }
};


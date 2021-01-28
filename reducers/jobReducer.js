import { FETCH_JOBS, JOB_TITLE_CHANGE } from '../actions/types';

const INITIAL_STATE = {
    searchQuery: '',
    results: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JOB_TITLE_CHANGE:
            return { ...state, searchQuery: action.payload };
        case FETCH_JOBS:
            return { ...state, results: action.payload };
        default:
            return state;
    }
};


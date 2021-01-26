import { FETCH_JOBS, JOB_TITLE_CHANGE } from '../actions/types';

const INITIAL_STATE = {
    searchQuery: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JOB_TITLE_CHANGE:
            return { ...state, searchQuery: action.payload };
        default:
            return state;
    }
};


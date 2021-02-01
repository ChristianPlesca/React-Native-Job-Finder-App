import _ from 'lodash';
import { LIKED_JOB, CLEAR_JOBS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case LIKED_JOB:
            return _.uniqBy([
                action.payload,
                ...state
            ], 'id');
        case CLEAR_JOBS:
            return [];
        default:
            return state;
    }
};


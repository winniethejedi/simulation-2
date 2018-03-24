import { combineReducers } from 'redux';
import { STEP1, STEP2, STEP3, STEP4, STEP5, RESET_REDUX_STATE } from '../Actions/constraints';

function step1Reducer (state = {}, action){
    switch(action.type){
        case STEP1 :
            return state = action.payload;
        case RESET_REDUX_STATE :
            return state = '';
        default:
            return state;
    }
};

function step2Reducer (state = {}, action){
    switch(action.type){
        case STEP2 :
            return state = action.payload;
        case RESET_REDUX_STATE :
            return state = '';
        default:
            return state;
    }
};

function step3Reducer (state = {}, action){
    switch(action.type){
        case STEP3 :
            return state = action.payload;
        case RESET_REDUX_STATE :
            return state = '';
        default:
            return state;
    }
};

function step4Reducer (state = {}, action){
    switch(action.type){
        case STEP4 :
            return state = action.payload;
        case RESET_REDUX_STATE :
            return state = '';
        default:
            return state;
    }
};

function step5Reducer (state = {}, action){
    switch(action.type){
        case STEP5 :
            return state = action.payload;
        case RESET_REDUX_STATE :
            return state = '';
        default:
            return state;
    }
};

const rootReducer = combineReducers({step1Reducer, step2Reducer, step3Reducer, step4Reducer, step5Reducer});

export default rootReducer;
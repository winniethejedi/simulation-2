import { STEP1, STEP2, STEP3, STEP4, STEP5, RESET_REDUX_STATE } from '../Actions/constraints';

export function step1(propertyInfo) {
    return {
        type: STEP1,
        payload: propertyInfo
    };
};

export function step2(propertyInfo) {
    return {
        type: STEP2,
        payload: propertyInfo
    };
};

export function step3(propertyInfo) {
    return {
        type: STEP3,
        payload: propertyInfo
    };
};

export function step4(propertyInfo) {
    return {
        type: STEP4,
        payload: propertyInfo
    };
};

export function step5(propertyInfo) {
    return {
        type: STEP5,
        payload: propertyInfo
    };
};

export function resetRedux() {
    return {
        type: RESET_REDUX_STATE,
        payload: ''
    };
};
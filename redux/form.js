import * as ActionTypes from './ActionTypes';

export const Advices = (state =  { isLoading: true,
    errMess: null,
    advices:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ADVICE:
            return {...state, isLoading: false, errMess: null, advices: action.payload};
        
        default:
            return state;
        }
    };

export const InitialFeedback = {
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: ''
    };


import {createStore , combineReducers, applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotion';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Advices ,InitialFeedback} from './form';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore (
        combineReducers(
            {
                dishes: Dishes,
                comments :Comments,
                promotions : Promotions,
                leaders : Leaders,
                advices : Advices,
                ...createForms({
                    feedback: InitialFeedback
                })
                
            }
        ),applyMiddleware(thunk, logger)

    );

    return store;
};
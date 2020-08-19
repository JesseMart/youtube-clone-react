// Our sagas will take care of all the asynchronous actions that are dispatched.
//  To create a store, we bundle all our sagas into one single saga which we can call root saga.
//   The concept is sort of comparable to combining reducers in Redux.

import {all} from 'redux-saga/effects';
export default function* (){
    yield all([]);
}
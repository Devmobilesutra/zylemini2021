import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
    totalOrderValue:0
};


const CreateOrderReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.TOTAL_ORDER_VALUE:
                return Object.assign({}, state, {                 
                    totalOrderValue: action.totalOrderValue,                 
              });
              
      
          default:
              return state
      }
  }
  export default CreateOrderReducer;


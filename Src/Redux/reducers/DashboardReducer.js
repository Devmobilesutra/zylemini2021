import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
    userId:0
};


const DashboardReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;

    switch (type){
        case ActionTypes.USER_ID:
                return Object.assign({}, state, {                 
                userId: action.userId,                 
              });
      
          default:
              return state
      }
  }
  export default DashboardReducer;

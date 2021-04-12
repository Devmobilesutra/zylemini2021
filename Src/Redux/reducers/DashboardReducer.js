import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
    userId:0,
    parentlogin : false,
    selectarea : 0
};


const DashboardReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;

    switch (type){
        case ActionTypes.USER_ID:
                return Object.assign({}, state, {                 
                userId: action.userId,                 
              });
         case ActionTypes.PARENT_LOGIN:
                return Object.assign({}, state, {                 
                    parentlogin: action.parentlogin,                 
              }); 
         case ActionTypes.SELECT_AREA:
                return Object.assign({}, state, {                 
                    selectarea: action.selectarea,                 
              });          
      
          default:
              return state
      }
  }
  export default DashboardReducer;

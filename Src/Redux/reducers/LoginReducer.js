import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
    isLogged: false,
    hasError : false,
    isLoading: false,
    name: '',
    username: '',
    password: '',
    data:null
};

const login = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.IS_LOGGED:
             //console.log('islogged', action.isLogged);
            return Object.assign({}, state, {
                isLogged: action.isLogged,
            });

        case ActionTypes.LOGIN_HAS_ERROR:
            //console.log('haserror', action.hasError);
            return Object.assign({}, state, {
                hasError: action.hasError,
            });

        case ActionTypes.LOGIN_IS_LOADING:
           
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

          
        case ActionTypes.LOGIN:
                return Object.assign({}, state, {
                isLogged: true,
                username: action.username,
                password: action.password,
                
            }          
            );
            case ActionTypes.INSERT_DATA:
               
                return Object.assign({}, state, {
                data:action.data
            }
          
            );
          

        // case ActionTypes.LOGOUT:
        //     return Object.assign({}, state, {
        //         isLogged: false,
        //         name: '',
        //         username: '',
        //         password: ''
        //     });
        default:
            return state
    }
}
export default login;

import * as ActionTypes from '../constants/ActionTypes'
import { AsyncStorage, Alert ,NetInfo} from 'react-native';
import { alertActions } from './alertActions';

import Dashboard from './../../Screens/Dashboard/Dashboard'
import axios from 'axios'

import { NavigationActions } from 'react-navigation'
import { ActionSheet } from 'native-base';
import { Router, Scene, Actions, ActionConst, Stack } from 'react-native-router-flux';


import Database from './../../utility/Database'
const db = new Database();



export const TOTAL_ORDER_VALUE = (visited) => {
    return (dispatch) => {

    dispatch({
    type: ActionTypes.TOTAL_ORDER_VALUE,
    totalOrderValue: visited
    
})
    }}
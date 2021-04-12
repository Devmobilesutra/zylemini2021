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


   


export const USER_ID = (visited) => {
    return (dispatch) => {

    dispatch({
    type: ActionTypes.USER_ID,
    userId: visited
    
        })
    }}

    export const PARENT_LOGIN = (plogin) => {
        return (dispatch) => {
    
        dispatch({
        type: ActionTypes.PARENT_LOGIN,
        parentlogin: plogin
        
            })
        }}

        export const SELECT_AREA = (s_area) => {
            return (dispatch) => {
        
            dispatch({
            type: ActionTypes.SELECT_AREA,
            selectarea: s_area
            
                })
            }}     
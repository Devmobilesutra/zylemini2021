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


export const SHOP_INFO =(Areas,shop,Addresss,Contacts,shopId)=>{  
    return (dispatch) => {
        dispatch({
        type: ActionTypes.SHOP_INFO,
        ShopAreas: Areas,
        shopname:shop,
        ShopAddresss:Addresss,
        ShopContacts:Contacts,
        shopId:shopId
        
    })    }}


export const TOTAL_SHOPS = (totalShops) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.TOTAL_SHOPS,
    totalShops: totalShops
    
})    }}

export const SHOP_VISITED_TODAY = (totalShops) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.SHOP_VISITED_TODAY,
    shopsVisitedToday: totalShops
    
})    }}




export const ORDER_IN_PROCESS = (orderInProcess) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.ORDER_IN_PROCESS,
    orderInProcess: orderInProcess
    
})    }}

export const ORDER_DELEVERED = (orderDelevered) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.ORDER_DELEVERED,
    orderDelevered: orderDelevered
    
})    }}

export const ORDER_TOTAL = (orderTotal) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.ORDER_TOTAL,
    orderTotal: orderTotal
    
})    }}
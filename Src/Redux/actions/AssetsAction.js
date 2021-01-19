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



export const ASSET_INFO =(assetID,assetQRcode,CustomerID,ScanFlag,assetName,assetsType,modelNo,sizeSqFeet,allocatedToName)=>{  
    return (dispatch) => {
        dispatch({
        type: ActionTypes.ASSET_INFO,
        assetID:assetID,
        assetQRcode:assetQRcode,
        CustomerID:CustomerID,
        ScanFlag:ScanFlag,
        assetName:assetName,
        assetsType:assetsType,
        modelNo:modelNo,
        sizeSqFeet:sizeSqFeet,
        allocatedToName:allocatedToName
        
    })    }}

    
export const ASSET_INFO_FLAG =(Scan_status_flag,Asset_info_flag)=>{  
    return (dispatch) => {
        dispatch({
        type: ActionTypes.ASSET_INFO_FLAG,
        Scan_status_flag:Scan_status_flag,
        Asset_info_flag:Asset_info_flag
        
    })    }}
  
    export const QR_CODE =(qrString)=>{  
        return (dispatch) => {
            dispatch({
            type: ActionTypes.QR_CODE,
            qrString:qrString,           
        })    }}
    

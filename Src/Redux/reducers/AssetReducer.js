import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
  
};


const AssetReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){       
              case ActionTypes.ASSET_INFO:
                return Object.assign({}, state, {  
                    assetID:action.assetID,
        assetQRcode:action.assetQRcode,
        CustomerID:action.CustomerID,
        ScanFlag:action.ScanFlag,
        assetName:action.assetName,
        assetsType:action.assetsType,
        modelNo:action.modelNo,
        sizeSqFeet:action.sizeSqFeet,
        allocatedToName:action.allocatedToName
      
              });
              //Scan_status_flag,Asset_info_flag
              case ActionTypes.ASSET_INFO_FLAG:
                return Object.assign({}, state, {  
                    Scan_status_flags:action.Scan_status_flag,
                    Asset_info_flags:action.Asset_info_flag    
              });
              case ActionTypes.QR_CODE:
                 
                return Object.assign({}, state, {  
                    qrString:action.qrString                   
              });
              
      
          default:
              return state
      }
  }
  export default AssetReducer;


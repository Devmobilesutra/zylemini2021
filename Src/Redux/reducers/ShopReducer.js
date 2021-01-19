import * as ActionTypes from '../constants/ActionTypes'

import {Router, Scene, Actions, ActionConst,Stack} from 'react-native-router-flux';

const initialState = {
    totalShops:0,
    shopsVisitedToday:0,
    orderInProcess:0,
    orderDelevered:0,
    orderTotal:0,
    paymentTotalOutstanding:0,
    totalNoAssets:0,
    serveyTaken:0,
    availableServey:0,
    totalNoScemes:0,
    shopId:''
};


const ShopReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.TOTAL_SHOPS:
                return Object.assign({}, state, {                 
                    totalShops: action.totalShops,                 
              });
              case ActionTypes.SHOP_INFO:
                return Object.assign({}, state, {  
                    ShopAreas: action.ShopAreas,
                    shopname:action.shopname,
                    ShopAddresss:action.ShopAddresss,
                    ShopContacts:action.ShopContacts    ,
                    shopId:action.shopId                  
              });

              case ActionTypes.SHOP_VISITED_TODAY:
                return Object.assign({}, state, {                      
                    shopsVisitedToday:action.shopsVisitedToday                  
              });
              case ActionTypes.ORDER_IN_PROCESS:
                return Object.assign({}, state, {                      
                    orderInProcess:action.orderInProcess                  
              });
              case ActionTypes.ORDER_DELEVERED:
                return Object.assign({}, state, {                      
                    orderDelevered:action.orderDelevered                  
              });
              case ActionTypes.ORDER_TOTAL:
                return Object.assign({}, state, {                      
                    orderTotal:action.orderTotal                  
              });

      
          default:
              return state
      }
  }
  export default ShopReducer;


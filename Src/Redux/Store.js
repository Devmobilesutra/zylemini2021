
 import login from './reducers/LoginReducer'
 import createOrder from './reducers/CreateOrderReducer'
 import shops from './reducers/ShopReducer'
 import datacollection from './reducers/DataCollectionReducer'
 import dashboard from './reducers/DashboardReducer'
 import servey from './reducers/ServeyReducer'

 import assets from './reducers/AssetReducer'
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

// import {Router} from '../../Router'

// const navigation = (state,action) => {
//     const newState = Router.router.getStateForAction(action, state);
//     return newState || state;
// }

//const rootReducer={countReducer}
//const rootReducer = combineReducers({login:login,homHomeReducer})

const rootReducer = combineReducers({login:login,createOrder:createOrder,dashboard:dashboard,shops:shops,assets:assets,servey:servey,datacollection:datacollection})


const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default store;
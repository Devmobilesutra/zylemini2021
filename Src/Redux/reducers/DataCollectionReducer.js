import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
    radiovalue:0,
    collectiontype:1,
    dataCollected:0,
    entityType :1
};


const DataCollectionReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.RADIOBUTTONINFO:
                return Object.assign({}, state, {                 
                    radiovalue: action.radiovalue,
                    collectiontype:action.collectiontype,                
                            
              });
              case ActionTypes.ENTITYTYPEINFO:
                return Object.assign({}, state, {                 
                    entityType:action.entityType,                
                            
              });
              case ActionTypes.TOTAL_DATA_COLLECTED:
                return Object.assign({}, state, {                 
                    dataCollected: action.dataCollected,                 
              });
              case ActionTypes.FromToDate:
                  //console.log(action.fromDate)
                  //console.log(action.toDate  )
                return Object.assign({}, state, {                 
                    fromDate: action.fromDate, 
                    toDate: action.toDate                
              });
            
          default:
              return state
      }
  }
  export default DataCollectionReducer;


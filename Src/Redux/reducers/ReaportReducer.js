import * as ActionTypes from '../constants/ActionTypes'



const initialState = {
  isFilter:false
};


const ReportReducers = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.ISFILTER:
                return Object.assign({}, state, {                 
                    isFilter: action.isFilter,
                   
                            
              });
            
          default:
              return state
      }
  }
  export default ReportReducers;


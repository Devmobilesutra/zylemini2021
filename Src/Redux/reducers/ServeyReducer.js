import * as ActionTypes from '../constants/ActionTypes'



const initialState = {
  
};


const ServeyReducer = (state=initialState, action) =>
 {
    const { type, payload } = action;
    switch (type){
        case ActionTypes.SERVEY_INFO:
                return Object.assign({}, state, {                 
                    SurveyName: action.SurveyName,
                    CompanyName:action.CompanyName,
                    PublishedDate:action.PublishedDate,
                    TimeRequired:action.TimeRequired,
                    SurveyURL:action.SurveyURL
                            
              });
            
          default:
              return state
      }
  }
  export default ServeyReducer;


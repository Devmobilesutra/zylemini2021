import * as ActionTypes from '../constants/ActionTypes'


export const SERVEY_INFO =(SurveyName,CompanyName,PublishedDate,TimeRequired,SurveyURL)=>{  
    return (dispatch) => {
        dispatch({
        type: ActionTypes.SERVEY_INFO,
        SurveyName: SurveyName,
        CompanyName:CompanyName,
        PublishedDate:PublishedDate,
        TimeRequired:TimeRequired,
        SurveyURL:SurveyURL
        
    })    }}


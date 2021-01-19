import * as ActionTypes from '../constants/ActionTypes'

export const RADIOBUTTONINFO =(radiovalue,collectiontype)=>{  
    return (dispatch) => {
        dispatch({
        type: ActionTypes.RADIOBUTTONINFO,
        radiovalue: radiovalue,
        collectiontype:collectiontype,
                
    }) 
   }
}

export const TOTAL_DATA_COLLECTED = (dataCollected) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.TOTAL_DATA_COLLECTED,
    dataCollected:dataCollected    
})
}

}


export const FromToDate = (fromDate,toDate) => {
    return (dispatch) => {
    dispatch({
    type: ActionTypes.FromToDate,
    fromDate:fromDate,
    toDate:toDate  
})
    }}
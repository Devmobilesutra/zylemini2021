import * as ActionTypes from '../constants/ActionTypes'

import axios from 'axios'

import { NavigationActions } from 'react-navigation'
import { ActionSheet } from 'native-base';
import { Router, Scene, Actions, ActionConst, Stack } from 'react-native-router-flux';
export default {
    movie
}

export const movie = () => {
  
    return (dispatch) => {
       fetch('https://api.themoviedb.org/3/genre/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({api_key:u68e82445c8842ba8616d0f6bf0e97a41})
        })
            .then((res) => res.json())
            .then(res => {
                //console.log("respo=",res)
                            
                if(res){
                  
                    //console.log("result is==",res)
                    Actions.movieDetail()
                    
                
                }
            })
            .catch((e) => {
               
            });

       
       
        }    
       
};
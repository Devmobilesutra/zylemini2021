import * as ActionTypes from '../constants/ActionTypes'
import { AsyncStorage, Alert, NetInfo } from 'react-native';
import { alertActions } from './alertActions';

import Dashboard from './../../Screens/Dashboard/Dashboard'
import axios from 'axios'

import { NavigationActions } from 'react-navigation'
import { ActionSheet } from 'native-base';
import { Router, Scene, Actions, ActionConst, Stack } from 'react-native-router-flux';
import jwtDecode from 'jwt-decode';

import Database from './../../utility/Database'
const db = new Database();
export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    login,
    loginLoading,
    changedata,
    insertAllData

}

const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    // alert(bool)
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const setAsyncStorage = () => {

};
export function dispatchAll(data) {
    return (dispatch) => {
        dispatch(insertAllData(data))
        dispatch(loginIsLoading(false));
        Actions.App()

    }
}


export function insertAllData(Data) {
    return {
        type: ActionTypes.INSERT_DATA,
        data: Data
    }

}
const changedata = (username, password, data) => {
    //alert("dispatch")
    return {
        type: ActionTypes.LOGIN,
        username: username,
        password: password,

    }
}
export const loginLoading = () => {
    return (dispatch) => {
        dispatch(loginIsLoading(false));
    }
}



export const login = (username, password, navigation) => {
    //console.log(username)
    //console.log(password)
    return (dispatch) => {
        dispatch(loginIsLoading(true));
        if (!username || !password) {
            dispatch(loginHasError(true));
            dispatch(loginIsLoading(false));
            return;
        }
        //for xgNalla
        // const headers = {
        //     'LoginId': username,
        //     'Password': password,
        //     'ClientCode': "XXCPA2020",
        //     'Id': "fac0f60a90df40f8"
        // }

        //for dilip k
        const headers = {
            'LoginId': username,
            'Password': password,
            'ClientCode': "XXCPA2020",
            'DeviceId': "111"
        }


        //  const url2 = "http://zylemdemo.com/ZyleminiPlusCoreAPI/api/Login/Login";

        const url2 = "http://sapltest.com/ZyleminiPlusAPI/api/Login/Login";
        //console.log("url is===", url2)
        axios({
            method: 'post',
            url: url2,
            // 'user': 'xgnalla',
            // 'password': 'Beam@123',
            headers: headers
        }).then((response) => {
            //console.log("Token is==========",JSON.stringify(response.data.Token))
            var decoded = jwtDecode(response.data.Token);
            AsyncStorage.setItem('userIds', JSON.stringify(decoded.UserId));
            AsyncStorage.setItem('usernames', JSON.stringify(decoded.UserName));
            //   {"AreaId": "15390", "DataBaseName": "ZyleminiPlus", "DeviceId": "fac0f60a90df40f8",
            // "SqlServerIP": "WIN-9OSOAKO8F5G", "SqlServerPWD": "Sapl@2017", 
            //"SqlServerUserName": "sa", "UserId": "52362", "UserName": "Ganesh Nalla"}

            AsyncStorage.setItem("AreaId", JSON.stringify(decoded.AreaId));
            AsyncStorage.setItem("JWTToken", JSON.stringify(response.data.Token));
            //const url1 = "http://zylemdemo.com/ZyleminiPlusCoreAPI/api/Data/GetData"
            const url1 = "http://sapltest.com/ZyleminiPlusAPI/api/Data/GetData"
            //console.log("url is===", url1)
            //console.log("aaaaaaa========",response.data.Token)
            const headers1 = {
                'authheader': response.data.Token
            }
            axios.get(url1, {
                headers: headers1
            }).then(res => {
                //  //console.log("rajani data1=",JSON.stringify(res))
                if (res.data) {

                    dispatch(loginHasError(false));
                    dispatch(isLogged("true"));
                    dispatch(changedata(username, password))
                    const data = JSON.stringify(res.data)
                    //console.log("rajani data=",JSON.stringify(data))
                    // db.insertAllData(data)
                    //   dispatch(dispatchAll(data))
                    //  dispatch(insertAllData(data))
                    db.insertAllData(data).then((results) => {
                        // alert(results)
                        if (results) {
                            dispatch(loginIsLoading(false));
                            Actions.App()
                        }


                    })
                    dispatch(changedata(username, password, data))
                    dispatch(alertActions.success('Login successful...........'));
                    AsyncStorage.setItem('isLogged', "true");
                    AsyncStorage.setItem('isLogged', "true");
                }
                else {
                    alert("Invalid Credentials")
                    dispatch(loginIsLoading(false));
                }

            }).catch((error) => {
                //console.log("errr")
                dispatch(loginIsLoading(false));
                //console.log('error ' + error);
                alert(error)
                dispatch(loginHasError(true));
                dispatch(alertActions.error(error.toString()));

            });


        })
            .catch((error) => {
                //console.log(error);
                dispatch(loginIsLoading(false));
                alert(error)

            });



        //alert(check ypur internet)
        // example
        // fetch('http://mobilesutra.com/Balaji/service/User/register', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        // 'user': 'xgnalla',
        // 'password': 'Beam@123',
        // 'deviceid': '59AD38A2FA1347E682F89FE5D3BB15A2',
        // 'areaid': '0',
        // 'newpartycount': '0'

        //     },
        //     body: JSON.stringify({username: username, mobile_no: password})
        // })
        //     .then((res) => res.json())
        //     .then(res => {
        //         //console.log("respo=",res)
        //         dispatch(loginIsLoading(false));

        //         // //console.log(res);               
        //         if(res.status==true){
        //             //console.log("true=",JSON.stringify(res.data))
        //             const datas=JSON.stringify(res.data)
        //             db.insertUser(datas)
        //             dispatch(changedata(res.data,username,password))

        //             dispatch(loginHasError(false));
        //             dispatch(isLogged(true));
        //             AsyncStorage.setItem('token', 'asdasdasd123'); // example
        //             Actions.Home()
        //         }
        //     })
        //     .catch((e) => {
        //         // console.warn(e);
        //         dispatch(loginHasError(true));
        //     });





    };
    const nav = () => {
        alert("in.....")
    }

    // const logout = () => {
    //     AsyncStorage.removeItem('token');
    //     Actions.Login();
    //     return {
    //         type: ActionTypes.LOGOUT
    //     }
    // };

    // this.insertDb(){

    // }
}

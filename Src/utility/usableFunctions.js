import React, { Component } from 'react';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


export default class usableFunction extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        })
    }

    successToast = (text) => {
        Toast.show({
            text: text,
            type: "success",
            position: "bottom",
            duration: 1000
        })
    }

    errorToast = (error) => {
        Toast.show({
            text: error,
            type: "danger",
            position: "bottom", // bottom
            duration: 1000
        })
    }

    warningToast = (text) => {
        Toast.show({
            text: text,
            type: "warning",
            position: "bottom",
            duration: 1000
        })
    }

    createStar = (mainStr) => {
        // var mainStr = '1234567891234567';
        var vis = mainStr.slice(-4);
        var countNum = '';
        var result = '';

        for (var i = (mainStr.length) - 4; i > 0; i--) {
            countNum += '*';
        }
        result = countNum + vis;
        return result;
    }

    decodeURIComponentSafe(uri, mod) {
        var out = new String(),
            arr,
            i = 0,
            l,
            x;
        typeof mod === "undefined" ? mod = 0 : 0;
        arr = uri.split(/(%(?:d0|d1)%.{2})/);
        for (l = arr.length; i < l; i++) {
            try {
                x = decodeURIComponent(arr[i]);
            } catch (e) {
                x = mod ? arr[i].replace(/%(?!\d+)/g, '%25') : arr[i];
            }
            out += x;
        }
        return out;
    }

    saveAsynch = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }

    getAsynch = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value != null) {
                return value;
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }
}
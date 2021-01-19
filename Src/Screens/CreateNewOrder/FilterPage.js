import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { connect } from 'react-redux'


export class FilterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View><Text>Filter Page</Text></View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // login:state.login,
        // isLogged: state.login.isLogged,
        // hasError : state.login.hasError,
        // isLoading: state.login.isLoading,
    };
};

const mapDispatchToProps = dispatch => ({
    
        // onLogin: (username, password,navigation) => { dispatch(login(username, password,navigation));
        //                                 //   dispatch(NavigationActions.navigate({routeName: 'Dashboard'}))
        //                                  },
        
      
        

})
export default connect(mapStateToProps, mapDispatchToProps)(FilterPage)

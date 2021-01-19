import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';


export default class PrivacyPolicy extends Component {
constructor(props) {
    super(props);
    this.state = {  };
}

static navigationOptions = {
  title: 'Privacy Policy',
  color: 'white',
    headerStyle: {
        backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    },

  //  headerLeft: <Icon  name="ios-arrow-round-back" size={20} color="white"    padding='20'  
  //               onPress={ () => { Actions.Dashboard() }}   />

  headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.drawerMenu() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
            
        </View>
 )
                               
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.drawerMenu();
     return true;
   }
   componentDidMount() {
  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
   
}

render() {
    return (
        <View>
            <Text>Privacy policy</Text> 
        </View>   
    );
}
}

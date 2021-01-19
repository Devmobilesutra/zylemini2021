import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon, } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';


export default class DropdownCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Dropdown
                   
                        // label='Select'
                        dropdownOffset={{top:10}}
                        containerStyle={styles.dropDownContainer}
                        rippleCentered={true}
                        itemColor = '#ADA2A2'
                        // fontSize = '10'
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                       data = {this.props.data}
                    />

                //      {/* Trying To use ui Arrow */}
                //  {/* <View style={{ position: "absolute", marginHorizontal: hp('4'), marginVertical: wp('14') }}> 
                //     <Image style={{width: wp('10'), height: hp('5')}}
                //     source={require('../../Assets/Icons/right_arrow.png')}/>
                //  </View> */}
        );
    }
}

 

const styles = StyleSheet.create({
     dropDownContainer : {
      borderWidth:wp('0.5'), 
      borderColor:'#E6DFDF', 
    //   borderRadius: wp('1%'), 
      width: wp('90%'), 
      marginTop: hp('1'), 
      paddingRight: wp('3%'), 
      marginVertical: hp('3'),
      marginHorizontal: wp('1'),
      backgroundColor: '#FFFFFF',
  },


});
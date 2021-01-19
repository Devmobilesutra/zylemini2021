import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class NextButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style= {styles.buttonContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText} > NEXT </Text>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
       width: wp('100'),
       height: hp('8'),
       backgroundColor: '#46BE50',
       marginVertical: 1,
       paddingVertical: 15,
       justifyContent: 'center',
     },
 
    
     buttonText: {
       fontSize: 16,
       color: '#ffffff',
       textAlign: 'center',
       alignItems: 'center',
       justifyContent: 'center',
       fontWeight: 'bold',
       fontFamily: 'Proxima Nova',
     },
      
 });
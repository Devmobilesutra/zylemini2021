import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux'



export class ShopDetailExtended extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardContainer}>

                    <View style= {styles.ownerRowContainer}>
                        <View style= {styles.ownerContainer}>
                            <Text  style = {styles.ownerTextStyle}>
                                OWNER
                            </Text>
                            <Text  style = {styles.ownaerNameTextStyle}>
                                Roopkumar Singh
                            </Text>
                        </View>
                        <View style= {styles.shopTypeContainer}>
                            <Text  style = {styles.shopTypeHeaderTextStyle}>
                                SHOP TYPE
                            </Text>
                            <Text  style = {styles.shopTypeTextStyle}>
                                General Store
                            </Text>
                        </View>
                    </View>

                    <View style={styles.ownerBottomContainer}>
                       <Text  style = {styles.ownerBottomTextStyle}>
                                OWNER
                        </Text>
                    </View>

                    <View style={styles.addressContainer}>
                        <Text  style = {styles.addressTextContainer}>
                                Block 1, Commercial Complex, Street Name, Nearby Landmark.
                                Kothrud, Pune, Maharashtra, India
                        </Text>
                    </View>
                
                </View>
            </ScrollView> 
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical: hp('-2'),
     
        // marginLeft:wp('-0.5'),
        // marginRight:wp('-0.7'),
        alignItems: 'center',
      justifyContent:'center'
    },

    cardContainer: {
      
    flex:1,
        backgroundColor: '#FFFFFF',
        justifyContent:'center',
        borderColor: '#E6DFDF',
        // borderRadius: wp('2'), 
        // borderRadius: wp('2'), 
        borderBottomEndRadius: wp('2'), 
        borderBottomLeftRadius: wp('2'), 
            height: hp('28'), 
        width: wp('89'),
        borderRightWidth: hp('0.3'), 
        borderLeftWidth: hp('0.3'), 
        borderBottomWidth: hp('0.4'), 
    },

    ownerRowContainer: { 
        flex:1, 
        flexDirection:'row', 
    },

    ownerContainer: { 
        flex:0.5, 
        flexDirection:'column', 
    },

    ownerTextStyle: {  
        color: '#796A6A', 
        fontSize: wp('4'), 
        fontWeight: 'bold',  
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova', 
        marginTop:hp('3'),  
    },

    ownaerNameTextStyle: {  
        color: '#796A6A', 
        fontSize: wp('3'), 
        marginTop: hp('1'), 
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova', 
    },

    shopTypeContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-end',
    },

    shopTypeHeaderTextStyle: {  
        color: '#796A6A', 
        fontSize: wp('4'), 
        fontWeight: 'bold',   
        marginRight: wp('17'), 
        fontFamily:'Proxima Nova', 
        marginTop: hp('3'), 
    },

    shopTypeTextStyle: {  
        color: '#796A6A', 
        fontSize: wp('3'), 
        marginTop: hp('1%'), 
        marginRight: wp('17'),  
        fontFamily:'Proxima Nova',  
    },

    ownerBottomContainer: {
        flex:1, 
        flexDirection:'column', 
        marginTop:hp('2'),
    },

    ownerBottomTextStyle: {  
        color: '#796A6A', 
        fontSize: wp('4'), 
        fontWeight: 'bold',  
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova',
        marginTop:hp('3'),  
    },

    addressContainer: {
        flex:1,
    },

    addressTextContainer: {  
        color: '#796A6A', 
        fontSize: wp('2.7'), 
        marginTop: hp('-1'), 
        marginLeft: wp('6'), 
        fontFamily:'Proxima Nova',
        marginRight:wp('0.7'),  
    },
})


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
export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailExtended)
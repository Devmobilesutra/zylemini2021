import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import NextButton from '../../components/NextButton';
import {Radio} from 'native-base'
import {ASSET_INFO,ASSET_INFO_FLAG,QR_CODE} from '../../Redux/actions/AssetsAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();



const data = [{
    value: 'Product 1',
    }, {
    value: 'Product 2',
    }, 
];

export  class Manual1 extends Component {
constructor(props) {
    super(props);
    this.state = { 
        value: '',
    };
}

static navigationOptions = {
    title: 'Audit Asset',
    color: 'white',
      headerStyle: {
          backgroundColor: '#221818'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: '#fff', marginLeft: wp('-1.5'),fontSize:12,fontWeight:'bold'
      },
  
      headerLeft: (
          <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
              <TouchableOpacity   onPress={() =>Actions.TabBarScanQRManual() }>  
                  <Image  style={{marginLeft:wp('4'),}}
                      source = {require('../../assets/Icons/Back_White.png')}
                  />
              </TouchableOpacity>
          </View>
      )                               
  }
  

render() {
    return (
    <View style={{flex:1}} >
        <ImageBackground
                // source={require('../../Assets/Icons/android_BG.png')}
            style={{backgroundColor:'#796A6A',flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
        > 
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={{flex:1}}>
                {/* Choose Product type  */}
                <View style={{backgroundColor:'#221818'}}>
                  <Text style={{color:'#F8F4F4',fontSize:16,marginLeft:hp('3'),marginBottom:hp('4'),marginTop:hp('1'),  fontFamily: 'Proxima Nova',fontWeight: 'bold', }}>Select Asset</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#F8F4F4',fontSize:10,marginLeft:hp('3'),marginBottom:hp('1'),marginTop:hp('2'),  fontFamily: 'Proxima Nova',        fontWeight: 'bold', }}>4 Result</Text>
                  <Text style={{color:'#F8F4F4',fontSize:10,marginLeft:hp('30'),marginBottom:hp('1'),marginTop:hp('2'),  fontFamily: 'Proxima Nova',        fontWeight: 'bold', }}>+ Add Manually</Text>
              </View>

              <View style={styles.pastSurveysCardContainer}>
              <Radio style={{flex:0.7,marginLeft:hp('3'),marginRight:hp('2'),alignItems:'center',alignSelf:'center'}}  color="#FDFDFD" selectedColor="#FDFDFD" selected = {true}></Radio>
                <View style={styles.pastSurveysCardBG}>
                    <View style={styles.pastSurveyimageContainer}>  
                        <Image style={styles.pastSurveyimageStyles} 
                                source = {require('../../assets/Icons/SurveyCard.png')}/>       
                    </View>
                    <View style={styles.pastSurveyContainer}>
                        <Text style={styles.pastSurveyNameTextStyle}>
                            Model Name   
                        </Text >
                        <Text style={styles.companyNameTextStyle}>
                            Product Type 
                        </Text>
                        <Text style={styles.dateTimeTextStyle}>
                            Product Location 
                        </Text>
                    </View>
                </View>
            </View>
               

            <View style={styles.pastSurveysCardContainer}>
              <Radio style={{flex:0.7,marginLeft:hp('3'),marginRight:hp('2'),alignItems:'center',alignSelf:'center'}}  color="#FDFDFD" selectedColor="#FDFDFD" selected = {false}></Radio>
                <View style={styles.pastSurveysCardBG}>
                    <View style={styles.pastSurveyimageContainer}>  
                        <Image style={styles.pastSurveyimageStyles} 
                                source = {require('../../assets/Icons/SurveyCard.png')}/>       
                    </View>
                    <View style={styles.pastSurveyContainer}>
                        <Text style={styles.pastSurveyNameTextStyle}>
                            Model Name   
                        </Text >
                        <Text style={styles.companyNameTextStyle}>
                            Product Type 
                        </Text>
                        <Text style={styles.dateTimeTextStyle}>
                            Product Location 
                        </Text>
                    </View>
                </View>
            </View>

            
            <View style={styles.pastSurveysCardContainer}>
              <Radio style={{flex:0.7,marginLeft:hp('3'),marginRight:hp('2'),alignItems:'center',alignSelf:'center'}}  color="#FDFDFD" selectedColor="#FDFDFD" selected = {false}></Radio>
                <View style={styles.pastSurveysCardBG}>
                    <View style={styles.pastSurveyimageContainer}>  
                        <Image style={styles.pastSurveyimageStyles} 
                                source = {require('../../assets/Icons/SurveyCard.png')}/>       
                    </View>
                    <View style={styles.pastSurveyContainer}>
                        <Text style={styles.pastSurveyNameTextStyle}>
                            Model Name   
                        </Text >
                        <Text style={styles.companyNameTextStyle}>
                            Product Type 
                        </Text>
                        <Text style={styles.dateTimeTextStyle}>
                            Product Location 
                        </Text>
                    </View>
                </View>
            </View>
                   
            </View>
        </ScrollView>
            <View>
                {/* CONFIRM Button */}
                <View style={styles.confirmButtonMainContainer}>
                    <TouchableOpacity onPress={this.nextNavigation}>
                        <View style={styles.confirmButtonInnerContainer}>
                            <Text style={styles.confirmTextStyle}>
                                    CONFIRM
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    </View>
    );
}
}

const mapStateToProps = (state) => {
    return {
     
      shops: state.shops,
      dashboard: state.dashboard,
    };
  };
  const mapDispatchToProps = dispatch => ({
  //  shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds));                                },
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(Manual1)
  

const styles = StyleSheet.create({

    nameMainContainer: {
        flex:1,
    },

    nameTextStyle: { 
        color:'#FFFFFF', 
        fontSize:10, 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('5'),
        marginTop:hp('2'),
    },

    nameTextBoxMainContainer:{
        flex:1, 
        marginTop:hp('1.5')
    },

    dropDownContainer : {
        borderColor:'#E6DFDF', 
        borderRadius: wp('2'), 
        width: wp('90'), 
        height: hp('8'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal:hp('2'), 
        borderWidth:wp('0.3'), 
        alignSelf:'center',
        justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
        textAlign: 'center',
        padding: 15,
    },

    pastSurveysCardContainer:{
        flex:1,
        marginTop:hp('1'),
        flexDirection:'row'
    },

    pastSurveysCardBG: {
        flex:10,
        backgroundColor:'#FFFFFF', 
        borderColor:'#E6DFDF', 
        borderWidth:wp('0.3'),
        borderRadius:wp('1.5'), 
        height:hp('17'), 
        width:wp('90'), 
        alignSelf:'center',
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center' , 
        marginTop:hp('1.5'),  marginRight:hp('3.8'),marginLeft:hp('0.8')
    },

    pastSurveyimageContainer: { 
        flex:1, 
        alignItems: 'flex-start',
    },

    pastSurveyimageStyles: { 
        marginLeft: wp('5'),
        height:hp('9'),
        width:wp('18'),
    },

    pastSurveyContainer: { 
        flex:3, 
        flexDirection:'column', 
        alignItems: 'flex-start',
        marginTop: hp('-3'),
        marginLeft: wp('9'),
    },

    pastSurveyNameTextStyle: { 
        color:'#796A6A',  
        fontWeight: 'bold',
        fontFamily:'Proxima Nova', 
        fontSize:14,
        marginTop: hp('2.5'),
    },

    companyNameTextStyle: { 
        color:'#796A6A', 
        fontFamily:'Proxima Nova', 
        fontSize:10, 
        marginTop:wp('2.5'),
    },

    dateTimeTextStyle: { 
        color:'#796A6A', 
        fontFamily:'Proxima Nova', 
        fontSize:10,
        marginTop:wp('2.5'),

    },

    confirmButtonMainContainer: {
        marginTop:hp('3'), 
        alignItems:'center', 
        justifyContent:'center',
        marginBottom:hp('5'),
    },

    confirmButtonInnerContainer:{
        backgroundColor:'#221818', 
        height:hp('9'), 
        width:wp('90'), 
        borderRadius:wp('2'), 
        alignItems:'center',
        justifyContent:'center',
    },

    confirmTextStyle:{ 
        color: '#FFFFFF', 
        fontSize:RFValue(15), 
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },


});

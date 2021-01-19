import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { FloatingAction } from "react-native-floating-action";
import { TOTAL_SHOPS} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
var open
const actions = [
    {
        text: "Create New Order",
        color: 'transperent',
        name: "bt_create", 
        position: 4,
        textColor: 'black',
        textStyle: {fontSize: 14,fontWeight:'bold', marginHorizontal: 10 },
        buttonSize: 0,
      },
      {
        text: "Accept Payment",
        color: 'transperent',
        name: "bt_payment", 
        position: 3,
        textColor: 'black',
        textStyle: { fontSize: 14,fontWeight:'bold',marginHorizontal: 15, },
        buttonSize: 0,
      },
      {
        text: "Take A Survey",
        color: 'transperent',
        name: "bt_survey", 
        position: 2,
        textColor: 'black',
        textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 22, },
        buttonSize: 0,
      },
      {
        text: "Audit Assets",
        color: 'transperent',
        name: "bt_assets", 
        position: 1,
        textColor: 'black',
          textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 25, },
          buttonSize: 0,
      },
    
    ];






export  class Schemes extends Component {
constructor(props) {
    super(props);
    this.state = {active:false  };
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.Shops();
     return true;
   }
  //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
componentWillMount(){
BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);}
render() {
    return (
        <View>
         <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{width:wp('100'),height:hp('70'), resizeMode: 'cover',  justifyContent: 'center',}}
         > 
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/*Total Shops  */}
                <View style= {styles.totalSchemesMainContainer}>
                    <View style= {styles.schemesColContainer}>
                        <Text  style = {styles.schemesCountTextStyle}>
                                8
                        </Text>
                        <Text  style = {styles.schemesHeadingTextStyle}>
                                Total No. Schemes
                        </Text>
                    </View>
                    {/* Filter Icon */}
                    <View style= {styles.filterIconContainer}>
                        <Image  source={require('../../assets/Icons/filter_list_shop.png')}
                            style={styles.filterIconStyle}>
                        </Image>
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                {/* Brand Product Card */}
                <View style={styles.brandCardMainContainer}>
                    {/* Card White BG */}
                    <View style={styles.brandCardCardBG}>
                        <Text style={styles.brandNameTextStyle}>
                            Brand / Product Name
                        </Text>
                         {/* Image */}
                        <View style={styles.schemesImgBG}>
                                <Image style={styles.schemesImgStyle}  
                                                source = {require('../../assets/Icons/Schemes.png')}
                                    />
                        </View>
                        {/* Schemes Details */}
                        <View style={styles.schemesDetailsContainer}>
                            <Text style={styles.schemesDetailsTextStyle}>
                                Scheme details in 2 lines. Scheme details in 2 lines. Scheme details in 2 lines. Scheme details in 2 lines.
                            </Text>
                        </View>
                        {/* Dash line */}
                        <View style={styles.cardDashLineMainContainer}>
                            <Dash style={styles.cardDashStyle} 
                                dashLength = {2}
                                dashColor = '#E6DFDF'
                            />
                        </View>
                        {/* Publish Last Date */}
                        <View style={styles.PLDateainContainer}>
                            <View style={styles.publishDateColContainer}>
                                    <Text style={styles.publishDateLabelStyle}>
                                        PUBLISH DATE
                                    </Text>
                                    <Text style={styles.publishDateTextStyle}>
                                        20 Dec 2019
                                    </Text>
                            </View>
                            <View style={styles.lastDateColContainer}>
                                    <Text style={styles.lastDateLabelStyle}>
                                        LAST DATE
                                    </Text>
                                    <Text style={styles.lastDateTextStyle}>
                                        12 Jan 2020
                                    </Text>
                            </View>
                            <View style={styles.viewDetailColContainer}>
                                <Text style={styles.viewDetailsLabelStyle}>
                                    View Details
                                </Text>
                            {/* </View>
                            <View style={{flex:1, flexDirection:'column',alignItems:'flex-end',justifyContent:'flex-end', }}> */}
                                <Image  style={styles.viewDetailesArrowStyle}
                                        source = {require('../../assets/Icons/right_arrow_front.png')}
                                />
                            </View>
                        </View>
                    </View> 
                </View>
                 <View style={{height:hp('10')}}></View>
            </ScrollView>
                <FloatingAction
                   open={open}
                   color='#a10d59'
                   actions={actions}
                   buttonSize={hp('9.5')}
                   floatingIcon={this.state.active == false ?
                     require('../../assets/Icons/Floating.png')
                     :
                     require('../../assets/Icons/FAB_Close_Menu.png')
                   }
                   iconWidth={wp(20)}
                   iconHeight={hp(16)}
                   // iconWidth={wp(5)}
                   // iconHeight={hp(3)}
                   shadow='null'
                   overlayColor='#221818'
                   showBackground={true}
                   onStateChange={this._onStateChange}
                    onPressItem={name => {
                        // if(name = "bt_create"){ 
                                Actions.CreateNewOrderFirst()
                                this.setState({ 
                                    active: !this.state.active,
                                  })
                        // }
                    }}
                    onPressMain={() => {
                        if (this.state.active == false) {
                          this.setState({
                            active: !this.state.active,
                          })
                        //  BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
                        }
                        else {
                          this.setState({
                            active: !this.state.active,
                          })
            
                        }
                      }
                      }        
                      onPressBackdrop = { () => {
                        if(this.state.active==false){
                          this.setState({ 
                            active: !this.state.active,
                          })
                          //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
                        }
                        else{
                          this.setState({ 
                            active: !this.state.active,
                          })
                            
                          }
                        }
                      }     
               
                />
         </ImageBackground>
        </View>       
        );
    }
}

const mapStateToProps = (state) => {
    return {
      shops: state.shops,
    };
};
const mapDispatchToProps = dispatch => ({
    //    userid: (val) => { dispatch(USER_ID(val));                                  
    //                                  },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(Schemes)

const styles = StyleSheet.create({
    totalSchemesMainContainer:{ 
        flex:1, 
        flexDirection:'row', 
        marginTop:hp('2'),
    },

    schemesColContainer:{ 
        flex:8, 
        flexDirection:'column', 
        alignItems:'center',
        justifyContent:'center',
    },

    schemesCountTextStyle: {  
        color: '#221818', 
        fontSize:18, 
        fontWeight: 'bold',
        // marginLeft: wp('15'), 
        alignSelf:'center',
        fontFamily: 'Proxima Nova',   
    },

    schemesHeadingTextStyle:{  
        color: '#8C7878', 
        fontSize:12,  
        fontWeight: 'bold', 
        marginTop:hp('0.5'), 
        alignSelf:'center',
        // marginLeft: wp('5'), 
        fontFamily: 'Proxima Nova', 
    },

    filterIconContainer:{ 
        flex:0.5, 
        flexDirection:'column',
        alignItems:'flex-end',
        // marginTop:hp('1'),
    },

    filterIconStyle:{ 
        justifyContent: 'center',
        height:hp('4'),
        width:wp('8'), 
        marginRight:wp('5'),
        marginTop:hp('2'),
    },

    dashLineContainer: {
        flex:1, 
        marginTop:hp('3'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('100'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    brandCardMainContainer:{ 
        marginTop:hp('3'),
    },

    brandCardCardBG: {
        flexDirection:'column',
        backgroundColor: '#FFFFFF', 
        flex:1, 
        borderColor: '#E6DFDF',
        alignSelf:'center',
        borderRadius: wp('2'), 
        height: hp('53'), 
        width: wp('90'),
        borderWidth: hp('0.2'), 
    },

    brandNameTextStyle:{
        marginTop:hp('2'), 
        marginLeft:wp('3'), 
        color:'#796A6A',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova',
        fontSize:14,
    },

    schemesImgBG:{
        marginTop:hp('3'), 
        backgroundColor:'#F8F4F4', 
        alignSelf:'center',
        height:hp('25'), 
        width:wp('81'), 
        borderRadius:wp('1'),
        justifyContent:'center',
    },

    schemesImgStyle:{
        alignSelf:'center', 
        height:hp('9'),
    },

    schemesDetailsContainer:{
        flexDirection:'row', 
        marginTop:hp('2'),
        marginLeft:wp('4'),
        marginRight:wp('4'), 
    },

    schemesDetailsTextStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova',
        fontSize:12, 
    },

    cardDashLineMainContainer:{ 
        marginTop:hp('3'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    cardDashStyle:{
        width:wp('85'),   
        height:hp('1'),
    },

    PLDateainContainer:{
        marginTop:hp('1'), 
        flexDirection:'row', 
        marginLeft:wp('4'),
    },

    publishDateColContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-start',
    },

    publishDateLabelStyle:{
        color:'#362828',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12,
    },

    publishDateTextStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        marginTop:hp('1'),
    },

    lastDateColContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center',
        marginRight:wp('7'),
    },

    lastDateLabelStyle:{
        color:'#362828',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
    },

    lastDateTextStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12,
         marginTop:hp('1'),
    },

    viewDetailColContainer:{
        flex:1, 
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center', 
        // marginBottom:wp('3'),
    },

    viewDetailsLabelStyle:{
        color:'#3955CB',
        // fontWeight:'normal',
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        alignSelf:'center',  
    },

    viewDetailesArrowStyle:{
        tintColor:'#3955CB', 
        height:hp('2.5'),
        alignSelf:'center',
    },


})
import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,AsyncStorage,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { FloatingAction } from "react-native-floating-action";

import { SERVEY_INFO} from '../../Redux/actions/ServeyAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import User from '../../utility/User';
const db = new Database();
var open
const actions = [
  {
    text: "Create New Order",
    color: 'transperent',
    name: "bt_create", 
    position: 4,
    textColor: 'black',
    textStyle: { fontSize: 16,fontWeight:'bold', marginHorizontal: 10 },
    buttonSize: 0,
  },
  {
    text: "Accept Payment",
    color: 'transperent',
    name: "bt_payment", 
    position: 3,
    textColor: 'black',
    textStyle: { fontSize: 16,fontWeight:'bold', marginHorizontal: 15, },
    buttonSize: 0,
  },
  {
    text: "Take A Survey",
    color: 'transperent',
    name: "bt_survey", 
    position: 2,
    textColor: 'black',
    textStyle: { fontSize: 16,fontWeight:'bold', marginHorizontal: 22, },
    buttonSize: 0,
  },
  {
    text: "Audit Assets",
    color: 'transperent',
    name: "bt_assets", 
    position: 1,
    textColor: 'black',
      textStyle: { fontSize: 16,fontWeight:'bold', marginHorizontal: 25, },
      buttonSize: 0,
  },

];

const list = [
    {
        surveyname: 'Survey Name',
        company: 'Company / Brand Name',
        date: '22 Dec 2019',
        time: '3.30 PM',
    },
    {
        surveyname: 'Survey Name',
        company: 'Company / Brand Name',
        date: '22 Dec 2019',
        time: '3.30 PM',
    },
    {
        surveyname: 'Survey Name',
        company: 'Company / Brand Name',
        date: '22 Dec 2019',
        time: '3.30 PM',
    },
    
];

export  class Surveys extends Component {
constructor(props) {
    super(props);
    this.state = { list1:[],list2:[],list1Len:'',list2Len:'',active:false };
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    db.getAvailableServey().then((data)=>{
        //console.log("aaaaaaaaa=="+JSON.stringify(data))
this.setState({list1:data})
this.setState({list1Len:data.length})
    })
    db.getAvailableServey1().then((data)=>{
        //console.log("aaaaaaaaa=="+JSON.stringify(data))
this.setState({list2:data})
this.setState({list2Len:data.length})
    })
}

TakeServeyPage(item){
    
    this.props.serveyInfos(item.SurveyName,item.CompanyName,item.PublishedDate,item.TimeRequired,item.SurveyURL)

Actions.DetailViewSurveyBrowser({serveyUrl:item.SurveyURL})
}
render() {
    return (
        <View  style={{flex:1,}}>
         <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
         > 
          <ScrollView
                    showsVerticalScrollIndicator={false}
          >
            {/* Surveys Taken n Available */}
            <View style= {styles.surveyTakenAvilableMainContainer}>
                <View style= {styles.surveyTakenColContainer}>
                    <Text  style = {styles.surTakenCountStyle}>
                    {this.state.list2Len}
                    </Text>
                    <Text  style = {styles.surTakenLabelStyle}>
                            Surveys Taken
                    </Text>
                </View>
                <View style= {styles.availabelSurveyColContainer}>
                    <Text  style = {styles.availableSurveyCountStyle}>
                            {this.state.list1Len}
                    </Text>
                    <Text  style = {styles.availableSurveyLabelStyle}>
                            Available Surveys
                    </Text>
                </View>
            </View>

            {/* Dash Line */}
            <View style={styles.dashLineContainer}>
                <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                />
            </View>

            <View style={styles.surveyCardMainContainer}>
                {/* Survey Card */}
                {
                                this.state.list1.map((item, index) => (
                                    <View style={styles.pastSurveysCardBG}>
                                        <View style={styles.pastSurveyimageContainer}>
                                            {/* <View style={{}}> */}
                                            <ImageBackground style={styles.pastSurveyimageStyles}
                                                source={require('../../assets/Icons/SurveyCard.png')} >
                                                <Text style={{color:'grey',fontSize: RFValue(25),justifyContent: 'center', alignSelf: 'center',alignContent:'center', marginTop: hp('2')}}>{item.SurveyName[0]}</Text>
                                                </ImageBackground>
                                            {/* </View> */}
                                        </View>
                                        <View style={styles.pastSurveyContainer}>
                                            <Text style={styles.pastSurveyNameTextStyle}>
                                                {item.SurveyName}
                                            </Text >
                                            <Text style={styles.companyNameTextStyle}>
                                                {item.CompanyName}
                                            </Text>
                                            <Text style={styles.dateTimeTextStyle}>
                                                {item.PublishedDate}    
                                            </Text>
                                            <View style={styles.cardDashLineMainContainer}>
                                            <Dash style={styles.cardDashStyle1}
                                                dashLength={2}
                                                dashColor='#E6DFDF'
                                            />
                                        </View>
                                        <View style={styles.buttonMainContainer}>                                       
                                       
                                            {/* <TouchableOpacity  onPress={() => { this.TakeServeyPage(item)}}> */}
                                              <TouchableOpacity>
                                                <View style={styles.buttonBGStyle}>
                                                    <Text style={styles.buttonTextStyle}>
                                                        TAKE SURVEY
                            </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </View>

                                        
                                    </View>

                                ))
                            }



            </View>
            {/* Past Surveys */}
            <View style={styles.pastSurveyMainContainer}>
                <View style={styles.pastSurveysRowContainer}>
                    <Text style={styles.pastSurveysLabelStyle}>
                        PAST SURVEYS
                    </Text>
                     <Text style={styles.pastSurveysCountStyle}>
                     {this.state.list2Len}
                    </Text>
                </View>
            </View>

            {/* Small Card */}

            <View style={styles.pastSurveysCardContainer}>
            {
                this.state.list2.map((item, index) => (
                <View style={styles.pastSurveysCardBG}>
                    <View style={styles.pastSurveyimageContainer}>
                        {/* <View style={{}}> */}
                            <Image style={styles.pastSurveyimageStyles} 
                                source = {require('../../assets/Icons/SurveyCard.png')}/>
                        {/* </View> */}
                    </View>
                    <View style={styles.pastSurveyContainer}>
                        <Text style={styles.pastSurveyNameTextStyle}>
                        {item.SurveyName}
                        </Text >
                        <Text style={styles.companyNameTextStyle}>
                        {item.CompanyName}
                        </Text>
                        <Text style={styles.dateTimeTextStyle}>
                        {item.PublishedDate} 
                        </Text>
                    </View>
                </View>
                ))
                }
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
                onPressItem={name => {
                    if(name == "bt_assets"){ 
                        Actions.AssetUpdate()
                        this.setState({ 
                            active: !this.state.active,
                          })
                }
                else if(name == "bt_create"){ 
                  //  AsyncStorage.setItem('outletName',"");
                 //   AsyncStorage.setItem('outletId',"");
                  //  AsyncStorage.setItem('beatName',"");
                    AsyncStorage.setItem('beatId',"");
                    AsyncStorage.setItem('distributorName',"");      
                    AsyncStorage.setItem('SearchString', "");          
                    User.FlagForNavigation ='Surveys';
                        Actions.CreateNewOrderFirst()
                        this.setState({ 
                            active: !this.state.active,
                          })
                }else if(name == "bt_survey"){
                    Actions.AssetUpdate()
                    this.setState({ 
                        active: !this.state.active,
                      })
                }
                }}
                onPressMain={() => {
                    if (this.state.active == false) {
                      this.setState({
                        active: !this.state.active,
                      })
                  //    BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
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
    
    serveyInfos: (SurveyName,CompanyName,PublishedDate,TimeRequired,SurveyURL) => { dispatch(SERVEY_INFO(SurveyName,CompanyName,PublishedDate,TimeRequired,SurveyURL));                                },


}
)
export default connect(mapStateToProps, mapDispatchToProps)(Surveys)

const styles = StyleSheet.create({

    surveyTakenAvilableMainContainer:{
        flex:1,
        flexDirection:'row', 
        marginTop:hp('2'),
    },

    surveyTakenColContainer:{ 
        flex:1, 
        flexDirection:'column', 
        alignItems:'flex-start',
        justifyContent:'center',
    },

    surTakenCountStyle:{  
        color: '#221818', 
        fontSize:18, 
        fontWeight: 'bold',
        alignSelf:'center',
        fontFamily: 'Proxima Nova',    
    },

    surTakenLabelStyle:{
        color: '#8C7878',
        fontSize:12,  
        fontWeight: 'bold', 
        marginTop:hp('0.5'), 
        alignSelf:'center',
        fontFamily: 'Proxima Nova', 
    },

    availabelSurveyColContainer:{ 
        flex:1, 
        flexDirection:'column', 
        alignItems:'flex-end',
        justifyContent:'center',
    },

    availableSurveyCountStyle:{  
        color: '#221818', 
        fontSize:18, 
        fontWeight: 'bold',
        alignSelf:'center',
        fontFamily: 'Proxima Nova',     
    },

    availableSurveyLabelStyle:{
        color: '#8C7878',
        fontSize:12,  
        fontWeight: 'bold', 
        marginTop:hp('0.5'), 
        alignSelf:'center',
        fontFamily: 'Proxima Nova',
    },

    dashLineContainer: {
            flex:1, 
            marginTop:hp('2.5'), 
            alignContent: 'center', 
            alignItems: 'center',
    },

    dashLineStyle: {
            width:wp('100'), 
            height:hp('1'), 
            color: '#ADA2A2',
    },

    surveyCardMainContainer:{
        marginTop:hp('3')
    },

    surveyCardCardBG: {
        flexDirection:'column',
        backgroundColor: '#FFFFFF', 
        flex:1, 
        borderColor: '#E6DFDF',
        alignSelf:'center',
        borderRadius: wp('2'), 
        height: hp('56'), 
        width: wp('90'),
        borderWidth: hp('0.2'), 
    },

    surveyNameTextStyle:{
        marginTop:hp('2'), 
        marginLeft:wp('3'), 
        color:'#796A6A',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova',
        fontSize:14,
    },

    surveyImgBG:{
        marginTop:hp('3'), 
        backgroundColor:'#F8F4F4', 
        alignSelf:'center',
        height:hp('25'), 
        width:wp('81'), 
        borderRadius:wp('1'),
        justifyContent:'center',
    },

    surveyImgStyle:{
        alignSelf:'center', 
        height:hp('9'),
    },

    PCRMainContainer:{
        marginTop:hp('2'), 
        flexDirection:'row', 
        marginLeft:wp('4'),
    },

    publishColContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-start',
    },

    publishLabelTextStyle:{
        color:'#362828',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
    },

    publishDateTextStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        marginTop:hp('1.5'),
    },

    companyMainContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center',
        marginLeft:wp('-3'),
    },

    companyLabelStyle:{
        color:'#362828',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
    },

    companyNameStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        marginTop:hp('1.5'), 
    },

    timeReqMainContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-end', 
        justifyContent:'center',
        marginLeft:wp('5'),
    },

    timeReqLabelStyle:{
        color:'#362828',
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        alignSelf:'flex-start',  
    },

    timeReqTimeStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12,
        marginTop:hp('1.5'), 
        alignSelf:'flex-start',
    },

    cardDashLineMainContainer:{ 
        marginTop:hp('2'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    cardDashStyle:{
        width:wp('85'),   
        height:hp('1'),
    },
    cardDashStyle1:{
        width:wp('50'),   
        height:hp('1'),
    },

    buttonMainContainer:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },

    buttonBGStyle: {
        backgroundColor: '#2FC36E',
        borderRadius: wp('7'),
        height: hp('4'),
        width: wp('45'),
        justifyContent: 'center',
    },

    buttonTextStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize: 10,
        alignSelf: 'center',
    },

    pastSurveyMainContainer:{
        marginTop:hp('4')
    },

    pastSurveysRowContainer:{
        backgroundColor:'#E6DFDF', 
        height:hp('10'), 
        width:wp('100'),
        flexDirection:'row',
        alignItems:'center', 
        marginTop:hp('2'),
    },

    pastSurveysLabelStyle:{
        flex:6, 
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('10'), 
        color:'#362828', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12,
    },

    pastSurveysCountStyle:{
        flex:1, 
        flexDirection:'column', 
        alignItems:'flex-end',
        color:'#221818', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:12,
    },

    pastSurveysCardContainer:{
        marginTop:hp('2'),
    },

    pastSurveysCardBG: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E6DFDF',
        borderWidth: wp('0.3'),
        borderRadius: wp('1.5'),
        height: hp('22'),
        width: wp('90'),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1.5')  
    },

    pastSurveyimageContainer: { 
        flex:1, 
        alignItems: 'flex-start',
    },

    pastSurveyimageStyles: { 
        marginLeft: wp('5'),
        height:hp('9'),
        width:wp('16'),
    },

    pastSurveyContainer: { 
        flex:3, 
        flexDirection:'column', 
        alignItems: 'flex-start',
        marginTop: hp('-1'),
        marginLeft: wp('7'),
    },

    pastSurveyNameTextStyle: { 
        color:'#796A6A',  
        fontWeight: 'bold',
        fontFamily:'Proxima Nova', 
        fontSize:14,
        marginTop: hp('2.9'),
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


});

import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,AsyncStorage,BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';

import moment from 'moment';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();

export  class preorders extends Component {
constructor(props) {
    super(props);
    this.state = { 
        list:[],
        serveyTaken:'',
        reopen:true,
        InProcessOrder:[],
        DeliveredOrder:[],
        Shop_det:[],
        total_data:[],
        isRefreshing: false,
       // TotalOrder:[],
        TotalOrder: [
            {
                id: 1,
                total_amount: 1000,
                check_date: 15 
            },
            {
                id: 2,
                total_amount: 2000,
                check_date: 16
            }, {
                id: 3,
                total_amount: 3000,
                check_date: 17
            },
            
        ],

        TotalOrderLen:0,
        InProcessOrderLen:0,
        DeliveredOrderLen:0,
        name:'',
        active:false,
        JSONObj: {}
     };
}
// componentWillMount(){
//     db.getAvailableServey1().then((data)=>{
//         //console.log("aaaaaaaaa=="+JSON.stringify(data))
// this.setState({list:data})
// this.setState({serveyTaken:data.length})

//     })
// }

componentWillUnmount() { 
    
    console.log("page leave called");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick());

   } 
   handleBackButtonClick() {
   
    Actions.drawerMenu();
 
    // Actions.Shops();
     return true;
   }
  // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
  
  componentWillMount(){
     this._sub = this.props.navigation.addListener(
        'didFocus',
        this._componentFocused

   ); 
  }

  componentDidMount(){
  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
   
}


_componentFocused = () => {  
    console.log("u are entering focused");
    this.setState({Shop_det:[]})
    AsyncStorage.getItem('username').then((keyValue) => {                   
        this.setState({ name: JSON.parse(keyValue) })})
    db.getAllOrders('Y').then((data)=>{
        console.log("getTotalOrderFromDB",JSON.stringify(data))
        this.setState({Shop_det:data})
        console.log("TotalOrder",this.state.Shop_det);
        this.state.TotalOrderLen=data.length
        this.setState({TotalOrderLen:data.length})
        this.props.orderTotal(this.state.TotalOrderLen)
      
     
    })
}

shouldComponentUpdate() {
    return true;
  }

  onPressViewDeytail(entityid,orderid){
    console.log('order id : '+orderid)
    AsyncStorage.setItem('apporderid', orderid);
    AsyncStorage.setItem('entityid', entityid);
    Actions.sideordrDetails() 

}

renderName(userid){    
    db.getUserName(userid).then((data)=>{
       name=data[0].UserName
        // this.setState({name:data[0].UserName})

    })
    return(
        <Text style={styles.salesNameStyle}>
       {name}
    </Text>
    )
}

_renderView(item){
   
    return(
        <View style={styles.deliveryStatusContainer}>
        <View style={styles.deliverySeparateContainer}>
        <View style={styles.deliveryColContainer}>
            <Text style={styles.deliveryLabelStyle}>
               EXPECTED DELIVERY
            </Text>
        </View>
    </View>

    <View style={styles.deliveryStusMainContainer}>
        <View style={styles.deliveryStatusColContainer}>
           
            <Text style={styles.ExpectedorderDateDateStyle}>
                {(item.ExpectedDeliveryDate)}
            </Text>
           
        </View>
        <View style={styles.viewDetailsMainContainer}>
        <TouchableOpacity onPress={ () => this.onPressViewDeytail(item.entity_id,item.id) }  >
            <View style={styles.viewDetailesLabelContainer}>
                <Text style={styles.viewDetaileTextStyle}>
                    View Details 
                </Text>
            </View>
            <View style={styles.viewDetailesArrowContainer}>
                <Image  style={styles.viewDetailsArrowStyle}
                    source = {require('../../assets/Icons/right_arrow_front.png')}
                />
            </View>
          
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => Actions.sideordermedit({ entity_id: item.entity_id,collection_type:item.collection_type})}  >
             <View style={styles.viewDetailesLabelContainer}>
                <Text style={styles.viewDetaileTextStyle}>
                    Edit 
                </Text>
            </View>
            <View style={styles.viewDetailesArrowContainer}>
                <Image  style={styles.viewDetailsArrowStyle}
                    source = {require('../../assets/Icons/right_arrow_front.png')}
                />
            </View>
            </TouchableOpacity> */}
        </View>
    </View>
    </View>
    )
    
    
        
    
}

_renderViewForFlatlist(){

    if(this.state.Shop_det.length > 0){
        return this.state.Shop_det.map((item, i) => {
        return(
           
             <View style={styles.orderDetailsMainContainer}>
             {/* Header Background */}
             
             <View style={styles.orderHeaderBGContainer}>
                 <View style={styles.ordHeaderRowContainer}>
                     <View style={styles.orderLabelContainer}>
                         <Text style={styles.orderLabelTextStyle}>
                         {item.Party}
                         </Text>
                     </View>
                     <View style={styles.amtContainer}>
                         <Text style={styles.amtTextStyle}>
                             {item.AREA} 
                         </Text>
                     </View> 
                 </View>
             </View>
             {/* Below Header White Background */}
             <View style={styles.oredrDetaileWhiteBG}>
                 <View style={styles.orderDateRowContainer}>
                     <View style={styles.orderDateColContainer}>
                         <Text style={styles.ordDateLabelStyle}>
                             ORDER DATE
                         </Text>
                         <Text style={styles.orderDateDateStyle}>
                        {moment(item.Current_date_time).format('DD-MMM-YYYY')}
                         </Text>
                     </View>
                     <View style={styles.salesColContainer}>
                         <Text style={styles.salesLabelStyle}>
                             ORDER ID
                         </Text>
                         {/* {this.renderName(item.user_id)} */}
                         <Text style={styles.salesNameStyle}>
                         {item.id}
                                                         </Text>
                     </View>
                     <View style={styles.salesColContainer1}>
                         <Text style={styles.salesLabelStyle}>
                             AMOUNT
                         </Text>
                         {/* {this.renderName(item.user_id)} */}
                         <Text style={styles.salesNameStyle}>
                         {item.total_amount}
                                                         </Text>
                     </View>
                 </View>
                 {/* Dash line */}
                 <View style={styles.ordDetDashContainer}>
                     <Dash style={styles.ordDetDashStyle}
                         dashLength = {2}
                         dashColor = '#E6DFDF'
                     />
                 </View>
                 {this._renderView(item)}
              
           
             </View>    
             </View>
            
        )
            })
    }else{
        return(
            <View>
              
            </View>
        )
    }
}

renderFABIcon = () => {
    if (this.state.active) {
      return (<Icon name="ios-close" style={{ fontSize: 45, color: "#FFFFFF", position: 'absolute' }} color="#07B26A"></Icon>);
    }
    else {
      return (<Icon name="ios-add" style={{ fontSize: 45, color: "#FFFFFF", position: 'absolute' }} color="#07B26A"></Icon>);
    }
  }

render() {
    return (
        <View style={{flex:1}}>
         <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
         > 
          <ScrollView
                    showsVerticalScrollIndicator={false}
          >

            {/*No of Surveys */}
            <View style= {styles.surveyTakenAvilableMainContainer}>
               <View style={styles.surveyTakenRowContainer}>
                    <Text style={styles.surveysTakenLabelStyle}>
                        Total Pre-Orders 
                    </Text>
                    <Text style={styles.surveysTakenCountStyle}>
                    {this.state.TotalOrderLen}
                    </Text>
               </View>
                {/* <View style= {styles.filterIconContainer}>
                    <Image  source={require('../../assets/Icons/filter_list_shop.png')}
                            style={styles.filterIconStyle}>
                    </Image>
                </View> */}
            </View>

             {/* Dash Line */}
            <View style={styles.dashLineContainer}>
                <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                />
            </View>

             {/* Order Detailes */}
             {this._renderViewForFlatlist()} 

            {/* History Card */}
            {/* <View style={styles.pastSurveysCardContainer}>
            {
                this.state.list.map((item, index) => (
                <View style={styles.pastSurveysCardBG}>
                    <View style={styles.pastSurveyimageContainer}>
                      
                            <ImageBackground style={styles.pastSurveyimageStyles} 
                                source = {require('../../assets/Icons/SurveyCard.png')}>
                                    <Text style={{color:'grey',fontSize: RFValue(25),justifyContent: 'center', alignSelf: 'center',alignContent:'center', marginTop: hp('2')}}>{item.SurveyName[0]}</Text>
                                                </ImageBackground>
                      
                    </View>
                    <View style={styles.pastSurveyContainer}>
                        <Text style={styles.pastSurveyNameTextStyle}>
                                {item.SurveyName}
                        </Text >
                        <Text style={styles.companyNameTextStyle}>
                                {item.CompanyName}
                        </Text>
                        <Text style={styles.dateTimeTextStyle}>
                                {item.PublishedDate}     {item.time}
                        </Text>
                    </View>
                </View>
                ))
                }
            </View> */}
            <View style={{marginTop:hp('15')}}></View>
          </ScrollView>
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
    orderTotal:(val)=>{dispatch(ORDER_TOTAL(val))},
    inProcessOrder: (val) => { dispatch(ORDER_IN_PROCESS(val));    },       
    deleveredOrder: (val) => { dispatch(ORDER_DELEVERED(val));    },                       
    
}
  )
  export default connect(mapStateToProps, mapDispatchToProps)(preorders)

const styles = StyleSheet.create({

    surveyTakenAvilableMainContainer:{
        flex:1,
        flexDirection:'row', 
        marginTop:hp('2'),
       
    },

    surveyTakenRowContainer:{
        flex:0.4,
        flexDirection:'row', 
        alignItems:'flex-start',  
        justifyContent:'center',
        marginLeft:wp('-2'),
       
    },

    surveysTakenLabelStyle:{ 
        // color: '#221818', 
        // fontSize:RFValue(13), 
        // alignSelf:'center',
        // fontFamily: 'Proxima Nova', 
        
        color: '#8C7878', 
        fontSize:12,  
        fontWeight: 'bold', 
        marginTop:hp('0.6'), 
        marginLeft: wp('5'), 
        fontFamily: 'Proxima Nova', 
    },

    surveysTakenCountStyle:{ 
        color: '#221818', 
        fontSize:RFValue(20), 
        alignSelf:'center',
        fontFamily: 'Proxima Nova', 
        fontWeight:'bold', 
        marginLeft: wp('3'),
    },

    filterIconContainer:{ 
        flex:0.5, 
        flexDirection:'column',
        alignItems:'flex-end',
        marginTop:hp('1'),
        justifyContent:'center',
    },

    filterIconStyle:{ 
        justifyContent: 'center',
        height:hp('5'),
        width:wp('6'), 
        marginRight:wp('5'),
        // marginTop: hp('1'),
    },

    dashLineContainer: {
        flex:1, 
        marginTop:hp('2'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('100'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    pastSurveysCardContainer:{
        marginTop:hp('2'),
    },

    pastSurveysCardBG: {
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
        marginTop:hp('1.5'),  
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
        marginTop: hp('-3'),
        marginLeft: wp('7'),
    },

    pastSurveyNameTextStyle: { 
        color:'#796A6A',  
        fontWeight: 'bold',
        fontFamily:'Proxima Nova', 
        fontSize:RFValue(17),
        marginTop: hp('2.5'),
    },

    companyNameTextStyle: { 
        color:'#796A6A', 
        fontFamily:'Proxima Nova', 
        fontSize:RFValue(10), 
        marginTop:wp('2.5'),
    },

    dateTimeTextStyle: { 
        color:'#796A6A', 
        fontFamily:'Proxima Nova', 
        fontSize:RFValue(10),
        marginTop:wp('2.5'),

    },
    orderDetailsMainContainer: {
        marginTop:hp('3'),
    },

    orderHeaderBGContainer: {
        backgroundColor: '#796A6A',
        height:hp('8'),
        width:wp('90'),
        borderTopLeftRadius: wp('2'), 
        borderTopRightRadius: wp('2'), 
        marginTop:hp('-1'),
        alignSelf:'center',
        justifyContent:'center',
    },

    ordHeaderRowContainer:{
        flexDirection:'row',
    },

    orderLabelContainer:{
        flex:2.5,
        alignItems:'flex-start', 
        flexDirection:'column',
        justifyContent:'center',
    },

    orderLabelTextStyle:{
        color:'#FFFFFF', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:14,
        marginLeft:wp('4'),
    },

    amtContainer:{
        flex:1,
        alignItems:'flex-end', 
        flexDirection:'column',
        justifyContent:'center',
    },

    amtTextStyle:{
        color:'#FFFFFF', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:14,
        marginRight:wp('4'),
    },

    oredrDetaileWhiteBG:{
        flexDirection:'column',
        backgroundColor: '#FFFFFF', 
        flex:1,
        borderColor: '#E6DFDF',
        alignSelf:'center',
        borderBottomLeftRadius: wp('2'), 
        borderBottomRightRadius: wp('2'),
        height: hp('24'), 
        width: wp('90'),
        borderWidth: hp('0.2'),
        borderTopWidth:hp('0'), 
    },

    orderDateRowContainer:{
        flex:1,
        flexDirection:'row', 
        marginTop:hp('2'), 
    },

    orderDateColContainer:{
        flex:2,
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('4'),
    },

    ordDateLabelStyle:{
        color:'#362828', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:10,
    },

    orderDateDateStyle:{
        color:'#362828', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        marginTop:hp('1'),
    },
    ExpectedorderDateDateStyle:{
        color:'#362828', 
        fontFamily:'Proxima Nova', 
        fontSize:12, 
        marginTop:hp('1'),
    },

    salesColContainer:{
        flex:2,
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('2'),
    },
    salesColContainer1:{
        flex:2,
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('2'),
    },

    salesLabelStyle:{
        color:'#362828', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:10, 
    },

    salesNameStyle:{
        color:'#362828',
        fontFamily:'Proxima Nova', 
        fontSize:12,
        marginTop:hp('1'),
    },

    ordDetDashContainer: {
        // flex:1, 
        marginTop:hp('-5'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    ordDetDashStyle:{  
        width:wp('85'),  
        height:hp('1'),
    },

    deliveryMainContainer: {
        flex:1,
        flexDirection:'row', 
        marginTop:hp('2'), 
    },

    deliveryColContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('4'),
    },

    deliveryLabelStyle:{
        color:'#362828', 
        fontWeight: 'bold', 
        fontFamily:'Proxima Nova', 
        fontSize:10,
    },

    deliveryStatusContainer:{
        flex:1,
        flexDirection:'column',
        marginTop:hp('-2'), 
    },

    deliverySeparateContainer: {
        flexDirection:'row', 
        marginTop:hp('4'),
    },

    deliveryStusMainContainer: {
        flexDirection:'row', 
        marginTop:hp('2'),
    },

    deliveryStatusColContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-start',
        marginLeft:wp('4'),
    },

    statusPinkBG:{
        backgroundColor: '#0FB4AD',
        justifyContent:'center',
        marginRight:hp('3'),
        borderColor: '#CC1167',
        height:hp('4'),
        width:wp('22'),
        borderRadius:wp('5'),
    },

    statusTextStyle:{
        alignSelf:'center', 
        color:'#FFFFFF', 
        fontFamily:'Proxima Nova',
        fontSize:10, 
        fontWeight: 'bold', 
        padding:10,
    },

    deliveredDateStyle:{
        color:'#362828', 
        fontFamily:'Proxima Nova', 
        fontSize:RFValue(12), 
        marginTop:hp('0.5'),
    },

    viewDetailsMainContainer:{
        flex:1,
        flexDirection:'column',  
    },

    viewDetailesLabelContainer:{
        flex:1,
        flexDirection:'column', 
        alignItems:'flex-end',
    },

    viewDetaileTextStyle:{
        color:'#3955CB', 
        fontFamily:'Proxima Nova',
        fontSize:12, 
        marginRight:wp('9'), 
        marginTop:hp('0.5'),
    },

    viewDetailesArrowContainer:{
        flexDirection:'column', 
        alignItems:'flex-end',
        marginTop:hp('0'),
        marginRight:wp('4'),
    },

    viewDetailsArrowStyle:{
        tintColor:'#3955CB', 
        height:hp('3.5'), 
        width:wp('3.5'),
    },

});

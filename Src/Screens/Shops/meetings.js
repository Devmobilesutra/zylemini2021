import React, {Component} from 'react';


import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,FlatList,BackHandler,AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';

import moment from 'moment';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import User from './../../utility/User'
import Loader from './../../components/LoaderSync';
import Communications from 'react-native-communications';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    DialogTitle,
    SlideAnimation,
  } from 'react-native-popup-dialog';



import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Item } from 'native-base';
const db = new Database();
let currentDateTime;
class meetings extends React.Component {
  state={
    name:["sid to 1","vad to","ish to sid"],
    shop_data:
     [
      {
          shop_name: "abc",
          shop_add:"abc add",
          
      },
      {
        shop_name: "pqr",
        shop_add:"pqr add",
      },
       {
        shop_name: "ghaw",
        shop_add:"ghaw add",
      },
      
  ],

  Card_data:[],
  tokens :'',
isLoading: false,
visiblepopup :'',
responseMsg : ''

  }

  constructor(props) {
    super(props)

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    db.GetMJPMasterDetails().then((data)=>{
        
        AsyncStorage.getItem('shopId').then((keyValue) => {
            var shopId = JSON.parse((keyValue))
        // alert(shopId);
           db.getShopMeetInfo(shopId).then((data)=>{
             console.log("shop meet info",data);
             this.setState({ shop_data: data })
             console.log("meetings shop data",this.state.shop_data);
             
            })
            db.getShopCardInfo(shopId).then((data)=>{
             console.log("shop Card info",data);
            this.setState({ Card_data: data })
             
            })
     
         })
        
       })
   
}

// componentWillMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

componentWillMount() {
    // setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
   //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   this._componentFocused()
     this._sub = this.props.navigation.addListener(
       'didFocus',
       this._componentFocused
 
  ); 
}
_componentFocused(){
    AsyncStorage.getItem('JWTToken').then((keyValue) => {

        const tok = JSON.parse((keyValue))
        this.setState({ tokens: tok })
    })
}

shouldComponentUpdate() {
    return true;
  }

  Meeting_endsavePopUp = () => {
    const {navigation} = this.props;
    this.setState({visiblepopup: true});
   
  };


  componentDidMount(){
  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
   
  }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

renderPopup(){
    return(
<View style={styles.appliSchemesArrowContainer}>
                  <TouchableOpacity onPress={this.Meeting_endsavePopUp.bind(this)}>
                    <View>
                      {/* <Button
                                                title="Show Dialog"
                                                onPress={() => {
                                                this.setState({ visible: true });
                                                }}
                                            /> */}
                      <Dialog
                        visible={this.state.visiblepopup}
                        dialogAnimation={new SlideAnimation({
                          slideFrom: 'bottom',
                        })}
                        onTouchOutside={() => {
                          this.setState({visiblepopup: true});
                        }}
                        width={wp('90')}
                        dialogTitle={
                          <DialogTitle
                            title="Meeting"
                          
                            style={{
                              backgroundColor: '#F7F7F8',
                              height : wp('15'),
                              alignItems :'center'
                             
                            }}
                            hasTitleBar={false}
                            align="left"
                          />
                        }
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visiblepopup: false});
                                this.props.navigation.navigate('meetings')
                               // this.insertIntoOrderMaster();
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <View style={styles.appliSchemesMainContainer}>
                            <View style={styles.appliSchemesRowContainer}>
                              {/* <View style={styles.roundedtext}>
                                <Image
                                  style={{tintColor: '#EAA304'}}
                                  source={require('../../assets/Icons/Schemes_drawer.png')}
                                />
                              </View> */}

                              <Text style={styles.appliSchemeTextStyle}>
                               {this.state.responseMsg}
                              </Text>
                            </View>
                          </View>
                         
                        </DialogContent>
                      </Dialog>
                    </View>

                    {/* <Image
                      style={styles.appliSchemesArrowStyle}
                      source={require('../../assets/Icons/right_arrow_blue.png')}
                    /> */}
                  </TouchableOpacity>
                </View>
    )
}

SubmitReport(Meeting_Id,PlannedDate)
    {
      var OrderMaster = []
    
     // this.state.isLoading = true
      this.setState({ isLoading: true })
      this.setState({ JSONObj: {} })
      var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds

  
 var ToDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
        db.checkMeetingInOrderMaster(Meeting_Id).then((dataMaster) => {
          console.log("orderm len : "+dataMaster)
          if(dataMaster > 0){
            db.getMeetForSyncByVibha(Meeting_Id,PlannedDate).then((data) => {
              if (data.length > 0) {
                console.log('meetreport update : '+JSON.stringify(data));
          
              db.UpdateOrderMastersssForMeetingCancel(data[0].ID, data[0].CurrentDatetime, data[0].Type_sync, data[0].Shop_Id,
                data[0].latitude,data[0].longitude, '0', data[0].FromDate, ToDate,
                data[0].collection_type, data[0].UserID, data[0].Remarks, "1", "N", '', data[0].Meeting_Id, '','0',data[0].FromDate, ToDate).then((data) =>{
                  console.log("meeting cancel update"+ JSON.stringify(data));
                  db.getOrderMasterSyncDataFor_Meeting(Meeting_Id,"N").then((dataMain) => {
                    if (dataMain.length > 0) {
                    //  console.log("ordermaster for sync", JSON.stringify(dataMain))
                         this.SyncMeetingData(dataMain)
                     } })
                    })
          }
          })
        }else {
            db.getMeetForSyncByVibha(Meeting_Id,PlannedDate).then((data) => {
              if (data.length > 0) {
          console.log('meetreport : '+JSON.stringify(data));
          
          db.insertOrderMastersssForMeetingCancel(data[0].ID, data[0].CurrentDatetime, data[0].Type_sync, data[0].Shop_Id,
            data[0].latitude,data[0].longitude, '0', data[0].FromDate, ToDate,
            data[0].collection_type, data[0].UserID, data[0].Remarks, "1", "N", '', data[0].Meeting_Id, '','0',data[0].FromDate, ToDate).then((data) =>{
              console.log("meeting cancel "+ JSON.stringify(data));
              db.getOrderMasterSyncDataFor_Meeting(Meeting_Id,"N").then((dataMain) => {
                if (dataMain.length > 0) {
                //  console.log("ordermaster for sync", JSON.stringify(dataMain))
                this.SyncMeetingData(dataMain)
              } })
           }) }
           else{
               alert('Please Start Meeting first.')
               this.setState({ isLoading: false })
           }
        }) }
    })
 }


 SyncMeetingData(dataMainMeeting){
    var OrderMaster = []
    OrderMaster.push(dataMainMeeting)
    this.state.JSONObj["OrderMaster"] = dataMainMeeting
      console.log("token",this.state.tokens);
      const headers = {
                'authheader': this.state.tokens,
                'Content-Type': 'application / json'
          }
        var datas = JSON.stringify(this.state.JSONObj)
    
  console.log("date passing post",datas);
//  testing
 //   const url = 'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData'

     //live
  //   const url = 'https://zyleminiplus.com/ZyleminiPlusCoreAPI/api/Data/PostData'

    axios.post(User.posturl, datas, {
        headers: headers
    }).then((response) => {
  
        console.log("response of post=", JSON.stringify(response.data))
       // console.log("url of post=", url)
        var responss = []
        
        if (response.data.Data.Order) {
            
            try {
                if (response.data.Data.Order.hasOwnProperty('Orders')) {
                                                    
                    for (let i = 0; i < response.data.Data.Order.Orders.length; i++) {
                      db.updateOrderMasterSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                      db.deleteMeetReportMeeting(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                    //  db.updateimageDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                    //  db.updateDiscountSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                        
                    }
                  //  alert("Data Sync Successfull")
                }
  
            } catch (error) {
  
            }
            this.setState({responseMsg : response.data.Data.Order.Status});
  
            this.Meeting_endsavePopUp();
            // Alert.alert(
            //   "ZyleminiPlus",
            //   response.data.Data.Order.Status,
            //   [
            //     // {
            //     //   text: "Cancel",
            //     //   onPress: () => console.log("Cancel Pressed"),
            //     //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
            //     // },
            //     { text: "OK", onPress: () => this.props.navigation.navigate('MJP_one') }
            //   ],
            //   { cancelable: false }
            // );
            this.setState({ isLoading: false })
        } else {
        
         
        }
        this.setState({ isLoading: false })
  
    })
        .catch((error) => {
            //console.log("error post=", error)
            this.setState({ isLoading: false })
            alert(error)
        })
  }

render() {
     setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 3000);
     return (
         <View>
              
              <Loader loading={this.state.isLoading} message={'Sending Data to server..'} />
             <ImageBackground
             source={require('../../assets/Icons/android_BG.png')}
              style={{width:wp('100'), height:hp('70'),resizeMode: 'cover',  justifyContent: 'center'}} > 
             {/* <ScrollView 
                 showsVerticalScrollIndicator={false}>
                 <FlatList
            data={this.state.Card_data}
           
             renderItem={({ item,i=0 }) => (
             <View style={styles.orderDetailsMainContainer}>
            
             
             <View style={styles.orderHeaderBGContainer}>
                 
                 <View style={styles.ordHeaderRowContainer}>
                     <View style={styles.orderLabelContainer}>
                         <Text style={styles.orderLabelTextStyle}>
                         00:00 AM TO 00:00 PM
                         </Text>
                     </View>
                     <View style={styles.amtContainer}>
                         <Text style={styles.amtTextStyle}>
                         {moment(item.PlannedDate).format('MMM DD')}
                      
                         </Text>
                     </View> 
                 </View>
             </View>
            
             <View style={styles.oredrDetaileWhiteBG}>
                 <View style={styles.orderDateRowContainer}>
                    
                     <View style={styles.orderDateColContainer}>
                         <Text style={styles.ordDateLabelStyle}>
                             ORDER DATE
                         </Text>
                         <Text style={styles.orderDateDateStyle}>
                       
                         </Text>
                     </View>
                     <View>
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginRight:wp('5')}}>
                        <Image
                        source={require('../../assets/Icons/Call.png')} 

                        style={{ width:40,height:40}}/>
                        </TouchableOpacity>
                        </View>
                     
                    
                 </View>
                
                 <View style={styles.ordDetDashContainer}>
                     <Dash style={styles.ordDetDashStyle}
                         dashLength = {2}
                         dashColor = '#E6DFDF'
                     />
                 </View>
                 <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>

                 <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
              alignContent: 'center'}}>
            <Text style={{color:'red',fontSize:wp('3.5%'),}}>
               CANCEL
               </Text>

             </TouchableOpacity>
             <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
               <Text style={{color:'blue',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
               SUBMIT REPORT
               </Text>

             </TouchableOpacity>
                 
                 <TouchableOpacity
            style={{
              width: wp('25%'),
              height: 35,
              borderRadius: 15,
              marginLeft:wp('8%'),
              margin:wp('2%'),
              backgroundColor: '#2FC36E',
              justifyContent: 'center',
              alignContent: 'center'
            }}
            >
              <Text style={{
                color: 'white',
                marginLeft:wp('7%')
              }}>START</Text>
            </TouchableOpacity>
            </View>
                 
           
             </View>    
             </View>
             )}
             />
            <View style={{height:hp('10')}}></View>
         </ScrollView> */}

<ScrollView 
showsVerticalScrollIndicator={false}>
        <FlatList data={this.state.Card_data}
        renderItem={({ item,i=0 }) => (
        <View style={styles.orderDetailsMainContainer}>
        <View style={styles.orderHeaderBGContainer}>
        <View style={styles.ordHeaderRowContainer}>
        <View style={styles.orderLabelContainer}>
        <Text style={styles.orderLabelTextStyle}>
        00:00 AM TO 00:00 PM
        </Text>
        </View>
        <View style={styles.amtContainer}>
        <Text style={styles.amtTextStyle}>
        {moment(item.PlannedDate).format('DD MMM')}
        </Text>
        </View> 
        </View>
        </View>
        <View style={styles.oredrDetaileWhiteBG}>
        <View style={styles.orderDateRowContainer}>
        <View style={styles.orderDateColContainer}>
        <Text style={styles.ordDateLabelStyle}>
        {item.ActivityTitle}
        </Text>
       
        </View>
        <View>
        <TouchableOpacity   onPress={() =>
                        Communications.phonecall('0123456789', true)
                      } style={{marginRight:wp('5'),marginTop:hp('5')}}>
        <Image source={require('../../assets/Icons/Call.png')} style={{ width:40,height:40}}/>
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.ordDetDashContainer}>
                     <Dash style={styles.ordDetDashStyle}
                         dashLength = {2}
                         dashColor = '#E6DFDF'
                     />
         </View>
                 {
                    (item.sync_flag == 'N' || item.sync_flag == null) ? (
                   //   (item.sync_flag == null) ? (
                        (item.Type_sync == 0) ? (
                          <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                          <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                          alignContent: 'center'}} onPress={() => Actions.MJP_CancelShop({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle})}>
                          <Text style={{color:'red',fontSize:wp('3.5%'),}}>
                          CANCEL
                          </Text>
                           </TouchableOpacity> 
                       <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
                             <Text style={{color:'transparent',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                             SUBMIT REPORT
                             </Text>
     
                           </TouchableOpacity>
                           
                            <TouchableOpacity onPress={() => Actions.MJP_Start({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle,currentDateTimestart : currentDateTime})}
                            style={{
                            width: wp('25%'),
                            height: 35,
                            borderRadius: 15,
                            marginLeft:wp('8%'),
                            margin:wp('2%'),
                            backgroundColor: '#2FC36E',
                            justifyContent: 'center',
                            alignContent: 'center'
                            }}
                    >
                      <Text style={{
                        color: 'white',
                        textAlign : 'center'
                      }}>START</Text>
                    </TouchableOpacity>
                        </View> 
                        ) :(
                          <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                        <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                        alignContent: 'center'}} >
                        <Text style={{color:'transparent',fontSize:wp('3.5%'),}}>
                        CANCEL
                        </Text>
                         </TouchableOpacity> 
                     <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}
                     onPress={() => Actions.MJP_Start({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle,currentDateTimestart : currentDateTime})}>
                           <Text style={{color:'blue',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                          ADD NOTES
                           </Text>
   
                         </TouchableOpacity>
                         
                          <TouchableOpacity  onPress={() => this.SubmitReport(item.ID,item.PlannedDate)}
                          style={{
                          width: wp('25%'),
                          height: 35,
                          borderRadius: 15,
                          marginLeft:wp('9%'),
                          margin:wp('2%'),
                          backgroundColor: '#E23333',
                          justifyContent: 'center',
                          alignContent: 'center'
                          }}
                        >
                          <Text style={{
                            color: 'white',
                            textAlign :'center'
                          }}>END</Text>
                        </TouchableOpacity>
                            </View>
                        )

                          ) : (
                              <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                                <View style={styles.viewDetailesArrowContainer}>
                                  <Image  style={styles.viewDetailsArrowStyle}
                                      source = {require('../../assets/Icons/apply_green.png')}
                                  />
                              </View>
                              <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                          alignContent: 'center'}} >
                          <Text style={{color:'#2FC36E',fontSize:wp('3.5%'), fontFamily: 'Proxima Nova',}}>
                          Report Submited
                          </Text>
                           </TouchableOpacity>
                           
                         </View>
                           )
                         }
           
           </View>    
             </View>
             )}
             />
         <View style={{height:hp('10')}}></View>
         </ScrollView>
           
             

         </ImageBackground>
         
         </View>
     );
 }
}
export default meetings;
const styles = StyleSheet.create({
  totalShopsMainContainer:{ 
      flex:1, 
      flexDirection:'row', 
      marginTop:hp('2'),
      
  },

  processColContainer:{ 
      flex:0.5, 
      flexDirection:'column', 
      alignItems:'flex-start',
      justifyContent:'center',
  },

  inProcessCountTextStyle: {  
      color: '#221818', 
      fontSize:18,
      fontWeight: 'bold',
      marginLeft: wp('12'), 
      fontFamily: 'Proxima Nova',   
  },

  inProcessHeadingTextStyle:{  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold', 
      marginTop:hp('0.5'), 
      marginLeft: wp('5'), 
      fontFamily: 'Proxima Nova', 
  },

  deliveredColContainer:{ 
      flex:0.5, 
      flexDirection:'column',
      alignItems:'flex-start',
  },

  deliveredCountTextStyle:{  
      color: '#221818', 
      fontSize:18, 
      fontWeight: 'bold', 
      marginLeft:wp('7'),
      fontFamily: 'Proxima Nova', 
      fontWeight: 'bold',  
  },

  deliveredHeadingTextStyle:{  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold',  
      marginTop:hp('0.5'),
      marginLeft:wp('2'),
      fontFamily: 'Proxima Nova', 
  },

  totalCountMainContainer:{
      alignItems:'flex-end',
      flexDirection:'column',
  },

  totalCountTextStyle: {  
      color: '#221818', 
      fontSize:18, 
      fontWeight: 'bold', 
      marginRight:wp('13'),
      fontFamily: 'Proxima Nova', 
      fontWeight: 'bold',  
  },

  totalCountHeadingTextStyle: {  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold',  
      marginTop:hp('0.5'),
      marginRight:wp('11'),
      fontFamily: 'Proxima Nova', 
  },

  filterIconContainer:{ 
      flex:0.5, 
      flexDirection:'column',
      alignItems:'flex-end',
      marginTop:hp('1'),
  },

  filterIconStyle:{ 
      justifyContent: 'center',
      height:hp('4'),
      width:wp('8'), 
      marginRight:wp('5'),
      marginTop: hp('1'),
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

  orderDetailsMainContainer: {
      marginTop:hp('3'),
  },

  orderHeaderBGContainer: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderWidth: 1,
      height:hp('10'),
      width:wp('90'),
      borderColor: '#E6DFDF',
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
      color:'black', 
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
      color:'black', 
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
      marginTop:hp('3'),
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
  appliSchemesMainContainer: {
    flex: 1,
    marginVertical: wp('10'),
  },

  appliSchemesRowContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  appliSchemeTextStyle: {
    marginLeft: wp('1'),
    fontFamily: 'Proxima Nova',
    fontSize: wp('4'),
    color: '#3955CB',
  },

})
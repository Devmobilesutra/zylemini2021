import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,FlatList,BackHandler,AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import moment from 'moment';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Item } from 'native-base';
import axios from 'axios'
import { Alert } from 'react-native';
import Loader from './../../components/LoaderSync';
import Communications from 'react-native-communications';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    DialogTitle,
    SlideAnimation,
  } from 'react-native-popup-dialog';

const db = new Database();
let currentDateTime;
class MJP_one extends React.Component {
  state={
   
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
Planned_dates:[],
currentDate:'',
DateNow:0,
DateThen:'',
tokens :'',
isLoading: false,
visiblepopup :'',
responseMsg : ''

  }

  
constructor(props) {

    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
    // db.GetMJPMasterDetails().then((data)=>{
    //     console.log("shop Card info",data);
    //         this.setState({ Card_data: data })
    //         this.setState({ Planned_dates: data})
    //         console.log("card data for meet1",this.state.Card_data);
    //         console.log("card data planned date",this.state.Planned_dates);
    //      })
   
       
   
  
}

componentWillMount() {
    setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    

     if(month <= 9){
        month = '0'+ month;
    }

    if(date <= 9){
        date = '0' + date
    }

    if(hours <= 9){
        hours = '0' +hours
    }

    if(min <= 9)
    {
        min = '0' + min
    }

    if(sec <= 9){
        sec = '0' +sec
    }


 //   app_order_id = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
  //  app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, "");                  
    currentDateTime = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec

    this.setState({currentDate:moment().format('DD-MMM-YYYY')})
    console.log('currrwt : '+moment().format('DD-MMM-YYYY'))
    db.getPlannedDates().then((data)=>{
        this.setState({ Planned_dates: data})
    console.log("card data planned date",this.state.Planned_dates);
    console.log("first date",this.state.Planned_dates[0].PlannedDate);
   // this.setState({currentDate:this.state.Planned_dates[0].PlannedDate});
        db.GetMJPMasterDetails(this.state.currentDate).then((data)=>{
        console.log("shop Card info",data);
            this.setState({ Card_data: data })
        
            console.log("card data for meet1",this.state.Card_data);
        
        })
    })

    AsyncStorage.getItem('JWTToken').then((keyValue) => {

        const tok = JSON.parse((keyValue))
        this.setState({ tokens: tok })
    })

   
}


shouldComponentUpdate() {
    return true;
  }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    this.setState({visiblepopup: false});
    return true;
}
Meeting_endsavePopUp = () => {
    const {navigation} = this.props;
    this.setState({visiblepopup: true});
   
  };

async NextDate(i)
{
        this.setState({DateNow:i})
         var month = new Date().getMonth() + 1;
           //   var nextDate = moment(month,"MM").add(-i, 'months').format('DD-MMM-YYYY');
              var new_date = moment(this.state.currentDate, "DD-MMM-YYYY").add(1, 'days');
                        var day = new_date.format('DD');
          var month = new_date.format('MMM');
          var year = new_date.format('YYYY');
       var NextDate = day + '-' + month + '-' + year;
        //  alert(day + '-' + month + '-' + year);
              console.log('next date : '+new_date +" "+month);
        console.log(this.state.Planned_dates[i].PlannedDate);
      await  this.setState({currentDate:NextDate})
        db.GetMJPMasterDetails(this.state.currentDate).then((data)=>{
            console.log("shop Card info",data);
                this.setState({ Card_data: data })
            
                console.log("card data for meet1",this.state.Card_data);
            
            })
            
           

}

async PrevDate(i)
{
   // alert(parseInt(this.state.DateNow));
             this.setState({DateNow:i})
 
       
            var month = new Date().getMonth() + 1;
            //   var nextDate = moment(month,"MM").add(-i, 'months').format('DD-MMM-YYYY');
                var new_date = moment(this.state.currentDate, "DD-MMM-YYYY").add(-1, 'days');
                var day = new_date.format('DD');
            var month = new_date.format('MMM');
            var year = new_date.format('YYYY');
          var NextDate = day + '-' + month + '-' + year;
           // alert(day + '-' + month + '-' + year);
          //  console.log(this.state.Planned_dates[i].PlannedDate);
        // this.setState({DateNow:this.state.DateNow+1});

       // console.log(this.state.Planned_dates[i].PlannedDate);
          await  this.setState({currentDate:NextDate})
            db.GetMJPMasterDetails(this.state.currentDate).then((data)=>{
            console.log("shop Card info",data);
                this.setState({ Card_data: data })
            
                console.log("card data for meet1",this.state.Card_data);
            
            })

       

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
                            title="Meeting Module"
                          
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
                                this.props.navigation.navigate('MJP_one')
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
    const url = 'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData'
    axios.post(url, datas, {
        headers: headers
    }).then((response) => {
  
        console.log("response of post=", JSON.stringify(response.data))
        console.log("url of post=", url)
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



//new render
render() {
  // this._componentFocused();
     setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
   
     return (
         <View>
            <Loader loading={this.state.isLoading} message={'Sending Data to server..'} />
             <View style={{backgroundColor:'#221818',height:hp('30%')}}>

<View>

  <View style={{flexDirection:'row'}}>

  <TouchableOpacity onPress={() =>this.handleBackButtonClick()} style={{ marginTop:hp('7.5%'),marginLeft:wp('2%')}}>
    {/* <Text style={{color:'white',fontSize:wp('10%')}}>
    ←
    </Text> */}
    <Image
        style={{marginLeft: wp('3')}}
         source={require('../../assets/Icons/Back_White.png')}
     />

  </TouchableOpacity>
  <Text style={{justifyContent:'center',alignItems:'center', color:'#796A6A',fontSize:wp('6%'),marginTop:hp('7%'),marginLeft:wp('3%')}}>
    Meetings
    </Text>
  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginLeft:('7%'), marginTop:hp('7.1%')}}>
  <Image
 source={require('../../assets/Icons/Search.png')}
  style={{marginTop:hp('1%'),marginLeft:wp('39%'), width:25,height:25}}/>

  </TouchableOpacity>

  </View>
  <View style={{
       marginTop:hp('1%'),
       borderStyle: 'dotted',
       borderWidth: 1,
       borderRadius: 2,
       borderColor:'#362828'
    }}>
  </View>
  
  <View style={{flexDirection:'row'}}>

  <TouchableOpacity onPress={() => this.PrevDate(this.state.DateNow-1)} style={{marginLeft:('5%'), marginTop:hp('2.5%')}}>
<Image
source={require('../../assets/Icons/left.png')}
style={{marginTop:hp('1%'),marginLeft:wp('3%'), width:30,height:30}}/>

</TouchableOpacity>
<Text style={{justifyContent:'center',alignItems:'center', color:'white',fontWeight:'bold',fontSize:wp('5.5%'),marginTop:hp('3.2%'),marginLeft:wp('25%')}}>
{moment(this.state.currentDate).format('DD MMM')}
</Text>
<TouchableOpacity  onPress={() => this.NextDate(this.state.DateNow+1)} style={{marginLeft:('7%'), marginTop:hp('2.5%')}}>
<Image
source={require('../../assets/Icons/right.png')}
style={{marginTop:hp('1%'),marginLeft:wp('20%'), width:30,height:30}}/>

</TouchableOpacity>

</View>
<View style={{
marginTop:hp('3%'),
borderStyle: 'dotted',
borderWidth: 1,
borderRadius: 2,
borderColor:'#362828'
}}>
</View>
</View>
{ this.renderPopup()}
{/* <View style={styles.appliSchemesArrowContainer}>
                  <TouchableOpacity onPress={this.Meeting_endsavePopUp.bind(this)}>
                    <View>
                     
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
                            title="Meeting Module"
                          
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
                                this.props.navigation.navigate('MJP_one')
                               // this.insertIntoOrderMaster();
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <View style={styles.appliSchemesMainContainer}>
                            <View style={styles.appliSchemesRowContainer}>
                             

                              <Text style={styles.appliSchemeTextStyle}>
                               {this.state.responseMsg}
                              </Text>
                            </View>
                          </View>
                         
                        </DialogContent>
                      </Dialog>
                    </View>

                   
                  </TouchableOpacity>
                </View> */}



</View>  
<ImageBackground
source={require('../../assets/Icons/android_BG.png')}
style={{width:wp('100'), height:hp('70'),resizeMode: 'cover',  justifyContent: 'center'}}
> 
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
                    (item.sync_flag == 'N' || item.sync_flag == null) ?(
                        <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                        <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                        alignContent: 'center'}} onPress={() => Actions.MJP_Cancel({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle})}>
                        <Text style={{color:'red',fontSize:wp('3.5%'),}}>
                        CANCEL
                        </Text>
                         </TouchableOpacity> 
                         {
                            (item.Type_sync == '1') ? (
                          <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}
                         onPress={() => this.SubmitReport(item.ID,item.PlannedDate)}>
                        <Text style={{color:'blue',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                        SUBMIT REPORT
                        </Text>

                      </TouchableOpacity>
                            ) : ( <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
                           <Text style={{color:'transparent',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                           SUBMIT REPORT
                           </Text>
   
                         </TouchableOpacity>)
                         }
                         
                 <TouchableOpacity onPress={() => Actions.MJP_two({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle,currentDateTimestart : currentDateTime})}
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
                marginLeft:wp('6.5%')
              }}>START</Text>
            </TouchableOpacity>
                 </View> 
                  ) :(
                    (item.ActivityStatus == '0') ?(
                        <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                        <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                    alignContent: 'center'}} >
                    <Text style={{color:'red',fontSize:wp('3.5%'),}}>
                    CANCEL
                    </Text>
                     </TouchableOpacity>
                      <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
                      <Text style={{color:'transparent',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                     Submit Report
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
                       marginLeft:wp('8.5%')
                     }}>END</Text>
                   </TouchableOpacity>
                   </View> 
                    ) :(
                        <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>
                        <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                    alignContent: 'center'}} >
                    <Text style={{color:'red',fontSize:wp('3.5%'),}}>
                    CANCELLED
                    </Text>
                     </TouchableOpacity>
                      <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
                      <Text style={{color:'transparent',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
                    Submit report
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
                       marginLeft:wp('6.5%')
                     }}>START</Text>
                   </TouchableOpacity>
                   </View>
                    )
                    )
                }
                 {/* <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
                    alignContent: 'center'}} onPress={() => Actions.MJP_Cancel({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone,ActivityTitle : item.ActivityTitle})}>
                    <Text style={{color:'red',fontSize:wp('3.5%'),}}>
                    CANCEL
                    </Text>

             </TouchableOpacity> */}
           
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
export default MJP_one;
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
      height:hp('5'),
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
      marginTop:hp('2'),
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
  appliSchemesArrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
        

       
import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,PermissionsAndroid
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import Database from './../../utility/Database'
import Loader from './../../components/LoaderSync'
import { Alert } from 'react-native';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { BackHandler } from 'react-native';
const db = new Database();
var ID;
class MJP_Cancel extends React.Component {
    state = {
       
        reasonId:'',
        remarks:'',
        currencies: ['USD', 'AUD', 'SGD', 'PHP', 'EUR'],
        UI_data:[],
        Shop_Name:'',
        Reasons:[],
        tokens: '',
        Meeting_Id:'0',
        collection_type:'',

        userLatitude: '',
        userLongitude: '',
        hasMapPermission: '',
        username: '', password: '', deviceId: '', tokens: '',
        language: 'java',
        currentDate:'',
        userId :'',
        isLoading : false,
        visiblepopup :'',
        responseMsg : '',

        arrItems:[
          {
            0:0
      
          },
          {
            1:1
          }
         

        ],
        JSONObj: {},
      };
     
     constructor(props) {
      super(props)
      AsyncStorage.getItem('JWTToken').then((keyValue) => {

        const tok = JSON.parse((keyValue))
        this.setState({ tokens: tok })
       
    })

          AsyncStorage.getItem('userIds').then((keyValue) => {
            this.setState({ userId: JSON.parse(keyValue) })
        })

       

      // this.props.PlannedDate,this.props.EntityTypeID,this.props.EntityType,this.props.Meeting_Id,this.props.IsActivityDone
      // db.SelectDistForMeet(this.props.EntityTypeID).then((data)=>{
      //   console.log("Distributor Meeting",data);
      //       this.setState({ UI_data: data })
      //       console.log("card data for meet1",this.state.UI_data);
      //       if(data.length > 0){
      //         this.setState({Shop_Name:this.state.UI_data[0].Shop_name})
      //         this.setState({Shop_Add:this.state.UI_data[0].location})
      //       }
      //   })
 }

        componentDidMount() {
              
          // setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
          BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
        componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
        shouldComponentUpdate() {
          return true;
        }
        handleBackButtonClick() {
          return true;
        }


     componentWillMount(){
      this.requestFineLocation(); 
      db.getRemarksForCancelMeeting(this.props.Meeting_Id).then((data)=>{
        this.setState({ remarks: data[0].Remarks })
        this.setState({reasonId : data[0].ActivityStatus})
        console.log("remark : "+this.state.remarks +" "+this.state.reasonId);
      })

      if(this.props.EntityType==1){
       
        db.SelectDistForMeet(this.props.EntityTypeID).then((data)=>{
          console.log("Distributor Meeting",data);
              this.setState({ UI_data: data })
              console.log("card data for meet1",this.state.UI_data);
              if(data.length > 0){
                this.setState({ Shop_final: data[0].Shop_name })
                this.setState({ Shop_addFinal: data[0].location })
              }
           this.setState({ collection_type: 6 })
            console.log('collection_type' +this.state.collection_type);
             
              
           })
       }else if(this.props.EntityType==2){
        db.SelectCustForMeet(this.props.EntityTypeID).then((data)=>{
          console.log("Customer Meeting",data);
              this.setState({ UI_data: data })
              console.log("card data for meet1",this.state.UI_data);
              if(data.length > 0){
                this.setState({ Shop_final: data[0].Shop_name })
                this.setState({ Shop_addFinal: data[0].location })
              }
              this.setState({ collection_type: 7 })
           })
         }else if(this.props.EntityType==3){
         
        db.SelectSubForMeet(this.props.EntityTypeID).then((data)=>{
          console.log("subgroup Meeting",data);
          this.setState({ UI_data: data })
          console.log("card data for meet1",this.state.UI_data);
          if(data.length > 0){
            this.setState({ Shop_final: data[0].Shop_name })
            this.setState({ Shop_addFinal: data[0].location })
          }
          this.setState({ collection_type: 8 })
     }) }

              db.GetReasonForCancel().then((data)=>{
              
                this.setState({Reasons:data})   
                console.log("array of cancel reasons",this.state.Reasons) 
                data.map((item, i) => {
                var selectedName=item.Name
                  console.log("names",selectedName);
              }) 
           })

     }

     async requestFineLocation() {
       console.log('in location')
      try {
          if (Platform.OS === "android") {
              const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  this.getUserPosition();
              }
              else { this.requestFineLocation() }
    
          } else {
              this.getUserPosition();
          }
      } catch (err) {
          console.warn(err);
      }
    }

     async getUserPosition() {
      this.setState({ hasMapPermission: true });
      // this.locationWatchId = Geolocation.getCurrentPosition(
      Geolocation.getCurrentPosition(
          pos => {
            // alert(pos.coords.latitude)
              this.setState({
                  userLatitude: pos.coords.latitude,
                  userLongitude: pos.coords.longitude
              });
              console.log(' userLatitude() : ' + this.state.userLatitude)
          })
    }
    
   

     onChangeEnteredBox(text)
     {
       this.setState({remarks:text})
      
     }
     Meeting_endsavePopUp = () => {
      const {navigation} = this.props;
      this.setState({visiblepopup: true});
    };
     MeetingCancel()
     {
        //  var OrderMaster = []
        
         if(this.state.reasonId){
          this.setState({ isLoading: true })
          this.setState({ JSONObj: {} })
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
          console.log('this.state.remark' +this.state.remarks);
          ID = moment().format('YYYYMMDDHHmm');
  
         var currentDateTime = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
         db.checkMeetingInOrderMaster(this.props.Meeting_Id).then((dataMaster) => {

          if(dataMaster > 0){
            db.UpdateOrderMastersssForMeetingCancel(ID, currentDateTime, this.props.EntityType, this.props.EntityTypeID,
              this.state.userLatitude,this.state.userLongitude, '', '', '',
              this.state.collection_type, this.state.userId, this.state.remarks, "1", "N", '', this.props.Meeting_Id, '',this.state.reasonId,currentDateTime,currentDateTime).then((data) =>{
               console.log("meeting cancel "+ JSON.stringify(data));
  
                db.getOrderMasterSyncDataFor_Meeting(this.props.Meeting_Id,"N").then((dataMain) => {
                  if (dataMain.length > 0) {
                  //  console.log("ordermaster for sync", JSON.stringify(dataMain))
                      this.SyncMeetingData(dataMain)
                  } })
  
              })
          }else{
            db.insertOrderMastersssForMeetingCancel(ID, currentDateTime, this.props.EntityType, this.props.EntityTypeID,
              this.state.userLatitude,this.state.userLongitude, '', '', '',
              this.state.collection_type, this.state.userId, this.state.remarks, "1", "N", '',this.props.Meeting_Id, '',this.state.reasonId,currentDateTime,currentDateTime).then((data) =>{
                console.log("meeting cancel "+ JSON.stringify(data));
  
                db.getOrderMasterSyncDataFor_Meeting(this.props.Meeting_Id,"N").then((dataMain) => {
                  if (dataMain.length > 0) {
                  //  console.log("ordermaster for sync", JSON.stringify(dataMain))
                      this.SyncMeetingData(dataMain)
                  } })
  
              })
          }
         
      })
     }else{
       alert('Please Select Reason');
     }
          
     
      //  var data={
      //     ID: this.state.reasonId,
      //     "EntityID": "23222",
      //     "EntityType": "1",
      //     "Latitude": "18.9728767"
      //     ,"Longitude": "77.599013"
      //     ,"TotalAmount": "0"
      //     ,"FromDate": this.props.PlannedDate
      //     ,"ToDate": ""
      //     ,"CollectionType": this.props.EntityTypeID
      //     ,"UserID": "52362"
      //     ,"Remark": this.state.remarks
      //     ,"CurrentDatetime": "2020-Dec-05 03:20:00"
      //     ,"DefaultDistributorId": "0"
      //     ,"ExpectedDeliveryDate": null
      //   }
      //     console.log("ordermaster for sync", JSON.stringify(data))
      //     OrderMaster.push(data)
    
      //     this.state.JSONObj["OrderMaster"] = data
    
      //     console.log("json",JSON.stringify(this.state.JSONObj));
      //     console.log("token",this.state.tokens);
      
      //                     var count
      //                     count = Object.keys(this.state.JSONObj).length;
                          
    
      //                     if (count > 0) {
    
      //                         const headers = {
      //                             'authheader': this.state.tokens,
      //                             'Content-Type': 'application / json'
      //                            }
      //                         var datas = JSON.stringify(this.state.JSONObj)
                              
      //                        console.log("date passing post",datas);
      //                         const url = 'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData'
      //                         axios.post(url, datas, {
      //                             headers: headers
      //                         }).then((response) => {
    
      //                             console.log("response of post=", JSON.stringify(response.data))
      //                             console.log("url of post=", url)
      //                             var responss = []
                                  
      //                             if (response.data.Data.Order) {
                                      
      //                                 try {
      //                                     if (response.data.Data.Order.hasOwnProperty('Orders')) {
                                                                              
      //                                         for (let i = 0; i < response.data.Data.Order.Orders.length; i++) {
      //                                           db.updateOrderMasterSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
      //                                           db.updateOrderDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
      //                                           db.updateimageDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
      //                                           db.updateDiscountSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                                                  
      //                                         }
      //                                         alert("Meeting cancelled")
      //                                     }
    
      //                                 } catch (error) {
    
      //                                 }
    
      //                                 alert(response.data.Data.Order.Status)
      //                             } else {
                                   
    
      //                             }
      //                             this.setState({ isLoading: false })
    
      //                         })
      //                             .catch((error) => {
      //                                 //console.log("error post=", error)
      //                                 this.setState({ isLoading: false })
      //                                 alert(error)
      //                             })
      //                     } else {
      //                         this.setState({ isLoading: false })
      //                         alert("Something went wrong")
      //                     }
    
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
                        db.updateMeetingMasterSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                        db.updateOrderDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                        db.updateimageDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                        db.updateDiscountSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                          
                      }
                     // alert("Meeting cancelled")
                  }
    
              } catch (error) {

              }
               //  alert(response.data.Data.Order.Status)
               this.setState({responseMsg : response.data.Data.Order.Status});
  
               this.Meeting_endsavePopUp();
                //  Alert.alert(
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
     
      return (
        <SafeAreaView >
          <View>
          <Loader loading={this.state.isLoading} />
          <View style={{flexDirection:'row'}}>
 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginLeft:wp('7%'), marginTop:hp('3%')}}>
<Image
source={require('../../assets/Icons/Call.png')}
style={{ width:30,height:30}}/>

</TouchableOpacity>
<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('5.2%'),marginTop:hp('3%'),marginLeft:wp('4%')}}>
  Cancel Meeting 
  </Text>
<TouchableOpacity  onPress={() => this.props.navigation.navigate('MJP_one')} style={{marginLeft:('34%'), marginTop:hp('3%')}}>
<Image
source={require('../../assets/Icons/cross.png')} 
style={{ width:30,height:30}}/>

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
        <View style={{paddingLeft:wp('8%'),paddingRight:wp('8%'),marginTop:hp('3%')}}>
            
            <View>
            <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4.5%')}}>
 {this.props.ActivityTitle}
  </Text>
  <View style={{flexDirection:'row',marginTop:hp('1%')}}>
  <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4%')}}>
 {this.props.PlannedDate}
  </Text>
  <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4%'),marginLeft:wp('12%') }}>
  10:00 am To 10:30 am
  </Text>
  </View>
  <View style={{
  marginTop:hp('2%'),
    borderStyle: 'dotted',
    borderWidth: 1,
     borderRadius: 2,
    borderColor:'#362828'
  }}>
</View>
<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('3.5%'),marginTop:hp('2 %') }}>
  Reason For Cancellation
  </Text>
 <View style={{height: hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10,marginTop:hp('2%')}}>
 <Picker

  selectedValue={this.state.reasonId}
  mode="dropdown"
  style={{height:hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({reasonId: itemValue})
  }>
    <Picker.Item label="Select Reason" value="" />
    {
      this.state.Reasons.map( (s, i) => {
        return <Picker.Item key={i} value={s.Id} label={s.Name} />
      })
    }
   

  {/* <Picker.Item label="Postpond by Trainer" value="000000000001656" />
  <Picker.Item label="Cancelled By Outlet" value="000000000001657" />
  <Picker.Item label="Cancelled By Distributor" value="000000000001658" />
  <Picker.Item label="Others Reasons" value="000000000001659" /> */}
 

</Picker> 

 {/* <Picker selectedValue={this.state.reason}
  mode="dropdown"
  style={{height:hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10}}
          onValueChange={(itemValue, itemIndex) =>   this.setState({reason: itemValue})}>
        <Picker.Item label="Pune" value="javaa" />
        </Picker> */}
 
 </View>

<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('3.5%'),marginTop:hp('1.5%')}}>
  Add Remarks
  </Text>
  <View style={{marginTop:hp('2%') }}/>

  <TextInput
      style={{  height:hp('28%'), borderColor: 'gray', borderWidth: 1,borderRadius:10 }}
      editable={true}
      value={this.state.remarks}
      onChangeText={text => this.onChangeEnteredBox(text)}
      multiline={true}
     numberOfLines={6}
     textAlignVertical='top'
        />

            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:hp('5%')}}>
            {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CustomerList');
          }}
          style={{
            backgroundColor: 'transparent',
            borderColor:'#46BE50',
            borderWidth:1,
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <Text style={{color: '#46BE50', fontSize: wp('4%'),fontWeight:'bold'}}>Save As Draft</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
          this.MeetingCancel()
          }}
          style={{
            backgroundColor: 'red',
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:hp('3%'),
            
            
            
          }}>
          <Text style={{color: 'white',fontWeight:'bold', fontSize:wp('4%')}}>Cancel</Text>
        </TouchableOpacity>

        </View>

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


        </View>

        </View>
    </SafeAreaView>
         );
        }
      }
      export default MJP_Cancel;
      const styles = StyleSheet.create({
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
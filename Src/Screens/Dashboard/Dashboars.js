
import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, Dimensions,
TouchableOpacity, Alert, AsyncStorage, SafeAreaView, FlatList,RefreshControl} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import Doctor from '../Doctor';
import moment from 'moment';

import firebase, { Notification } from 'react-native-firebase';
import icon from 'react-native-vector-icons/FontAwesome';
import Actionbar from './Actionbar';



import { Container, Header, Content, Text,Form, Item, Tabs, Tab, Icon,Input, Label, Button, Fab } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  bigScroll:{
    backgroundColor:"#EFF7F6"
  },

  mainFlatlist:{
    paddingTop:5,
    margin:5 
  },

  bigView:{
    flex: 1,
    flexDirection: 'row',
    height: 150,
  },

  mainButton :{
    flex: 1.0,
    flexDirection: 'column',
    padding:8,
    margin:8,
    borderColor:'#5E5E5E',
    borderWidth:1,
    height: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    justifyContent: 'center'
  },
  schoolNameView:{
    justifyContent:'center',
    marginTop:10,
    marginBottom:3
  },

  innerButtonNameView:{
    flex:3,
    width: "auto",
    flexDirection:"row",
    alignContent: 'flex-start',
  },
  innerButtonModelOuterView:{
    flex:2,
    width: 'auto',
    flexDirection:"row",
    justifyContent: 'flex-end'
  },
  innerButtonModelInnerView:{
    flex:2,
    width: 'auto',
    flexDirection:"column",
    justifyContent: 'center'
  },
  innerTextName:{
    paddingLeft:3,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:15,
    width:'70%',
    color: '#5a5a5a',
    alignSelf: 'center'
  },
  innerTextModel:{
    fontFamily: 'Montserrat-Regular',
    fontSize:12,
    color: 'black',
    paddingLeft:3,
  },

   parent: {
        width: '100%', 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    child: {
       //height:'20%',
        width: '48%', 
        margin: '1%', 
        aspectRatio: 1,
    },
  //  parent: {
  //       width: '97%', 
  //       flexDirection: 'row', 
  //       flexWrap: 'wrap'
  //   },
  //   child: {
        
  //       width: '47%', 
  //       margin: '1%', 
  //       aspectRatio: 1,
  //   },
  innerTextSerial:{
    fontFamily: 'Montserrat-Regular',
    fontSize:12,
    color: 'black',
    paddingLeft:3,
  },
  innerTextCount:{
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize:30,
    paddingRight:"5%",
   
  },
  schoolName:{
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize: 16,
    textAlign:'center'
  }

});

 
 

export default class Dashboard extends React.Component {
   constructor(props){
        super(props);
  this.state ={
    
    active:false,
    cnt:0,
    cnt_1:0,
    cnt_2:0,
    isLoading:false,
    buttonOpacity: 0,
    isLoading: true,
     masterItemList: [],
     codes: [],
     cntHardware: 0,
     cntSoftware: 0,
      abc: props.navigation.getParam('schoolCode'),
  }
   }

getData = async() =>{

  //  let now = new Date();
  //  // var defaultDate = now - 1000 * 60 * 60 * 24 * 1;
  //  // defaultDate = new Date(defaultDate);
  // var newdate
  //  newdate =  moment(now).format('DD.MM.YY'); 

  
     let now = new Date();
   var defaultDate = now - 1000 * 60 * 60 * 24 * 1;
   defaultDate = new Date(defaultDate);
   var lastdate =  moment(defaultDate).format('DD.MM.YY');
  var newdate
   newdate =  moment(now).format('DD.MM.YY');
 
  //alert(newdate)
          this.setState({ loading: true });
        let dbRef = firebase.database().ref('doctors/').child(Doctor.phone);
        dbRef.once('value', (val) => {
            let obj = val.val();   
            //console.log("dashboard" +JSON.stringify(obj))
            //console.log("avtar" +obj.Avtar)
               Doctor.Avtar = obj.avatar;
        });

           let dbRef2 = firebase.database().ref('appointments/')
        let tempList=[];
          let count =0;
        dbRef2.on('child_added', (val) => {
           
            let grievanceId = val.val();   
            //console.log("ddd" +Doctor.phone)
          //console.log('lll'+JSON.stringify(grievanceId))
           if(grievanceId.doctorId == Doctor.phone && (grievanceId.date == newdate || grievanceId.date == lastdate)){
              count = count +1;
            this.setState((prevState) => {
                return {
                    cnt:count,
                    isLoading:true
                   
                }
            });
          }
         
        });

           let dbRef3 = firebase.database().ref('doctors/').child(Doctor.phone).child('patientDetails');
      
          let count_1 =0;
        dbRef3.on('child_added', (val) => {
           
            let grievanceId = val.val();   
            //console.log("ddd" +Doctor.phone)
          //console.log('lll'+JSON.stringify(grievanceId))
              count_1 = count_1 +1;
            this.setState((prevState) => {
                return {
                    cnt_1:count_1,
                   
                }
            });
          
         
        });

        
           let dbRef5 = firebase.database().ref('appointments/')
          let count_2 =0;
        dbRef5.on('child_added', (val) => {
            
            let grievanceId = val.val();   
            //console.log("ddd" +Doctor.phone)
          //console.log('lll'+JSON.stringify(grievanceId))
          if(grievanceId.doctorId == Doctor.phone){
            count_2 = count_2 +1
                    this.setState((prevState) => {
                return {
                    cnt_2:count_2
                }
       
            });
          }
          
       });   
    

}

 onRefresh = async() =>{
       
        await this.getData();
    }

   componentDidMount = async() =>{
     await this.getData()
   }

  static navigationOptions = ({navigation}) => {

    if(Doctor.Avtar == null){
      return{

          drawerIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
      ),

           headerTitle: (
      <View>
             <Text  style={{color: '#ffffff', padding:1,fontSize:18}}>Dashboard</Text>
      </View>),
         headerLeft:(
             <Icon  
                        style={{paddingLeft: 10,color:"#ffffff"}}  
                        onPress={() => navigation.openDrawer()}  
                        name="md-menu"  
                        size={30}  
                    />  
         ),
         headerRight:(
          <TouchableOpacity onPress = {() => navigation.navigate('Profile')}>
           <Image source = {require('../image/abc.png')} style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 15}}/>
        </TouchableOpacity>

         ),
          headerStyle:{
              backgroundColor:"#07B26A",
              elevation: 0,
              height:60
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize:17,
              textAlign:'center',
              alignSelf:'center'
            },

      }
    }
      
        return{ 
            drawerIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
      ),

           headerTitle: (
      <View>
             <Text  style={{color: '#ffffff', padding:1,fontSize:18}}>Dashboard</Text>
      </View>),
         headerLeft:(
             <Icon  
                        style={{paddingLeft: 10,color:"#ffffff"}}  
                        onPress={() => navigation.openDrawer()}  
                        name="md-menu"  
                        size={30}  
                    />  
         ),
         
         headerRight:(
          <TouchableOpacity onPress = {() => navigation.navigate('Profile')}>
         <Image
          source={{uri : Doctor.Avtar}}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 15}}
        />
        </TouchableOpacity>

         ),
       headerStyle:{
              backgroundColor:"#07B26A",
              elevation: 0,
              height:60
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize:17,
              textAlign:'center',
              alignSelf:'center'
            },
            
        }
    }



    _logOut = async () => {
      //console.log("hii");
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login');
  }
     

  renderFABIcon =() =>{
    if(this.state.active){
        return(<Icon name="ios-close" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#07B26A"></Icon>);
    }
    else{
        return(<Icon name="ios-add" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#07B26A"></Icon>);
    }
}
    

  render() {
 


    const {height: screenHeight} = Dimensions.get('window');
    
    return (
      <Container>

      <View style={[styles.parent]}>
     
    <Card style={[styles.child, {backgroundColor: '#ff'} ]} >
     <TouchableOpacity onPress = {() => this.props.navigation.navigate('Appointment')}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View>
         <Text style ={{marginLeft:12,marginTop:20,fontSize:18}}>Todays </Text>
          <Text style ={{marginLeft:12}}>Appointments</Text>
        </View>
           <Icon style={{color:"#07B26A",marginTop:20,marginRight:10}} name="paper" color="#07B26A" ></Icon>
           </View>
           <View>
             <Text style ={{marginLeft:20,paddingTop:10,fontWeight:'bold',color:'#07B26A',marginTop:22,fontSize:30}}>{this.state.cnt}</Text>
           </View>
              </TouchableOpacity>
    </Card>
 

     <Card style={[styles.child, {backgroundColor: '#ff'} ]} >
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View>
         <Text  style ={{marginLeft:12,marginTop:20,fontSize:18}}>Last Day </Text>
         <Text  style ={{marginLeft:12,fontSize:18}}>fee Collection </Text>
         </View>
         <Image source = {require('../image/rupee.png')} style={{height:16,width:16,color:"#07B26A",marginTop:20,marginRight:10}}/>
         </View>
         <View>
             <Text style ={{marginLeft:20,paddingTop:10,fontWeight:'bold',color:'#07B26A',marginTop:22,fontSize:30}}> 5000</Text>
           </View>

     </Card>
   
    <Card style={[styles.child, {backgroundColor: '#ff'} ]} >
     <TouchableOpacity onPress = {() => this.props.navigation.navigate('PatientList')}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
         <Text style ={{marginLeft:12,marginTop:20,fontSize:18}}>Total  </Text>
          <Text  style ={{marginLeft:12,fontSize:18}}>Patients </Text>
          </View>
          <Icon style={{color:"#07B26A",marginTop:20,marginRight:10}}  name="person"></Icon>
           </View>
           <View>
             <Text style ={{marginLeft:20,paddingTop:10,fontWeight:'bold',color:'#07B26A',marginTop:15,fontSize:30}}>{this.state.cnt_2}</Text>
           </View>
</TouchableOpacity>
    </Card>
   
    <Card style={[styles.child, {backgroundColor: '#ff'} ]} >
    <TouchableOpacity onPress = {() => this.props.navigation.navigate('sheduleOPD')}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View>
         <Text style ={{marginLeft:12,marginTop:20,fontSize:18}}>Schedule</Text>
          <Text style ={{marginLeft:12,fontSize:18}}>OPD</Text>
          </View>
          <Icon name="md-clock"  style={{color:"#07B26A",marginTop:20,marginRight:10}}></Icon>
         </View>
         <View style={{marginTop:20}}>
             <Text style ={{marginLeft:12,marginTop:15,fontSize:12}}>Monday-Friday</Text>
              <Text  style ={{marginLeft:12,marginBottom:10,fontSize:13}}>3pm-6pm</Text>
           </View>
</TouchableOpacity>
    </Card>

    
</View>



             <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#07B26A' }}
            position="bottomRight"
            onPress={() => {
                  if(this.state.active==false){
                    this.setState({ 
                      active: !this.state.active,
                      buttonOpacity:100
                    })
                  }
                  else{
                    this.setState({ 
                      active: !this.state.active,
                      buttonOpacity:0
                    })}
                  }}>

            {this.renderFABIcon()}


            <Button>
            <Button style={{ backgroundColor: '#07B26A', width:140, marginRight:60, opacity:this.state.buttonOpacity, height:42, backgroundColor: "#07B26A", borderRadius:16 }} block onPress={this._logOut}>
                <Text style={{textAlign:'center', color:'#fff', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Logout</Text>
            </Button>
            </Button>

            <Button>
            <Button style={{ backgroundColor: '#07B26A', width:140, marginRight:60, opacity:this.state.buttonOpacity, height:42, backgroundColor: "#07B26A", borderRadius:16 }} block onPress={this.onRefresh}>
                <Text style={{textAlign:'center', color:'#fff', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Refresh</Text>
            </Button>
            </Button>

          </Fab> 
          </Container>

//           <Container>


          //    <Fab
          //   active={this.state.active}
          //   direction="up"
          //   containerStyle={{ }}
          //   style={{ backgroundColor: '#07B26A' }}
          //   position="bottomRight"
          //   onPress={() => {
          //         if(this.state.active==false){
          //           this.setState({ 
          //             active: !this.state.active,
          //             buttonOpacity:100
          //           })
          //         }
          //         else{
          //           this.setState({ 
          //             active: !this.state.active,
          //             buttonOpacity:0
          //           })}
          //         }}>

          //   {this.renderFABIcon()}


          //   <Button>
          //   <Button style={{ backgroundColor: '#07B26A', width:140, marginRight:60, opacity:this.state.buttonOpacity, height:42, backgroundColor: "#07B26A", borderRadius:16 }} block onPress={this._logOut}>
          //       <Text style={{textAlign:'center', color:'#fff', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Logout</Text>
          //   </Button>
          //   </Button>

          //   <Button>
          //   <Button style={{ backgroundColor: '#07B26A', width:140, marginRight:60, opacity:this.state.buttonOpacity, height:42, backgroundColor: "#07B26A", borderRadius:16 }} block onPress={this.onRefresh}>
          //       <Text style={{textAlign:'center', color:'#fff', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Refresh</Text>
          //   </Button>
          //   </Button>

          // </Fab> 

// </Container>

  
             
  
      
    );
  }
}
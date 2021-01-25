import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,FlatList, AsyncStorage,BackHandler,Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { FloatingAction } from "react-native-floating-action";
import { Fab, Button, Icon } from 'native-base';
import { ORDER_DELEVERED,ORDER_IN_PROCESS,ORDER_TOTAL} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import sideordernav from './sideordernav';

const db = new Database();
import moment from 'moment';
import User from '../../utility/User';
var open
const actions = [
  {
    text: "Create New Order",
    color: 'transperent',
    name: "bt_create", 
    position: 4,
    textColor: 'black',
    textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 10 },
    buttonSize: 0,
  },
//   {
//     text: "Sync Now",
//     color: 'transperent',
//     name: "bt_sync", 
//     position: 4,
//     textColor: 'black',
//     textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 10 },
//     buttonSize: 0,
//   },
//   {
//     text: "Accept Payment",
//     color: 'transperent',
//     name: "bt_payment", 
//     position: 3,
//     textColor: 'black',
//     textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 15, },
//     buttonSize: 0,
//   },
//   {
//     text: "Take A Survey",
//     color: 'transperent',
//     name: "bt_survey", 
//     position: 2,
//     textColor: 'black',
//     textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 22, },
//     buttonSize: 0,
//   },
//   {
//     text: "Audit Assets",
//     color: 'transperent',
//     name: "bt_assets", 
//     position: 1,
//     textColor: 'black',
//     textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 25, },
//     buttonSize: 0,
//   },

];

var name
export class sideorder extends Component {
constructor(props) {
    super(props);
    this.state = { 
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


     ////
console.log("constructor called");
    this.setState({reopen:false}); 
    
}

onRefresh() {
    this.setState({isRefreshing: true});
    
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 5000);
  }
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
    // this.setState({reopen:false}); 
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
    // console.log("component will mount called");
    // setTimeout(() => {
    //     // this.setState({
    //     //   loading: false,
    //     // })
    //     this._componentFocused();
    //    }, 1000)
    // this._componentFocused();

   
    
    this._sub = this.props.navigation.addListener(
        'didFocus',
        this._componentFocused

   ); 
  }

  componentDidMount(){
  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
    //console.log("componentDidMount callee")
   // this._componentFocused();

    // this._sub = this.props.navigation.addListener(
    //     'didFocus',
    //     this._componentFocused

    // ); 
}


_componentFocused = () => {  
    console.log("u are entering focused");
    this.setState({Shop_det:[]})
    AsyncStorage.getItem('username').then((keyValue) => {                   
        this.setState({ name: JSON.parse(keyValue) })})
    db.getAllOrders().then((data)=>{
        console.log("getTotalOrderFromDB",JSON.stringify(data))
        this.setState({Shop_det:data})
        console.log("TotalOrder",this.state.Shop_det);
        this.state.TotalOrderLen=data.length
        this.setState({TotalOrderLen:data.length})
        this.props.orderTotal(this.state.TotalOrderLen)
        // data.map((item, i) => {
        //     db.getCustomerShopName(item.entity_id,item.id).then((data1)=>{
        //         console.log("side order shop-details",data1);
        //         this.state.Shop_det.push(data1);  
        //         console.log("shop data final",this.state.Shop_det);
        //       //  User.orderidvar=data[0].id;
                
        //         })
        // })
        // for(var i=0;i<data.length;i++){
        //    console.log("you have entered in for loop");
        //    console.log("entity_type in for loop",data[i].entity_type);
         
        //     if(data[i].entity_type==1)
        //    // &&( this.state.Shop_det.entity_id==!data[i].entity_id ||this.state.Shop_det==[])
        //     {
        //         console.log("successfull if");
        //         db.getCustomerShopName(data[i].entity_id,data[i].id).then((data)=>{
        //         console.log("side order shop-details",data);
        //         this.state.Shop_det.push(data);  
        //         console.log("shop data final",this.state.Shop_det);
        //         User.orderidvar=data[0].id;
                
        //         })
        //     }
        //     else if(data[i].entity_type==2)
        //     {
    
        //     }
                       
        // }  
     
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



static navigationOptions = {
    title: 'Orders',
    color: 'white',
    headerStyle: {
        backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff', marginLeft: wp('-2'),fontSize:20
    },
    headerLeft: (
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
            <TouchableOpacity onPress={() => Actions.drawerMenu()}>
                <Image style={{ marginLeft: wp('4'), }}
                    source={require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

// NavigateEdit = () => {
//    // AsyncStorage.setItem('routeName', "");
//    // AsyncStorage.setItem('routeId', "");
//     Actions.sideordermedit()

// }

    _refresh(){
      return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, 2000)
      });
    }


_renderView(item){
   
    return(
        <View style={styles.deliveryStatusContainer}>
        <View style={styles.deliverySeparateContainer}>
        <View style={styles.deliveryColContainer}>
            <Text style={styles.deliveryLabelStyle}>
                DELIVERY
            </Text>
        </View>
    </View>

    <View style={styles.deliveryStusMainContainer}>
        <View style={styles.deliveryStatusColContainer}>
            <View style={styles.statusPinkBG}>
                <Text style={styles.statusTextStyle}>
                    In Progress
                </Text>
            </View>
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
     // this._componentFocused();
    
        let{orderInProcess,orderDelevered,orderTotal}=this.props.shops
       // console.log("component in render",this.state.Shop_det);
        setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 3000);
        return (
            <View>
                
                <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{resizeMode: 'cover',  justifyContent: 'center'}}
            > 
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >

                {/*Total Shops  */}
                <View style= {styles.totalShopsMainContainer}>
                    <View style= {styles.processColContainer}>
                      
                        <Text style = {styles.inProcessHeadingTextStyle}>
                        {/* Total orderInProcess */}
                        Total Orders : {this.state.TotalOrderLen}
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
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* Order Detailes */}
             {this._renderViewForFlatlist()} 
              
               
              

            <View style={{height:hp('5')}}></View>
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
export default connect(mapStateToProps, mapDispatchToProps)(sideorder)



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

})
import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,FlatList, AsyncStorage,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { FloatingAction } from "react-native-floating-action";
import { ORDER_DELEVERED,ORDER_IN_PROCESS,ORDER_TOTAL} from '../../Redux/actions/ShopAction'
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
    textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 10 },
    buttonSize: 0,
  },
  {
    text: "Accept Payment",
    color: 'transperent',
    name: "bt_payment", 
    position: 3,
    textColor: 'black',
    textStyle: { fontSize: 14,fontWeight:'bold', marginHorizontal: 15, },
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

var name
export class Orders extends Component {
constructor(props) {
    super(props);
    this.state = { 
        InProcessOrder:[],
        DeliveredOrder:[],
        TotalOrder:[],
        TotalOrderLen:0,
        InProcessOrderLen:0,
        DeliveredOrderLen:0,
        name:'',
        active:false

     };
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.Shops();
     return true;
   }
  // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  

componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
    //console.log("componentDidMount callee")
    this._componentFocused();

    this._sub = this.props.navigation.addListener(
        'didFocus',
        this._componentFocused

    ); 
}
_componentFocused = () => {  
    AsyncStorage.getItem('username').then((keyValue) => {                   
        this.setState({ name: JSON.parse(keyValue) })})
    db.getTotalOrderFromDB("0",this.props.shops.shopId).then((data)=>{
        //console.log("getTotalOrderFromDB",JSON.stringify(data))
        this.setState({TotalOrder:data})
        //console.log(data.length)
        this.state.TotalOrderLen=data.length
        this.setState({TotalOrderLen:data.length})
        this.props.orderTotal(this.state.TotalOrderLen)

    })
    db.getInProcessOrderFromDB("0","N",this.props.shops.shopId).then((data)=>{
      //  //console.log("getInProgressOrderFromDB",data)
        this.state.InProcessOrderLen=data.length
        this.setState({InProcessOrderLen:data.length})
        this.props.inProcessOrder(this.state.InProcessOrderLen)
    })
    db.getDeleveredOrderFromDB("0","Y",this.props.shops.shopId).then((data)=>{
       // //console.log("getDeleveredOrderFromDB",data)
        this.state.DeliveredOrderLen=data.length
        this.setState({DeliveredOrderLen:data.length})
        this.props.deleveredOrder(this.state.DeliveredOrderLen)

    })


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
    if(item.sync_flag=='N'){
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
        <TouchableOpacity onPress={ () => Actions.OrderViewDetails({ OrderId: item.id }) }  >
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
        </View>
    </View>
    </View>
    )
    }else{
        return(
            <View style={styles.deliveryStatusContainer}>                
                <View style={styles.deliverySeparateContainer}>
         <View style={styles.deliveryColContainer}>
            <Text style={styles.deliveryLabelStyle}>
                DELIVERED
            </Text>
        </View>
    </View>

    <View style={styles.deliveryStusMainContainer}>
        <View style={styles.deliveryStatusColContainer}>
          
            <Text style={styles.deliveredDateStyle}>
          {item.ExpectedDeliveryDate}
            </Text>
            
        </View>
        <View style={styles.viewDetailsMainContainer}>
        <TouchableOpacity onPress={ () => Actions.OrderViewDetails({ OrderId: item.id }) }  >
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
        </View>
    </View>

            </View>

        )
    }
}

    render() {
        let{orderInProcess,orderDelevered,orderTotal}=this.props.shops
        return (
            <View>
            <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{width:wp('100'), height:hp('70'),resizeMode: 'cover',  justifyContent: 'center',}}
            > 
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                {/*Total Shops  */}
                <View style= {styles.totalShopsMainContainer}>
                    <View style= {styles.processColContainer}>
                        <Text  style = {styles.inProcessCountTextStyle}>
                                {orderInProcess}
                        </Text>
                        <Text  style = {styles.inProcessHeadingTextStyle}>
                                In-Process
                        </Text>
                    </View>
                    <View style= {styles.deliveredColContainer}>
                        <Text  style = {styles.deliveredCountTextStyle}>
                                {orderDelevered}
                        </Text>
                        <Text  style = {styles.deliveredHeadingTextStyle}>
                                Delivered
                        </Text>
                    </View>
                    <View style= {styles.totalCountMainContainer}>
                        <Text  style = {styles.totalCountTextStyle}>
                                {orderTotal}
                        </Text>
                        <Text  style = {styles.totalCountHeadingTextStyle}>
                                Total
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
                <FlatList
                data={this.state.TotalOrder}

                renderItem={({ item }) => (
                <View style={styles.orderDetailsMainContainer}>
                {/* Header Background */}
                <View style={styles.orderHeaderBGContainer}>
                    <View style={styles.ordHeaderRowContainer}>
                        <View style={styles.orderLabelContainer}>
                            <Text style={styles.orderLabelTextStyle}>
                                ORDER {item.id}
                            </Text>
                        </View>
                        <View style={styles.amtContainer}>
                            <Text style={styles.amtTextStyle}>
                                {item.total_amount} INR
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
                               {item.check_date}
                            </Text>
                        </View>
                        <View style={styles.salesColContainer}>
                            <Text style={styles.salesLabelStyle}>
                                SALESMAN
                            </Text>
                            {/* {this.renderName(item.user_id)} */}
                            <Text style={styles.salesNameStyle}>
                                {this.state.name}
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
                    {/* Delivery */}
                    {/* 
              
              
              
              
               */}
              
                </View>    
                </View>
                )}
                />
               
              

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
                        AsyncStorage.setItem('outletName',"");
                        AsyncStorage.setItem('outletId',"");
                        AsyncStorage.setItem('beatName',"");
                        AsyncStorage.setItem('beatId',"");
                        AsyncStorage.setItem('distributorName',"");      
                        AsyncStorage.setItem('SearchString', "");          
                       
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
    orderTotal:(val)=>{dispatch(ORDER_TOTAL(val))},
    inProcessOrder: (val) => { dispatch(ORDER_IN_PROCESS(val));    },       
    deleveredOrder: (val) => { dispatch(ORDER_DELEVERED(val));    },                       
    
}
)
export default connect(mapStateToProps, mapDispatchToProps)(Orders)



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
        flex:1,
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
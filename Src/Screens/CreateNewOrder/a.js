import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, AsyncStorage, ScrollView, TextInput, PermissionsAndroid, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import ModalDropdown from 'react-native-modal-dropdown';
import Database from './../../utility/Database'
import Geolocation from 'react-native-geolocation-service';

import utilss from '../../utility/usableFunctions'
const utils = new utilss();
const db = new Database();

var Total_amount=0;
let currentDateTime ;
let len1
var itemId = ''
var itemName = ''
var detail_order_id = []
var app_order_id = '';
const oorderid=''
var entity_id = ''
////#8C7878
export default class EditInlineOnCreateNewOrder extends Component {
    constructor(props) {
        super(props);
        //entity id=outlet id
        this.state = {
            box: 0, unit: 0, freeBox: 0, freeUnit: 0, boxRate: '', unitRate: '', grossAmount: '', discountRs: '', discountPer: '', totalAmount: '',
            applyScemes: '', selectedDiscount: '', selectedRatePer: '', ptr: '', bpc: '', amount: '',
            ratePerArr: [{ "id": "1", "name": "Box" }, { "id": "2", "name": "Unit" }],
            discountArr: [{ "id": "1", "name": "Percent" }, { "id": "2", "name": "Rs" }],
            entity_type: '1', Collection_type: '0', userid: '52362', editRateFlagDb: '', enteredRate: '', userLatitude: '',
            userLongitude: '',
            isOrderIdExists: [],
            isOrderIdExistsnew : [],
            // isOrderIdExistsnew :[],
            hasMapPermission: '', order_id: '', detail_order_id: [], master_order_id: ''
        };
        // this.applyClickHandler = this.applyClickHandler.bind(this)
        this.requestFineLocation();    
    }
    componentWillMount() {
        AsyncStorage.getItem('userIds').then((keyValue) => {
            this.setState({ userid: JSON.parse(keyValue) })

        })
        entity_id = this.props.outletId
        itemName = this.props.ItemName
        itemId = this.props.ItemId
        this.state.ptr = this.props.ptr
        this.state.bpc = this.props.bpc
        //console.log("itemId=", itemId)

        db.geteditRateFlag().then((data) => {
            var prod = []
            prod = data
            var a = prod.map(function (el) {
                return el.Value;
            });
            this.state.editRateFlagDb = a[0]
            //console.log("RajaniFlag=", this.state.editRateFlagDb)
        })
        //entity_id,collection_type,item_id
        db.getOrdersFromDbIfPresent(entity_id, this.state.Collection_type, this.props.ItemId).then((data) => {
            //console.log("dbDatas=" + JSON.stringify(data))

            var item_ids = '';
            var rates = '';
            var amounts = '', boxs = '', units = '', freeBoxs = '', freeUnits = '', fromDates = '', toDates = '', selectedFlags = 1
            if (data) {
                data.map((item, i) => {
                    item_ids = item.item_id,
                        rates = item.rate,
                        amounts = item.Amount,
                        boxs = item.quantity_one,
                        units = item.quantity_two,
                        freeBoxs = item.small_Unit,
                        freeUnits = item.large_Unit,
                        fromDates = item.from_date,
                        toDates = item.to_date,
                        selectedFlags = item.selected_flag
                })
                //
                itemId = item_ids
                currentDateTime = fromDates
                this.setState({
                    box: boxs,
                    unit: units,
                    enteredRate: rates,
                    amount: amounts,
                    freeBox: freeBoxs,
                    freeUnit: freeUnits,
                })
            }




        })



    }

    applyClickHandler(e) {
                     //request location
                     this.getUserPosition();
        const { box, unit, ptr, bpc, amount } = this.state

        //getAmount=box,unit,ptr(pitem),Bpc(pitem)
        if (this.state.box || this.state.unit) {   //set if not to 0
            if (this.state.box) {
                //console.log("box=", this.state.box)
            } else {
                this.setState({ box: 0 })
                //console.log("box=", this.state.box)
            }
            if (this.state.unit) {
                //console.log("unit=", this.state.unit)
            } else {
                this.setState({ unit: 0 })
                //console.log("unit=", this.state.unit)
            }
            if (this.state.ptr) {
                //console.log("ptr=", this.state.ptr)
            } else {
                this.setState({ ptr: 0 })
                //console.log("ptr=", this.state.ptr)
            }

            if (this.state.bpc) {
                //console.log("bpc=", this.state.bpc)
            } else {
                this.setState({ bpc: 0 })
                //console.log("bpc=", this.state.bpc)
            }

            if (this.state.editRateFlagDb == "TRUE") {
                //console.log("if editRateFlagDb true.......")
                //get rate as ptr
                if (this.state.enteredRate) {
                    //console.log("if entered rate is true.......")
                    this.state.ptr = this.state.enteredRate
                    var perbottle = (this.state.ptr / this.state.bpc); ///get per bottle rate                             
                    //console.log("adding perbottle=", perbottle)
                    var quntity = parseInt(this.state.bpc * this.state.box + parseInt(this.state.unit));//get all bottle qty
                    //console.log("adding quntity=", quntity)
                    var amounts = (quntity * perbottle);
                    this.state.amount = amounts
                    // this.setState({ amount: amounts })
                    //console.log("adding amount=", this.state.amount)
                } else {
                    //console.log("in else enteredRate.......")
                    this.state.ptr == 0
                    // this.setState({ amount: 0 })
                    this.state.amount = 0.00
                    //console.log("adding amount=", this.state.amount)
                }

            } else {
                //console.log("in else editRateFlagDb.......")
                //get ptr from table

                if (this.state.ptr == 0) {
                    this.state.amount = 0.00
                    //  this.setState({ amount: 0 })
                } else {
                    //console.log("in else")
                    var perbottle = (this.state.ptr / this.state.bpc); ///get per bottle rate                             
                    //console.log("adding perbottle=", perbottle)
                    var quntity = parseInt(this.state.bpc * this.state.box + parseInt(this.state.unit));//get all bottle qty
                    //console.log("adding quntity=", quntity)
                    var amounts = (quntity * perbottle);
                    this.state.amount = amounts
                    // this.setState({ amount: amounts })
                    //console.log("adding amount=", this.state.amount)
                }
            }

            db.checkIsOrderIdInDb(entity_id, this.state.Collection_type, 52362).then((data) => {
                //console.log("checkIsOrderIdInDb=", JSON.stringify(data))

                this.state.isOrderIdExists = [];
                this.setState({ isOrderIdExists: data });
                for (var i = 0; i < this.state.isOrderIdExists.length; i++) {
                    app_order_id = ''
                    oorderid=''
                    app_order_id = this.state.isOrderIdExists[0].id
                    oorderid=this.state.isOrderIdExists[0].id
                }
               // alert(this.state.isOrderIdExists.length)
            if (this.state.isOrderIdExists.length == 0) {
                //console.log("innn if orderId not exist insert order")
                // utils.createOrderId().then((datetime) => {
                //    app_order_id=datetime
                // })
                // utils.getCurrentDateTime().then((datetime) => {
                //     alert(datetime)
                //     currentDateTime= datetime
                // })

                var that = this;
                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getFullYear(); //Current Year
                var hours = new Date().getHours(); //Current Hours
                var min = new Date().getMinutes(); //Current Minutes
                var sec = new Date().getSeconds(); //Current Seconds
                app_order_id = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
                app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, "");

                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getFullYear(); //Current Year
                var hours = new Date().getHours(); //Current Hours
                var min = new Date().getMinutes(); //Current Minutes
                var sec = new Date().getSeconds(); //Current Seconds
                currentDateTime = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
                //console.log("current datetime=", currentDateTime)
            
                //console.log("app order id=",app_order_id)
                AsyncStorage.setItem('app_order_id',JSON.stringify(app_order_id));
                db.insertTABLE_TEMP_OrderMaster(app_order_id, currentDateTime, this.state.entity_type, entity_id, this.state.userLatitude, this.state.userLongitude, this.state.amount, this.state.Collection_type, 52362, 1)
                app_order_id=app_order_id
                //createOrderId by using dateTime function,get lat long current,if lat long null then set 0,location forcefully on
                //INSERT INTO TABLE_TEMP_OrderMaster(id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,collection_type,user_id,selected_flag) VALUES (?,?,?,?,?,?,?,?,?,?)
            } else {
                //console.log("innn else if orderId exist select from temp order master")
                //getting id from  tabletempordermaster
                db.getInsertedTableTempOrderMasterId(entity_id, 0, 52362).then((data) => {
                    //console.log("innn id from temp order master", JSON.stringify(data[0].id))               
                    
                    order_id=data
                    for (var i = 0; i < order_id.length; i++) {                      
                        app_order_id = order_id=id[0].id
                    }      
                    //console.log("innn id from temp order master1", app_order_id)  
                   // return app_order_id            

                })
            }           

            })
            //console.log("sara==",app_order_id)
            alert(app_order_id)          
            db.checkIsRowExistInTempMasterTable(app_order_id, this.state.Collection_type).then((datalen) => {
                //console.log("innn checkIsRowExistInTempMasterTable=", JSON.stringify(datalen))
                this.state.isOrderIdExistsnew = datalen              
                this.state.isOrderIdExistsnew = [];
                this.setState({ isOrderIdExistsnew: datalen });
                //  return this.state.isOrderIdExistsnew
                
                for (var i = 0; i < this.state.isOrderIdExistsnew.length; i++) {
                    app_order_id = ''
                    app_order_id = this.state.isOrderIdExistsnew[0].id
                }
                AsyncStorage.setItem('app_order_id',JSON.stringify(app_order_id));   
            
                
                //console.log(" innn if orderId exist in temp order master//",this.state.isOrderIdExistsnew.length)
                if ( this.state.isOrderIdExistsnew.length)//row len
                {
                    //console.log(" innn if orderId exist in temp order master")
                    // master_detail_id= SELECT id FROM TABLE_TEMP_ORDER_DETAILS where item_id='%@' and order_id='%@'",item_id,order_id
                    db.selectTempMasterDetailId(this.props.ItemId, app_order_id).then((dataId) => {
                        //console.log("innn selectTempMasterDetailId", JSON.stringify(dataId))
                       // detail_order_id = dataId
                          this.setState({ detail_order_id: dataId })
                          return this.state.detail_order_id;
                    })
                   alert(this.state.detail_order_id.length)
                    if (this.state.detail_order_id.length == 0) {
                        //console.log("if detail_order_id is 0")
                        AsyncStorage.setItem('app_order_id',JSON.stringify(app_order_id));
                        Total_amount+=this.state.amount
                        db.insertTABLE_TEMP_ORDER_DETAILS(app_order_id, this.props.ItemId, itemName, this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.enteredRate, this.state.bpc, this.state.amount, '1')
                       db.updateTotalAmountTempOrderMaster(app_order_id,Total_amount)
                        db.updateTABLE_PITEM_ADDEDITBRAND(this.props.ItemId, true, true)
    
                    } else {
                        //console.log("innn else detail_order_id is not 0")
                        AsyncStorage.setItem('app_order_id',JSON.stringify(app_order_id));
                        Total_amount+=this.state.amount
                        db.updateTABLE_TEMP_ORDER_DETAILS(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.amount, this.state.enteredRate, app_order_id, this.props.ItemId)
                        db.updateTotalAmountTempOrderMaster(app_order_id,Total_amount)
                        db.updateTotalAmountTempOrderMaster(app_order_id,Total_amount)
                    }
                }
    
            }) 


        } else {
            alert("Please Enter the any of Box and Unit")
        }
    }

    async requestFineLocation() {
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
              //  alert(pos.coords.latitude)
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude
                });
                //console.log(this.state.userLatitude)
            })
    }
    deleteClickHandler() {


    }
    render() {
        const { navigation } = this.props;
        return (

            <View style={styles.container}>
                {/* <ScrollView
                 showsVerticalScrollIndicator={false}
              > */}
                <View style={styles.oredrFreeMainContainer}>
                    <View style={styles.orderFreeColumnContainer}>
                        <Text style={styles.orderTextStyle}>
                            Order
                    </Text>
                        <Text style={styles.freeTextStyle}>
                            Free
                    </Text>
                    </View>

                    <View style={styles.boxColumnContainer}>
                        <Text style={styles.boxTextStyle}>
                            Box
                    </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.boxTextBoxStyle}
                            value={this.state.box}
                            onChangeText={(box) => this.setState({ box })}

                        />
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.boxTextBoxStyle}
                            value={this.state.freeBox}
                            onChangeText={(freeBox) => this.setState({ freeBox })}

                        />
                    </View>

                    <View style={styles.unitColumContainer}>
                        <Text style={styles.unitTextStyle}>
                            Unit
                    </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.unitTextBoxStyle}
                            value={this.state.unit}
                            onChangeText={(unit) => this.setState({ unit })}
                        />
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.unitTextBoxStyle}
                            value={this.state.freeUnit}
                            onChangeText={(freeUnit) => this.setState({ freeUnit })}
                        />
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength={2}
                        dashColor='#ADA2A2'
                    />
                </View>

                <View style={styles.rateContainer}>
                    <View style={styles.rateColumnContainer}>
                        <Text style={styles.rateTextStyle}>
                            Rate Per
                    </Text>
                    </View>

                    <View style={styles.boxUnitDropContainer}>


                        <ModalDropdown
                            showsVerticalScrollIndicator={false}
                            onSelect={(index, value) => { this.setState({ selectedRatePer: value }) }}
                            // options={['Box', 'Unit']}
                            options={this.state.ratePerArr.map(item => item.name)}
                            defaultValue='Box'
                            dropdownTextStyle={styles.dropDownTextStyle}/*Style here*/
                            textStyle={styles.dropDownTextsStyle}
                            dropdownStyle={styles.dropdownStyle}
                            style={styles.dropDownStyless}
                        />

                    </View>

                    <View style={styles.rateTextBoxContainer}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.rateTextBoxStyle}
                            value={this.state.enteredRate}
                            onChangeText={input => { this.setState({ enteredRate: input }) }
                                                      } />
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength={2}
                        dashColor='#ADA2A2'
                    />
                </View>

                <View style={{ flex: 0.1 }}>
                    <View style={styles.grossMainContainer}>
                        <View style={styles.grossTextContainer}>
                            <Text style={styles.grossTextStyle}>
                                Gross Amount
                        </Text>
                        </View>

                        <View style={styles.grossTextBoxContainer}>
                            <Text
                                keyboardType="numeric"
                                placeholder="0"
                                style={styles.grossTextBoxStyle}>
                                {this.state.amount}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.discountMainContainer}>
                    <View style={styles.discountColumnContainer}>
                        <Text style={styles.discountTextStyle}>
                            Discount In
                    </Text>
                    </View>

                    <View style={styles.discountDropContainer}>
                        <ModalDropdown
                            showsVerticalScrollIndicator={false}
                            onSelect={(index, value) => { this.setState({ selectedDiscount: value }) }}

                            defaultValue='Percent'
                            options={this.state.discountArr.map(item => item.name)}
                            dropdownTextStyle={styles.discountDropdownTextStyle}/*Style here*/
                            textStyle={styles.discountDropTextStyle}
                            dropdownStyle={styles.discountDropDownStyle}
                            style={styles.discountDropStyle}
                        />
                        {/* <Image
                            style={{marginLeft:wp('18'), marginTop:hp('-5')}}
                            source={require('../../Assets/Icons/right_arrow.png')}
                        /> */}
                    </View>

                    <View style={styles.discountTextBoxContainer}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.discountTextBoxStyle}
                        />
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength={2}
                        dashColor='#ADA2A2'
                    />
                </View>


                <View style={styles.applicableMainContainer}>
                    <View style={styles.roundedtext}></View>
                    <Text style={styles.applicableTextStyle}>
                        Applicable Schemes :
                </Text>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength={2}
                        dashColor='#ADA2A2'
                    />
                </View>

                <View style={styles.applyDeleteMainContainer}>
                    <View style={styles.applyImgContainer}>
                        {/* <Image style={styles.applyImgStyle} 
                                source={require('..//apply_green.png')}
                    />  */}
                    </View>

                    <TouchableOpacity style={styles.applyTextContainer} onPress={(e) => this.applyClickHandler(e)}>
                        <Text style={styles.applyTextStyle}>
                            APPLY
                    </Text>
                    </TouchableOpacity>

                    <View style={styles.deleteImgContainer}>
                        {/* <Image style={styles.deleteImgStyle} 
                                source={require('../../Assets/Icons/delete_red.png')}
                    />  */}
                    </View>

                    <TouchableOpacity style={styles.applyTextContainer} onPress={() => this.deleteClickHandler()}>
                        <Text style={styles.deleteTextStyle}>
                            DELETE
                    </Text>
                    </TouchableOpacity>

                </View>
                {/* </ScrollView> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    oredrFreeMainContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    orderFreeColumnContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: wp('3')
    },

    orderTextStyle: {
        marginTop: hp('5'),
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
    },

    freeTextStyle: {
        marginTop: hp('1'),
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginTop: hp('4')
    },

    boxColumnContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    boxTextStyle: {
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('2'),
        fontWeight: 'bold',
    },

    boxTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginLeft: wp('-10'),
        marginRight: wp('10'),
        marginTop: hp('1'),
        textAlign: 'center',
    },

    unitColumContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    unitTextStyle: {
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('9'),
        fontWeight: 'bold',
    },

    unitTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginLeft: wp('-3'),
        marginRight: wp('10'),
        marginTop: hp('1'),
        textAlign: 'center',
    },

    rateContainer: {
        flex: 0.7,
        flexDirection: 'row',
        marginTop: hp('1'),
    },

    rateColumnContainer: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: wp('2'),
    },

    rateTextStyle: {
        marginTop: hp('2'),
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
    },

    boxUnitDropContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    dropDownTextStyle: {
        backgroundColor: '#fff',
        fontSize: wp('3'),
        color: 'black',
    },

    dropDownTextsStyle: {
        fontSize: wp('3'),
        // color:'gunmetal', 
        alignSelf: 'flex-start',
        marginLeft: wp('3'),
    },

    dropdownStyle: {
        flex: 1,
        width: wp('30'),
        height: hp('11'),
        marginVertical: 10,
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
    },

    dropDownStyless: {
        flex: 1,
        width: wp('30'),
        height: hp('5'),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: wp('-6'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
    },

    rateTextBoxContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    rateTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginRight: wp('-2'),
        marginTop: hp('0'),
        textAlign: 'center',
    },

    dashLineContainer: {
        flex: 1,
        marginTop: hp('3'),
        alignContent: 'center',
        alignItems: 'center',
    },

    dashLineStyle: {
        width: wp('89'),
        height: hp('1'),
        color: '#ADA2A2',
    },

    grossMainContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    grossTextContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    grossTextStyle: {
        color: '#796A6A',
        fontSize: wp('3'),
        marginTop: hp('2'),
        marginLeft: wp('0.5'),
        fontFamily: 'Proxima Nova',
    },

    grossTextBoxContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    grossTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginRight: wp('-2'),
        marginTop: hp('1'),
        textAlign: 'center',
    },

    discountMainContainer: {
        flex: 0.5,
        flexDirection: 'row',
        marginTop: hp('2'),
    },

    discountColumnContainer: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: wp('1'),
    },

    discountTextStyle: {
        marginTop: hp('1'),
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginTop: hp('2'),
    },

    discountDropContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    discountDropdownTextStyle: {
        backgroundColor: '#fff',
        fontSize: wp('3'),
        color: 'black',
    },

    discountDropTextStyle: {
        fontSize: wp('3'),
        //   color:'gunmetal', 
        alignSelf: 'flex-start',
        marginLeft: wp('3'),
    },

    discountDropDownStyle: {
        flex: 1,
        width: wp('30'),
        height: hp('11'),
        marginVertical: 10,
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
    },

    discountDropStyle: {
        flex: 1,
        width: wp('30'),
        height: hp('5'),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: wp('-4'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
    },

    discountTextBoxContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    discountTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginRight: wp('-2'),
        marginTop: hp('0'),
        textAlign: 'center',
    },

    applicableMainContainer: {
        flex: 1,
        marginTop: hp('2'),
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: wp('-4'),
    },

    roundedtext: {
        width: 25,
        height: 25,
        // flexWrap:"wrap",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25 / 2,
        backgroundColor: "#EAA304",
        borderColor: '#EAA304',
        borderWidth: 3,
        marginLeft: wp('5')
    },

    applicableTextStyle: {
        marginLeft: wp('4'),
        fontFamily: 'Proxima Nova',
        fontSize: wp('3'),
        color: '#3955CB',
        marginTop: hp('0.7'),
    },

    applyDeleteMainContainer: {
        flex: 1,
        marginTop: hp('2'),
        flexDirection: 'row',
    },

    applyImgContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    applyImgStyle: {
        marginLeft: wp('10'),
        height: hp('3'),
        width: wp('4'),
    },

    applyTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    applyTextStyle: {
        fontFamily: 'Proxima Nova',
        color: '#2FC36E',
        fontWeight: 'bold',
        marginLeft: wp('-1'),
    },

    deleteImgContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: wp('7')
    },

    deleteImgStyle: {
        height: hp('3'),
        width: wp('4'),
    },

    deleteTextContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    deleteTextStyle: {
        fontFamily: 'Proxima Nova',
        color: '#E23333',
        fontWeight: 'bold',
        marginLeft: wp('-4'),
    },





})
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput,AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Dash from 'react-native-dash';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';

import Database from './../../utility/Database'
import { connect } from 'react-redux'
const db = new Database();


const data = [{
    value: 'Box',
}, {
    value: 'Unit',
},
];



export class EditInlineOnDataCollectionStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            box: '', unit: '', freeBox: '', freeUnit: '', boxRate: '', unitRate: '', grossAmount: '', discountRs: '', discountPer: '', totalAmount: '',
            applyScemes: '', selectedDiscount: '', selectedRatePer: '', ptr: '', bpc: '', amount: '',
            previewData: [],
            ratePerArr: [],
            discountArr: [{ "id": "1", "name": "Rate" }, { "id": "2", "name": "Net" }, { "id": "2", "name": "Percent" }],
            enteredDiscount: '',
            from_date: '', to_date: '', unitLable: '', boxLable: '', editableunit: true, editablebox: true, backgroundbox: '#ffffff', backgroundunit: '#ffffff',
            entity_type: '1', Collection_type: '1', userid: '52362', editRateFlagDb: '', editableRate: true, enteredRate: '', userLatitude: '',
            userLongitude: '',
            isOrderIdExists: [],
            isOrderIdExistsnew: [],
            // isOrderIdExistsnew :[],
            hasMapPermission: '', order_id: '', item_id: '', detail_order_id: '', master_order_id: ''


        };
    }

    componentDidMount = () => {
        //console.log("in.. ComponentDidMount........");
        this.props.navigation.addListener("didBlur", () => {
            // user has navigated away from this screen
        });
    }

    componentWillMount() {
        //console.log('subcategoryRajanididMaunt', this.state.subcategory);
        this._componentFocused();
        this._sub = this.props.navigation.addListener(
            'didFocus',
            this._componentFocused
        );
    }
    _componentFocused = () => {

        db.getUOMLable().then((data) => { //[{"Value":"CS/BTL"}]
            var prod = []
            for (var i = 0; i < data.length; i++) {
                //console.log("aaaa++++++++=", data[i].Value.split('/'))
                this.state.boxLable = data[i].Value.split('/')[0]
                this.state.unitLable = data[i].Value.split('/')[1]
                this.setState({ boxLable: data[i].Value.split('/')[0] })
                this.setState({ unitLable: data[i].Value.split('/')[1] })
                prod.push(data[i].Value.split('/')[0])
                prod.push(data[i].Value.split('/')[1])
            }
            //console.log("wwwwwwwww=", JSON.stringify(prod))
            for (var i = 0; i < prod.length; i++) {
                this.state.ratePerArr.push({ name: prod[i] })

            }
            //
            if (this.state.boxLable.length == 0) {
                this.setState({ editablebox: false })

                this.setState({ backgroundbox: '#D2D2D2' })
            }

            if (this.state.unitLable.length == 0) {
                this.setState({ editableunit: false })
                this.setState({ backgroundunit: '#D2D2D2' })
            }

        })
        itemId = this.props.ItemId
        orderId = this.props.orderId
        itemName = this.props.itemName
        entity_id = this.props.outletId
        db.getOrdersFromDbIfPresentPreview(this.props.ItemId).then((data) => {
            //console.log("dbDatas=" + JSON.stringify(data))
            var item_ids = '';
            var rates = '';
            var bpcs = ''
            var order_ids
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
                    bpcs = item.bpc
                    order_ids = item.order_id
                })
                itemId = item_ids
                this.setState({
                    box: boxs,
                    unit: units,
                    enteredRate: rates,
                    bpc: bpcs,
                    amount: amounts,
                    freeBox: freeBoxs,
                    freeUnit: freeUnits,
                    from_date: fromDates,
                    orderId: order_ids,
                    item_id: item_ids
                })
            }
        })

    }

    
    onChangeEnteredBox= (input) => {
        this.setState({ box: input })
        this.state.box=input;
     //   this.calculateAmount()
          }

    onChangeEnteredUnit= (input) => {
        this.setState({ unit: input })
        this.state.unit=input;
      //  this.calculateAmount()
          }


          applyClickHandler(e) {
            //request location
            var quntity
            //getAmount=box,unit,ptr(pitem),Bpc(pitem)
            if (this.state.box || this.state.unit) {   //set if not to 0
                let boxLength = this.state.box.length
                let unitLength = this.state.unit.length
                //console.log("lennnnnnnnnnnnnn=", unitLength)
                let freeBoxLength = this.state.freeBox.length
                let freeUnitLength = this.state.freeUnit.length
                let bpcLength = this.state.bpc.length
                let ptrLength = this.state.ptr.length
                let userLatLength = this.state.userLatitude.length
                let userLongLength = this.state.userLongitude.length
                let enteredRateLenght=this.state.enteredRate.length              
               
                if (boxLength == '0') {
                    this.state.box = '0'
                }
                if (unitLength == '0') {
                    //console.log("lennnnnnnnnnnnnn= inn", unitLength)
                    this.state.unit = '0'
                }
                if (freeBoxLength == 0) {
                    this.state.freeBox = '0'
                }
                if (freeUnitLength == 0) {
                    this.state.freeUnit = '0'
                }
                if (bpcLength == 0) {
                    this.state.bpc = '0'
                }
                if (ptrLength == 0) {
                    this.state.ptr = '0'
                }
                if (userLatLength == 0) {
                    this.state.userLatitude = '0'
                }
                if (userLongLength == 0) {
                    this.state.userLongitude = '0'
                }
                if (enteredRateLenght == 0) {
                    this.state.enteredRate = '0'
                }      
    
                ///////////////////////////////////on apply edited order should be updated in order detail table///////////////////
                 db.updateTABLE_TEMP_ORDER_DETAILS(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, this.state.from_date, "", this.state.amount, this.state.enteredRate, 'true', orderId, this.state.item_id)
                  this.props.ParentCalled(this.state.amount)
               this.props.setamount(this.state.amount)
            } else {
                alert("Please Enter the any of Box and Unit")
            }
           
    
        }
        deleteClickHandler(e) {
            let { totalOrderValue } = this.props.createOrder;
         //   db.deleteRowItem(app_order_id, this.props.ItemId)
                 itemId = this.props.ItemId
            orderId = this.props.orderId
            itemName = this.props.itemName
            entity_id = this.props.outletId  
    
            db.getInsertedsTempOrder(this.props.orderId).then((data) => {
    
    if(data.length==1){
        db.deleteRowItem(orderId,this.props.ItemId)  
     
         totalOrderValue--
            this.props.orderValue(totalOrderValue)   
            this.props.refresh(orderId, this.props.ItemId)
        Actions.DataCollectionStep3()
    
    }else{
        db.deleteRowItem(orderId,this.props.ItemId)
         totalOrderValue--
            this.props.orderValue(totalOrderValue)   
        this.props.refresh(orderId, this.props.ItemId)
       
    }
    
            })
        
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

                    <View style={styles.boxMainContainer}>
                        <Text style={styles.boxTextStyle}>
                        {this.state.boxLable}
                    </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={[styles.boxTextBoxStyle,{backgroundColor: this.state.backgroundbox}]}
                            value={this.state.box}
                            editable={this.state.editablebox} 
                            onChangeText={input => this.onChangeEnteredBox(input)} 
                        />
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.boxTextBoxStyle}
                            value={this.state.freeBox}
                            onChangeText={(freeBox) => this.setState({ freeBox })}
                        />
                    </View>

                    <View style={styles.unitMainContainer}>
                        <Text style={styles.unitTextStyle}>
                        {this.state.unitLable}
                    </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={[styles.unitTextBoxStyle,{backgroundColor: this.state.backgroundunit}]}
                            //style={styles.unitTextBoxStyle}
                            value={this.state.freeUnit}
                            editable={this.state.editableunit}
                            onChangeText={input => this.onChangeEnteredUnit(input)} 
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


                {/* </ScrollView> */}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
        datacollection:state.datacollection,
    };
};

const mapDispatchToProps = dispatch => ({
    

})
export default connect(mapStateToProps, mapDispatchToProps)(EditInlineOnDataCollectionStep3)


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

    boxMainContainer: {
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
        padding:5
    },

    unitMainContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    unitTextStyle: {
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('7'),
        fontWeight: 'bold',
    },

    unitTextBoxStyle: {
        height: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginLeft: wp('-5'),
        marginRight: wp('10'),
        marginTop: hp('1'),
        textAlign: 'center',
        padding:5
    },

    rateMainContainer: {
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

    rateDropContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    //   ratedropdownTextStyle: { 
    //       backgroundColor: '#fff', 
    //       fontSize: wp('3'), 
    //       color:'black', 
    //   },

    //   rateDropTextStyle: { 
    //       fontSize: wp('3'), 
    //     //   color:'gunmetal', 
    //       alignSelf: 'flex-start',
    //       marginLeft: wp('3'),
    //   },

    //   rateDropDownStyle: { 
    //       flex: 1, 
    //       width: wp('30'), 
    //       height:hp('11'), 
    //       marginVertical: 10, 
    //       borderWidth:wp('0.5'), 
    //       borderColor: '#E6DFDF', 
    //   },

    //   rateDropStyle: { 
    //       flex: 1, 
    //       width: wp('30'), 
    //       height:hp('5'), 
    //       backgroundColor: 'white', 
    //       justifyContent: 'center',
    //       marginLeft:wp('-6'),  
    //       borderColor: '#E6DFDF', 
    //       borderWidth: 1, 
    //       borderRadius:wp('1'),
    //   },

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
        marginRight: wp('3'),
        marginTop: hp('0'),
        textAlign: 'center',
        padding:5
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
        marginLeft: wp('3'),
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
        marginRight: wp('3'),
        marginTop: hp('1'),
        textAlign: 'center',
        padding:5
    },

    discountMainContainer: {
        flex: 0.5,
        flexDirection: 'row',
        marginTop: hp('2'),
    },

    discountColumContainer: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: wp('3'),
    },

    discountTextStyle: {
        marginTop: hp('1'),
        color: '#796A6A',
        fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginTop: hp('2'),
    },

    dropDownContainer: {
        borderColor: '#E6DFDF',
        borderRadius: wp('1'),
        width: wp('30'),
        height: hp('5.5'),
        marginTop: hp('0'),
        marginHorizontal: wp('1'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: hp('1'),
        alignSelf: 'center',
        flex: 1,
        marginVertical: 10,
        borderWidth: wp('0.5'),
        marginRight: wp('11'),
        borderWidth: hp('0.15'),
    },

    discountDropDownContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    dropDownContainerDiscount: {
        flex: 1,
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderRadius: wp('1'),
        height: hp('5.5'),
        marginTop: hp('0'),
        marginHorizontal: wp('1'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: hp('1'),
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: wp('0.5'),
        marginRight: wp('12'),
        borderWidth: hp('0.15'),
    },

    //   discountDropDownTextStyle: {
    //       backgroundColor: '#fff', 
    //       fontSize: wp('3'), 
    //       color:'black',
    //   },

    //   discountDroTextStyle: { 
    //       fontSize: wp('3'), 
    //     //   color:'gunmetal', 
    //       alignSelf: 'flex-start', 
    //       marginLeft: wp('3'), 
    //   },

    //   discountDropDownStyle: { 
    //       flex: 1, 
    //       width: wp('30'), 
    //       height:hp('11'),
    //        marginVertical: 10, 
    //        borderWidth:wp('0.5'), 
    //        borderColor: '#E6DFDF', 
    //   },

    //   discountDropStyle: { 
    //       flex: 1, 
    //       width: wp('30'), 
    //       height:hp('5'), 
    //       backgroundColor: 'white', 
    //       justifyContent: 'center',
    //       marginLeft:wp('-6'),  
    //       borderColor: '#E6DFDF', 
    //       borderWidth: 1, 
    //       borderRadius:wp('1'),
    //   },

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
        marginRight: wp('3'),
        marginTop: hp('0'),
        textAlign: 'center',
        padding:5
    },

    totalAmntMainContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('3')
    },

    totalAmntColContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    totalAmntTextStyle: {
        color: '#362828',
        fontSize: RFValue(14),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginLeft: wp('1')
    },

    actualAmntColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    actualAmntTextStyle: {
        color: '#362828',
        fontSize: RFValue(14),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginRight: wp('5'),
    },


    applicableMainContainer: {
        flex: 1,
        marginTop: hp('2'),
        alignItems: 'flex-start',
        flexDirection: 'row',
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
        marginLeft: wp('13'),
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
        marginLeft: wp('1'),
    },

    deleteImgContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: wp('8'),
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
        marginLeft: wp('-3'),
    },

    //   historyText: {
    //       color: '#3955CB', 
    //       fontSize: wp('3%'), 
    //       fontWeight: 'bold', 
    //       marginTop: hp('3%'), 
    //       fontFamily: 'Proxima Nova', 
    //       marginRight: wp('9%'),
    //   },





})
import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, AsyncStorage,TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Dash from 'react-native-dash';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';
import Geolocation from 'react-native-geolocation-service';
import { TOTAL_DATA_COLLECTED} from '../../Redux/actions/DataCollectionAction'
import Database from './../../utility/Database'
import { connect } from 'react-redux'
const db = new Database();
const data = [{
    value: 'Box',
    }, {
    value: 'Unit',
    }, 
];

const labels = [
    {
        name:'Box',
    },
    {
        name:'Carton',
    },
    {
        name:'Bottles',
    },
    {
        name:'Promo Pack',
    },
]

var app_order_id = '';
let itemId
let orderId
let itemName
let entity_id

export  class EditInLineDataCollectionPreview extends Component {
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
            entity_type: '1',  userid: '52362', editRateFlagDb: '', editableRate: true, enteredRate: '', userLatitude: '',
            userLongitude: '',
            isOrderIdExists: [],
            isOrderIdExistsnew: [],
            // isOrderIdExistsnew :[],
            hasMapPermission: '',radioValueDCs:'', 

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
        db.getOrdersFromDbIfPresentPreviewDC(this.props.ItemId,this.props.datacollection.collectiontype).then((data) => {
            //console.log("dbDatas=++++++++++++++++++" + JSON.stringify(data))
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
                 db.updateTABLE_TEMP_ORDER_DETAILSDC(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, this.state.from_date, "", this.state.amount, this.state.enteredRate, 'true', orderId, this.state.item_id)
                  this.props.ParentCalled(this.state.amount)
               this.props.setamount(this.state.amount)
            } else {
                alert("Please Enter the any of Box and Unit")
            }
           
    
        }
        deleteClickHandler(e) {
            let {dataCollected} = this.props.datacollection
                 itemId = this.props.ItemId
            orderId = this.props.orderId
            itemName = this.props.itemName
            entity_id = this.props.outletId  
    
            db.getInsertedsTempOrder(this.props.orderId).then((data) => {
    
    if(data.length==1){
        db.deleteRowItemDC(orderId,this.props.ItemId,this.props.datacollection.collectiontype)  
     
        dataCollected--
         this.props.collectedData(dataCollected) 
          this.props.refresh(orderId, this.props.ItemId)
        Actions.DataCollectionStep2()
    
    }else{
        db.deleteRowItemDC(orderId,this.props.ItemId,this.props.datacollection.collectiontype)
        dataCollected--
         this.props.collectedData(dataCollected)
        this.props.refresh(orderId, this.props.ItemId)
       
    }
    
            })
        
        }
    



    render() {
        const { navigation } = this.props;
         if( this.props.datacollection.radiovalue ==  0 )
        {
        return (
       
        <View style={styles.container}> 
        {/* <ScrollView
                 showsVerticalScrollIndicator={false}
              > */}
            <View style={styles.oredrFreeMainContainer}>
                <View style= {styles.orderFreeColumnContainer}>
                    <Text style={styles.orderTextStyle}>
                        Sale
                    </Text>
                    {/* <Text style={styles.freeTextStyle}>
                        Free
                    </Text> */}
                </View>

                <View style= {styles.boxColumnContainer}>
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
                        {/* <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.boxTextBoxStyle}
                            value={this.state.freeBox}
                            onChangeText={(freeBox) => this.setState({ freeBox })}
                        /> */}
                </View>

                <View style= {styles.unitColumContainer}>
                    <Text style={styles.unitTextStyle}>
                    {this.state.unitLable}
                    </Text>
                    <TextInput
                        keyboardType= "numeric"
                        placeholder="0"
                        style={[styles.unitTextBoxStyle,{backgroundColor: this.state.backgroundunit}]}
                            value={this.state.unit}
                            editable={this.state.editableunit}
                            onChangeText={input => this.onChangeEnteredUnit(input)} 
                    />
                    {/* <TextInput
                        keyboardType= "numeric"
                        placeholder="0"
                        style={styles.unitTextBoxStyle}
                        value={this.state.freeUnit}                           
                        onChangeText={(freeUnit) => this.setState({ freeUnit })}
                    /> */}
                </View>
            </View>

            {/* Dash Line */}
            {/* <View style={styles.dashLineContainer}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
            </View> */}

            {/* <View style= {styles.totalAmntMainContainer}>
                <View style= {styles.totalAmntColContainer}>
                    <Text  style = {styles.totalAmntTextStyle}>
                        Total Amount (INR)
                    </Text>
                </View>

                <View style= {styles.actualAmntColContainer}>
                    <Text  style = {styles.actualAmntTextStyle}>
                        00,00
                    </Text>
                </View>
            </View> */}

              {/* Dash Line */}
            <View style={styles.dashLineContainer}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
            </View>
            <View style={styles.applyDeleteMainContainer}>
                {/* <View style={styles.applyImgContainer}>
                    <Image style={styles.applyImgStyle} 
                                source={require('../../assets/Icons/apply_green.png')}
                    /> 
                </View>
                <TouchableOpacity style={styles.applyTextContainer}  onPress={(e) => this.applyClickHandler(e)}>
                    <Text style={styles.applyTextStyle}> 
                        APPLY 
                    </Text>
                </TouchableOpacity> */}
               
                {/* <View style={styles.deleteImgContainer}>
                    <Image style={styles.deleteImgStyle} 
                                source={require('../../assets/Icons/delete_red.png')}
                    /> 
                </View>
                <TouchableOpacity style={styles.deleteTextContainer} onPress={(e) => this.deleteClickHandler(e)}>
                    <Text style={styles.deleteTextStyle}> 
                        DELETE
                    </Text>
                </TouchableOpacity> */}


<View style={styles.applyMainContainer}> 
                    <TouchableOpacity  onPress={(e) => this.applyClickHandler(e)}>
                        <View style={styles.applyContainer} >
                            <View style={styles.applyImgContainer}>
                                <Image style={styles.applyImgStyle} 
                                            source={require('../../assets/Icons/apply_green.png')}
                                /> 
                            </View>
                    
                            <View style={styles.applyTextContainer}>
                                <Text style={styles.applyTextStyle}> 
                                    APPLY 
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
               
                <View style={styles.deleteMainContainer}>
                    <TouchableOpacity onPress={(e) => this.deleteClickHandler(e)}>
                        <View  style={styles.deleteContainer}>
                            <View style={styles.deleteImgContainer}>
                                <Image style={styles.deleteImgStyle} 
                                            source={require('../../assets/Icons/delete_red.png')}
                                /> 
                            </View>
                            <View style={styles.deleteTextContainer}>
                                <Text style={styles.deleteTextStyle}> 
                                    DELETE
                                </Text>
                            </View>
                        </View> 
                    </TouchableOpacity>
                </View>

            </View>

    

            {/* Dash Line */}
            <View style={styles.dashLineContainer}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
            </View> 

        {/* </ScrollView> */}
        </View>
        );
    }
    else if( this.props.datacollection.radiovalue == 1 ){
        return (
            <View style={styles.containerStock}> 
              
                {/* {
                    labels.map((item, index) => ( */}
                    <View style={styles.innerContainerStock}>
                        <View style={styles.dropOuterMainContainerStock}>
                        <Text style={styles.labelNameStyle}>
                            {this.state.boxLable} &nbsp; : 
                        </Text>
                        </View>
                        <View style={styles.textInputMainContainerStock}>
                            <TextInput
                                 keyboardType= "numeric"
                                 placeholder="0"
                                 autoFocus = "true"
                                 style={styles.rateTextBoxStyleStock}
                                 value={this.state.box}
                                 editable={this.state.editablebox} 
                                 onChangeText={input => this.onChangeEnteredBox(input)} 
                            />
                        </View>
                    </View>


                    <View style={styles.innerContainerStock}>
                        <View style={styles.dropOuterMainContainerStock}>
                        <Text style={styles.labelNameStyle}>
                        {this.state.unitLable} &nbsp; : 
                        </Text>
                        </View>
                        <View style={styles.textInputMainContainerStock}>
                            <TextInput
                                  keyboardType= "numeric"
                                  placeholder="0"                          
                                  style={styles.rateTextBoxStyleStock}
                                  value={this.state.unit}
                            
                              editable={this.state.editableunit} 
                              // onChangeText={(unit) => this.setState({ unit })}
                              onChangeText={input => this.onChangeEnteredUnit(input)}
        
                            />
                        </View>
                    </View>
                    {/* )) */}
                {/* } */}

           
            <View style={styles.dashLineContainerStock}>
                  <Dash style={styles.dashLineStyleStock}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
            </View>

          
          
             
           
           
            <View style={styles.applyDeleteMainContainer}>
                {/* <View style={styles.applyImgContainer}>
                    <Image style={styles.applyImgStyle} 
                                source={require('../../assets/Icons/apply_green.png')}
                    /> 
                </View>
                <TouchableOpacity style={styles.applyTextContainer}  onPress={(e) => this.applyClickHandler(e)}>
                    <Text style={styles.applyTextStyle}> 
                        APPLY 
                    </Text>
                </TouchableOpacity> */}
               
                {/* <View style={styles.deleteImgContainer}>
                    <Image style={styles.deleteImgStyle} 
                                source={require('../../assets/Icons/delete_red.png')}
                    /> 
                </View>
                <TouchableOpacity style={styles.deleteTextContainer} onPress={(e) => this.deleteClickHandler(e)}>
                    <Text style={styles.deleteTextStyle}> 
                        DELETE
                    </Text>
                </TouchableOpacity> */}


<View style={styles.applyMainContainer}> 
                    <TouchableOpacity  onPress={(e) => this.applyClickHandler(e)}>
                        <View style={styles.applyContainer} >
                            <View style={styles.applyImgContainer}>
                                <Image style={styles.applyImgStyle} 
                                            source={require('../../assets/Icons/apply_green.png')}
                                /> 
                            </View>
                    
                            <View style={styles.applyTextContainer}>
                                <Text style={styles.applyTextStyle}> 
                                    APPLY 
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
               
                <View style={styles.deleteMainContainer}>
                    <TouchableOpacity onPress={(e) => this.deleteClickHandler(e)}>
                        <View  style={styles.deleteContainer}>
                            <View style={styles.deleteImgContainer}>
                                <Image style={styles.deleteImgStyle} 
                                            source={require('../../assets/Icons/delete_red.png')}
                                /> 
                            </View>
                            <View style={styles.deleteTextContainer}>
                                <Text style={styles.deleteTextStyle}> 
                                    DELETE
                                </Text>
                            </View>
                        </View> 
                    </TouchableOpacity>
                </View>

            </View>

                      <View style={styles.dashLineContainer2Stock}>
                  <Dash style={styles.dashLineStyle2Stock}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
            </View> 
            

        </View>
        
        );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      dashboard: state.dashboard,
      datacollection:state.datacollection,
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    collectedData: (collecteddata) => {
        dispatch(TOTAL_DATA_COLLECTED(collecteddata));     
      }
  
  })
  export default connect(mapStateToProps, mapDispatchToProps)(EditInLineDataCollectionPreview)
  
  const styles = StyleSheet.create({

    container: {
        flex:1,
    },

    oredrFreeMainContainer: { 
        flex:1, 
        flexDirection:'row', 
    },

    orderFreeColumnContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems:'flex-start', 
        marginHorizontal:wp('3')
    },

    orderTextStyle: { 
        marginTop:hp('5'), 
        color: '#796A6A', 
        fontSize: wp('3%'), 
        fontFamily: 'Proxima Nova', 
    },

    freeTextStyle: { 
        marginTop:hp('1'), 
        color: '#796A6A', 
        fontSize: wp('3%'), 
        fontFamily: 'Proxima Nova',
        marginTop:hp('4')
    },

    boxColumnContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems:'flex-start', 
    },

    boxTextStyle: { 
        color: '#796A6A', 
        fontSize: wp('3%'), 
        fontFamily: 'Proxima Nova',
        marginHorizontal:wp('2'), 
        fontWeight: 'bold',
    },

    boxTextBoxStyle: {
        height: hp('5.5'), 
        width:wp('30'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('1'),
        backgroundColor: '#ffffff',
        marginLeft:wp('-10'), 
        marginRight:wp('10'),  
        marginTop:hp('1'),
        textAlign: 'center',
        padding:5
    },

    unitColumContainer: { 
        flex:0.5, 
        flexDirection:'column', 
    },

    unitTextStyle: { 
        color: '#796A6A', 
        fontSize: wp('3%'), 
        fontFamily: 'Proxima Nova', 
        marginHorizontal:wp('9'),
        fontWeight: 'bold',  
    },

    unitTextBoxStyle: { 
        height: hp('5.5'), 
        width:wp('30'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('1'),
        backgroundColor: '#ffffff', 
        marginLeft:wp('-3'), 
        marginRight:wp('10'),   
        marginTop:hp('1'), 
        textAlign: 'center',
        padding:5
    },

    dashLineContainer: {
        flex:1, 
        marginTop:hp('3'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('89'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },


    totalAmntMainContainer: { 
        flex:1, 
        flexDirection:'row', 
        marginTop: hp('3') 
    },

    totalAmntColContainer:{ 
        flex:0.5, 
        flexDirection:'column', 
    },

    totalAmntTextStyle:{ 
        color:'#362828', 
        fontSize:RFValue(14), 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('2') 
    },

    actualAmntColContainer:{ 
        flex:0.5, 
        flexDirection:'column', 
        alignItems:'flex-end',
    },

    actualAmntTextStyle:{  
        color:'#362828', 
        fontSize:RFValue(14), 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        // marginLeft: wp('1')
        marginRight: wp('3'),
    },

    applyDeleteMainContainer: { 
        flex:1, 
        marginTop:hp('2'), 
        flexDirection: 'row', 
        marginBottom: hp('1'),
       
   },

   applyMainContainer: {
     flex:0.7, 
     justifyContent:'flex-start', 
     marginLeft:wp('9'),
     
    },

    applyContainer: { 
        flex:1, 
        flexDirection:'row', 
    },

  applyImgContainer: {
      flexDirection: 'column', 
      alignItems:'flex-start',
      justifyContent:'center',
  },

  applyImgStyle: { 
      height:hp('3'), 
      width:wp('4'),
  },

  applyTextContainer: {
    flexDirection: 'column', 
    alignItems:'flex-start',
    justifyContent:'center', 
    marginLeft: wp('4'),
},


  applyTextStyle: { 
      fontFamily: 'Proxima Nova',
      color:'#2FC36E', 
      fontWeight:'bold', 
      fontSize:12, 
            fontFamily: 'Proxima Nova',
  },

   deleteMainContainer:{
     flex:0.5, 
     justifyContent:'flex-end',
    },

    deleteContainer: { 
        flex:1, 
        flexDirection:'row',  
        alignItems:'flex-end',
    },

  deleteImgContainer: {
      flexDirection: 'column', 
      alignItems:'flex-end', 
      justifyContent:'center',
  },

  deleteImgStyle: {  
      height:hp('3'), 
      width:wp('4'),
  },

  deleteTextContainer: {
      flexDirection: 'column',
      justifyContent:'center',
      marginLeft: wp('4'),
  },

  deleteTextStyle: { 
      fontFamily: 'Proxima Nova',
      color:'#E23333', 
      fontWeight:'bold',
      fontSize:12, 
            fontFamily: 'Proxima Nova',   marginTop:hp('-2.6'),
  },

    containerStock: {
        flex:1,
    },

    innerContainerStock: {
        flex:1, 
        flexDirection: 'row', 
        marginLeft: wp('3'),
    },

    dropOuterMainContainerStock : {
        flex:0.5, 
        flexDirection: 'column', 
        alignItems:'flex-start',
        marginLeft: wp('4')
    },

    labelNameStyle: {  
        color:'#796A6A', 
        fontSize:RFValue(18), 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        justifyContent:'center',
    },

    textInputMainContainerStock:{
        flex:0.5, 
        flexDirection: 'column', 
        alignItems:'flex-end',
         marginBottom: hp('1'),
    },

    rateTextBoxStyleStock: { 
        height: hp('6'), 
        width:wp('38'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('1'),
        backgroundColor: '#ffffff',
        marginRight:wp('-2'),
        marginTop:hp('0'), 
        textAlign: 'center',
        marginRight: wp('6'),
        padding:5
    },

    dashLineContainerStock: {
        flex:1, 
        marginTop:hp('1'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyleStock: {
        width:wp('85'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    dashLineContainer2Stock: {
        flex:1, 
        marginTop:hp('4'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle2Stock: {
        width:wp('89'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    remarkMainContainerStock: {
        marginTop: hp('1'), 
        marginLeft: wp('1')
    },

    remarkTextStyleStock: {
        color:'#796A6A', 
        fontSize:RFValue(13), 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('3'),
    },

    remarkTextInputMainContainerStock:{
        marginTop: hp('1'), 
        alignItems:'center', 
        justifyContent: 'center', 
    },

    remarkTextInputStyleStock: { 
        height: hp('13'),
        width:wp('80'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('2') , 
        backgroundColor: '#ffffff',
        padding:5,
        marginBottom: hp('2')
    },




})
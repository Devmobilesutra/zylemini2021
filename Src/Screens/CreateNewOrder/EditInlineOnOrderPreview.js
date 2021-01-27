import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import ModalDropdown from 'react-native-modal-dropdown';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import { Actions } from 'react-native-router-flux';
import { TOTAL_ORDER_VALUE } from '../../Redux/actions/CreateOrderAction'
import { InputAutoSuggest } from 'react-native-autocomplete-search';

const db = new Database();

var app_order_id = '';
let itemId
let orderId
let itemName
let entity_id
export class EditInlineOnOrderPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            box: 0, unit: 0, freeBox: 0, freeUnit: 0, boxRate: '', unitRate: '', grossAmount: '', discountRs: '', discountPer: '', totalAmount: '',
            applyScemes: '', selectedDiscount: '', selectedRatePer: '', ptr: 0, bpc: 0, amount: '',
            previewData: [],
            ratePerArr: [],
            discountArr: [{ "id": "1", "name": "Rate" }, { "id": "2", "name": "Net" }, { "id": "2", "name": "Percent" }],
            enteredDiscount: '',
            from_date: '', to_date: '', unitLable: '', boxLable: '', editableunit: true, editablebox: true, backgroundbox: '#ffffff', backgroundunit: '#ffffff',
            entity_type: '1', Collection_type: '0', userid: '52362', editRateFlagDb: '', editableRate: true, enteredRate: '', userLatitude: '',
            userLongitude: '',
            isOrderIdExists: [],
            isOrderIdExistsnew: [],
            // isOrderIdExistsnew :[],
            hasMapPermission: '', order_id: '', item_id: '', detail_order_id: '', master_order_id: ''

        };
    }


    componentDidMount = () => {

        this.props.navigation.addListener("didBlur", () => {

        });
    }

    componentWillMount() {

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
                this.state.boxLable = data[i].Value.split('/')[0]
                this.state.unitLable = data[i].Value.split('/')[1]
                this.setState({ boxLable: data[i].Value.split('/')[0] })
                this.setState({ unitLable: data[i].Value.split('/')[1] })
                prod.push(data[i].Value.split('/')[0])
                prod.push(data[i].Value.split('/')[1])
            }
            for (var i = 0; i < prod.length; i++) {
                this.state.ratePerArr.push({ name: prod[i] })
            }
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
        db.getItemDiscountFromDb(this.props.outletId, this.props.orderId, this.props.ItemId).then((data) => {

            var Rate = '', selectedDiscount = '', OnAmount
            if (data) {
                data.map((item, i) => {
                    selectedDiscount = item.RNP
                    Rate = item.Rate
                    OnAmount = item.OnAmount
                })
            }
            this.setState({ selectedDiscount: selectedDiscount })
            if (selectedDiscount == "Rate") {
                this.state.enteredDiscount = Rate
                this.setState({ enteredDiscount: Rate })
            }
            else {
                this.state.enteredDiscount = OnAmount
                this.setState({ enteredDiscount: OnAmount })
            }
        })
        db.geteditRateFlag().then((data) => {
            var prod = []
            prod = data
            var a = prod.map(function (el) {
                return el.Value;
            });
            this.state.editRateFlagDb = a[0]

            if (this.state.editRateFlagDb == "TRUE") {
                this.setState({ editableRate: true })

            } else if (this.state.editRateFlagDb == "FALSE") {
                this.setState({ editableRate: false })
                this.state.enteredRate = this.props.ptr
                this.setState({ enteredRate: this.props.ptr })

            }
        })


    }
    onChangeEnteredDiscount = (value) => {
        //alert(value)
        this.setState({ enteredDiscount: value })

    }
    _renderRatePer() {
        const beat = []
        for (var i = 0; i < this.state.ratePerArr.length; i++) {
            beat.push({
                value: this.state.ratePerArr[i].name
            })
        }

        return (
            <Dropdown
                placeholder="Select"
                itemCount={2}
                fontSize={11}
                containerStyle={styles.dropDownContainer}
                pickerStyle={{ width: wp('30') }}                        //28-03
                rippleCentered={true}
                itemColor='#ADA2A2'
                dropdownPosition={-2}
                dropdownOffset={{ top: 14, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                value={this.state.selectedRatePer}
                rippleOpacity={0}
                data={beat}
                onChangeText={(value) => { this.onSelectedRatePer(value) }}

            />
        )
    }
    onSelectedRatePer = (val) => {
        this.setState({ selectedRatePer: val })
        this.calculateAmount();
    }

    _renderDiscount() {
        const beat = []
        for (var i = 0; i < this.state.discountArr.length; i++) {
            beat.push({
                value: this.state.discountArr[i].name
            })
        }

        return (
            <Dropdown
                placeholder="Select"
                itemCount={2}
                containerStyle={styles.dropDownContainer}
                pickerStyle={{ width: wp('30') }}                        //28-03
                rippleCentered={true}
                itemColor='#ADA2A2'
                fontSize={11}
                inputContainerStyle={{ borderBottomColor: 'transparent',
                textAlign:'center',
                padding:0,}}

                dropdownPosition={-2}
                dropdownOffset={{ top: 14, left: 18, }}
                rippleOpacity={0}
                value={this.state.selectedDiscount}
                data={beat}
                onChangeText={(value) => { this.onSelectedDiscount(value) }}

            />
        )
    }

    onSelectedDiscount = (value) => {
        //alert(value)
        this.setState({ selectedDiscount: value })
    }

    onChangeEnteredBox = (input) => {
        this.setState({ box: input })
        this.state.box = input;
        this.calculateAmount()
    }
    onChangeEnteredUnit = (input) => {
        this.setState({ unit: input })
        this.state.unit = input;
        this.calculateAmount()
    }
    onChangeEnteredRate = (input) => {
        this.setState({ enteredRate: input })
        this.state.enteredRate = input
        this.calculateAmountWithAlert()
    }


    calculateAmount() {

        if (this.state.editRateFlagDb == "TRUE") {
            //console.log("if editRateFlagDb true.......")
            //get rate as ptr
            // if (this.state.enteredRate) {
            //     //console.log("if entered rate is true.......")
            //     this.state.ptr = this.state.enteredRate
            //     var perbottle=0   ,quntity=0           
            //     perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                            
            //    quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);
            //     //console.log("adding quntity=", quntity)
            //     var amounts = quntity * perbottle;
            //     amounts = Number(amounts.toFixed(2));
            //     //  alert(amounts)
            //     this.state.amount = amounts
            //     this.setState({ amount: amounts })
            //     //console.log("adding amount=", this.state.amount)
            // } else {
            //     //console.log("in else enteredRate.......")
            //     this.state.ptr == 0
            //     // this.setState({ amount: 0 })
            //     this.state.amount = 0.00
            //     //console.log("adding amount=", this.state.amount)
            // }

             //get rate as ptr by vibha
             if(this.state.selectedRatePer == 'CS'){
                if (this.state.enteredRate) {
                    console.log("if entered rate is true.......")
                    this.state.ptr = this.state.enteredRate
                    var perbottle=0   ,quntity=0    
                    perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                    console.log("adding perbottle=", perbottle)
                  //  quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                  if(this.state.unit){
                    if(this.state.box){
                     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                    }else{
                     quntity =  parseInt(this.state.unit);//get all bottle qty
                    }
                 }else if(this.state.box){
                 quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
                }
                  console.log("adding quntity=", quntity)
                    var amounts = quntity * perbottle;
                   
                    amounts=Number(amounts.toFixed(2));
                  
                    this.state.amount = amounts
                    this.setState({ amount: amounts })
                   
                } else {
                  
                    this.state.ptr == 0
                    this.setState({ amount: 0.00 })
                    this.state.amount = 0.00
                   
                }
            }else if(this.state.selectedRatePer == 'BTL'){
                if (this.state.enteredRate) {
                    console.log("if entered rate is true btl......."+this.state.enteredRate)
                    this.state.ptr = this.state.enteredRate
                    var perbottle=0   ,quntity=0    
                    // perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                    console.log("adding perbottle=", perbottle)
                 //   quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                  if(this.state.unit){
                if(this.state.box){
                 quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                }else{
                 quntity =  parseInt(this.state.unit);//get all bottle qty
                }
             }else if(this.state.box){
             quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
            }  
                 console.log("adding quntity=", quntity)
                //    var amounts = quntity * perbottle;
                    var amounts = quntity * this.state.enteredRate;
                    amounts=Number(amounts.toFixed(2));
                  //  alert(amounts)
                    this.state.amount = amounts
                    this.setState({ amount: amounts })
                    console.log("adding amount=", this.state.amount)
                } else {
                    console.log("in else enteredRate.......")
                    this.state.ptr == 0
                    // this.setState({ amount: 0 })
                    this.state.amount = 0.00
                    //console.log("adding amount=", this.state.amount)
                }

            }

        } else {
            //console.log("in else editRateFlagDb.......")
            //get ptr from table
            if (this.state.ptr == 0) {
                this.state.amount = 0.00
                //  this.setState({ amount: 0 })
            } else {
                //console.log("in else")
                this.setState({ enteredRate: this.state.ptr })
                this.setState({ editableRate: false })
                var perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                //console.log("adding perbottle=", perbottle)
                var quntity = (this.state.bpc * this.state.box) + this.state.unit;//get all bottle qty
                //console.log("adding quntity=", quntity)
                var amounts = quntity * perbottle;
                amounts = Number(amounts.toFixed(2));
                this.state.amount = amounts
                // this.setState({ amount: amounts })
                //console.log("adding amount=", this.state.amount)
            }
        }
    }

    calculateAmountWithAlert() {
        const { box, unit, ptr, bpc, amount } = this.state
        if (this.state.enteredRate.length) {
            if (this.state.box > 0 || this.state.unit > 0) {   //set if not to 0
                if (this.state.editRateFlagDb == "TRUE") {
                    //get rate as ptr
                    // if (this.state.enteredRate) {
                    //     //console.log("if entered rate is true.......")
                    //     this.state.ptr = this.state.enteredRate
                    //     var perbottle=0   ,quntity=0           
                    //     perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                            
                    //    quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);
                    //     //console.log("adding quntity=", quntity)
                    //     var amounts = quntity * perbottle;
                    //     amounts = Number(amounts.toFixed(2));
                    //     //alert(amounts)
                    //     this.state.amount = amounts
                    //     this.setState({ amount: amounts })

                    // } else {
                    //     //console.log("in else enteredRate.......")
                    //     this.state.ptr == 0
                    //     this.setState({ amount: 0.00 })
                    //     this.state.amount = 0.00
                    //     //console.log("adding amount=", this.state.amount)
                    // }


                     //get rate as ptr by vibha
                  if(this.state.selectedRatePer == 'CS'){
                    if (this.state.enteredRate) {
                        console.log("if entered rate is true.......")
                        this.state.ptr = this.state.enteredRate
                        var perbottle=0   ,quntity=0    
                        perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                        console.log("adding perbottle=", perbottle)
                      //  quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                      if(this.state.unit){
                        if(this.state.box){
                         quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                        }else{
                         quntity =  parseInt(this.state.unit);//get all bottle qty
                        }
                     }else if(this.state.box){
                     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
                    }
                      console.log("adding quntity=", quntity)
                        var amounts = quntity * perbottle;
                       
                        amounts=Number(amounts.toFixed(2));
                      
                        this.state.amount = amounts
                        this.setState({ amount: amounts })
                       
                    } else {
                      
                        this.state.ptr == 0
                        this.setState({ amount: 0.00 })
                        this.state.amount = 0.00
                       
                    }
                }else if(this.state.selectedRatePer == 'BTL'){
                    if (this.state.enteredRate) {
                        console.log("if entered rate is true btl......."+this.state.enteredRate)
                        this.state.ptr = this.state.enteredRate
                        var perbottle=0   ,quntity=0    
                        // perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                        console.log("adding perbottle=", perbottle)
                     //   quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                      if(this.state.unit){
                    if(this.state.box){
                     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                    }else{
                     quntity =  parseInt(this.state.unit);//get all bottle qty
                    }
                 }else if(this.state.box){
                 quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
                }  
                     console.log("adding quntity=", quntity)
                    //    var amounts = quntity * perbottle;
                        var amounts = quntity * this.state.enteredRate;
                        amounts=Number(amounts.toFixed(2));
                      //  alert(amounts)
                        this.state.amount = amounts
                        this.setState({ amount: amounts })
                        console.log("adding amount=", this.state.amount)
                    } else {
                        console.log("in else enteredRate.......")
                        this.state.ptr == 0
                        // this.setState({ amount: 0 })
                        this.state.amount = 0.00
                        //console.log("adding amount=", this.state.amount)
                    }

                }


                } else {

                    if (this.state.ptr == 0) {
                        this.state.amount = 0.00
                        this.setState({ amount: 0 })
                    } else {
                        //console.log("in else")
                        this.setState({ enteredRate: this.state.ptr })
                        this.setState({ editableRate: false })
                        var perbottle = (this.state.ptr / this.state.bpc); ///get per bottle rate                             
                        //console.log("adding perbottle=", perbottle)
                        var quntity = this.state.bpc * this.state.box + this.state.unit;//get all bottle qty
                        //console.log("adding quntity=", quntity)
                        var amounts = (quntity * perbottle);
                        amounts = Number(amounts.toFixed(2));
                        this.state.amount = amounts
                        this.setState({ amount: amounts })
                        //console.log("adding amount=", this.state.amount)
                    }
                }
            } else {
                alert("Please Enter the any of Box and Unit")
            }
        } else {
            this.setState({ amount: 0.00 })
            this.state.amount = 0.00
        }
    }

    applyClickHandler(e) {
        //request location
        var quntity

        if (this.state.box || this.state.unit) {   //set if not to 0
            let boxLength = this.state.box.length
            let unitLength = this.state.unit.length
            let freeBoxLength = this.state.freeBox.length
            let freeUnitLength = this.state.freeUnit.length
            let bpcLength = this.state.bpc.length
            let ptrLength = this.state.ptr.length
            let userLatLength = this.state.userLatitude.length
            let userLongLength = this.state.userLongitude.length
            let enteredRateLenght = this.state.enteredRate.length

            // let boxLength = this.state.box.length

            if (boxLength == '0') {
                this.state.box = 0
            }
            if (unitLength == '0') {
                //console.log("lennnnnnnnnnnnnn= inn", unitLength)
                this.state.unit = 0
            }
            if (freeBoxLength == 0) {
                this.state.freeBox = 0
            }
            if (freeUnitLength == 0) {
                this.state.freeUnit = 0
            }
            if (bpcLength == 0) {
                this.state.bpc = 0
            }
            if (ptrLength == 0) {
                this.state.ptr = 0
            }
            if (userLatLength == 0) {
                this.state.userLatitude = 0
            }
            if (userLongLength == 0) {
                this.state.userLongitude = 0
            }
            if (enteredRateLenght == 0) {
                this.state.enteredRate = 0
            }


            if (this.state.editRateFlagDb == "TRUE") {
                //console.log("if editRateFlagDb true.......")
                //get rate as ptr
                // if (this.state.enteredRate) {
                //     //console.log("if entered rate is true.......")
                //     this.state.ptr = this.state.enteredRate
                //     var perbottle=0   ,quntity=0           
                //      perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                            
                //     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);
                //     //console.log("adding quntity=", quntity)
                //     var amounts = quntity * perbottle;
                //     amounts = Number(amounts.toFixed(2));
                //     //  alert(amounts)
                //     this.state.amount = amounts
                //     this.setState({ amount: amounts })
                //     //console.log("adding amount=", this.state.amount)
                // } else {
                //     //console.log("in else enteredRate.......")
                //     this.state.ptr == 0
                //     // this.setState({ amount: 0 })
                //     this.state.amount = 0.00
                //     //console.log("adding amount=", this.state.amount)
                // }

                 //get rate as ptr by vibha
                 if(this.state.selectedRatePer == 'CS'){
                    if (this.state.enteredRate) {
                        console.log("if entered rate is true.......")
                        this.state.ptr = this.state.enteredRate
                        var perbottle=0   ,quntity=0    
                        perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                        console.log("adding perbottle=", perbottle)
                      //  quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                      if(this.state.unit){
                        if(this.state.box){
                         quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                        }else{
                         quntity =  parseInt(this.state.unit);//get all bottle qty
                        }
                     }else if(this.state.box){
                     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
                    }
                      console.log("adding quntity=", quntity)
                        var amounts = quntity * perbottle;
                       
                        amounts=Number(amounts.toFixed(2));
                      
                        this.state.amount = amounts
                        this.setState({ amount: amounts })
                       
                    } else {
                      
                        this.state.ptr == 0
                        this.setState({ amount: 0.00 })
                        this.state.amount = 0.00
                       
                    }
                }else if(this.state.selectedRatePer == 'BTL'){
                    if (this.state.enteredRate) {
                        console.log("if entered rate is true btl......."+this.state.enteredRate)
                        this.state.ptr = this.state.enteredRate
                        var perbottle=0   ,quntity=0    
                        // perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                        console.log("adding perbottle=", perbottle)
                     //   quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                      if(this.state.unit){
                    if(this.state.box){
                     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                    }else{
                     quntity =  parseInt(this.state.unit);//get all bottle qty
                    }
                 }else if(this.state.box){
                 quntity = (parseInt(this.state.bpc) * parseInt(this.state.box));//get all bottle qty
                }  
                     console.log("adding quntity=", quntity)
                    //    var amounts = quntity * perbottle;
                        var amounts = quntity * this.state.enteredRate;
                        amounts=Number(amounts.toFixed(2));
                      //  alert(amounts)
                        this.state.amount = amounts
                        this.setState({ amount: amounts })
                        console.log("adding amount=", this.state.amount)
                    } else {
                        console.log("in else enteredRate.......")
                        this.state.ptr == 0
                        // this.setState({ amount: 0 })
                        this.state.amount = 0.00
                        //console.log("adding amount=", this.state.amount)
                    }

                }

            } else {
                //console.log("in else editRateFlagDb.......")
                //get ptr from table
                if (this.state.ptr == 0) {
                    this.state.amount = 0.00
                    //  this.setState({ amount: 0 })
                } else {
                    //console.log("in else")
                    this.setState({ enteredRate: this.state.ptr })
                    this.setState({ editableRate: false })

                    var perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                    //console.log("adding perbottle=", perbottle)
                    var quntity = this.state.bpc * this.state.box + this.state.unit;//get all bottle qty
                    //console.log("adding quntity=", quntity)
                    var amounts = quntity * perbottle
                    amounts = Number(amounts.toFixed(2));
                    this.state.amount = amounts
                }
            }

            ///////////////////////////////////on apply edited order should be updated in order detail table///////////////////
          if(this.state.selectedRatePer){
            //  if(this.state.selectedDiscount){
                db.updateTABLE_TEMP_ORDER_DETAILS(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, this.state.from_date, "", this.state.amount, this.state.enteredRate, 'true', orderId, this.state.item_id)
                this.props.ParentCalled(this.state.amount)
                this.props.setamount(this.state.amount)

                if(this.state.selectedDiscount){
                    if (this.state.selectedDiscount == "Rate") {
                        db.updateTABLE_DISCOUNT(this.props.orderId, "cash", this.state.amount, "", "", this.state.selectedDiscount,
                            "", "", this.state.enteredDiscount, "", this.props.ItemId, "", "")
                    } else {
                        db.updateTABLE_DISCOUNT(this.props.orderId, "cash", this.state.amount, "", "", this.state.selectedDiscount,
                            this.state.enteredDiscount, "", "", "", this.props.ItemId, "", "")
            
                    }
                }
            //   }else{
            //     alert("Please Select Discount.")
            //   }
            
          }else{
            alert("Please Select Rate per.")
          }
        } else {
            alert("Please Enter the any of Box and Unit")
        }

       
    }
    deleteClickHandler(e) {
        let { totalOrderValue } = this.props.createOrder;
        itemId = this.props.ItemId
        orderId = this.props.orderId
        itemName = this.props.itemName
        entity_id = this.props.outletId

        db.getInsertedsTempOrder(this.props.orderId).then((data) => {

            if (data.length == 1) {
                db.deleteRowItem(orderId, this.props.ItemId)
                db.deleteDiscount(orderId, this.props.ItemId)
                totalOrderValue--
                this.props.orderValue(totalOrderValue)
                this.props.refresh(orderId, this.props.ItemId)
                Actions.CreateNewOrderSecond()

            } else {
                db.deleteRowItem(orderId, this.props.ItemId)
                db.deleteDiscount(orderId, this.props.ItemId)
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
                            autoFocus="true"
                            style={[styles.boxTextBoxStyle, { backgroundColor: this.state.backgroundbox }]}
                            //   style={styles.boxTextBoxStyle}
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

                            style={[styles.unitTextBoxStyle, { backgroundColor: this.state.backgroundunit }]}
                            value={this.state.unit}
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

                <View style={styles.rateMainContainer}>
                    <View style={styles.rateColumnContainer}>
                        <Text style={styles.rateTextStyle}>
                            Rate Per
                </Text>
                    </View>

                    <View style={styles.rateDropContainer}>
                        {this._renderRatePer()}
                    </View>

                    <View style={styles.rateTextBoxContainer}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.rateTextBoxStyle}
                            value={this.state.enteredRate}
                            editable={this.state.editableRate}
                            onChangeText={input => this.onChangeEnteredRate(input)}

                        />
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer2}>
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
                                style={styles.grossTextBoxStyle}      >
                                {this.state.amount}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.discountMainContainer}>
                    <View style={styles.discountColumContainer}>
                        <Text style={styles.discountTextStyle}>
                            Discount In
                </Text>
                    </View>

                    <View style={styles.discountDropDownContainer}>
                        {this._renderDiscount()}

                    </View>

                    <View style={styles.discountTextBoxContainer}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.discountTextBoxStyle}
                            value={this.state.enteredDiscount}
                            onChangeText={input => this.onChangeEnteredDiscount(input)}
                        />
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer2}>
                    <Dash style={styles.dashLineStyle}
                        dashLength={2}
                        dashColor='#ADA2A2'
                    />
                </View>

                <View style={styles.applicableMainContainer}>
                    <View style={styles.roundedtext}>

                    <Image style={{tintColor:"#EAA304"}}
                                        source={require('../../assets/Icons/Schemes_drawer.png')} />
                    </View>
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




                    <View style={styles.applyMainContainer}>
                        <TouchableOpacity onPress={(e) => this.applyClickHandler(e)}>
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
                            <View style={styles.deleteContainer}>
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
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createOrder: state.createOrder

    };
};

const mapDispatchToProps = dispatch => ({
    orderValue: (val) => {
        dispatch(TOTAL_ORDER_VALUE(val));

    },
})
export default connect(mapStateToProps, mapDispatchToProps)(EditInlineOnOrderPreview)

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
        marginHorizontal: wp('4')
    },

    orderTextStyle: {
        marginTop: hp('5'),
        color: '#796A6A',
     //   fontSize: wp('3%'), 
       fontSize:12,
        fontFamily: 'Proxima Nova',
    },

    freeTextStyle: {
        marginTop: hp('1'),
        color: '#796A6A',
      //  fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginTop: hp('4'),   fontSize:12,
    },

    dashLineContainer: {
        flex: 1,
        marginTop: hp('3'),
        alignContent: 'center',
        alignItems: 'center',
    },
    dashLineContainer2: {
        flex:1, 
        marginTop:hp('1'), 
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
    //    fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('2'),
        fontWeight: 'bold',   fontSize:12,
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
        padding: 5,fontSize:10
    },

    unitMainContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    unitTextStyle: {
        color: '#796A6A',
       // fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('7'),
        fontWeight: 'bold',   fontSize:12,
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
        padding: 5,fontSize:10
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
        marginHorizontal: wp('4'),
    },

    rateTextStyle: {
        marginTop: hp('2'),
        color: '#796A6A',
     //   fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',   fontSize:12,
    },

    rateDropContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        marginRight: wp('3'),
        marginTop: hp('0'),
        textAlign: 'center',
        padding: 5,fontSize:10
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
    //    fontSize: wp('3'),
        marginTop: hp('2'),
        marginLeft: wp('2'),
        fontFamily: 'Proxima Nova',padding:7,   fontSize:12,
    },

    grossTextBoxContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    grossTextBoxStyle: {
        height: hp('5.5'),
        lineHeight: hp('5.5'),
        width: wp('30'),
        borderColor: '#E6DFDF',
        borderWidth: 1,
        borderRadius: wp('1'),
        backgroundColor: '#ffffff',
        marginRight: wp('3'),
        marginTop: hp('1'),
        textAlign: 'center',fontSize:10
    
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
        marginHorizontal: wp('4'),
    },

    discountTextStyle: {
        marginTop: hp('1'),
        color: '#796A6A',
     //   fontSize: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginTop: hp('2'),   fontSize:12,
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
        borderWidth: hp('0.15'),   justifyContent:'center',alignContent:'center',alignSelf:'center',
        textAlign:'center',
        padding: 15,
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
        borderWidth: hp('0.15'),   justifyContent:'center',alignContent:'center',alignSelf:'center',
        textAlign:'center',
        padding: 15,
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
        marginRight: wp('3'),
        marginTop: hp('0'),
        textAlign: 'center',
        padding: 5,fontSize:10
    },

    applicableMainContainer: {
        flex:1, 
        marginTop:hp('2'), 
        alignItems:'flex-start', 
        flexDirection: 'row',
       
    },

    roundedtext: {
        width: 25,
        height: 25, 
                // flexWrap:"wrap",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:wp('-1'),
    
        marginLeft:wp('5')
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

    applyMainContainer: {
        flex: 0.6,
        justifyContent: 'flex-start',
        marginLeft: wp('12'),
    },

    applyContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    applyImgContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    applyImgStyle: {
        height: hp('3'),
        width: wp('4'),
    },

    applyTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: wp('4'),
    },

    applyTextStyle: {
        fontFamily: 'Proxima Nova',
        color: '#2FC36E',
        fontWeight: 'bold',
        // fontSize: RFValue(15),
        fontSize: wp('3'), 
        fontFamily: 'Proxima Nova',
    },

    deleteMainContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
    },

    deleteContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    deleteImgContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    deleteImgStyle: {
        height: hp('3'),
        width: wp('4'),
    },

    deleteTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: wp('4'),
    },

    deleteTextStyle: {
        fontFamily: 'Proxima Nova',
        color: '#E23333',
        fontWeight: 'bold',
        // fontSize: RFValue(15),
        fontSize: wp('3'), 
        
        marginTop:hp('-2.6'),
        fontFamily: 'Proxima Nova',
    },

})
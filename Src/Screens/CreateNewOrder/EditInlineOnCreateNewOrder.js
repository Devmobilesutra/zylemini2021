import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, AsyncStorage, ScrollView, TextInput, PermissionsAndroid, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';
import Database from './../../utility/Database'
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux'
import utilss from '../../utility/usableFunctions'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment';
import { TOTAL_ORDER_VALUE} from '../../Redux/actions/CreateOrderAction'
import { el } from 'date-fns/locale';
const utils = new utilss();
const db = new Database();
var Total_amount = 0;
let currentDateTime;
let len1
var itemId = ''
var itemName = ''
var detail_order_id = []
var app_order_id = '';
const oorderid = ''
var entity_id = ''
var orderIds=''


export class EditInlineOnCreateNewOrder extends Component {
    constructor(props) {
        super(props);

      

        this.state = { selection: {
            start: 0,
            end: 0
        },
            box: 0, unit: 0, freeBox: 0, freeUnit: 0, boxRate: '', unitRate: '', grossAmount: '', discountRs: '', discountPer: '', totalAmount: '',
            applyScemes: '', selectedDiscount: '', selectedRatePer: '', ptr: 0, bpc: 0, amount: '',
            ratePerArr: [],
            discountArr: [{ "id": "1", "name": "Rate" }, { "id": "2", "name": "Net" },{ "id": "2", "name": "Percent" }],
            entity_type: '1', Collection_type: '0', userid: '52362', editRateFlagDb: '', enteredRate: '', userLatitude: '',
            userLongitude: '',unitLable:'',boxLable:'',editableunit:true,editablebox:true,editableRate:true,backgroundbox:'#ffffff',backgroundunit:'#ffffff',
            enteredDiscount:0,
            isOrderIdExists: [],
            isOrderIdExistsnew: [],
           // box1:0,
            cs : 0, btl : 0,
            showWarning : false,
           
            hasMapPermission: '', order_id: '', detail_order_id: [], master_order_id: '', orderIdss: ''
        };
     
    }

componentWillMount(){
 
    this.requestFineLocation();
    AsyncStorage.getItem('userIds').then((keyValue) => {
    this.setState({ userid: JSON.parse(keyValue) })
    })   
    entity_id = this.props.outletId
    itemName = this.props.ItemName
    itemId = this.props.ItemId
    this.state.ptr = this.props.ptr
    this.state.bpc = this.props.bpc

    console.log('ptr : '+this.state.ptr +" bpc : "+this.state.bpc +" item name :"+itemName +" itemid : "+itemId)

    db.getUOMLable().then((data)=>{ //[{"Value":"CS/BTL"}]
        var prod = []
        for(var i=0;i<data.length;i++){           
            this.state.boxLable=data[i].Value.split('/')[0]
            this.state.unitLable=data[i].Value.split('/')[1]
            this.setState({boxLable:data[i].Value.split('/')[0]})
            this.setState({unitLable:data[i].Value.split('/')[1]})
             prod.push(data[i].Value.split('/')[0])
             prod.push(data[i].Value.split('/')[1])           
        }     
       
        for(var i=0;i<prod.length;i++){
        this.state.ratePerArr.push({name:prod[i]})  
        
    }
       //
      if(this.state.boxLable.length == 0){
          this.setState({editablebox:false})         
          this.setState({backgroundbox:'#D2D2D2'})
      }
     
      if(this.state.unitLable.length == 0){
        this.setState({editableunit:false})
        this.setState({backgroundunit:'#D2D2D2'})
    }
       
    })
    
    db.geteditRateFlag().then((data) => {
        var prod = []
        prod = data
        var a = prod.map(function (el) {
            return el.Value;
        });
        this.state.editRateFlagDb = a[0]
      
       
        if(this.state.editRateFlagDb == "TRUE"){
            this.setState({editableRate:true})
            // this.state.enteredRate=this.props.ptr
            // this.setState({enteredRate:this.props.ptr})
          
        }else if(this.state.editRateFlagDb == "FALSE"){         
            this.setState({editableRate:false})         
            this.state.enteredRate=this.props.ptr
            this.setState({enteredRate:this.props.ptr})
         
        }
    })
    db.getOrdersFromDbIfPresent(entity_id, this.state.Collection_type, this.props.ItemId).then((data) => {
     
        var item_ids = '';
        var rates = '';
        var amounts = '', boxs = '', units = '', freeBoxs = '', freeUnits = '', fromDates = '', toDates = '', selectedFlags = 1
        if (data.length != 0) {
            console.log('in if of ptr '+data.length)
            data.map((item, i) => {
                item_ids = item.item_id,
                    rates = item.rate,
                    amounts = item.Amount,
                    boxs = item.quantity_one,
                    units = item.quantity_two,
                    freeBoxs = item.large_Unit,
                    freeUnits = item.small_Unit,
                    fromDates = item.from_date,
                    toDates = item.to_date,
                    selectedFlags = item.selected_flag,
                    orderIds =item.order_id
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
        }else{
            console.log('in else of ptr')
             this.state.enteredRate=this.props.ptr
            this.setState({enteredRate:this.props.ptr})
        }
    })


    //entity_id neded
    db. getItemDiscountFromDb(entity_id,orderIds,this.props.ItemId).then((data) => {
      
        var Rate = '', selectedDiscount = '',OnAmount
        if (data) {
            data.map((item, i) => {
                selectedDiscount=item.RNP
                Rate=item.Rate
                OnAmount=item.OnAmount
            })}
            this.setState({selectedDiscount:selectedDiscount})
            if(selectedDiscount=="Rate"){
           this.state.enteredDiscount=Rate
           this.setState({enteredDiscount:Rate})
            }
            else{
                this.state.enteredDiscount=OnAmount
               this.setState({enteredDiscount:OnAmount})
            }    })
}


  
    onChangeEnteredBox= (input) => {
        this.setState({ box: input })
        this.state.box=input;
      //  this.convertBTLToCS();
        this.calculateAmount()
          }

    onChangeEnteredUnit= (input) => {
        this.setState({ unit: input })
        this.state.unit=input;
      //  this.convertBTLToCS();
        this.calculateAmount()
          }

    onChangeEnteredRate = (input) => {
        this.setState({ enteredRate: input })
        this.state.enteredRate=input
        this.calculateAmountWithAlert()     
    }

    onChangeEnteredDiscount = (value) => {
        //alert(value)
        this.setState({ enteredDiscount: value })
    
    }
    _renderRatePer()
    {
        const beat = []
        for (var i = 0; i < this.state.ratePerArr.length; i++) {
          beat.push({
            value: this.state.ratePerArr[i].name
          })
        }
    
        return (
          <Dropdown
        // value={'Select'}
        placeholder= "Select"
        itemTextStyle={{textAlign:'center'}}
        itemCount = {2} 
        fontSize={11}
        containerStyle={styles.dropDownContainer}
        pickerStyle={{width:wp('30')}}                        //28-03
        rippleCentered={true}
        itemColor = '#ADA2A2'
        // fontSize = '10'
        inputContainerStyle={{ borderBottomColor: 'transparent' }}
     
        dropdownPosition={-2}
        dropdownOffset={{top:14, left:18,}}
        rippleOpacity={0}
        // style={styles.dropDownStyless}
            value={this.state.selectedRatePer}
             data={beat}
            onChangeText={(value) => { this.onSelectedRatePer(value) }}
    
          />
        )
      }
      onSelectedRatePer=(val)=>{
        this.setState({ selectedRatePer: val })
      //  this.convertBTLToCS();
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
        
              // value={'Select'}
              placeholder= "Select"
              itemCount = {2} 
              containerStyle={styles.dropDownContainer}
              pickerStyle={{width:wp('30')}}     
              fontSize={11}
                                 //28-03
              rippleCentered={true}
              itemColor = '#ADA2A2'
              
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
            
              dropdownPosition={-2}
              dropdownOffset={{top:14, left:18,}}
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

  convertBTLToCS(){
      if(this.state.selectedRatePer == 'CS'){
     
      if(this.state.unit)
      {
        console.log("bpc : "+this.state.bpc)
        console.log("unit : "+this.state.unit)
        this.state.cs =parseInt(this.state.box) +parseInt(parseInt(this.state.unit) / parseInt(this.state.bpc));
        console.log("cs : "+cs)
        this.state.btl = parseInt(parseInt(this.state.unit) % parseInt(this.state.bpc));
  
        console.log("btl : "+btl)
       // this.state.box = cs;
    //    this.setState({box : cs});
      
    //   //  this.state.unit = btl;
    //     this.setState({unit : btl});
      
    
        console.log('cs & btl : '+this.state.box +" "+this.state.unit)
      }
     
    }

  }
    calculateAmount(){
      
        if (this.state.editRateFlagDb == "TRUE") {
            console.log("if editRateFlagDb true bpc......."+this.state.bpc)
            //get rate as ptr
            // if(this.state.selectedRatePer == "CS"){
                // this.state.enteredRate=this.props.ptr
                // this.setState({enteredRate:this.props.ptr})
         if(this.state.selectedRatePer == 'CS'){
            if (this.state.enteredRate) {
                console.log("if entered rate is true......."+this.state.enteredRate)
                this.state.ptr = this.state.enteredRate
                var perbottle=0   ,quntity=0    
                 perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                console.log("adding perbottle=", perbottle)
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
               // alert(amounts)
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
           
            }else  if(this.state.selectedRatePer == 'BTL'){
                if (this.state.enteredRate) {
                    console.log("if entered rate is true btl......."+this.state.enteredRate)
                    this.state.ptr = this.state.enteredRate
                    var perbottle=0   ,quntity=0    
                    // perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
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
                //    var amounts = quntity * perbottle;
                    var amounts = quntity * this.state.enteredRate;
                    amounts=Number(amounts.toFixed(2));
                   // alert(amounts)
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
              
                this.setState({editableRate:false})
                this.state.enteredRate=this.props.ptr
                this.setState({enteredRate:this.props.ptr})
                var perbottle=0   ,quntity=0    
                var perbottle =this.state.ptr / this.state.bpc; ///get per bottle rate                             
                //console.log("adding perbottle=", perbottle)
                quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                //console.log("adding quntity=", quntity)
                amounts = quntity * perbottle;
                amounts=Number(amounts.toFixed(2));
                this.state.amount = amounts
                // this.setState({ amount: amounts })
                //console.log("adding amount=", this.state.amount)
            }
        }
    }



    calculateAmountWithAlert(){
   
        
        const { box, unit, ptr, bpc, amount } = this.state
       if (this.state.enteredRate.length) {
            if (this.state.box || this.state.unit) {   //set if not to 0
                if (this.state.editRateFlagDb == "TRUE") {
                    //get rate as ptr
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
                       
                        this.setState({editableRate:false})
                        this.state.enteredRate=this.props.ptr
                        this.setState({enteredRate:this.props.ptr})
                        var perbottle=0   ,quntity=0    
                        perbottle = (this.state.ptr / this.state.bpc); ///get per bottle rate                             
                        //console.log("adding perbottle=", perbottle)
                        quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                        //console.log("adding quntity=", quntity)
                        var amounts = (quntity * perbottle);
                        amounts=Number(amounts.toFixed(2));
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
            this.state.amount=0.00
        }
    }



    applyClickHandler(e) {
        
        this.getUserPosition();     
        let {totalOrderValue} = this.props.createOrder
       
        const { box, unit, ptr, bpc, amount } = this.state
        var quntity=0
      
        if (this.state.box > 0 || this.state.unit>0) {   //set if not to 0
            let boxLength = this.state.box.length
            let unitLength = this.state.unit.length
            let freeBoxLength = this.state.freeBox.length
            let freeUnitLength = this.state.freeUnit.length
            let bpcLength = this.state.bpc.length
            let ptrLength = this.state.ptr.length
            let userLatLength = this.state.userLatitude.length
            let userLongLength = this.state.userLongitude.length
            let enteredRateLenght=this.state.enteredRate.length
         
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
                
                //get rate as ptr
                // if (this.state.enteredRate) {
                //     //console.log("if entered rate is true.......")
                //     this.state.ptr = this.state.enteredRate  
                //     var perbottle=0   ,quntity=0           
                //      perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                            
                //     quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty                  
                //     var amounts = quntity * perbottle;
                //     amounts=Number(amounts.toFixed(2));

                //     /////////////////calculations
                //     // console.log("entered Rate=",  this.state.enteredRate)
                //     // console.log("ptr=",  this.state.ptr)
                //     // console.log("perbottle=", perbottle)
                //     // console.log("bpc=", this.state.bpc)
                //     // console.log("box=", this.state.box)
                //     // console.log("unit=", this.state.unit)
                //     // console.log("adding quntity=", quntity)
                //     // console.log("gross Amount=", amounts)
                //     ////////////////////////////////
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

console.log('selected rate : ' +this.state.selectedRatePer);
                  //get rate as ptr
                  
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
                 //get ptr from table
                if (this.state.ptr == 0) {
                    this.state.amount = 0.00
                     this.setState({ amount: 0 })
                } else {                  
                    this.setState({editableRate:false})
                    this.state.enteredRate=this.props.ptr
                    this.setState({enteredRate:this.props.ptr})

                    var perbottle=0   ,quntity=0    
                    perbottle = this.state.ptr / this.state.bpc; ///get per bottle rate                             
                    //console.log("adding perbottle=", perbottle)
                    quntity = (parseInt(this.state.bpc) * parseInt(this.state.box)) + parseInt(this.state.unit);//get all bottle qty
                    //console.log("adding quntity=", quntity)
                    var amounts = quntity * perbottle;
                    amounts=Number(amounts.toFixed(2));
                    this.state.amount = amounts
                    // this.setState({ amount: amounts })
                    //console.log("adding amount=", this.state.amount)
                }
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if(this.state.selectedRatePer){
                // if(this.state.selectedDiscount){
                    db.checkIsOrderIdInDb(entity_id, "0",this.props.dashboard.userId).then((data) => {
                        this.state.isOrderIdExists = [];
                        this.setState({ isOrderIdExists: data });                   
                        var that = this;
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
                        currentDateTime = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
                        if (this.state.isOrderIdExists.length == '0') {
                    
                            app_order_id = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
                            app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, "");                  
                            
                        
                            AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));
                            db.insertTABLE_TEMP_OrderMaster(app_order_id, currentDateTime, this.state.entity_type, entity_id, this.state.userLatitude, this.state.userLongitude, this.state.amount, this.state.Collection_type, this.props.dashboard.userId, 1)
                            AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));
    
                        db.selectTempMasterDetailId(this.props.ItemId, app_order_id).then((dataId) => {
                                                    
                            if (dataId.length == 0 ) {                      
                                AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));  
                                db.insertTABLE_TEMP_ORDER_DETAILS(app_order_id, this.props.ItemId, itemName, this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.enteredRate, this.state.bpc, this.state.amount, '1', 'true').then((data)=>
                                {
                                totalOrderValue++
                                this.props.orderValue(totalOrderValue) 
                                    this.props.SublistExtendedParent(this.props.ItemId);                            
                                })
                                
                            } else {                      
                                AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));                                      
                                db.updateTABLE_TEMP_ORDER_DETAILS(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.amount, this.state.enteredRate, 'true', app_order_id, this.props.ItemId)
                                this.props.SublistExtendedParent(this.props.ItemId);
                            
                            
                            }
                        })
                        } else {
                        
                            db.getInsertedTableTempOrderMasterId(entity_id, 0, this.props.dashboard.userId).then((data) => {
                                app_order_id = data[0].id
                                    db.checkIsRowExistInTempMasterTable(app_order_id, "0").then((datalen) => {                          
                                    this.state.isOrderIdExistsnew = datalen
                                    this.state.isOrderIdExistsnew = [];
                                    this.setState({ isOrderIdExistsnew: datalen });
                                    for (var i = 0; i < this.state.isOrderIdExistsnew.length; i++) {
                                        app_order_id = ''
                                        app_order_id = this.state.isOrderIdExistsnew[0].id
                                    }
                                    AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));
                                    if (this.state.isOrderIdExistsnew.length)//row len
                                    {                              
                                        db.selectTempMasterDetailId(this.props.ItemId, app_order_id).then((dataId) => {
                                                                            
                                            if (dataId.length == 0 ) {
                                            
                                                AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id)); 
                                                                            
                                                db.insertTABLE_TEMP_ORDER_DETAILS(app_order_id, this.props.ItemId, itemName, this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.enteredRate, this.state.bpc, this.state.amount, '1', 'true')
                                                totalOrderValue++
                                                this.props.orderValue(totalOrderValue) 
                                                this.props.SublistExtendedParent(this.props.ItemId);
                                        
                                            } else {
                                            
                                                AsyncStorage.setItem('app_order_id', JSON.stringify(app_order_id));                                      
                                                db.updateTABLE_TEMP_ORDER_DETAILS(this.state.box, this.state.unit, this.state.freeBox, this.state.freeUnit, currentDateTime, "", this.state.amount, this.state.enteredRate, 'true', app_order_id, this.props.ItemId)
                                            this.props.SublistExtendedParent(this.props.ItemId);
                                            
                                            }
                                        })
                                    }
    
                                })
                            })
                        }
                        if(this.state.selectedDiscount){
                            db.checkDiscountAlreadyInDb(this.props.ItemId, app_order_id).then((data)=>{

                                if (data.length == '0') {
                           
                            if(this.state.selectedDiscount=="Rate"){
                                db.insertTABLE_DISCOUNT(app_order_id,"cash",this.state.amount,"","",this.state.selectedDiscount,
                                "","",this.state.enteredDiscount,"",this.props.ItemId,"","",'N')
                            }else{
                                db.insertTABLE_DISCOUNT(app_order_id,"cash",this.state.amount,"","",this.state.selectedDiscount,
                                this.state.enteredDiscount,"","","",this.props.ItemId,"","",'N')
                        
                            }  
                                }
                                else{
                        
                         if(this.state.selectedDiscount=="Rate"){
                                db.updateTABLE_DISCOUNT(app_order_id,"cash",this.state.amount,"","",this.state.selectedDiscount,
                                "","",this.state.enteredDiscount,"",this.props.ItemId,"","")
                            }else{
                                db.updateTABLE_DISCOUNT(app_order_id,"cash",this.state.amount,"","",this.state.selectedDiscount,
                                this.state.enteredDiscount,"","","",this.props.ItemId,"","")
                        
                            } 
                                }
                               })
                        }
                    })
                // }else{
                //     alert("Please Select Discount")
                // }
               
            }else{
                alert("Please Select Rate per.")
            }
           
        } else {
            alert("Please Enter the any of Box and Unit")
        }
      
    }

    deleteClickHandler(e) {     
        AsyncStorage.getItem('app_order_id').then((keyValue) => {         
            app_order_id=JSON.parse(keyValue)          
            })                 

        let {totalOrderValue} = this.props.createOrder
        db.deleteRowItem(app_order_id, this.props.ItemId)
        totalOrderValue--
        this.props.orderValue(totalOrderValue) 

        db.deleteDiscount(app_order_id, this.props.ItemId)

        this.props.refresh(app_order_id,this.props.ItemId)
        db.getOrdersFromDbIfPresent(entity_id, this.state.Collection_type, this.props.ItemId).then((data) => {
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
        Geolocation.getCurrentPosition(
            pos => {              
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude
                });               
            })
    }

    render() {
        const { navigation } = this.props;
       
       // setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
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

                    <View style={styles.boxColumnContainer}>
                        <Text style={styles.boxTextStyle}>
                            {/* //Box */}
                            {this.state.boxLable}
                    </Text>
                    {/* //CS */}
                        <TextInput    
                            keyboardType="numeric"
                            placeholder="0"
                            autoFocus = "true"                            
                            style={[styles.boxTextBoxStyle,{backgroundColor: this.state.backgroundbox}]}
                            value={this.state.box}
                            editable={this.state.editablebox} 
                            
                            onChangeText={input => this.onChangeEnteredBox(input)} 
                            

                        />
                        {/* //CS free*/}
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
                        {this.state.unitLable}

                    </Text>
                    {/* //BTL */}
                        <TextInput 
                            keyboardType="numeric"
                            placeholder="0"
                            style={[styles.unitTextBoxStyle,{backgroundColor: this.state.backgroundunit}]}
                            value={this.state.unit}                          
                            editable={this.state.editableunit}                             
                            onChangeText={input => this.onChangeEnteredUnit(input)} 
                        />
                        {/* //BTL free */}
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
                    <View style={styles.discountDropDownContainer}>
                        {this._renderDiscount()}
                       
                       
                    </View>

                    <View style={styles.discountTextBoxContainer}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.discountTextBoxStyle}
                            value={this.state.enteredDiscount}
                            // onChangeText={input => { this.setState({ enteredRate: input }) }}
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
                    <TouchableOpacity  onPress={(e) => this.deleteClickHandler(e)}>
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
             
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createOrder:state.createOrder,
        dashboard: state.dashboard,
        
    };
};

const mapDispatchToProps = dispatch => ({
       orderValue: (val) => { dispatch(TOTAL_ORDER_VALUE(val));
                                   
                                     },
})
export default connect(mapStateToProps, mapDispatchToProps)(EditInlineOnCreateNewOrder)

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
         // marginHorizontal:wp('3')
     },
    
     orderTextStyle: { 
          marginTop:hp('5'), 
          color: '#796A6A', 
        //   fontSize: wp('3%'), 
          fontSize:12,
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
          marginLeft:wp('3')
     },
    
     boxTextStyle: { 
          color: '#796A6A', 
         // fontSize: wp('3%'), 
         fontSize:12,
          fontFamily: 'Proxima Nova',
          marginHorizontal:wp('2'), 
          fontWeight: 'bold',
     },
    
     boxTextBoxStyle: {
         flex:1,
          height: hp('5.5'), 
          width:wp('30'), 
          borderColor: '#E6DFDF', 
          borderWidth: 1, 
          borderRadius:wp('1'),
          backgroundColor: '#ffffff',
          marginLeft:wp('-10'), 
          marginRight:wp('10'),  
          marginTop:hp('1'),
          textAlign: 'center',  padding:5,     fontSize:10
     },
    
     unitColumContainer: { 
        flex:0.5, 
        flexDirection:'column', 
     },
    
     unitTextStyle: { 
        color: '#796A6A', 
     //   fontSize: wp('3%'), 
     fontSize:12,
        fontFamily: 'Proxima Nova', 
        marginHorizontal:wp('9'),
        fontWeight: 'bold',  
     },
    
     unitTextBoxStyle: { 
         flex:1,
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
        padding:5,fontSize:10
       
     },
    
     rateContainer: { 
        flex:0.7, 
        flexDirection:'row', 
        marginTop:hp('1.5'),
     },
    
     rateColumnContainer: { 
        flex:0.4, 
        flexDirection:'column', 
        alignItems:'flex-start', 
       
     },
    
     rateTextStyle: {
        marginTop:hp('2'), 
        color: '#796A6A', 
      //  fontSize: wp('3%'), 
        fontFamily: 'Proxima Nova',   fontSize:12,
     },
    
     boxUnitDropContainer: { 
        flex:0.5, 
      
        alignContent:'center', justifyContent:'center'
     },
    
     dropDownContainer : {
          borderColor: '#E6DFDF', 
          borderRadius: wp('1'), 
          width: wp('30'), 
          height: hp('5.5'),
          marginTop: hp('0'), 
          marginHorizontal: wp('4'),
          backgroundColor: '#FFFFFF',
           paddingHorizontal:hp('2'), 
                   fontSize:3,
          marginVertical: 10, 
          borderWidth:wp('0.5'), 
          marginRight:wp('10'),
           borderWidth:hp('0.15'),    justifyContent:'center',alignContent:'center',alignSelf:'center',
           textAlign:'center',
           padding: 15,
      },
    
  
    
     dropDownStyless: { 
        flex: 1, 
        width: wp('30'), 
        height:hp('5'), 
        backgroundColor: 'white', 
        justifyContent: 'center',
        marginLeft:wp('-6'),  
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('1'),
     },
    
     rateTextBoxContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems:'flex-end',
     },
    
     rateTextBoxStyle: { 
        fontSize:10,
        height: hp('5.5'), 
        width:wp('30'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1, 
        borderRadius:wp('1'),
        backgroundColor: '#ffffff',
        marginRight:wp('-3'),
        marginTop:hp('0'), 
        textAlign: 'center',
        padding:5
     },
    
     dashLineContainer: {
          flex:1, 
          marginTop:hp('1.5'), 
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
          width:wp('83'), 
          height:hp('1'), 
          color: '#ADA2A2',
     },
    
     grossMainContainer: {
          flex:1, 
          flexDirection:'row',
     },
    
     grossTextContainer: {
        flex: 0.5, 
        flexDirection:'row', 
  
     },
    
     grossTextStyle: {     
        color: '#796A6A',
  //      fontSize: wp('3'),
        marginTop: hp('2'),      
        fontFamily: 'Proxima Nova',   fontSize:12,
     },
    
     grossTextBoxContainer: {
          flex: 0.5, 
          flexDirection:'column', 
          alignItems:'flex-end',  
     },
    
     grossTextBoxStyle: {      

          height: hp('5.5'), 
          lineHeight: hp('5.5'),
          width:wp('30'), 
          borderColor: '#E6DFDF', 
          borderWidth: 1, 
          borderRadius:wp('1'),
          backgroundColor: '#ffffff',
          marginRight:wp('-3'),
          marginTop:hp('1'),
          textAlign: 'center',  fontSize:10    
         
          
     },
    
     discountMainContainer: { 
          flex:0.5, 
          flexDirection:'row', 
          marginTop:hp('1'),
     },
    
     discountColumnContainer: { 
          flex:0.4, 
          flexDirection:'column', 
          alignItems:'flex-start', 
          ////chng
         // marginHorizontal:wp('3'),
     },
    
     discountTextStyle: {
          marginTop:hp('1'), 
          color: '#796A6A', 
        //  fontSize: wp('3%'), 
          fontFamily: 'Proxima Nova', 
          marginTop:hp('2'),   fontSize:12,
     },
    
     discountDropContainer: { 
          flex:0.5, 
          flexDirection:'column', 
          alignItems:'flex-start', 
     },
    
     
     dropDownContainerDiscount : {
          flex: 1, 
          width: wp('30'), 
          height: hp('5.5'),
          borderColor: '#E6DFDF', 
          borderRadius: wp('1'), 
        
          marginTop: hp('0'), 
          marginHorizontal: wp('1'),
          backgroundColor: '#FFFFFF',
          paddingHorizontal:hp('4'), 
          alignSelf:'center',
          marginVertical: 10, 
          borderWidth:wp('0.5'), 
          marginRight:wp('9'),
          borderWidth:hp('0.15'),  justifyContent:'center',alignContent:'center',alignSelf:'center',
          textAlign:'center',
          padding: 15,
      },
    
    //  discountDropdownTextStyle: { 
    //       backgroundColor: '#fff',
    //       fontSize: wp('3'), 
    //       color:'black',
    //  },
    
    //  discountDropTextStyle: {
    //       fontSize: wp('3'), 
    //     //   color:'gunmetal', 
    //       alignSelf: 'flex-start',
    //       marginLeft: wp('3'),
    //  },
    
    //  discountDropDownStyle: { 
    //       flex: 1, 
    //       width: wp('30'), 
    //       height:hp('11'), 
    //       marginVertical: 10, 
    //       borderWidth:wp('0.5'), 
    //       borderColor: '#E6DFDF', 
    //  },
    
     discountDropStyle: { 
          flex: 1, 
          width: wp('30'), 
          height:hp('5'), 
          backgroundColor: 'white', 
          justifyContent: 'center',
          marginLeft:wp('-4'),  
          borderColor: '#E6DFDF', 
          borderWidth: 1, 
          borderRadius:wp('1'),
     },
     discountDropDownContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems:'flex-start', 
    },
     discountTextBoxContainer: { 
          flex:0.5, 
          flexDirection:'column', 
          alignItems:'flex-end',
     },
    
     discountTextBoxStyle: {          
          height: hp('5.5'), 
          width:wp('30'), 
          borderColor: '#E6DFDF',
          borderWidth: 1, 
          borderRadius:wp('1'),
          backgroundColor: '#ffffff', 
          marginRight:wp('-3'),
          marginTop:hp('0'), 
          textAlign: 'center',
          padding:5,fontSize:10
         
     },
    
     applicableMainContainer: { 
          flex:1, 
          marginTop:hp('2'), 
          alignItems:'flex-start', 
          flexDirection: 'row',
          marginLeft:wp('-4'),
     },
    
     roundedtext: {
        width: 25,
        height: 25, 
                // flexWrap:"wrap",
        justifyContent: 'center',
        alignItems: 'center',
       
    
        marginLeft:wp('5')
     },
    
     applicableTextStyle: {
          marginLeft:wp('4'),
          fontFamily: 'Proxima Nova', 
        //  fontSize: wp('3'), 
          color:'#3955CB',
          marginTop:hp('0.7'),fontSize:12
     },
    
     applyDeleteMainContainer: { 
          flex:1, 
          marginTop:hp('2'), 
          flexDirection: 'row', 
          marginBottom: hp('1')
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
        //    fontSize:RFValue(15), 
        fontSize: wp('3'), 
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
          alignItems:'flex-start',
          justifyContent:'center',
     },
    
     deleteImgStyle: {  
          height:hp('3'), 
          width:wp('4'),
     },
    
     deleteTextContainer: {
        flexDirection: 'column', 
        alignItems:'flex-start',
        justifyContent:'center', 
        marginLeft: wp('4'),
     },
    
     deleteTextStyle: { 
          fontFamily: 'Proxima Nova',
          color:'#E23333', 
          fontWeight:'bold',
          fontSize: wp('3'), 
        //   fontSize:RFValue(15), 
        marginTop:hp('-2.6'),
          fontFamily: 'Proxima Nova',
     },
      
    
    
    })
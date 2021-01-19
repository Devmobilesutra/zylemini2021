import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground,
  FlatList,AsyncStorage,BackHandler
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import moment from 'moment';
import EditInlineDataCollection from './EditInlineDataCollection';
import EditInLineDataCollectionPreview from './EditInLineDataCollectionPreview';
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
var newDate

export class DataCollectionStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      app_order_id: '',
      outletId: '',
      outletName: '',
      visible: '',
      // selectedStartDate: '',
      visiblecal: '',
      visiblecal1: '',
remark:'',
      collapsed: false,
      from_date: '',
      BrandList: [],
      amount: '',
      refresh: false,
      orderData: [],
      MasterorderData: [],
      refreshDelete: false,
      totalAmount: '',
      total: '', PREVIOUSDAYORDERDAYS: '',
      item_data1: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  
componentDidMount() {

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

}

  handleBackButtonClick() {
    Actions.DataCollectionStep2();

    return true;
}

componentWillUnmount() {
   
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
  refreshDelete(app_order_id, ItemId) {
    AsyncStorage.getItem('outletIdDC').then((keyValue) => {
      this.setState({ outletId: JSON.parse(keyValue) })
    })
    AsyncStorage.getItem('outletNameDC').then((keyValue) => {
      this.setState({ outletName: JSON.parse(keyValue) })

    })
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)
      db.getInsertedsTempOrder(a).then((getdata) => {
        this.setState({
          BrandList: getdata
        });
        var amountss = 0
        for (var i = 0; i < this.state.BrandList.length; i++) {
          // this.state.total +=this.state.BrandList[i].Amount
          amountss += parseInt(this.state.BrandList[i].Amount)
          this.state.total = amountss
          this.setState({ total: amountss })

        }

      })
    })
  }

  discardClickHandler(e) {
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)

      db.selectOrdersDetail(a).then((data) => {

        for (var i = 0; i < data.length; i++) {
          db.updateTABLE_PITEM_ADDEDITBRAND(data[i].item_id, false, false)
          db.updateTABLE_PITEM_btleQty(data[i].item_id, "")

        }

      })
      db.discardOrders(a)
      db.discardOrdersMaster(a)

      db.getInsertedsTempOrder(a).then((getdata) => {
        this.setState({ BrandList: getdata })
        Actions.CreateNewOrderSecond()
      })
    })
    // this.props.refresh(orderId, this.props.ItemId)      
  }

  onChangeTextRemark(val){
    this.setState({remark:val})

}
  saveClickHandler(e) {
    //////////insert into main Detail Table
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)
      db.getOrderDataFromTempOrderDetails(a).then((data) => {
        //console.log("data=", data)
        this.setState({ orderData: data })

        //
        // })  //not here

        for (let k = 0; k < this.state.orderData.length; k++) {
          //console.log("sachins1.//////////////////////////////////////////=", k)
          db.checkOrderInOrderDetailsMain1(this.state.orderData[k].item_id, a).then((item_data) => {
            //console.log("item_data=", item_data)
            if (item_data.length == 0) {

              // [{"Amount":"700","rate":"2","to_date":"","from_date":"2020-4-15 14:23:54","large_Unit":"0","small_Unit":"0","quantity_two":"0","quantity_one":"35","item_Name":"{0062}DYC SELECT 180 ML X 48 42.8 %","item_id":"81","order_id":"1542020142354","id":1},
              // {"Amount":"60","rate":"3","to_date":"","from_date":"","large_Unit":"0","small_Unit":"0","quantity_two":"0","quantity_one":"2","item_Name":"{0063}DYC SELECT  375 ML X 24 42.8 %","item_id":"82","order_id":"1542020142354","id":11}]

              db.insertOrderDetails(this.state.orderData[k].order_id, this.state.orderData[k].item_id, this.state.orderData[k].item_Name,
                this.state.orderData[k].quantity_one,
                this.state.orderData[k].quantity_two,
                this.state.orderData[k].small_Unit, this.state.orderData[k].large_Unit, this.state.orderData[k].rate,
                this.state.orderData[k].Amount, "1", "N")

            } else {

              db.updateDetailMain(this.state.orderData[k].quantity_one,
                this.state.orderData[k].quantity_two, this.state.orderData[k].small_Unit, this.state.orderData[k].large_Unit, this.state.orderData[k].rate,
                this.state.orderData[k].Amount, this.state.orderData[k].order_id, this.state.orderData[k].item_id)

              // db.updateTABLE_PITEM_ADDEDITBRAND(item_data[0].item_id, false, false)
              // db.updateTABLE_PITEM_btleQty(item_data[0].item_id, "")

            }
          })
        //  this.state.totalAmount += this.state.orderData[k].Amount

        }////end of for loop

      })
    })


    //console.log("insert into master main////////////////////////////////")
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)
      //console.log("ljhkjk",a)
      db.getOrderDataFromTempOrderMaster(a,this.props.datacollection.collectiontype).then((data) => {

        this.setState({ MasterorderData: data })

        for (let i = 0; i < this.state.MasterorderData.length; i++) {

          db.checkOrderInTempOrderMasterMain(this.state.MasterorderData[i].id,this.props.datacollection.collectiontype).then((item_data) => {

            if (item_data.length === 0) {

              var date = new Date().getDate();
              var month = new Date().getMonth() + 1;
              var year = new Date().getFullYear();
              datess = year + '-' + month + '-' + date
              //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
              newDate = moment().format('YYYY-MMM-DD')


              db.insertOrderMastersss(this.state.MasterorderData[0].id, this.state.MasterorderData[0].Current_date_time, this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
                this.state.MasterorderData[0].latitude, this.state.MasterorderData[0].longitude, this.state.MasterorderData[0].total_amount,this.props.datacollection.fromDate,this.props.datacollection.toDate ,
                this.props.datacollection.collectiontype, this.state.MasterorderData[0].user_id, this.state.remark, "1", "N", datess, "", newDate)
              // db.deleteTempOrderDetails(this.state.MasterorderData[0].entity_id, "0")
              // db.deleteTempOrderMater(this.state.MasterorderData[0].entity_id, "0")
            } else {

              // Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,order_id,collection_type
              db.updateMasterMain(this.state.MasterorderData[0].Current_date_time,
                this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
                this.state.MasterorderData[0].latitude,
                this.state.MasterorderData[0].longitude,
                this.state.MasterorderData[0].total_amount,this.props.datacollection.fromDate,this.props.datacollection.toDate , this.state.MasterorderData[0].id, this.props.datacollection.collectiontype)

              // db.deleteTempOrderDetails(this.state.MasterorderData[0].entity_id, "0")
              // db.deleteTempOrderMater(this.state.MasterorderData[0].entity_id, "0")
            }
          })

          db.deleteTempOrderDetails(this.state.MasterorderData[0].entity_id, this.props.datacollection.collectiontype).then((data) => {
            AsyncStorage.setItem('outletNameDC', "");
            AsyncStorage.setItem('outletIdDC', "");
            AsyncStorage.setItem('beatNameDC', "");
            AsyncStorage.setItem('beatIdDC', "");
            AsyncStorage.setItem('distributorNameDC', "");
            AsyncStorage.setItem('SearchStringDCDC', "");

            db.getInsertedsTempOrder(a).then((getdata) => {

              this.setState({ BrandList: getdata })

            })
            AsyncStorage.setItem('outletNameDC', "");
            AsyncStorage.setItem('outletIdDC', "");
            AsyncStorage.setItem('beatNameDC', "");
            AsyncStorage.setItem('beatIdDC', "");
            AsyncStorage.setItem('distributorNameDC', "");
            AsyncStorage.setItem('SearchStringDC', "");



          })
          db.deleteTempOrderMater(this.state.MasterorderData[0].entity_id, this.props.datacollection.collectiontype).then((getdata) => {

          })
          AsyncStorage.setItem('outletNameDC', "");
          AsyncStorage.setItem('outletIdDC', "");
          AsyncStorage.setItem('beatNameDC', "");
          AsyncStorage.setItem('beatIdDC', "");
          AsyncStorage.setItem('distributorNameDC', "");
          AsyncStorage.setItem('SearchStringDC', "");

          Actions.DataCollectionStep1();
        }

      })
    })

  }
  setamount = (amount) => {
    this.setState({ amount: amount })
}

  ParentCalled(am) {
    //   alert(am)
    AsyncStorage.getItem('outletIdDC').then((keyValue) => {
      this.setState({ outletId: JSON.parse(keyValue) })
    })
    AsyncStorage.getItem('outletNameDC').then((keyValue) => {
      this.setState({ outletName: JSON.parse(keyValue) })

    })
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)
      db.getInsertedsTempOrder(a).then((getdata) => {
        this.setState({
          BrandList: getdata
        });
        var amountss = 0
        for (var i = 0; i < this.state.BrandList.length; i++) {
          // this.state.total +=this.state.BrandList[i].Amount
          amountss += parseInt(this.state.BrandList[i].Amount)
          this.state.total = amountss
          this.setState({ total: amountss })

        }

      })
    })
  }


  componentWillMount() {

    this._componentFocused();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused

    );

    this.props.navigation.addListener("didBlur", () => {
      // user has navigated away from this screen
    });


  }
  _componentFocused = () => {

    //getPrevOrdersDayNo
    db.getPrevOrdersDayNo().then((data) => {
      //console.log("bbb=", data)

      var prod = []
      prod = data
      prod.map((Value, i) => {
        //alert(Value.Value)
        this.setState({ PREVIOUSDAYORDERDAYS: Value.Value })
      })
    })
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    datess = year + '-' + month + '-' + date
    //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
    newDate = moment().format('DD-MMM-YYYY')

    AsyncStorage.getItem('outletIdDC').then((keyValue) => {
      this.setState({ outletId: JSON.parse(keyValue) })
    })
    AsyncStorage.getItem('outletNameDC').then((keyValue) => {
      this.setState({ outletName: JSON.parse(keyValue) })

    })
    AsyncStorage.getItem('app_order_idDC').then((keyValue) => {
      var a = JSON.parse(keyValue)

      db.getInsertedsTempOrder(a).then((getdata) => {
        //console.log("rjjjj=", JSON.stringify(getdata))
        this.setState({ BrandList: getdata })
        var amountss = 0
        for (var i = 0; i < this.state.BrandList.length; i++) {
          // this.state.total +=this.state.BrandList[i].Amount
          amountss += parseInt(this.state.BrandList[i].Amount)
          this.state.total = amountss
          this.setState({ total: amountss })

        }

      })
      //    [{"to_date":"","from_date":"4/4/2020 19:44:39","large_Unit":"0","small_Unit":"0","Amount":"750.5","quantity_one":"25","id":4,"bpc":"12","quantity_two":"2","rate":"3","item_Name":"{0061}DYC  750 ML X 12 42.8 %","item_id":"78","order_id":"442020194439"}]

    })


  }


  static navigationOptions = {
    title: 'Data Collection : Step 3/3',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      fontSize: 12, marginLeft: hp(-1)
    },

    headerLeft: (
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
        <TouchableOpacity onPress={() => Actions.DataCollectionStep2()}>
          <Image style={{ marginLeft: wp('4'), }}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  applicablePopUp = () => {
    const { navigation } = this.props;
    this.setState({ visible: true });
  }

  SchemesArrow() {
    if (this.state.collapsed == false) {
      return (
        <View>
          <Image style={styles.sublistIconStyle}
            source={require('../../assets/Icons/Add_white.png')} />
        </View>
      )
    }
    else {
      return (
        <View>
          <Image style={styles.sublistIconStyle}
            source={require('../../assets/Icons/minus_white.png')} />
        </View>
      )
    }
  }

  returnBrand() {
    const { navigation } = this.props;
    //  if (this.state.BrandList) {
    return this.state.BrandList.map((item, i) => {
      //this.setState({amount:item.Amount})
      this.state.amount = item.Amount
      this.state.from_date = item.from_date
      return (
        <View style={styles.orderSerchResultMainContainer}>
          <Collapse
            onToggle={() => this.setState({ collapsed: !this.state.collapsed })}
          >
            <CollapseHeader style={styles.collapseHeaderStyle}>
              <View style={styles.brandNameContainer}>
                <Text style={styles.brandNameTextContainer}>
                {item.item_Name}
        </Text>
              </View>
              <View style={styles.sublistExtendIconAmountContainer}>
                <Text style={styles.sublistAmountTextStyle}>
                {this.state.amount}
        </Text>
                <View>
                  {this.SchemesArrow()}
                </View>
                {/* <Image style={styles.sublistIconStyle} 
          source = {require('../../assets/Icons/Add_white.png')}/> */}
              </View>
            </CollapseHeader>
            <CollapseBody>
              <ListItem >
                <EditInLineDataCollectionPreview navigation={navigation} 
                 radioVal2={this.props.navigation.state.params.valueRadio1}
                box={item.quantity_one}
                unit={item.quantity_two}
                freeBox={item.small_Unit}
                freeUnit={item.large_Unit}
                enteredRate={item.rate}
                amount={item.Amount} 
                setamount={this.setamount.bind(this)}
                bpc={item.bpc}
                from_date={item.from_date}
                to_date={item.to_date}
                orderId={item.order_id}
                ItemId={item.item_id}
                itemName={item.item_Name}
                outletId={this.state.outletId}
                ParentCalled={this.ParentCalled.bind(this)}
                refresh={this.refreshDelete.bind(this)}
                
                />
              </ListItem>
            </CollapseBody>
          </Collapse>
        </View>
      )
    })

  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 10 }}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{ height: hp('89'), width: wp('100'), resizeMode: 'cover', justifyContent: 'center', }}
        >
          <ScrollView
          keyboardShouldPersistTaps={'handled'} 
            showsVerticalScrollIndicator={false}
          >

            {/* Store Name Id and History */}
            <View style={{ flex: 0.1 }}>
              <View style={styles.storeInfoMainContainer}>
                <View style={styles.storeTextContainer}>
                  <Text style={styles.storeNameText}>
                    {this.state.outletName}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.storeIdText}>
                  Store ID :
          </Text>

                <Text style={styles.storeIdStyle}>
                  {this.state.outletId}
                </Text>
              </View>
            </View>

            {/* Dash Line */}
            <View style={styles.dashLineContainer}>
              <Dash style={styles.dashLineStyle}
                dashLength={2}
                dashColor='#ADA2A2'
              />
            </View>

            {/* search results */}
            <View style={styles.searchResultTextRowContainer}>
              <View style={styles.searchResultTextColContainer}>
                <Text style={styles.searchResultText}>
                  Search Results
          </Text>
              </View>

              <View style={styles.CPDMaintContainer}>
                <View>
                  <Text style={styles.CPDTextStyle}>
                    Collected Product Data
            </Text>
                </View>
                <View style={styles.roundedtextBlue}>
                  <Text style={styles.roundInnerValue}>
                  {this.props.datacollection.dataCollected}
            </Text>
                </View>
              </View>
            </View>
            {this.returnBrand()}
         
            <View style={styles.remarkMainContainer}>
              <Text style={styles.remarkTextStyle} >
                REMARKS
        </Text>
            </View>
            <View style={styles.remarkTextViewContainer}>
              <TextInput
                 multiline={true}
                 textAlignVertical='top'
                style={styles.remarkTextInputStyle}
                onChangeText={text => this.onChangeTextRemark(text)}
              />
            </View>

            <View style={{ marginVertical: hp('4') }}></View>
          </ScrollView>
          {/* Submit Button */}
          <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this.saveClickHandler(e)}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText} > SUBMIT </Text>
              </View>
            </View>
          </TouchableOpacity>

        </ImageBackground>
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
  collectedData: (collecteddata) => {
    dispatch(TOTAL_DATA_COLLECTED(collecteddata));     
  }

})
export default connect(mapStateToProps, mapDispatchToProps)(DataCollectionStep3)

const styles = StyleSheet.create({
  storeInfoMainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  storeTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  historyTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  storeNameText: {
    color: '#796A6A',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
  },

  historyText: {
    color: '#3955CB',
    fontSize: wp('3%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    fontFamily: 'Proxima Nova',
    marginRight: wp('9%'),
  },

  storeIdText: {
    color: '#796A6A',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: hp('1%'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova'
  },

  storeIdStyle: {
    color: '#796A6A',
    fontSize: 10,
    marginTop: hp('1%'),
    marginLeft: hp('2%'),
    fontFamily: 'Proxima Nova',
    alignContent: 'flex-end',
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('89'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  searchResultTextRowContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  searchResultTextColContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  searchResultText: {
    color: '#8C7878',
    // fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('3'),
    marginLeft: wp('5'),
    fontFamily: 'Proxima Nova',
  },

  CPDMaintContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems:'flex-end',marginBottom:wp('1'),  marginTop: hp('2'), 
  },

  CPDTextStyle: {
    color: '#3955CB',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
   // marginRight: wp('2'),
    marginLeft: wp('4')
  },

  roundedtextBlue: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 2,
    backgroundColor: "#3955CB",
    borderColor: '#3955CB',
    borderWidth: 3,
    marginLeft: hp('1'),
    marginBottom:hp('-0.4')
  },

  roundInnerValue: {
    color: '#ffffff',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(13),
  },

  orderSerchResultMainContainer: {
    flex: 1,
    marginTop: hp('4'),
  },

  collapseHeaderStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#362828',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('88'),
    borderWidth: hp('0.2'),
    marginHorizontal: wp('4'),
    alignSelf: 'center',
  },

  brandNameContainer: {
    flex: 2.5,                                                               //28-03
    alignItems: 'flex-start',
  },

  brandNameTextContainer: {
    marginLeft: wp('5'),
    fontFamily: 'Proxima Nova',
    fontSize: wp('3'),
    color: '#FFFFFF',
    fontSize: RFValue(13),
    justifyContent: 'center',
  },

  sublistExtendIconAmountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  sublistAmountTextStyle: {
    marginRight: wp('3'),
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(13),
    color: '#FFFFFF',
    alignSelf: 'center',
  },

  sublistIconStyle: {
    marginRight: wp('4'),
    alignSelf: 'center',
    height: hp('4'),
    width: wp('8'),
  },

  remarkMainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginVertical: wp('8'),

  },

  remarkTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: wp('3%'),
  },

  remarkTextViewContainer: {
    flex: 1,
    marginVertical: hp('-3'),
    marginHorizontal: wp('5'),
    alignSelf: 'center',
    // padding:1,
  },

  remarkTextInputStyle: {
 
    height: hp('15'),
    width: wp('88'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('2'),
    backgroundColor: '#ffffff',
    padding: 5,
  },

  button: {
    width: wp('100'),
    height: hp('8'),
    backgroundColor: '#46BE50',
    marginVertical: 1,
    paddingVertical: 15,
    justifyContent: 'center',
  },


  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },


});

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Dash from 'react-native-dash';
import {Actions} from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import Database from './../../utility/Database';
import {TOTAL_DATA_COLLECTED} from '../../Redux/actions/DataCollectionAction';
import {connect} from 'react-redux';
const db = new Database();

const data = [
  {
    value: 'Box',
  },
  {
    value: 'Unit',
  },
];

const labels = ['CS', 'BTL'];

var Total_amount = 0;
let currentDateTime;
let len1;
var itemId = '';
var itemName = '';
var detail_order_id = [];
var app_order_id = '';
const oorderid = '';
var entity_id = '';
var BrandId = '';
var orderIds = '';
var aa;
var Collection_types;

export class EditInlineDataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: 0,
      unit: 0,
      freeBox: 0,
      freeUnit: 0,
      boxRate: '',
      unitRate: '',
      grossAmount: '',
      discountRs: '',
      discountPer: '',
      totalAmount: '',
      applyScemes: '',
      selectedDiscount: '',
      selectedRatePer: '',
      ptr: '',
      bpc: '',
      amount: '0.00',
      ratePerArr: [],
      discountArr: [
        {id: '1', name: 'Rate'},
        {id: '2', name: 'Net'},
        {id: '2', name: 'Percent'},
      ],
      entity_type: '1',
      userid: '52362',
      editRateFlagDb: '',
      enteredRate: '',
      userLatitude: '',
      userLongitude: '',
      unitLable: '',
      boxLable: '',
      editableunit: true,
      editablebox: true,
      editableRate: true,
      backgroundbox: '#ffffff',
      backgroundunit: '#ffffff',
      enteredDiscount: 0,
      isOrderIdExists: [],
      isOrderIdExistsnew: [],
      // isOrderIdExistsnew :[],
      hasMapPermission: '',
      order_id: '',
      detail_order_id: [],
      master_order_id: '',
      orderIdss: '',
      radioValueDCs: '',
    };
  }

  componentWillMount() {
    this.requestFineLocation();

    AsyncStorage.getItem('userIds').then(keyValue => {
      this.setState({userid: JSON.parse(keyValue)});
    });
    entity_id = this.props.outletId;
    itemName = this.props.ItemName;
    itemId = this.props.ItemId;
    this.state.ptr = this.props.ptr;
    this.state.bpc = this.props.bpc;
    BrandId = this.props.brandId;

    db.getUOMLable().then(data => {
      //[{"Value":"CS/BTL"}]
      var prod = [];
      for (var i = 0; i < data.length; i++) {
        //console.log("aaaa++++++++=", data[i].Value.split('/'))
        this.state.boxLable = data[i].Value.split('/')[0];
        this.state.unitLable = data[i].Value.split('/')[1];
        this.setState({boxLable: data[i].Value.split('/')[0]});
        this.setState({unitLable: data[i].Value.split('/')[1]});
        prod.push(data[i].Value.split('/')[0]);
        prod.push(data[i].Value.split('/')[1]);
      }
      //console.log("wwwwwwwww=",JSON.stringify(prod))
      for (var i = 0; i < prod.length; i++) {
        this.state.ratePerArr.push({name: prod[i]});
      }
      //
      if (this.state.boxLable.length == 0) {
        this.setState({editablebox: false});
        this.setState({backgroundbox: '#D2D2D2'});
      }

      if (this.state.unitLable.length == 0) {
        this.setState({editableunit: false});
        this.setState({backgroundunit: '#D2D2D2'});
      }
    });

    // alert(Collection_types)
    db.getOrdersFromDbIfPresent(
      entity_id,
      this.props.datacollection.collectiontype,
      this.props.ItemId,
    ).then(data => {
      //console.log("dbDatas=" + JSON.stringify(data))
      var item_ids = '';
      var rates = '';
      var amounts = '',
        boxs = '',
        units = '',
        freeBoxs = '',
        freeUnits = '',
        fromDates = '',
        toDates = '',
        selectedFlags = 1;
      if (data) {
        data.map((item, i) => {
          (item_ids = item.item_id),
            (rates = item.rate),
            (amounts = item.Amount),
            (boxs = item.quantity_one),
            (units = item.quantity_two),
            (freeBoxs = item.small_Unit),
            (freeUnits = item.large_Unit),
            (fromDates = item.from_date),
            (toDates = item.to_date),
            (selectedFlags = item.selected_flag),
            (orderIds = item.order_id);
        });
        //
        itemId = item_ids;
        currentDateTime = fromDates;
        this.setState({
          box: boxs,
          unit: units,
          enteredRate: rates,
          amount: amounts,
          freeBox: freeBoxs,
          freeUnit: freeUnits,
        });
      }
    });
  }
  //      onChangeEditval=(index,e)=>{
  //     for(var i=0;i<labels.length;i++){
  // if(index==0){
  //     this.setState({box:e})
  // }else if(index==1){
  //     this.setState({unit:e})
  //      } }
  //      }

  onChangeEnteredBox = input => {
    this.setState({box: input});
    this.state.box = input;
    // this.calculateAmount()
  };

  onChangeEnteredUnit = input => {
    this.setState({unit: input});
    this.state.unit = input;
    // this.calculateAmount()
  };

  applyClickHandler(e) {
    //request location
    let {dataCollected} = this.props.datacollection;
    this.getUserPosition();
    // let {totalOrderValue} = this.props.createOrder
    //console.log("even val=",this.props.datacollection.dataCollected)
    const {box, unit, ptr, bpc, amount} = this.state;
    var quntity;
    //getAmount=box,unit,ptr(pitem),Bpc(pitem)
    if (this.state.box > 0 || this.state.unit > 0) {
      //set if not to 0
      let boxLength = this.state.box.length;
      let unitLength = this.state.unit.length;
      let freeBoxLength = this.state.freeBox.length;
      let freeUnitLength = this.state.freeUnit.length;
      let bpcLength = this.state.bpc.length;
      let ptrLength = this.state.ptr.length;
      let userLatLength = this.state.userLatitude.length;
      let userLongLength = this.state.userLongitude.length;
      let enteredRateLenght = this.state.enteredRate.length;
      // let enteredDiscountLength=this.state.enteredDiscount.length

      // let boxLength = this.state.box.length

      if (boxLength == '0') {
        this.state.box = '0';
      }
      if (unitLength == '0') {
        //console.log("lennnnnnnnnnnnnn= inn", unitLength)
        this.state.unit = '0';
      }
      if (freeBoxLength == 0) {
        this.state.freeBox = '0';
      }
      if (freeUnitLength == 0) {
        this.state.freeUnit = '0';
      }
      if (bpcLength == 0) {
        this.state.bpc = '0';
      }
      if (ptrLength == 0) {
        this.state.ptr = '0';
      }
      if (userLatLength == 0) {
        this.state.userLatitude = '0';
      }
      if (userLongLength == 0) {
        this.state.userLongitude = '0';
      }
      if (enteredRateLenght == 0) {
        this.state.enteredRate = '0';
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      db.checkIsOrderIdInDb(
        entity_id,
        this.props.datacollection.collectiontype,
        this.props.dashboard.userId,
      ).then(data => {
        //console.log("checkIsOrderIdInDb=", JSON.stringify(data))

        this.state.isOrderIdExists = [];
        this.setState({isOrderIdExists: data});

        //console.log("checkIsOrderIdInDblent=", this.state.isOrderIdExists.length)
        if (this.state.isOrderIdExists.length == '0') {
          //console.log("innn if orderId not exist insert order")

          var that = this;
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
          app_order_id =
            date +
            '/' +
            month +
            '/' +
            year +
            ' ' +
            hours +
            ':' +
            min +
            ':' +
            sec;
          app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, '');

          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month

          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
          currentDateTime =
            year +
            '-' +
            month +
            '-' +
            date +
            ' ' +
            hours +
            ':' +
            min +
            ':' +
            sec;
          //console.log("current datetime=", currentDateTime)

          //console.log("app order id=", app_order_id)
          AsyncStorage.setItem('app_order_idDC', JSON.stringify(app_order_id));
          db.insertTABLE_TEMP_OrderMaster(
            app_order_id,
            currentDateTime,
            this.props.datacollection.entityType,
            entity_id,
            this.state.userLatitude,
            this.state.userLongitude,
            this.state.amount,
            this.props.datacollection.collectiontype,
            this.props.dashboard.userId,
            1,
          );

          AsyncStorage.setItem('app_order_idDC', JSON.stringify(app_order_id));

          ///////////////////new
          db.selectTempMasterDetailId(this.props.ItemId, app_order_id).then(
            dataId => {
              //console.log("innn selectTempMasterDetailId", JSON.stringify(dataId))
              if (dataId.length == 0) {
                //  //console.log("inm ifff sara........", this.props.createOrder.totalOrderValue)
                AsyncStorage.setItem(
                  'app_order_idDC',
                  JSON.stringify(app_order_id),
                );

                db.insertTABLE_TEMP_ORDER_DETAILSDC(
                  app_order_id,
                  this.props.ItemId,
                  itemName,
                  this.state.box,
                  this.state.unit,
                  this.state.freeBox,
                  this.state.freeUnit,
                  this.props.datacollection.fromDate,
                  this.props.datacollection.toDate,
                  this.state.enteredRate,
                  this.state.bpc,
                  this.state.amount,
                  '1',
                  'true',
                  BrandId,
                  entity_id,
                  this.props.datacollection.collectiontype,
                ).then(data => {
                  dataCollected++;
                  this.props.collectedData(dataCollected);
                  this.props.SublistExtendedParent(this.props.ItemId);
                });
              } else {
                //console.log("inm else........", this.state.detail_order_id.length)
                AsyncStorage.setItem(
                  'app_order_idDC',
                  JSON.stringify(app_order_id),
                );
                db.updateTABLE_TEMP_ORDER_DETAILSDC(
                  this.state.box,
                  this.state.unit,
                  this.state.freeBox,
                  this.state.freeUnit,
                  currentDateTime,
                  '',
                  this.state.amount,
                  this.state.enteredRate,
                  'true',
                  app_order_id,
                  this.props.ItemId,
                );
                this.props.SublistExtendedParent(this.props.ItemId);
              }
            },
          );

          //    })

          /////////////////////////////////
        } else {
          //console.log("innn else if orderId exist select from temp order master")
          //getting id from  tabletempordermaster
          db.getInsertedTableTempOrderMasterId(
            entity_id,
            this.props.datacollection.collectiontype,
            this.props.dashboard.userId,
          ).then(data => {
            //console.log("innn id from temp order master", JSON.stringify(data[0].id))
            app_order_id = data[0].id;
            //console.log("sara==IdMain1", app_order_id)
            //return app_order_id

            db.checkIsRowExistInTempMasterTable(
              app_order_id,
              this.props.datacollection.collectiontype,
            ).then(datalen => {
              //console.log("innn checkIsRowExistInTempMasterTable=", JSON.stringify(datalen))
              this.state.isOrderIdExistsnew = datalen;
              this.state.isOrderIdExistsnew = [];
              this.setState({isOrderIdExistsnew: datalen});

              for (var i = 0; i < this.state.isOrderIdExistsnew.length; i++) {
                app_order_id = '';
                app_order_id = this.state.isOrderIdExistsnew[0].id;
              }
              //console.log("ooorder=", app_order_id)
              AsyncStorage.setItem(
                'app_order_idDC',
                JSON.stringify(app_order_id),
              );
              if (this.state.isOrderIdExistsnew.length) {
                //row len
                db.selectTempMasterDetailId(
                  this.props.ItemId,
                  app_order_id,
                ).then(dataId => {
                  //console.log("innn selectTempMasterDetailId", JSON.stringify(dataId))
                  if (dataId.length == 0) {
                    //console.log("A........", this.state.detail_order_id.length)
                    AsyncStorage.setItem(
                      'app_order_idDC',
                      JSON.stringify(app_order_id),
                    );
                    //order_id ,item_id ,item_Name ,quantity_one ,quantity_two,small_Unit,large_Unit,from_date ,to_date ,rate ,bpc ,Amount,selected_flag,bottleQty
                    db.insertTABLE_TEMP_ORDER_DETAILSDC(
                      app_order_id,
                      this.props.ItemId,
                      itemName,
                      this.state.box,
                      this.state.unit,
                      this.state.freeBox,
                      this.state.freeUnit,
                      currentDateTime,
                      '',
                      this.state.enteredRate,
                      this.state.bpc,
                      this.state.amount,
                      '1',
                      'true',
                      BrandId,
                      entity_id,
                      this.props.datacollection.collectiontype,
                    );
                    dataCollected++;
                    this.props.collectedData(dataCollected);
                    this.props.SublistExtendedParent(this.props.ItemId);
                  } else {
                    //console.log("inm else........", this.state.detail_order_id.length)
                    AsyncStorage.setItem(
                      'app_order_idDC',
                      JSON.stringify(app_order_id),
                    );
                    db.updateTABLE_TEMP_ORDER_DETAILSDC(
                      this.state.box,
                      this.state.unit,
                      this.state.freeBox,
                      this.state.freeUnit,
                      currentDateTime,
                      '',
                      this.state.amount,
                      this.state.enteredRate,
                      'true',
                      app_order_id,
                      this.props.ItemId,
                    );
                    this.props.SublistExtendedParent(this.props.ItemId);
                  }
                });
              }
            });
          });
        }
      });
      //console.log("sara==IdMain2=", JSON.stringify(this.state.isOrderIdExistsnew))
    } else {
      alert('Please Enter the any of Box and Unit');
    }
  }
  deleteClickHandler(e) {
    let {dataCollected} = this.props.datacollection;
    db.deleteRowItemDC(
      app_order_id,
      this.props.ItemId,
      this.props.datacollection.collectiontype,
    );

    dataCollected--;
    this.props.collectedData(dataCollected);

    this.props.refresh(app_order_id, this.props.ItemId);
    db.getOrdersFromDbIfPresent(
      entity_id,
      this.props.datacollection.collectiontype,
      this.props.ItemId,
    ).then(data => {
      //console.log("dbDatas=" + JSON.stringify(data))
      var item_ids = '';
      var rates = '';
      var amounts = '',
        boxs = '',
        units = '',
        freeBoxs = '',
        freeUnits = '',
        fromDates = '',
        toDates = '',
        selectedFlags = 1;
      if (data) {
        data.map((item, i) => {
          (item_ids = item.item_id),
            (rates = item.rate),
            (amounts = item.Amount),
            (boxs = item.quantity_one),
            (units = item.quantity_two),
            (freeBoxs = item.small_Unit),
            (freeUnits = item.large_Unit),
            (fromDates = item.from_date),
            (toDates = item.to_date),
            (selectedFlags = item.selected_flag);
        });
        //
        itemId = item_ids;
        currentDateTime = fromDates;
        this.setState({
          box: boxs,
          unit: units,
          enteredRate: rates,
          amount: amounts,
          freeBox: freeBoxs,
          freeUnit: freeUnits,
        });
      }
    });
  }

  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getUserPosition();
        } else {
          this.requestFineLocation();
        }
      } else {
        this.getUserPosition();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async getUserPosition() {
    this.setState({hasMapPermission: true});
    // this.locationWatchId = Geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(pos => {
      //  alert(pos.coords.latitude)
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
      //console.log(this.state.userLatitude)
    });
  }
  render() {
    const {navigation} = this.props;

    if (this.props.datacollection.radiovalue == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.oredrFreeMainContainer}>
            <View style={styles.orderFreeColumnContainer}>
              <Text style={styles.orderTextStyle}>Sale</Text>
            </View>

            <View style={styles.boxColumnContainer}>
              <Text style={styles.boxTextStyle}>{this.state.boxLable}</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="0"
                autoFocus="true"
                style={[
                  styles.boxTextBoxStyle,
                  {backgroundColor: this.state.backgroundbox},
                ]}
                value={this.state.box}
                editable={this.state.editablebox}
                onChangeText={input => this.onChangeEnteredBox(input)}
              />
              {/* <TextInput
                        keyboardType= "numeric"
                        placeholder="0"
                        autoFocus = "Yes"
                        style={styles.boxTextBoxStyle}
                        value={this.state.freeBox}                            
                        onChangeText={(freeBox) => this.setState({ freeBox })}
                       
                    /> */}
            </View>

            <View style={styles.unitColumContainer}>
              <Text style={styles.unitTextStyle}>{this.state.unitLable}</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="0"
                style={[
                  styles.unitTextBoxStyle,
                  {backgroundColor: this.state.backgroundunit},
                ]}
                value={this.state.unit}
                editable={this.state.editableunit}
                // onChangeText={(unit) => this.setState({ unit })}
                onChangeText={input => this.onChangeEnteredUnit(input)}
              />
              {/* <TextInput
                        keyboardType= "numeric"
                        placeholder="0"
                        style={styles.unitTextBoxStyle}
                        value={this.state.freeUnit}
                        autoFocus = "Yes"
                        onChangeText={(freeUnit) => this.setState({ freeUnit })}
                    /> */}
            </View>
          </View>

          {/* Dash Line */}
          <View style={styles.dashLineContainer}>
            <Dash
              style={styles.dashLineStyle}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>

          <View style={styles.applyDeleteMainContainer}>
            {/* <View style={styles.applyImgContainer}>
                        <Image style={styles.applyImgStyle}
                            source={require('../../assets/Icons/apply_green.png')}
                        />
                    </View>

                    <TouchableOpacity style={styles.applyTextContainer} onPress={(e) => this.applyClickHandler(e)}>
                        <Text style={styles.applyTextStyle}>
                            APPLY
                    </Text>
                    </TouchableOpacity> */}

            <View style={styles.applyMainContainer}>
              <TouchableOpacity onPress={e => this.applyClickHandler(e)}>
                <View style={styles.applyContainer}>
                  <View style={styles.applyImgContainer}>
                    <Image
                      style={styles.applyImgStyle}
                      source={require('../../assets/Icons/apply_green.png')}
                    />
                  </View>

                  <View style={styles.applyTextContainer}>
                    <Text style={styles.applyTextStyle}>APPLY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.deleteImgContainer}>
                        <Image style={styles.deleteImgStyle}
                            source={require('../../assets/Icons/delete_red.png')}
                        />
                    </View>

                    <TouchableOpacity style={styles.applyTextContainer} onPress={(e) => this.deleteClickHandler(e)}>
                        <Text style={styles.deleteTextStyle}>
                            DELETE
                    </Text>
                    </TouchableOpacity> */}

            <View style={styles.deleteMainContainer}>
              <TouchableOpacity onPress={e => this.deleteClickHandler(e)}>
                <View style={styles.deleteContainer}>
                  <View style={styles.deleteImgContainer}>
                    <Image
                      style={styles.deleteImgStyle}
                      source={require('../../assets/Icons/delete_red.png')}
                    />
                  </View>
                  <View style={styles.deleteTextContainer}>
                    <Text style={styles.deleteTextStyle}>DELETE</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dashLineContainer}>
            <Dash
              style={styles.dashLineStyle}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>
          {/* </ScrollView> */}
        </View>
      );
    } else if (this.props.datacollection.radiovalue == 1) {
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
                keyboardType="numeric"
                placeholder="0"
                autoFocus="true"
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
                keyboardType="numeric"
                placeholder="0"
                style={styles.rateTextBoxStyleStock}
                value={this.state.unit}
                editable={this.state.editableunit}
                // onChangeText={(unit) => this.setState({ unit })}
                onChangeText={input => this.onChangeEnteredUnit(input)}
              />
            </View>
          </View>

          <View style={styles.dashLineContainerStock}>
            <Dash
              style={styles.dashLineStyleStock}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>

          <View style={styles.applyDeleteMainContainer}>
            {/* <View style={styles.applyImgContainer}>
                    <Image style={styles.applyImgStyle} 
                                source={require('../../assets/Icons/apply_green.png')}
                    /> 
                </View>
                <TouchableOpacity style={styles.applyTextContainer}   onPress={(e) => this.applyClickHandler(e)}>
                    <Text style={styles.applyTextStyle}> 
                        APPLY 
                    </Text>
                </TouchableOpacity> */}
            <View style={styles.applyMainContainer}>
              <TouchableOpacity onPress={e => this.applyClickHandler(e)}>
                <View style={styles.applyContainer}>
                  <View style={styles.applyImgContainer}>
                    <Image
                      style={styles.applyImgStyle}
                      source={require('../../assets/Icons/apply_green.png')}
                    />
                  </View>

                  <View style={styles.applyTextContainer}>
                    <Text style={styles.applyTextStyle}>APPLY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.deleteMainContainer}>
              <TouchableOpacity onPress={e => this.deleteClickHandler(e)}>
                <View style={styles.deleteContainer}>
                  <View style={styles.deleteImgContainer}>
                    <Image
                      style={styles.deleteImgStyle}
                      source={require('../../assets/Icons/delete_red.png')}
                    />
                  </View>
                  <View style={styles.deleteTextContainer}>
                    <Text style={styles.deleteTextStyle}>DELETE</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dashLineContainer2Stock}>
            <Dash
              style={styles.dashLineStyle2Stock}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    datacollection: state.datacollection,
  };
};

const mapDispatchToProps = dispatch => ({
  collectedData: collecteddata => {
    dispatch(TOTAL_DATA_COLLECTED(collecteddata));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditInlineDataCollection);
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
    marginHorizontal: wp('0'),
  },

  orderTextStyle: {
    marginTop: hp('8'),
    color: '#796A6A',
    fontSize: wp('3%'),
    fontFamily: 'Proxima Nova',
  },

  freeTextStyle: {
    marginTop: hp('1'),
    color: '#796A6A',
    fontSize: wp('3%'),
    fontFamily: 'Proxima Nova',
    marginTop: hp('4'),
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
    padding: 10,
    height: hp('5.5'),
    width: wp('30'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('1'),
    backgroundColor: '#ffffff',
    marginLeft: wp('-8'),
    marginRight: wp('10'),
    marginTop: hp('1'),
    textAlign: 'center',
    padding: 5,
  },

  unitColumContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  unitTextStyle: {
    color: '#796A6A',
    fontSize: wp('3%'),
    fontFamily: 'Proxima Nova',
    marginHorizontal: wp('10'),
    fontWeight: 'bold',
  },

  unitTextBoxStyle: {
    padding: 10,
    height: hp('5.5'),
    width: wp('30'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('1'),
    backgroundColor: '#ffffff',
    marginLeft: wp('0'),
    marginRight: wp('10'),
    marginTop: hp('1'),
    textAlign: 'center',
    padding: 5,
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

  totalAmntMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('3'),
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
    marginLeft: wp('2'),
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
    // marginLeft: wp('1')
    marginRight: wp('3'),
  },

  applyDeleteMainContainer: {
    flex: 1,
    marginTop: hp('2'),
    flexDirection: 'row',
    marginBottom: hp('1'),
  },

  applyMainContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    marginLeft: wp('9'),
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
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('-2.6'),
  },

  containerStock: {
    flex: 1,
  },

  innerContainerStock: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: wp('2'),
  },

  dropOuterMainContainerStock: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('2'),
    justifyContent: 'center',
  },

  labelNameStyle: {
    color: '#796A6A',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  textInputMainContainerStock: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: hp('1'),
  },

  rateTextBoxStyleStock: {
    height: hp('6'),
    width: wp('38'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('1'),
    backgroundColor: '#ffffff',
    marginRight: wp('-2'),
    marginTop: hp('0'),
    textAlign: 'center',
    marginRight: wp('1'),
    padding: 5,
  },

  dashLineContainerStock: {
    flex: 1,
    marginTop: hp('1'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyleStock: {
    width: wp('85'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  dashLineContainer2Stock: {
    flex: 1,
    marginTop: hp('4'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle2Stock: {
    width: wp('89'),
    height: hp('1'),
    color: '#ADA2A2',
  },
});

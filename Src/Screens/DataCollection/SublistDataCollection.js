import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Button} from 'react-native';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import EditInlineDataCollection from './EditInlineDataCollection';

import Database from './../../utility/Database';
import {connect} from 'react-redux';
const db = new Database();
var id,
  search,
  list1,
  JoinString,
  outletId = '';

const list = [
  {
    name: 'Name of SubBrand Name of SubBrand  Name of SubBrand ',
    amount: '12 6BC',
    button: 'EDIT',
  },
  {
    name: 'Name of SubBrand',
    amount: '',
    button: 'ADD',
  },
];

export class SublistDataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'false',
      collapsed: false,
      subBrand: [],
      IsSelectedBrandProduct: null,
      IsSelectedBrand: null,
      list: [],
      list2: [],
      finalSubBrandList: [],
      bottles: '',
      refresh: '',
      refreshDelete: false,
      Collection_type: '',
    };
  }

  refreshDelete(app_order_id, ItemId) {
    const {navigation} = this.props;
    this.setState({refreshDelete: 'true'});
    outletId = this.props.outletId;
    id = this.props.id;
    search = this.props.search;
    list1 = this.props.list1;
    JoinString = this.props.JoinString;

    db.getSubBrandSearchData(id, search, list1, JoinString).then(data => {
      this.state.list = [];
      this.setState({
        list: data,
      });
    });
    db.getOrderDataForAddEdit1(
      outletId,
      this.props.datacollection.collectiontype,
    ).then(data => {
      // //console.log("bbb",JSON.stringify(data))
      this.state.list2 = [];
      this.setState({list2: data});

      for (var i = 0; i < this.state.list.length; i++) {
        //    //console.log("outer")
        for (var j = 0; j < this.state.list2.length; j++) {
          if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
            //  //console.log("return true........",this.state.list[i])
            this.state.list[i].quantity_one = this.state.list2[j].quantity_one;
            this.state.list[i].quantity_two = this.state.list2[j].quantity_two;
            this.state.list[i].bottleQty = this.state.list2[j].bottleQty;
          }
        }
      }
      ////console.log("finalArayyy=",this.state.list)
      this.setState({list: this.state.list});
    });
  }

  componentWillMount() {
    const {navigation} = this.props;
    outletId = this.props.outletId;
    id = this.props.id;
    search = this.props.search;
    list1 = this.props.list1;
    JoinString = this.props.JoinString;

    db.getSearchProdect().then(data => {
      var prod = [];
      prod = data;
      list1 = prod.map(function(el) {
        return el.Value;
      });

      JoinString = list1.join('|');
    });
    console.log(
      '\n\n\n list data alalalalalalalala\n\n\n\n',
      list1,
      search,
      id,
      outletId,
      JoinString,
    );
    db.getSubBrandSearchData(id, search, list1, JoinString, outletId).then(
      data => {
        //console.log("aaaa",JSON.stringify(data))
        this.state.list = [];
        this.setState({list: data});
      },
    );
    console.log('getSubBrandSearchData: ', this.state.list);
    db.getOrderDataForAddEdit1(
      outletId,
      this.props.datacollection.collectiontype,
    ).then(data => {
      //console.log("bbb",JSON.stringify(data))
      this.state.list2 = [];
      this.setState({list2: data});

      for (var i = 0; i < this.state.list.length; i++) {
        // //console.log("outer")
        for (var j = 0; j < this.state.list2.length; j++) {
          // //console.log("ineer")
          // //console.log("a==",this.state.list[i].ItemId)
          // //console.log("b==",this.state.list2[j].item_id)
          if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
            //  //console.log("return true........",this.state.list[i])
            this.state.list[i].quantity_one = this.state.list2[j].quantity_one;
            this.state.list[i].quantity_two = this.state.list2[j].quantity_two;
            this.state.list[i].bottleQty = this.state.list2[j].bottleQty;
          }
        }
      }
      ////console.log("finalArayyy=",this.state.list)
      this.setState({list: this.state.list}, () =>
        console.log('getOrderDataForAddEdit1: ', this.state.list),
      );
    });
  }
  ComputeBottls(item_id) {
    //alert("caleeed...")

    outletId = this.props.outletId;
    id = this.props.id;
    search = this.props.search;
    list1 = this.props.list1;
    JoinString = this.props.JoinString;
    db.getSubBrandSearchData(id, search, list1, JoinString).then(data => {
      this.state.list = [];
      this.setState({
        list: data,
      });
      //  //console.log("datasss=",this.state.list)
      db.getOrderDataForAddEdit1(
        outletId,
        this.props.datacollection.collectiontype,
      ).then(data => {
        //console.log("bbb",JSON.stringify(data))
        this.state.list2 = [];
        this.setState({list2: data});

        for (var i = 0; i < this.state.list.length; i++) {
          // //console.log("outer")
          for (var j = 0; j < this.state.list2.length; j++) {
            // //console.log("ineer")

            if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
              // //console.log("return true........",this.state.list[i])
              this.state.list[i].quantity_one = this.state.list2[
                j
              ].quantity_one;
              this.state.list[i].quantity_two = this.state.list2[
                j
              ].quantity_two;
              this.state.list[i].bottleQty = this.state.list2[j].bottleQty;
            }
          }
        }
        // //console.log("finalArayyy=",this.state.list)
        this.setState({list: this.state.list});
      });
      this.props.SublistExtendedParent();
    });
  }

  render() {
    const {navigation} = this.props;
    const ADD = <Text style={styles.buttonTextStyle}> ADD </Text>;
    const EDIT = <Text style={styles.buttonTextStyle}> EDIT</Text>;
    const AMOUNT = (
      <Text style={styles.amountTextStyle}>{this.state.bottles} </Text>
    );
    const NOAMOUNT = <Text style={styles.amountTextStyle}> </Text>;

    return (
      <View style={styles.Container}>
        {this.state.list.map((item, index) => (
          <Collapse>
            <CollapseHeader style={styles.listInnerContainer}>
              <View style={styles.nameOfBrandContainer}>
                <Text style={styles.nameTextStyle}>
                  {item.ITEMSEQUENCE.substr(5)}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountTextStyle}>{item.amount}</Text>

                <Text style={styles.buttonTextStyle}>
                  {item.bottleQty == 'true' ? (
                    <Text style={styles.amountTextStyle}>
                      {item.quantity_one + 'C' + item.quantity_two + 'B'}{' '}
                    </Text>
                  ) : (
                    <Text style={styles.amountTextStyle} />
                  )}
                  {item.bottleQty == 'true' ? EDIT : ADD}
                </Text>
              </View>
            </CollapseHeader>

            <CollapseBody>
              <ListItem>
                <EditInlineDataCollection
                  navigation={navigation}
                  radioVal2={this.props.navigation.state.params.valueRadio}
                  ItemName={item.ITEMSEQUENCE}
                  ItemId={item.ItemId}
                  ptr={item.PTR}
                  bpc={item.BPC}
                  outletId={outletId}
                  brandId={this.props.id}
                  SublistExtendedParent={this.ComputeBottls.bind(this)}
                  refresh={this.refreshDelete.bind(this)}
                />
              </ListItem>
            </CollapseBody>
          </Collapse>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    datacollection: state.datacollection,
  };
};

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SublistDataCollection);

const styles = StyleSheet.create({
  Container: {
    marginTop: hp('-2'),
    alignItems: 'center',
    alignSelf: 'center',
  },

  listInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('1'),
    height: hp('8'),
    width: wp('88'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: hp('0.2'),
    marginLeft: wp('1.5'),
    marginTop: hp('-0.5'),
  },

  nameOfBrandContainer: {
    flex: 3.2, //28-03
    alignItems: 'flex-start',
  },

  nameTextStyle: {
    // flex:1,
    // marginLeft:wp('5'),
    // fontFamily: 'Proxima Nova',
    // fontSize: wp('3'),
    // color:'#362828',
    marginLeft: wp('8'),
    marginRight: wp('1'),
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    color: '#362828',
  },

  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: wp('3'),
  },

  amountTextStyle: {
    marginRight: wp('3'),
    color: '#CC1167',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    fontWeight: 'bold',
  },

  buttonTextStyle: {
    color: '#3955CB',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

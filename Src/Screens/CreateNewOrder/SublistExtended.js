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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
import EditInlineOnCreateNewOrder from './EditInlineOnCreateNewOrder';

import Database from './../../utility/Database';
const db = new Database();
import {Actions} from 'react-native-router-flux';
import {InputAutoSuggest} from 'react-native-autocomplete-search';

var id,
  search,
  list1,
  JoinString,
  outletId = '';

export default class SublistExtended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'false',
      subBrand: [],
      IsSelectedBrandProduct: null,
      IsSelectedBrand: null,
      list: [],
      list2: [],
      finalSubBrandList: [],
      bottles: '',
      refresh: '',
      refreshDelete: false,
    };
  }

  componentDidMount() {}

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
    db.getOrderDataForAddEdit1(outletId, '0').then(data => {
      this.state.list2 = [];
      this.setState({list2: data});

      for (var i = 0; i < this.state.list.length; i++) {
        for (var j = 0; j < this.state.list2.length; j++) {
          if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
            this.state.list[i].quantity_one = this.state.list2[j].quantity_one;
            this.state.list[i].quantity_two = this.state.list2[j].quantity_two;
            this.state.list[i].bottleQty = this.state.list2[j].bottleQty;
          }
        }
      }

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

    console.log('all data for testing', outletId, id, search, JoinString);
    db.getSearchProdect().then(data => {
      var prod = [];
      prod = data;
      list1 = prod.map(function(el) {
        return el.Value;
      });

      JoinString = list1.join('|');
    });
    db.getSubBrandSearchData(id, search, list1, JoinString, outletId).then(
      data => {
        this.state.list = [];
        this.setState({list: data});
      },
    );

    db.getOrderDataForAddEdit1(outletId, '0').then(data => {
      this.state.list2 = [];
      this.setState({list2: data});
      for (var i = 0; i < this.state.list.length; i++) {
        for (var j = 0; j < this.state.list2.length; j++) {
          if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
            this.state.list[i].quantity_one = this.state.list2[j].quantity_one;
            this.state.list[i].quantity_two = this.state.list2[j].quantity_two;
            this.state.list[i].bottleQty = this.state.list2[j].bottleQty;
          }
        }
      }

      this.setState({list: this.state.list});
    });
  }
  ComputeBottls(item_id) {
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

      db.getOrderDataForAddEdit1(outletId, '0').then(data => {
        this.state.list2 = [];
        this.setState({list2: data});
        for (var i = 0; i < this.state.list.length; i++) {
          for (var j = 0; j < this.state.list2.length; j++) {
            if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
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
                {item.bottleQty == 'true' ? (
                  <Text style={styles.amountTextStyle}>
                    {item.quantity_one + 'C' + item.quantity_two + 'B'}{' '}
                  </Text>
                ) : (
                  <Text style={styles.amountTextStyle} />
                )}
                {item.bottleQty == 'true' ? EDIT : ADD}
              </View>
            </CollapseHeader>
            <CollapseBody>
              <ListItem>
                <EditInlineOnCreateNewOrder
                  navigation={navigation}
                  ItemName={item.ITEMSEQUENCE}
                  ItemId={item.ItemId}
                  ptr={item.PTR}
                  bpc={item.BPC}
                  outletId={outletId}
                  BrandId={this.props.id}
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

const styles = StyleSheet.create({
  Container: {
    flex: 1,
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
    // marginLeft: wp('2.5'),
    marginTop: hp('-0.5'),
  },

  nameTextStyle: {
    marginLeft: wp('9'),
    fontFamily: 'Proxima Nova',
    fontSize: wp('3'),
    color: '#362828',
  },
  nameOfBrandContainer: {
    flex: 3.2,
    alignItems: 'flex-start',
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
    //  fontSize: wp('3'),
    fontWeight: 'bold',
    fontSize: 12,
  },

  buttonTextStyle: {
    color: '#3955CB',
    fontFamily: 'Proxima Nova',
    //    fontSize: wp('3'),
    fontWeight: 'bold',
    fontSize: 10,
  },
});

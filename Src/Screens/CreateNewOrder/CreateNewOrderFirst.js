import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import Search from 'react-native-search-box';
import {Searchbar, Button} from 'react-native-paper';

import _ from 'lodash';
import NextButton from '../../components/NextButton';
import ShopDetail from './ShopDetail';

import {onChange} from 'react-native-reanimated';
import {Actions} from 'react-native-router-flux';
import Autocomplete from 'react-native-autocomplete-input';
import {USER_ID} from '../../Redux/actions/DashboardAction';
import Database from './../../utility/Database';
import {connect} from 'react-redux';
const db = new Database();

const entity = [
  {
    value: 'Retailer',
    id: 1,
  },
  {
    value: 'Distributor',
    id: 2,
  },
];
typingTimer = null;

var selectedStartDate1;
export class CreateNewOrderFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beatData: [],
      DistributorData: [],
      selectedBeat: '',
      selectedDist: '',
      selectedBeatId: '',
      selectedOutletId: '',
      shopDetailFlag: 'false',
      outletarray: [],
      shopInput: '',
      name: '',
      entity: 'Retailer',
      typing: false,
      typingTimeout: 0,
      films: [],
      visiblecal1: '',
      getRouteId: '',
      films1: [{"party":"Add New Outlet"}],
      films2: [],
      query: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    AsyncStorage.setItem('entityType', '1');
  }

  static navigationOptions = {
    title: 'Create New Order',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      marginLeft: wp('-2'),
      fontSize: 20,
    },

    //  headerLeft: <Icon  name="ios-arrow-round-back" size={20} color="white"    padding='20'
    //               onPress={ () => { Actions.Dashboard() }}   />

    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => Actions.Dashboard()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  componentWillMount() {
    AsyncStorage.getItem('userIds').then(keyValue => {
      //console.log("UserIddd=", JSON.parse((keyValue)))
      this.props.userid(JSON.parse(keyValue));
    });
    AsyncStorage.getItem('username').then(
      keyValue => {
        //console.log("Name", JSON.parse((keyValue)))
        const user = JSON.parse(keyValue);
        this.setState({username: user});
      },
      error => {
        //console.log(error) //Display error
      },
    );

    db.getBeatData().then(data => {
      //  beatdata = data
      this.state.beatData = [];
      this.setState({beatData: data});
      console.log('beat : ' + this.state.beatData);
    });
    db.getDistributorData().then(data => {
      //  dist = data
      this.state.DistributorData = [];
      this.setState({DistributorData: data});
    });

    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this._componentFocused();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }
  // this._sub = this.props.navigation.addListener(
  //     'didFocus',
  //     this._componentFocused
  // );

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    Actions.drawerMenu();
    return true;
  }
  _componentFocused() {
    db.getAllData().then(data => {});
    //  alert(this.props.dashboard.userId)
    AsyncStorage.getItem('beatName').then(keyValue => {
      if (keyValue) {
        //  alert(JSON.parse(keyValue))
        this.setState({selectedBeat: JSON.parse(keyValue)});
        this.state.selectedBeat = JSON.parse(keyValue);
        db.getRouteId(this.state.selectedBeat).then(data => {
          const abc = JSON.parse(data);
          let result = abc.map(a => a.RouteID);
          this.setState({getRouteId: result});
          getRouteId = JSON.parse(result);

          db.getOutletArray(this.state.getRouteId).then(data => {
            var getOutletArray = data;
            this.setState({films2: getOutletArray});

            this.setState({
              films: [...this.state.films1, ...this.state.films2],
            });
            //console.log("filmsArray.....",JSON.stringify(this.state.films))
          });
        });
      } else {
        this.state.selectedBeat = '';
        this.setState({selectedBeat: ''});
      }
    });
    AsyncStorage.getItem('outletName').then(keyValue => {
      if (keyValue) {
        this.state.query = JSON.parse(keyValue);
        this.setState({query: JSON.parse(keyValue)});
      } else {
        this.state.query = '';
        this.setState({query: ''});
      }
    });

    AsyncStorage.getItem('distributorName').then(keyValue => {
      // alert(JSON.parse(keyValue))
      if (keyValue) {
        this.state.selectedDist = JSON.parse(keyValue);
        this.setState({selectedDist: JSON.parse(keyValue)});
      } else {
        this.state.selectedDist = '';
        this.setState({selectedDist: ''});
      }
    });
  }

  componentWillUnmount() {
    (this.state.selectedBeat = ''), (this.state.selectedBeatId = '');
    this.state.selectedDist = '';
    this.state.query = '';
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  // handleBackButtonClick() {
  //   Actions.drawerMenu();
  //   return true;
  // }

  _renderEntity() {
    return (
      <Dropdown
        //  dropdownPosition={-5.4}
        dropdownOffset={{top: 15, left: 18}}
        animationDuration={0}
        itemCount={4}
        value={'Retailer'}
        fontSize={12}
        itemColor="#ADA2A2"
        containerStyle={styles.dropDownContainer}
        pickerStyle={{width: wp('87.3')}}
        rippleCentered={true}
        rippleOpacity={0}
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        data={entity}
        onChangeText={value => {
          this.onChangeHandlerEntity(value);
        }}
      />
    );
  }
  _renderBeat() {
    const beat = [];
    for (var i = 0; i < this.state.beatData.length; i++) {
      beat.push({
        value: this.state.beatData[i].RouteName,
      });
    }

    return (
      <Dropdown
        containerStyle={styles.dropDownContainer}
        animationDuration={0}
        rippleCentered={true}
        itemColor="#ADA2A2"
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        pickerStyle={{width: wp('87.3')}}
        rippleOpacity={0}
        fontSize={12}
        //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
        placeholder="Select"
        dropdownPosition={-5.4}
        dropdownOffset={{top: 14, left: 18}}
        value={this.state.selectedBeat}
        itemCount={4}
        data={beat}
        onChangeText={value => {
          this.onChangeHandlerBeat(value);
        }}
      />
    );
  }
  _renderDistributor() {
    const beat = [];
    for (var i = 0; i < this.state.DistributorData.length; i++) {
      beat.push({
        value: this.state.DistributorData[i].Distributor,
      });
    }
    return (
      <Dropdown
        containerStyle={styles.dropDownContainer}
        animationDuration={0}
        rippleCentered={true}
        itemColor="#ADA2A2"
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        pickerStyle={{width: wp('87.3')}}
        rippleOpacity={0}
        fontSize={12}
        //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
        placeholder="Select"
        dropdownPosition={-5.3}
        dropdownOffset={{top: 14, left: 18}}
        value={this.state.selectedDist}
        itemCount={4}
        data={beat}
        onChangeText={value => {
          this.onChangeHandlerDistributor(value);
        }}
        // onChangeText={(value) => { this.setState({ selectedDist: value }) }}
      />
    );
  }
  onChangeHandlerEntity = value => {
    this.setState({entity: value});
    this.state.entity = value;

    if (value === 'Retailer') {
      AsyncStorage.setItem('entityType', '1');
    } else if (value == 'Distributor') {
      AsyncStorage.setItem('entityType', '2');
    }
  };

  onChangeHandlerBeat = value => {
    //alert(value)
    this.setState({selectedBeat: value});
    // AsyncStorage.setItem('outletName', "");
    // AsyncStorage.setItem('outletId', "");
    // AsyncStorage.setItem('SearchString', "");

    this.setState({query: ''});
    this.state.query = '';
    AsyncStorage.setItem('beatName', JSON.stringify(value));

    db.getRouteId(this.state.selectedBeat).then(data => {
      const abc = JSON.parse(data);
      let result = abc.map(a => a.RouteID);
      var getRouteId = '';
      getRouteId = JSON.parse(result);
      this.setState({getRouteId: result});
      AsyncStorage.setItem('beatId', JSON.stringify(getRouteId));
      this.state.selectedBeatId = getRouteId;
      db.getOutletArray(this.state.getRouteId).then(data => {
        this.state.films2 = [];
        this.setState({films2: data});
        this.state.films = [];

        this.setState({
          films: [...this.state.films1, ...this.state.films2],
        });
        console.log('films  : '+JSON.stringify(this.state.films))
      });
    });
  };
  onChangeHandlerDistributor = value => {
    AsyncStorage.setItem('distributorName', JSON.stringify(value));

    this.setState({selectedDist: value});
  };

  findFilm(query) {
    //method called everytime when we change the value of the input
    if (query === '') {
      //if the query is null then return blank
      this.state.shopDetailFlag == 'false';
      return [];
    }
    // if(this.state.selectedBeat){}else{alert("Please Select Beat")}
    // if(this.state.selectedBeat){
    const {films} = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input

    // var results = arrayName.filter(function(value) {
    //   return value.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
    // });
    return films.filter(
      film => film.party.toLowerCase().indexOf(query.toLowerCase()) >= 0,
    );
    //  return films.filter(film => film.party.search(query)>=1);

    // }else{
    //   alert("Please Select The Beat")
    // }
  }

  shopDetailss() {
    if (this.state.shopDetailFlag == 'true' && this.state.query.length) {
      if (this.state.query.length > 4) {
        return (
          <ShopDetail
            navigation={this.props.navigation}
            id={this.state.selectedOutletId}
          />
        );
      }
    } else {
      return <View />;
    }
  }
  onSelectedParty = (id, party) => {
    if (this.state.query.length) {
      if(party === 'Add New Outlet'){
        Actions.Shops();
      }else{
        this.setState({selectedOutletId: id});
        this.state.selectedOutletId = id;
        this.setState({query: party});
        this.setState({shopDetailFlag: 'true'});
        this.shopDetailss();
      }
     
    } else {
      this.setState({shopDetailFlag: 'false'});
    }

    AsyncStorage.setItem('outletName', JSON.stringify(party));
    AsyncStorage.setItem('outletId', JSON.stringify(id));
    // this.shopDetailss()
  };

  onchanges = text => {
    if (this.state.selectedBeat.length > 0) {
      this.setState({query: text});
    } else {
      // this.setState({ query:"" })
      this.setState({query: ''});
      alert('Please Select Beat First');
    }
  };
  searchComponent() {
    const {query} = this.state;

    const films = this.findFilm(query);

    const comp = (a, b) => a.toLowerCase().trim() == b.toLowerCase().trim();

    // films=films.length===1 && comp(query, films[0].party) ? [] : films
    if (this.state.entity == 'Retailer') {
      return (
        <View style={styles.searchResultContainer}>
          <Text
            style={{
              color: '#796A6A',
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova',
              marginHorizontal: wp('1'),
              fontSize: 10,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginLeft: wp('-68'),
            }}>
            {' '}
            CHOOSE OUTLET
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                inputContainerStyle={styles.inputContainerStyle}
                listStyle={styles.listStyle}
                //data to show in suggestion
                data={
                  films.length === 1 && comp(query, films[0].party) ? [] : films
                }
                //  data={films}
                //default value if you want to set something in input
                defaultValue={query}
                /*onchange of the text changing the state of the query which will trigger
                the findFilm method to show the suggestions*/
                //  onChangeText={text => this.setState({ query: text })
                // }D
                onChangeText={text => this.onchanges(text)}
                placeholder="Search"
                renderItem={({item, i}) => (
                  <TouchableHighlight
                    key={i}
                    onPress={() => this.onSelectedParty(item.id, item.party)}>
                      {
                        (item.party === 'Add New Outlet')  ? ( <Text style={styles.itemTextIndex0}>{item.party}</Text>) 
                        : ( <Text style={styles.itemText}>{item.party}</Text>)
                      }
                     {/* <Text style={styles.itemTextIndex0}>{item.party}</Text>  */}
                  </TouchableHighlight>
                )}
              />
            </View>
            <View style={styles.searchIconBG}>
              <Image
                source={require('../../assets/Icons/Search.png')}
                style={styles.searchIconStyle}
              />
            </View>
          </View>
          <View style={styles.descriptionContainer}>{this.shopDetailss()}</View>
        </View>
      );
    }
  }

  NextButton = () => {
    if (this.state.query) {
      //  if (this.state.selectedDist) {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
       var ActivityStart =year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
      
        AsyncStorage.setItem('ActivityStart', JSON.stringify(ActivityStart));
       
      Actions.CreateNewOrderSecond();
      // } else {
      //   alert('Please Select Distributor');
      // }
    } else {
      alert('Please Select Outlet');
    }
  };
  BeatView() {
    if (this.state.entity == 'Retailer') {
      return (
        <View style={styles.textDropdownContainer2}>
          <Text style={styles.headingTitleText}>CHOOSE BEAT</Text>
          {this._renderBeat()}
        </View>
      );
    }
    // else {
    //   return (
    //     <View style={styles.textDropdownContainer2}>
    //       <Text style={styles.headingTitleText}>CHOOSE BEAT</Text>
    //       {this._renderBeat()}
    //     </View>
    //   )
    // }
  }
  DistributorView() {
    return (
      <View style={styles.textDropdownContainer3}>
        <Text style={styles.headingTitleText}>SELECT DISTRIBUTOR</Text>
        {this._renderDistributor()}
      </View>
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.textDropdownContainer}>
              <Text style={styles.headingTitleText}>ENTITY TYPE</Text>
              {this._renderEntity()}
            </View>

            {this.BeatView()}

            <View style={styles.textDropdownContainer2}>
              <View style={styles.searchResultContainer}>
                {this.searchComponent()}
                <View />
              </View>
            </View>
            {this.DistributorView()}
          </ScrollView>
          <View>
            <TouchableHighlight onPress={this.NextButton.bind(this)}>
              <NextButton />
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
  };
};

const mapDispatchToProps = dispatch => ({
  userid: val => {
    dispatch(USER_ID(val));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewOrderFirst);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textDropdownContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    marginTop: hp('3'),
    //   marginVertical: hp('3'),
    marginHorizontal: wp('5'),
  },
  textDropdownContainer2: {
    flexGrow: 1,
    marginTop: hp('0'),
    alignItems: 'flex-start',
    marginHorizontal: wp('5'),
  },
  textDropdownContainer3: {
    flexGrow: 1,
    marginTop: hp('3.5'),
    alignItems: 'flex-start',
    marginHorizontal: wp('5'),
  },

  headingTitleText: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    marginHorizontal: wp('1'),
    fontSize: 10,
    alignItems: 'flex-start',
  },

  dropDownContainer: {
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    width: wp('88'),
    height: hp('9'),
    marginTop: hp('1'),
    marginVertical: hp('3'),
    marginHorizontal: wp('1'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: hp('2'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 15,
  },

  SearchContainer: {
    backgroundColor: '#F5FCFF',
  },

  searchResultContainer: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },

  inputContainerStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    height: hp('9'),
    width: wp('80'),
    fontSize: 12,
    padding: 10,
    marginTop: hp('1'),
    marginLeft: wp('1.5'),
    borderRightWidth: hp('0'),
    borderTopRightRadius: wp('0'),
    borderBottomRightRadius: wp('0'),
    textAlign: 'center',
    justifyContent: 'center',
  },

  searchIconBG: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: hp('9'),
    width: wp('8.5'),
    justifyContent: 'center',
    marginTop: wp('1.8'),
    marginLeft: wp('-0.9'),
    borderRightWidth: hp('0.25'),
    borderTopWidth: hp('0.25'),
    borderBottomWidth: hp('0.25'),
    borderTopRightRadius: wp('2'),
    borderTopLeftRadius: wp('0'),
    borderBottomRightRadius: wp('2'),
    borderBottomLeftRadius: wp('0'),
    borderColor: '#E6DFDF',
    textAlign: 'center',
    justifyContent: 'center',
  },

  searchIconStyle: {
    marginRight: wp('5'),
  },

  descriptionContainer: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: hp('0.8'),
    alignContent: 'flex-start',
  },

  itemText: {
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft : wp('2'),
    margin: 4,
    fontFamily: 'Proxima Nova',
    color :'#8C7878'
  },
  itemTextIndex0: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    paddingLeft : wp('2'),
    margin: 4,
    color :'#8C7878'
  },
  itemSubText: {
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
    marginLeft: 10,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  listStyle: {
    position: 'relative',
    zIndex: 999,
    padding: 10,
    width: wp('77'),
    fontSize: 12,
  },
});

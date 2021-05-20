import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import Autocomplete from 'react-native-autocomplete-input';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Dropdown} from 'react-native-material-dropdown';
import Database from './../../utility/Database';
import {connect} from 'react-redux';
const db = new Database();
import CalendarPicker from 'react-native-calendar-picker';
import NextButton from '../../components/NextButton';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import moment from 'moment';
import User from '../../utility/User';
import {
  RADIOBUTTONINFO,
  FromToDate,
  ENTITYTYPEINFO,
} from './../../Redux/actions/DataCollectionAction';

const API = 'https://swapi.co/api';

var radio_props = [{label: 'Sales', value: 0}, {label: 'Stock', value: 1}];

var datess;
var newDate;
var newDate2;
var newDate3;
var d = new Date();
var maxDate1 = moment(d)
  .utc()
  .format('DD-MMM-YYYY');
var selectedStartDate1 = maxDate1;
var selectedStartDate2 = maxDate1;
var selectedStartDate3 = maxDate1;
var Collection_types;

export class Create_meet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      selectedOutletId: '',
      shopDetailFlag: 'false',
      outletarray: [],
      shopInput: '',
      films: [],
      films1: [],
      films2: [],
      query: '',
      index: '',
      query: '',
      value: 0,
      shopClick: true,
      distributorClick: false,
      selectedBeat: '',
      beatData: [],
      visiblecal1: '',
      visiblecal2: '',
      visiblecal3: '',
      getRouteId: '',
      DistributorData: [],
      selectedDist: '',
      selectedDistId: '',
      MJPMasterID: 788,
      Entity1: 1,
      Entity2: 2,
      IsActivityDone: false,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    AsyncStorage.setItem('radioValueDC', JSON.stringify(0));
    this.props.radioButtonInfo(0, 1);
    this.props.EntityTypeInfo(1);
    // AsyncStorage.setItem('entityType', '1');
  }

  static navigationOptions = {
    title: 'CREATE NEW MEETING',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      fontSize: 12,
      marginLeft: hp(-1),
    },

    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (User.FlagForNavigation === 'Info') {
              Actions.Info();
            } else {
              Actions.Dashboard();
            }
          }}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  NextButton = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var ActivityStart =
      year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;

    AsyncStorage.setItem('ActivityStart', JSON.stringify(ActivityStart));

    if (this.state.shopClick == true) {
      if (this.state.query) {
        if (this.state.radioValue == 0) {
          //console.log("in if.......")
          this.props.fromTotos(selectedStartDate1, selectedStartDate2);
        } else if (this.state.radioValue == 1) {
          //console.log("in else.......")
          this.props.fromTotos('', selectedStartDate3);
        }

        // Actions.DataCollectionStep2();
        db.InsertMeetShop(
          this.state.MJPMasterID,
          selectedStartDate3,
          this.state.Entity1,
          this.state.selectedOutletId,
          this.state.query,
          this.state.IsActivityDone,
        );
        console.log(
          'yeyeyeyeey',
          this.state.MJPMasterID,
          selectedStartDate3,
          this.state.Entity1,
          this.state.selectedOutletId,
          this.state.query,
          this.state.IsActivityDone,
        );
      } else {
        alert('Please Select Outlet');
      }
    } else {
      if (this.state.selectedDistId) {
        if (this.state.radioValue == 0) {
          //console.log("in if.......")
          this.props.fromTotos(selectedStartDate1, selectedStartDate2);
        } else if (this.state.radioValue == 1) {
          //console.log("in else.......")
          this.props.fromTotos('', selectedStartDate3);
        }
        db.InsertMeetDist(
          this.state.MJPMasterID,
          selectedStartDate3,
          this.state.Entity2,
          this.state.selectedDistId,
          this.state.selectedDist,
          this.state.IsActivityDone,
        );

        console.log(
          'yeyeyeyeey',
          selectedStartDate3,
          this.state.selectedDistId,
          this.state.selectedDist,
        );
        // Actions.DataCollectionStep2();
      } else {
        alert('Please Select Distributor');
      }
    }
  };

  componentWillMount() {
    AsyncStorage.getItem('username').then(keyValue => {
      //console.log("Name", JSON.parse((keyValue)))
      var user = JSON.parse(keyValue);
      this.setState({username: user});
    });
    //console.log("111111111111111111")
    db.getBeatData().then(data => {
      //  beatdata = data
      //console.log("222222222")
      this.state.beatData = [];
      this.setState({beatData: data});
    });

    db.getDistributorData().then(data => {
      //  dist = data
      this.state.DistributorData = [];
      this.setState({DistributorData: data});
    });

    //console.log("3333333")
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this._componentFocused();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    //  Actions.drawerMenu();
    return true;
  }

  _componentFocused() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    datess = year + '-' + month + '-' + date;
    //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
    newDate = moment().format('DD-MMM-YYYY');

    AsyncStorage.getItem('beatNameDC').then(keyValue => {
      if (JSON.parse(keyValue)) {
        //  alert(JSON.parse(keyValue))
        this.setState({selectedBeat: JSON.parse(keyValue)});
        this.state.selectedBeat = JSON.parse(keyValue);
        db.getRouteId(this.state.selectedBeat).then(data => {
          const abc = JSON.parse(data);
          let result = abc.map(a => a.RouteID);
          var getRouteId = '';
          getRouteId = result;
          this.setState({getRouteId: result});
          db.getOutletArray(this.state.getRouteId).then(data => {
            getOutletArray = data;
            this.setState({films2: getOutletArray});

            this.setState({
              films: [...this.state.films1, ...this.state.films2],
            });
          });
        });
      } else {
        this.state.selectedBeat = '';
        this.setState({selectedBeat: ''});
      }
    });
    AsyncStorage.getItem('outletNameDC').then(keyValue => {
      if (keyValue) {
        this.state.query = JSON.parse(keyValue);
        this.setState({query: JSON.parse(keyValue)});
      } else {
        this.state.query = '';
        this.setState({query: ''});
      }
    });
  }

  componentWillUnmount() {
    this.state.selectedBeat = '';
    this.state.selectedBeatId = '';
    this.state.query = '';
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  BeatView() {
    //console.log("6666")
    return (
      <View style={styles.OODMainContainer}>
        <Text style={styles.OODTextStyle}>CHOOSE BEAT</Text>
        {this._renderBeat()}
      </View>
    );
    //console.log("7777")
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
        placeholder="Select"
        dropdownPosition={-5.4}
        dropdownOffset={{top: 14, left: 18}}
        value={this.state.selectedBeat}
        itemCount={4}
        fontSize={11}
        data={beat}
        onChangeText={value => {
          this.onChangeHandlerBeat(value);
        }}
      />
    );
  }

  onChangeHandlerBeat = value => {
    this.setState({selectedBeat: value});
    // AsyncStorage.setItem('outletName', "");
    // AsyncStorage.setItem('outletId', "");
    // AsyncStorage.setItem('SearchString', "");

    this.setState({query: ''});
    this.state.query = '';
    //console.log("11beatNameDC",value)
    AsyncStorage.setItem('beatNameDC', JSON.stringify(value));

    db.getRouteId(this.state.selectedBeat).then(data => {
      const abc = JSON.parse(data);
      let result = abc.map(a => a.RouteID);
      var getRouteId = '';
      getRouteId = result;
      this.setState({getRouteId: result});
      //console.log("11beatIdDC",getRouteId)
      AsyncStorage.setItem('beatIdDC', JSON.stringify(getRouteId));
      this.state.selectedBeatId = getRouteId;
      db.getOutletArray(this.state.getRouteId).then(data => {
        //    getOutletArray = data
        this.state.films2 = [];
        this.setState({films2: data});
        this.state.films = [];

        this.setState({
          films: [...this.state.films1, ...this.state.films2],
        });

        // this.setState({films1}, () => {
        //   const films = [...this.state.films1, ...this.state.films2];       // });
      });
    });
  };

  onSelectedParty = (id, party) => {
    //console.log("11outletNameDC",party)
    //console.log("11outletIdDC",id)
    AsyncStorage.setItem('outletNameDC', JSON.stringify(party));
    AsyncStorage.setItem('outletIdDC', JSON.stringify(id));
    if (this.state.query.length) {
      this.setState({selectedOutletId: id});
      this.state.selectedOutletId = id;
      this.setState({query: party});
      this.setState({shopDetailFlag: 'true'});
      this.shopDetailss();
    } else {
      this.setState({shopDetailFlag: 'false'});
    }

    AsyncStorage.setItem('outletNameDC', JSON.stringify(party));
    AsyncStorage.setItem('outletIdDC', JSON.stringify(id));
    // this.shopDetailss()
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
    // if (this.state.query == 'Add New Outlet') {
    //   return (
    //     <View>
    //       {Actions.AddOutlet()}

    //     </View>
    //   );
    // } else  {
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
      // }
    }
  }
  searchComponent() {
    //console.log("11 111 111")
    const {query} = this.state;

    const films = this.findFilm(query);

    const comp = (a, b) => a.toLowerCase().trim() == b.toLowerCase().trim();

    return (
      <View style={styles.searchResultContainer}>
        <View style={{flexDirection: 'row'}}>
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
              //data={((films.length === 1 && comp(query, films[0].title)) || this.state.clicked) ? [] : films}
              //default value if you want to set something in input
              defaultValue={query}
              /*onchange of the text changing the state of the query which will trigger
              the findFilm method to show the suggestions*/
              onChangeText={text => this.setState({query: text})}
              placeholder="search"
              renderItem={({item, i}) => (
                //you can change the view you want to show in suggestion from here
                // <TouchableOpacity onPress={() => this.setState({ query: item.title, shopDetailFlag:'true',})}>
                <TouchableHighlight
                  key={i}
                  onPress={() => this.onSelectedParty(item.id, item.party)}>
                  {item.party === '+Add New Outlet' ? (
                    <Text>{item.party}</Text>
                  ) : (
                    <Text>{item.party}</Text>
                  )}
                </TouchableHighlight>
              )}
            />
          </View>
          <View style={styles.searchIconBG}>
            {/* <Image  source={require('../../assets/Icons/search.png')}
                  style={styles.searchIconStyle}></Image> */}
          </View>
        </View>
      </View>
    );
  }

  ShopClick = () => {
    //console.log("5555")
    if (this.state.shopClick == false) {
      //   this.props.EntityTypeInfo(1);
      return (
        <View style={styles.SDCardBG}>
          <View style={styles.ITColContainer}>
            <Image
              style={styles.cardImgStyle}
              source={require('../../assets/Icons/Shop_card_watermark.png')}
            />
            <Text style={styles.cardTextStyle}>Shops</Text>
          </View>
        </View>
      );
    } else if (this.state.shopClick == true) {
      this.props.EntityTypeInfo(1);
      return (
        <View style={styles.SDCardBGClickTrue}>
          <View style={styles.ITColContainer}>
            <Image
              style={styles.cardImgStyle}
              source={require('../../assets/Icons/ShopDataCollection.png')}
            />
            <Text style={styles.cardTextStyleAfterClick}>Shops</Text>
          </View>
        </View>
      );
    }
  };

  distributorClick = () => {
    if (this.state.distributorClick == false) {
      // this.props.EntityTypeInfo(0);
      return (
        <View style={styles.SDCardBG}>
          <View style={styles.ITColContainer}>
            <Image
              style={styles.cardImgStyle}
              source={require('../../assets/Icons/Distributor.png')}
            />
            <Text style={styles.cardTextStyle}>Distributors</Text>
          </View>
        </View>
      );
    } else if (this.state.distributorClick == true) {
      this.props.EntityTypeInfo(0);
      return (
        <View style={styles.SDCardBGClickTrue}>
          <View style={styles.ITColContainer}>
            <Image
              style={styles.distriImgStyleAfterClick}
              source={require('../../assets/Icons/Distributor.png')}
            />
            <Text style={styles.cardTextStyleAfterClick}>Distributors</Text>
          </View>
        </View>
      );
    }
  };

  _renderDistributor() {
    const beat = [];
    const BeatId = [];
    for (var i = 0; i < this.state.DistributorData.length; i++) {
      beat.push({
        value: this.state.DistributorData[i].Distributor,
      });
      BeatId.push({
        value: this.state.DistributorData[i].DistributorID,
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
        onChangeText={(value, index, data) => {
          this.onChangeHandlerDistributor(BeatId[index].value, value);
        }}
        // onChangeText={(value) => { this.setState({ selectedDist: value }) }}
      />
    );
  }

  onChangeHandlerDistributor = (distId, value) => {
    this.setState({selectedDist: value});
    this.setState({selectedDistId: distId});
    AsyncStorage.setItem('distributorName', JSON.stringify(value));
    AsyncStorage.setItem('outletNameDC', JSON.stringify(value));
    AsyncStorage.setItem('outletIdDC', JSON.stringify(distId));
    console.log('dist id : ' + distId + ' value : ' + value);
    //  this.setState({selectedDistName : name})
  };

  // onChangeHandlerDistributor = value => {
  //   AsyncStorage.setItem('distributorName', JSON.stringify(value));

  //   this.setState({selectedDist: value});
  // };

  onDateChange1(dates) {
    /// var a=date.toString()
    var d = new Date(dates);
    //console.log("ggi-",d)
    //console.log("aaaaaaaaaaaa",moment(d).utc().format('DD-MMM-YYYY'))
    var maxDate = moment(d)
      .utc()
      .format('DD-MMM-YYYY');
    //console.log("aaaaaaaaaaaa",maxDate)
    selectedStartDate1 = maxDate;
    //console.log("dates:",selectedStartDate1)
  }
  calenderpopup1 = () => {
    const {navigation} = this.props;
    ('');
    this.setState({visiblecal1: true});
  };

  onDateChange2(dates) {
    var d = new Date(dates);
    //console.log("ggi-",d)
    //console.log("aaaaaaaaaaaa",moment(d).utc().format('DD-MMM-YYYY'))
    var maxDate = moment(d)
      .utc()
      .format('DD-MMM-YYYY');
    //console.log("aaaaaaaaaaaa",maxDate)
    selectedStartDate2 = maxDate;
    //console.log("dates:",selectedStartDate2)
  }

  calenderpopup2 = () => {
    const {navigation} = this.props;
    this.setState({visiblecal2: true});
  };
  onDateChange3(dates) {
    /// var a=date.toString()
    var d = new Date(dates);
    //console.log("ggi-",d)
    //console.log("aaaaaaaaaaaa",moment(d).utc().format('DD-MMM-YYYY'))
    var maxDate = moment(d)
      .utc()
      .format('DD-MMM-YYYY');
    //console.log("aaaaaaaaaaaa",maxDate)
    selectedStartDate3 = maxDate;
    //console.log("dates:",selectedStartDate3)
  }

  calenderpopup3 = () => {
    const {navigation} = this.props;
    this.setState({visiblecal3: true});
  };
  radioFunc = val => {
    AsyncStorage.setItem('SearchStringDC', '');
    //console.log("11radioValueDC",val)
    AsyncStorage.setItem('radioValueDC', JSON.stringify(val));
    this.state.radioValue = val;
    this.setState({radioValue: val});
    if (val == 0) {
      Collection_types = 1;
    } else if (val == 1) {
      Collection_types = 2;
    }
    this.props.radioButtonInfo(val, Collection_types);
  };

  radioValues = val => {
    AsyncStorage.setItem('SearchStringDC', '');
    //console.log("11radioValueDC",val)
    AsyncStorage.setItem('radioValueDC', JSON.stringify(val));
    this.state.radioValue = val;
    this.setState({radioValue: val});
    if (val == 0) {
      Collection_types = 1;
    } else if (val == 1) {
      Collection_types = 2;
    }
    this.props.radioButtonInfo(val, Collection_types);
  };
  fromToto = () => {
    const startDate2 = selectedStartDate2 ? selectedStartDate2 : newDate;
    const minDate2 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const maxDate2 = new Date(Date.now()); // Max date

    const startDate1 = selectedStartDate1 ? selectedStartDate1 : newDate;
    const minDate1 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const maxDate1 = new Date(Date.now()); // Max date

    const startDate3 = selectedStartDate3 ? selectedStartDate3 : newDate;
    const minDate3 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Min date
    const maxDate3 = new Date(Date.now()); // Max date

    if (this.state.radioValue == 1) {
      return (
        <View style={styles.fromToMainContainer}>
          <View style={styles.FTContainer}>
            <View style={styles.FromCardBG}>
              <View style={styles.FTCalRowContainer}>
                <View style={styles.FTTextColContainer}>
                  <Text style={styles.FTTextStyle}>{startDate3}</Text>
                </View>
                <View styles={styles.CalenderImgContainer}>
                  <TouchableOpacity onPress={this.calenderpopup3.bind(this)}>
                    <View>
                      <Dialog
                        visible={this.state.visiblecal3}
                        onTouchOutside={() => {
                          this.setState({visiblecal3: false});
                        }}
                        previousTitle="<"
                        previousTitleStyle={{color: '#fff'}}
                        nextTitle=">"
                        nextTitleStyle={{color: '#f00'}}
                        width={wp('93')}
                        overlayBackgroundColor={'false'}
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visiblecal3: false});
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <CalendarPicker
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            style={{borderWidth: 3, borderColor: 'black'}}
                            textStyle={{
                              fontFamily: 'Cochin',
                              color: '#000000',
                            }}
                            startFromMonday={true}
                            // minDate={minDate3}
                            // maxDate={maxDate3}
                            onDateChange={this.onDateChange3}
                          />
                        </DialogContent>
                      </Dialog>
                    </View>
                    <Image
                      style={styles.CalenderImgStyle}
                      source={require('../../assets/Icons/Calendar_normal.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  render() {
    //console.log("444444444")
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>OUTLET TYPE</Text>
              </View>
              <View style={styles.SDCardsMainContainer}>
                {/* {/ Shops Card /} */}
                <View style={styles.SDCardMainContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({shopClick: true, distributorClick: false})
                    }>
                    {this.ShopClick()}
                  </TouchableOpacity>
                </View>

                {/* {/ Distributors Card /} */}
                <View style={styles.SDCardMainContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({distributorClick: true, shopClick: false})
                    }>
                    {this.distributorClick()}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {this.state.shopClick == true ? (
              <View>
                {this.BeatView()}
                <View>
                  <View style={styles.OODMainContainer}>
                    <Text style={styles.OODTextStyle}>OUTLET NAME</Text>
                  </View>
                  <View style={styles.searchResultContainer}>
                    {this.searchComponent()}
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>SELECT DISTRIBUTOR</Text>
                {this._renderDistributor()}
              </View>
            )}

            {/* {/ Data Type /} */}

            {/* {/ Select Duration /} */}
            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>MEETING DATE</Text>
              </View>

              {this.fromToto()}
            </View>
          </ScrollView>

          <View>
            <TouchableOpacity onPress={this.NextButton.bind(this)}>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> DONE </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    // login:state.login,
    // isLogged: state.login.isLogged,
    // hasError : state.login.hasError,
    // isLoading: state.login.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  radioButtonInfo: (val, Collection_types) => {
    dispatch(RADIOBUTTONINFO(val, Collection_types));
  },
  fromTotos: (from, to) => {
    dispatch(FromToDate(from, to));
  },
  EntityTypeInfo: Entity_types => {
    dispatch(ENTITYTYPEINFO(Entity_types));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create_meet);

const styles = StyleSheet.create({
  OODMainContainer: {
    flex: 1,
  },

  OODTextStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('5'),
    marginTop: hp('3'),
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

  dropDownContainer: {
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    width: wp('88'),
    height: hp('9'),
    marginTop: hp('1'),
    marginHorizontal: wp('1'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: hp('2'),

    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 15,
  },

  SDCardsMainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  SDCardMainContainer: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: hp('1'),
    alignSelf: 'center',
    alignItems: 'center',
  },

  SDCardBG: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('12'),
    width: wp('41'),
    borderWidth: hp('0.3'),
  },

  SDCardBGClickTrue: {
    backgroundColor: '#F8F4F4',
    borderColor: '#221818',
    borderRadius: wp('2'),
    height: hp('12'),
    width: wp('41'),
    borderWidth: hp('0.3'),
  },

  ITColContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  cardImgStyle: {
    height: hp('4'),
    width: wp('7'),
    marginTop: hp('1.5'),
  },

  distriImgStyleAfterClick: {
    height: hp('4'),
    width: wp('7'),
    marginTop: hp('1.5'),
    tintColor: 'black',
  },

  cardTextStyle: {
    color: '#8C7878',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('1.5'),
  },

  cardTextStyleAfterClick: {
    color: '#362828',
    fontSize: RFValue(15),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('1.5'),
  },

  inputContainerStyle: {
    backgroundColor: '#ffffff',
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    height: hp('9'),
    width: wp('82'),
    padding: 10,
    marginTop: hp('1'),
    marginLeft: wp('6'),
    borderRightWidth: hp('0'),
    borderTopRightRadius: wp('0'),
    borderBottomRightRadius: wp('0'),
    textAlign: 'center',
    justifyContent: 'center',
  },

  searchIconBG: {
    // alignItems:'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: hp('9'), //28-3
    width: wp('8'),
    justifyContent: 'center',
    marginTop: wp('1.8'), //28-3
    // alignSelf:'center',
    borderRightWidth: hp('0.25'), //28-3
    borderTopWidth: hp('0.25'), //28-3
    borderBottomWidth: hp('0.25'), //28-3
    borderTopRightRadius: wp('2'),
    borderTopLeftRadius: wp('0'),
    borderBottomRightRadius: wp('2'),
    borderBottomLeftRadius: wp('0'),
    borderColor: '#E6DFDF',
  },

  searchIconStyle: {
    marginRight: wp('5'),
  },

  fromToMainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  FTContainer: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: hp('1'),
    alignSelf: 'center',
    alignItems: 'center',
  },

  FromCardBG: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('43'),
    borderWidth: hp('0.3'),
    marginLeft: wp('2'),
  },

  ToCardBG: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('43'),
    borderWidth: hp('0.3'),
    marginRight: wp('2'),
  },

  searchResultContainer: {
    flex: 10,
    flexDirection: 'column',

    //  backgroundColor:'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  FTCalRowContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  FTTextColContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  FTTextStyle: {
    color: '#796A6A',
    fontSize: RFValue(13),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('2'),
  },

  CalenderImgContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  CalenderImgStyle: {
    marginRight: wp('2'),
    tintColor: '#8C7878',
    height: hp('4.5'),
    width: wp('5.5'),
  },
  listStyle: {
    position: 'relative',
    zIndex: 999,
    padding: 10,
    width: wp('77'),
    marginLeft: hp('3.9'),
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});

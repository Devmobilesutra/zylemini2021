import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground,
                FlatList,AsyncStorage,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import { Searchbar} from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import NextButton from '../../components/NextButton';
import moment from 'moment';
import SublistDataCollection from './SublistDataCollection';
//import SublistDataCollectionStock from './SublistDataCollectionStock';
import { TOTAL_DATA_COLLECTED} from '../../Redux/actions/DataCollectionAction'
import Database from './../../utility/Database'
import { connect } from 'react-redux'
const db = new Database();

export  class DataCollectionStep2 extends Component {
constructor(props) {
    super(props);
    this.state = { 
        productChoose: 'false',
        collapsed:false,      
        outletId: '',
        outletName: '',
       
        totalOrder:'0',
        visiblecal1:'',
       date: '', list1: [],list2:[], JoinString: [], getBrandData: [], 
       dataSource: [], dataSourceSubBrand: [], isbrandSelect: 'false', search: '', brandId: '',
       Collection_type:'',radioValueDCs:'',     

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

static navigationOptions = {
  title: 'Data Collection : Step 2/3',
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
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.DataCollectionStep1() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
        </View>
    )                               
}


SchemesArrow(){
    if( this.state.collapsed == false){
        return(
            <View>
            <Image style={styles.downSublistArrowStyle} 
                source = {require('../../assets/Icons/Add_white.png')}/>
            </View>
        )
    }
    else {
        return(
            <View>
            <Image style={styles.downSublistArrowStyle} 
                source = {require('../../assets/Icons/minus_white.png')}/>
            </View>
        )
    }
}

searchResult(){
    const { navigation } = this.props;
    if (this.state.search) {
    if( this.state.isbrandSelect == 'true' ){
        // if(this.props.navigation.state.params.valueRadio == 0){
            return this.state.dataSource.map((item, i) => {
            return(
                <View> 
                    <View style={styles.searchResultsResulContainer}>
                        
                        <Collapse 
                            //isCollapsed={this.state.collapsed} 
                            onToggle={( )=>this.setState({collapsed:!this.state.collapsed})}
                            // onToggle={this.toggle()}
                        >
                            {
                                item.bottleQty == 'true' ? (
                                    <CollapseHeader style={styles.collapseHeaderStyleForTrue}>
                                    <View style={styles.nameOfBrandContainer}>
                                            <Text style= {styles.nameOfBrandTextStyleForTrue}>
                                            {item.BRAND}
                                            </Text>
                                    </View>
                                    <View style={styles.schemesIconContainer}>
                                        {/* //    <View style={styles.roundedtext}></View> */}
                                    </View>
                                    <View style={styles.schemesDownArrowContainer}>
                                                        {/* <Image style={styles.downSublistArrowStyle} 
                                                                source = {require('../../Assets/Icons/Add.png')}/> */}
                                        {this.SchemesArrow()}
                                    </View>  
                                    
                                </CollapseHeader> 
                                ) : (
                                    <CollapseHeader style={styles.collapseHeaderStyle}>
                                    <View style={styles.nameOfBrandContainer}>
                                            <Text style= {styles.nameOfBrandTextStyle}>
                                            {item.BRAND}
                                            </Text>
                                    </View>
                                    <View style={styles.schemesIconContainer}>
                                        {/* //    <View style={styles.roundedtext}></View> */}
                                    </View>
                                    <View style={styles.schemesDownArrowContainer}>
                                                        {/* <Image style={styles.downSublistArrowStyle} 
                                                                source = {require('../../Assets/Icons/Add.png')}/> */}
                                        {this.SchemesArrow()}
                                    </View>  
                                    
                                </CollapseHeader>
                                )
                            }
                        {/* <CollapseHeader style={styles.collapseHeaderStyle}>
                            <View style={styles.nameOfBrandContainer}>
                                    <Text style= {styles.nameOfBrandTextStyle}>
                                    {item.BRAND}
                                    </Text>
                            </View>
                            <View style={styles.schemesIconContainer}>
                               
                            </View>
                            <View style={styles.schemesDownArrowContainer}>
                                               
                                {this.SchemesArrow()}
                            </View>  
                            
                        </CollapseHeader> */}
                        <CollapseBody>
                            <ListItem >
                            <SublistDataCollection 
                            radioVal={this.props.navigation.state.params.valueRadio}
                            navigation={navigation}
                             id={item.BRANDID}
                            search={this.state.search}
                            list1={this.state.list1}
                            SublistExtendedParent={this.RefreshBrandList.bind(this)}
                            JoinString={this.state.JoinString}
                            outletId={this.state.outletId} 
                            />                           
                            
                            </ListItem>
                        </CollapseBody>
                    </Collapse>  
                </View>
            </View>
            );
        })
    }}}


handleBackButtonClick() {
    Actions.DataCollectionStep1();

    return true;
}

NextButton = () => {
    db.checkOrderIdInDb(this.state.outletId,this.props.datacollection.collectiontype).then((len) => {
        if (len === 0) {
            alert('Please Add the Order');

        } else {
            this.props.navigation.navigate('DataCollectionStep3',
            {
                valueRadio1: this.props.navigation.state.params.valueRadio,
            }
        )}
        

    })
}
SearchFilterFunction(text) {
    AsyncStorage.setItem('SearchStringDC', JSON.stringify(text));
    this.setState({ isbrandSelect: 'true' })
    this.setState({
        search: text,            
    });
  
    // db.getBrandSearchData(text, this.state.list1, this.state.JoinString).then((data) => {
    //     this.state.dataSource=[]
    //     this.setState({
    //         dataSource: data,               
    //     });
    // })

    db.getBrandSearchDataForChangeBrandColor(text, this.state.list1, this.state.JoinString,this.state.outletId,this.props.datacollection.collectiontype).then((data) => {
        this.state.dataSource = []
        this.setState({
            dataSource: data.sort(function (a, b) {
                return a.BRAND.localeCompare(b.BRAND); //using String.prototype.localCompare()
              })
        });
        //      this.setState({
        //    dataSource: data,
        // });
    })

}

RefreshBrandList(){
    AsyncStorage.getItem('SearchStringDC').then((keyValue) => {
        if (JSON.parse(keyValue) != null) {
            this.state.search = JSON.parse(keyValue)
            this.setState({ search: JSON.parse(keyValue) })
            this.setState({ isbrandSelect: 'true' })
            //console.log("asasas", this.state.list1)
            // db.getBrandSearchData(this.state.search, this.state.list1, this.state.JoinString).then((data) => {
            //     this.state.dataSource = []
            //     this.setState({
            //         dataSource: data,
            //     });
            //     this.setState({
            //         dataSource: data,
            //     });


            // })

            db.getBrandSearchDataForChangeBrandColor(this.state.search, this.state.list1, this.state.JoinString,this.state.outletId,this.props.datacollection.collectiontype).then((data) => {
                this.state.dataSource = []
                this.setState({
                    dataSource: data.sort(function (a, b) {
                        return a.BRAND.localeCompare(b.BRAND); //using String.prototype.localCompare()
                      })
                });
                //      this.setState({
                //    dataSource: data,
                // });
            })

        }
    })

}

componentWillMount() { 
       
  console.log('entity type : ' + this.props.datacollection.entityType)
  console.log('collection type : '+this.props.datacollection.collectiontype)
  console.log('from date to date : '+this.props.datacollection.fromDate + '  to date : '+this.props.datacollection.toDate)

    AsyncStorage.getItem('outletIdDC').then((keyValue) => {
        this.setState({ outletId: JSON.parse(keyValue) })
        db.getTotalOrderValue(JSON.parse(keyValue),
         this.props.datacollection.collectiontype).then((data) => {
            this.state.totalOrder = data;
            this.setState({ totalOrder: data })
            this.props.collectedData(this.state.totalOrder)
        })
    })
    AsyncStorage.getItem('outletNameDC').then((keyValue) => {
        this.setState({ outletName: JSON.parse(keyValue) })
    })
    db.getSearchProdect().then((data) => {
        //console.log("bbb=", data)
        //console.log("33")
        var prod = []
        prod = data
        prod.map((Value, i) => {
            this.setState({ list1: Value.Value })
            AsyncStorage.getItem('SearchStringDC').then((keyValue) => {
                if (JSON.parse(keyValue) != null) {
                    this.state.search = JSON.parse(keyValue)
                    this.setState({ search: JSON.parse(keyValue) })
                    this.setState({ isbrandSelect: 'true' })
                    //console.log("asasas", this.state.list1)
                    // db.getBrandSearchData(this.state.search, this.state.list1, this.state.JoinString).then((data) => {
                    //     this.state.dataSource = []
                    //     this.setState({
                    //         dataSource: data,
                    //     });
                    //     this.setState({
                    //         dataSource: data,
                    //     });


                    // })

                    db.getBrandSearchDataForChangeBrandColor(this.state.search, this.state.list1, this.state.JoinString,this.state.outletId,this.props.datacollection.collectiontype).then((data) => {
                        this.state.dataSource = []
                        this.setState({
                            dataSource: data.sort(function (a, b) {
                                return a.BRAND.localeCompare(b.BRAND); //using String.prototype.localCompare()
                              })
                        });
                        //      this.setState({
                        //    dataSource: data,
                        // });
                    })

                }
            })

        })

        prod.map((Value, i) => {
            this.state.list2.push([Value.Value])
        })

        this.state.JoinString = this.state.list2.join('|')
    })
  

}
componentDidMount(){
    // this._subscribe = this.props.navigation.addListener('didFocus', () => {
    //     this._componentFocused();
    //     //Put your Data loading function here instead of my this.LoadData()
    //   });
BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
  
componentWillUnmount() {
   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
    
_componentFocused = () => {      // alert("in focused")    

AsyncStorage.getItem('outletIdDC').then((keyValue) => {
    this.setState({ outletId: JSON.parse(keyValue) })
    db.getTotalOrderValue(JSON.parse(keyValue), this.props.datacollection.collectiontype).then((data) => {
        this.state.totalOrder = data;
        this.setState({ totalOrder: data })
        this.props.collectedData(this.state.totalOrder)
    })
})
AsyncStorage.getItem('outletNameDC').then((keyValue) => {
    this.setState({ outletName: JSON.parse(keyValue) })
})

db.getSearchProdect().then((data) => {
    var prod = []
    prod = data
    this.state.list1 = prod.map(function (el) {
        return el.Value;
    });
    //console.log("saaras==", this.state.list1)
    this.state.JoinString = this.state.list1.join('|')

})

AsyncStorage.getItem('SearchStringDC').then((keyValue) => {

    if (JSON.parse(keyValue) != null) {
        this.state.search = JSON.parse(keyValue)
        this.setState({ search: JSON.parse(keyValue) })
        this.setState({ isbrandSelect: 'true' })
        // db.getBrandSearchData(this.state.search, this.state.list1, this.state.JoinString).then((data) => {
        //     this.state.dataSource = []
        //     this.setState({
        //         dataSource: data,
        //     });
        //     this.setState({
        //         dataSource: data,
        //     });
        // })

        db.getBrandSearchDataForChangeBrandColor(this.state.search, this.state.list1, this.state.JoinString,this.state.outletId,this.props.datacollection.collectiontype).then((data) => {
            this.state.dataSource = []
            this.setState({
                dataSource: data,
            });
                 this.setState({
                dataSource: data,
            });
        })
    }
})
}


render() {
    // if(  this.props.navigation.state.params.valueRadio == 0)  for radio value
    return (
      <View style = {{ flex: 10 }}>
        <ImageBackground
            source={require('../../assets/Icons/android_BG.png')}
            style={{height:hp('89'), width:wp('100'), resizeMode: 'cover',  justifyContent: 'center',}}
        >
        <ScrollView
        keyboardShouldPersistTaps={'handled'} 
            showsVerticalScrollIndicator={false}
        > 
             {/* Store Name Id and History */}
                 <View style = {{ flex:0.1 }}>
                    <View style= {styles.storeInfoMainContainer}>
                        <View style= {styles.storeTextContainer}>
                            <Text  style = {styles.storeNameText}>
                            {this.state.outletName}
                            </Text>
                        </View>
                    </View>

                <View style= {{ flexDirection:'row' }}>
                     <Text  style = {styles.storeIdText}>
                        Store ID :
                    </Text>

                     <Text  style = {styles.storeIdStyle}>
                     {this.state.outletId}
                    </Text>
                </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
                </View>

                 <View style = {styles.textDropdownContainer}>
                    <Text style = {styles.dropdownheadingTitleText}>CHOOSE PRODUCT</Text>
                    <Searchbar
                    inputStyle={styles.inputstyles}
                          style={styles.searchbarContainerStyle}
                          theme={false}
                          icon= {false}
                          placeholder="Search"
                          value={this.state.search}
                          onChangeText={input => {
                            this.setState({ search: input });
                            this.SearchFilterFunction(input)
                        }
                        }
                    />
                </View>
                {/* search results */}
                <View style= {styles.searchResultTextRowContainer}>
                    <View style= {styles.searchResultTextColContainer}>
                            <Text  style = {styles.searchResultText}>
                                Search Results
                            </Text>
                    </View>

                    <View style= {styles.CPDMaintContainer}>
                        <View>
                            <Text  style = {styles.CPDTextStyle}>
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
               
                {this.searchResult()}

        </ScrollView>
            {/* Next Button */}
            <View>
              <TouchableOpacity onPress={this.NextButton.bind(this)}> 
                    <NextButton/>
                </TouchableOpacity>
            </View>
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
      },
      
  
  
  })
  export default connect(mapStateToProps, mapDispatchToProps)(DataCollectionStep2)
  

const styles = StyleSheet.create({
    storeInfoMainContainer: {
        flex:1, 
        flexDirection:'row',
    },

    storeTextContainer: {
        flex: 0.5, 
        flexDirection:'column', 
    },

    historyTextContainer: {
        flex: 0.5, 
        flexDirection:'column', 
        alignItems:'flex-end',
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
        fontSize:10, 
        marginTop: hp('1%'),
        marginLeft: hp('1'),
        fontFamily: 'Proxima Nova', 
        alignContent: 'flex-end',
    },

    dashLineContainer: {
        flex:1, 
        marginTop:hp('2'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('89'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    textDropdownContainer : {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: hp('2'),
        //   marginVertical: hp('3'),
        marginHorizontal: wp('4'),
    },

    dropdownheadingTitleText : {
        fontSize: 12, 
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily:'Proxima Nova',
        marginLeft: wp('1'),
        marginVertical: wp('1'),
    },

    searchbarContainerStyle: {
        height:hp('9'),
        width:wp('88'),
        borderColor: '#E6DFDF',
        borderWidth: wp('0.4'),
        borderRadius: wp('2'),
        marginTop: hp('1'),
        alignSelf:'center',
        elevation: 0,    
    },
    inputstyles:{
        fontSize:12,color:'#362828', fontFamily:'Proxima Nova',
    },
    searchResultTextRowContainer: { 
        flex:1, 
        flexDirection:'row' 
    },

    searchResultTextColContainer: { 
        flex:0.5, 
        flexDirection:'column', 
    },

    searchResultText: {
        color:'#8C7878',
        // fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize:RFValue(12), 
        marginTop: hp('2'), 
        marginLeft: wp('5'), 
        fontFamily: 'Proxima Nova',
    },

    CPDMaintContainer:{ 
        flex:0.7, 
        flexDirection:'row', 
        alignItems:'flex-end',marginBottom:wp('1'),  marginTop: hp('2'), 
    },

    CPDTextStyle:{ 
        color: '#3955CB', 
        fontFamily: 'Proxima Nova',   
        fontSize:RFValue(12), 
        fontWeight: 'bold', 
        justifyContent:'center', 
        alignItems:'center',
        marginLeft: hp('4'), 
        // marginLeft: hp('0')
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
        fontSize:RFValue(13), 
    },

    searchResultContainer: {
        flex:1, 
        alignItems:'flex-start', 
        marginHorizontal: hp('3'),
        marginTop: wp('2'),
        marginTop: hp('3'),
    },

    searchResultsResulContainer: {
        flex:1,
        marginTop: wp('4')
    },

    collapseHeaderStyle: {
        alignItems:'center' ,
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:  '#ffffff',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'), 
        height: hp('9'), 
        width: wp('88'),
        borderWidth: hp('0.2'), 
        // marginHorizontal: wp('4'),
    },

    collapseHeaderStyleForTrue: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#362828',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'),
        height: hp('9'),
        width: wp('88'),
        borderWidth: hp('0.2'),
        // marginHorizontal: wp('4'),
    },

    nameOfBrandContainer: { 
        flex:3,                                                                                  //28-03
        alignItems: 'flex-start',
    },

    nameOfBrandTextStyle: {
        marginLeft:wp('5'),
        fontFamily: 'Proxima Nova', 
        fontSize:12, 
        color:'#362828'
    },

    nameOfBrandTextStyleForTrue: {
        marginLeft: wp('5'),
      
        fontFamily: 'Proxima Nova',
     //   fontSize: RFValue(13),
     fontSize:12,
        color: '#FFFFFF'
    },

    schemesIconContainer: { 
        flex:1,                                                                                 //28-3
        alignItems: 'flex-end', 
        flexDirection:'row',
        //marginRight: wp('-4')
    },

    schemesDownArrowContainer: {
        // marginRight:wp('6'),
    },

    schemesIconStyle: { 
        marginLeft: wp('27'), 
    },

    roundedtext: {
        width: 18,
        height: 18, 
        //flexWrap:"wrap",                                                  //28-03
        //   justifyContent: 'center',
        //   alignItems: 'center',
        borderRadius: 18 / 2,
        backgroundColor: "#EAA304",
        borderColor: '#EAA304',
        borderWidth: 3,
        marginLeft: wp('12'),                                               //28-03                                                                              
    },

    downSublistArrowStyle: { 
        // marginLeft: wp('2'), 
        height:hp('4'),
        width:wp('7'),
        marginRight: wp('4'),
    },

    filterButtonContainer: {
        alignItems:'flex-end',
    },





});
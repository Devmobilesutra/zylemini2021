import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, BackHandler, ActivityIndicator ,FlatList} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import moment from 'moment';
const db = new Database();
import Video from 'react-native-video';
 import { Thumbnail } from 'react-native-thumbnail-video';
// import { Thumbnail } from 'native-base';
let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};
export  class ResourceLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcesArray : [],
            textLenth: null, 
           // numberOfLines: 3,
            textShown: -1,
         
        };
      }

      componentDidMount() {
      
        // setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     }
     componentWillUnmount() {
         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
     }
     shouldComponentUpdate() {
         return true;
       }
     handleBackButtonClick() {
         return true;
     }
  
     componentWillMount() {
    
        db.getResources().then((data)=>{
          console.log("Distributor Meeting",data);
              this.setState({ resourcesArray: data })
              console.log("resourcesArray : ",JSON.stringify(this.state.resourcesArray));
         })

        
      
   }

     
      handleSeeMore = () => {
        this.state.textLenth
          ? this.setState({numberOfLines: 0})
          : this.setState({numberOfLines: 3});
        };

        seeMoreFunc = () => {
         return(
          

            (this.state.textLenth) ? (
            
              <Text onPress={() => this.setState({numberOfLines: 3})}
               style={{
               color :'red' }}
               >
                see less
              </Text>
             
            ) : (
             
              <Text onPress={() => this.setState({numberOfLines: 3})}
               style={{
               color :'blue' }}
               >
                see less
              </Text>
              
            )
          
         )
          };

          toggleNumberOfLines = (index) => {
            var d = "Zylem POP For Recording Promotions of Products by the Company";
            console.log('index : '+index + " len : "+d.length)
            this.setState({
              textShown: this.state.textShown === index ? -1 : index,
            });
          };
       
        cardListViewsView = () => {
         
            return (
              <View style={styles.shopListMainContainer}>
                    <TouchableOpacity  onPress={()=>this.navigate( item.id,item.party)}>
                    {/* <TouchableOpacity onPress={() => Actions.Info({shopId: item.id})}> */}
                      <View style={styles.shopDetailBackStyle}>
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.imageStyles}
                            source={require('../../assets/Icons/shopImg.png')}
                          />
                        </View>
                        <View style={styles.shopDetailsContainer}>
                          <Text style={styles.shopNameTextStyle}>{item.party}</Text>
                          <Text style={styles.shopAddressTextStyle}>
                            {item.Outlet_Info.split('||')[0]}
                          </Text>
                          {/* <Text style={styles.shopDistanceTextStyle}>
                            1 Km Away ETA 5Mins
                          </Text> */}
                        </View>
                        <View style={styles.callContainer}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              backgroundColor: '#e6ebe7',
                              borderRadius: 20,
                              width: 28,
                              height: 26,
                            }}
                            onPress={() =>
                              Communications.phonecall('0123456789', true)
                            }>
                            <Text style={styles.callTextStyle}> Call</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              
                //  keyExtractor={item => item.id}
              
            );
         
        };
      
render(){
  if(this.state.resourcesArray){
    return(

      <View>
        {/* <View  style={{
          width: wp('80'),
        justifyContent: 'flex-start',
          }}>
      <Text
            numberOfLines={this.state.numberOfLines}
            onPress={() => this.handleSeeMore()}
            ellipsizeMode="middle"
            onTextLayout={({nativeEvent: {lines}}) =>{
              console.log('in textlayout '+lines.length)
              this.setState({textLenth: lines.length === 5})
            } }>
           Unfortunately these pitfalls do not always lead to errors. Sometimes they work. I guess this depends on which of all those many tools/libraries/components you use and their versions in your app
              {this.seeMoreFunc()}
           
          </Text>
          </View>  */}
      <FlatList
      data={this.state.resourcesArray}
      renderItem={({item ,index}) => {
        if(item.ResourceType == 3){
          return(
            <View style={styles.shopListMainContainer}>
          <TouchableOpacity  onPress={()=>Actions.ResourceWebView({URL: item.URL})}>
          {/* <TouchableOpacity onPress={() => Actions.Info({shopId: item.id})}> */}
            <View style={styles.shopDetailBackStyle}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageStyles}
                  source={require('../../assets/Icons/shopImg.png')}
                />
              </View>
              <View style={styles.shopDetailsContainer}>
                <Text style={styles.shopNameTextStyle}>{item.ResourceName}</Text>
                {/* <Text style={styles.shopAddressTextStyle}>
                {item.Descreption}
                </Text> */}


                <Text
                numberOfLines={this.state.textShown === index ? undefined : 2}
                style={styles.shopAddressTextStyle}>
                {item.Descreption}
              </Text>
              {
                (item.Descreption && item.Descreption.length > 45) ? (
                <Text
                onPress={() => this.toggleNumberOfLines(index)}
                style={{ color: '#3955CB' }}>
                {this.state.textShown === index ? 'read less' : 'read more'}
              </Text>
                ) : (
                  <Text></Text>
                )
              }
             
              </View>
              {/* <View style={styles.callContainer}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6ebe7',
                    borderRadius: 20,
                    width: 28,
                    height: 26,
                  }}
                  onPress={() =>
                    Communications.phonecall('0123456789', true)
                  }>
                  <Text style={styles.callTextStyle}> Call</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </TouchableOpacity>
        </View>
          )
          
        }else if(item.ResourceType == 1){
          return(
            <View style={styles.shopListMainContainerCard}>
            <TouchableOpacity 
            onPress={() => Actions.ResourceWebView({URL: item.URL})}>
              <View style={styles.shopListBackContainerCard}>
              <View style={styles.shopDetaildownload}>

                  <View style={styles.shopDetailsdownload}>
                <View style={styles.shopNameAddContainerCard}>
                  <Text style={styles.shopNameTextStyleCard}>
                    {item.ResourceName}
                  </Text>
                </View>
                <View style={styles.shopNameAddContainerCard}>
                  <Text style={styles.shopDistanceTextStyleCard}>
                  Published On { moment(item.CreatedDate).format('DD-MMM-YYYY')}
                    {/* 1Km Away ETA 5 mins */}
                  </Text>
                </View>
                </View>

                {/* <Image style={styles.mapIconStyle}
                   source = {require('../../assets/Icons/Data_Upload.png')}/> */}

        </View>
                
                {/* <View style={styles.imgBackContainerCard}> */}
                <Image
                        style={styles.imgBackContainerCard}
                        source={{ uri: item.URL }}
                      />
                 {/* </View> */}
                <View style={styles.NCMContainerCard}>
                  <View style={styles.navContainerCard}>
                   
                      {/* <Text style={styles.navTextStyleCard}>
                      {item.Descreption}
                      </Text> */}

              <Text
                numberOfLines={this.state.textShown === index ? undefined : 2}
                style={styles.shopAddressTextStyle}>
                {item.Descreption}
                </Text>
                {
                (item.Descreption && item.Descreption.length > 45) ? (
                <Text
                onPress={() => this.toggleNumberOfLines(index)}
                style={{ color: '#3955CB' }}>
                {this.state.textShown === index ? 'read less' : 'read more'}
              </Text>
                ) : (
                  <Text></Text>
                )
               }
         </View>
                
                 
                </View>
              </View>
            </TouchableOpacity>
          </View>
          )
         
        }else if(item.ResourceType == 2){
          return(
            <View style={styles.shopListMainContainerCard}>
            <TouchableOpacity 
            onPress={() => Actions.ResourceWebView({URL: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'})}>
              <View style={styles.shopListBackContainerCard}>
                <View style={styles.shopNameAddContainerCard}>
                  <Text style={styles.shopNameTextStyleCard}>
                    {item.ResourceName}
                  </Text>
                </View>
                <View style={styles.shopNameAddContainerCard}>
                  <Text style={styles.shopDistanceTextStyleCard}>
                  Published On { moment(item.CreatedDate).format('DD-MMM-YYYY')}
                    {/* 1Km Away ETA 5 mins */}
                  </Text>
                </View> 
                {/* <View style={styles.imgBackContainerCard}> */}
                {/* <Image
                        style={styles.imgBackContainerCard}
                        source={{ uri: item.URL }}
                      /> */}
          <Video
                  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                  style={styles.imgBackContainerCard}
                  controls={false}
                //  paused ={true}
              //  playWhenInactive ={false}
                muted={true}
                  resizeMode="cover"
                  pictureInPicture={true}
                 // onBuffer={this.videoBuffer}
                  ref={(ref) => {
                  this.player = ref
                  }} />
                      
               
                {/* <Thumbnail style={styles.imgBackContainerCard}  url="https://www.youtube.com/watch?v=yJuCqERv6TM" /> */}
                  {/* {
                    (item.ResourceType == 2) ? (
                      <Thumbnail style={styles.imgBackContainerCard}  url="https://www.youtube.com/watch?v=yJuCqERv6TM" />
                    ) : (
                     
                        <Image
                        style={styles.imgBackContainerCard}
                        source={{ uri: item.URL }}
                      />
                     
                     
                    )
                  } */}
    
                 
                {/* </View> */}
                <View style={styles.NCMContainerCard}>
                  <View style={styles.navContainerCard}>
                   
                      {/* <Text style={styles.navTextStyleCard}>
                      {item.Descreption}
                      </Text> */}
                        <Text
                numberOfLines={this.state.textShown === index ? undefined : 2}
                style={styles.shopAddressTextStyle}>
                {item.Descreption}
                </Text>
                {
                (item.Descreption && item.Descreption.length > 45) ? (
                <Text
                onPress={() => this.toggleNumberOfLines(index)}
                style={{ color: '#3955CB' }}>
                {this.state.textShown === index ? 'read less' : 'read more'}
              </Text>
                ) : (
                  <Text></Text>
                )
               }
                </View>
                  </View>
              </View>
            </TouchableOpacity>
          </View>
          )
         
        }
      }
      }
      />
      </View>
     ) 
  } }  
  


//   render() {
//     return (
//       <View>
//       <View style={styles.shopListMainContainerCard}>
//       <TouchableOpacity >
//         <View style={styles.shopListBackContainerCard}>
//           <View style={styles.shopNameAddContainerCard}>
//             <Text style={styles.shopNameTextStyleCard}>
//               Dummy Video
//             </Text>
//           </View>
//           <View style={styles.shopNameAddContainerCard}>
//             <Text style={styles.shopDistanceTextStyleCard}>
//              Testing
//               {/* 1Km Away ETA 5 mins */}
//             </Text>
//           </View>
//           <View style={styles.imgBackContainerCard}>
//             {/* <Image
//               style={styles.imageStylesCard}
//               source={require('../../assets/Icons/shopImg.png')}
//               // source={require('../../assets/Icons/Shop_card_watermark.png')}
//             /> */}
//             <Thumbnail style={styles.imgBackContainerCard}  url="https://www.youtube.com/watch?v=yJuCqERv6TM" />
//           </View>
//           {/* <View style={styles.NCMContainerCard}>
//             <View style={styles.navContainerCard}>
//               <TouchableOpacity>
//                 <Text style={styles.navTextStyleCard}>Navigate</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.callContainerCard}>
//               <TouchableOpacity
//                 // style={{backgroundColor: 'red'}}
//               >
//                 <Text style={styles.callTextStyleCard}>Call</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.msgContainerCard}>
//               <TouchableOpacity
//                 >
//                 <Text style={styles.msgTextStyleCard}>Message</Text>
//               </TouchableOpacity>
//             </View>
//           </View> */}
//         </View>
//       </TouchableOpacity>
//     </View>

// <View style={styles.shopListMainContainerCard}>
// <TouchableOpacity >
//   <View style={styles.shopListBackContainerCard}>
//     <View style={styles.shopNameAddContainerCard}>
//       <Text style={styles.shopNameTextStyleCard}>
//         Dummy Video
//       </Text>
//     </View>
//     <View style={styles.shopNameAddContainerCard}>
//       <Text style={styles.shopDistanceTextStyleCard}>
//        Testing
//         {/* 1Km Away ETA 5 mins */}
//       </Text>
//     </View>
//     <View style={styles.imgBackContainerCard}>
// <Image
//         style={styles.imgBackContainerCard}
//         source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
//         // source={require('../../assets/Icons/Shop_card_watermark.png')}
//       />
//     {/* <Video
//         source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
//         style={styles.imgBackContainerCard}
//         controls={true}
      
      
//         resizeMode="cover"
//         pictureInPicture={true}
//         onBuffer={this.videoBuffer}
//         ref={(ref) => {
//         this.player = ref
//         }} /> */}

//       {/* <Image
//         style={styles.imgBackContainerCard}
//         source={ Image_Http_URL}
//         // source={require('../../assets/Icons/Shop_card_watermark.png')}
//       /> */}
//       {/* <Thumbnail style={styles.imgBackContainerCard} large source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}}  /> */}
//        {/* <Thumbnail style={styles.imgBackContainerCard} url="https://www.youtube.com/watch?v=yJuCqERv6TM" /> */}
//     </View>
//     {/* <View style={styles.NCMContainerCard}>
//       <View style={styles.navContainerCard}>
//         <TouchableOpacity>
//           <Text style={styles.navTextStyleCard}>Navigate</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.callContainerCard}>
//         <TouchableOpacity
//           // style={{backgroundColor: 'red'}}
//         >
//           <Text style={styles.callTextStyleCard}>Call</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.msgContainerCard}>
//         <TouchableOpacity
//           >
//           <Text style={styles.msgTextStyleCard}>Message</Text>
//         </TouchableOpacity>
//       </View>
//     </View> */}
//   </View>
// </TouchableOpacity>
// </View>
// </View>
//     );
//     }

     
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { state } = navigation

        return {
            title: 'Resources',
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: hp('3'),

            },
            // headerRight: (
            //     <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

            //         <TouchableOpacity onPress={state.params.handleFilterPress}>
            //             <View>
            //                 <Image style={{ marginRight: hp('4'), height: hp('3'), width: wp('4') }}
            //                     source={require('../../assets/Icons/Sort_by.png')}
            //                 />
            //             </View>
            //         </TouchableOpacity>

            //         <Image style={{ marginRight: hp('2'), marginBottom: hp('0.5'), height: hp('4'), width: wp('6.1'), }}
            //             source={require('../../assets/Icons/SearchHeader.png')}
            //         />

            //     </View>
            // ),

            headerLeft: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                    <TouchableOpacity onPress={() => Actions.Dashboard()}>
                        <Image style={{ marginLeft: wp('2'), }}
                            source={require('../../assets/Icons/Back_White.png')}
                        />
                    </TouchableOpacity>
                    {/* <Image style={{ marginLeft: wp('2'), }}
                        source={require('../../assets/Icons/Data_Upload1.png')}
                    /> */}
                </View>
            ),
        }

    }


    // componentDidMount() {
    //     db.getResources().then((data) => {
    //         console.log("resources data==", data)

            

        
    // })
    //   }
    }

    

const mapStateToProps = (state) => {
    return {
        servey:state.servey
     
    };
  };
  const mapDispatchToProps = dispatch => ({
    
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(ResourceLanding)

  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
      },
    surveyTakenAvilableMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
      justifyContent: 'flex-start',
    },
  
    surveyTakenRowContainer: {
      flex: 0.4,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: wp('-12'),
    },
  
    surveysTakenLabelStyle: {
      color: '#362828',
      fontSize: RFValue(12),
      alignSelf: 'center',
      fontFamily: 'Proxima Nova',
      fontWeight: 'bold',
    },
    pastSurveysCardContainer: {
      marginTop: hp('0'),
    },
  
    pastSurveysCardBG: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E6DFDF',
      borderWidth: wp('0.3'),
      borderRadius: wp('1.5'),
      height: hp('10'),
      width: wp('90'),
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('1.5'),
    },
  
    pastSurveyimageContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
  
    pastSurveyimageStyles: {
      marginLeft: wp('2'),
      height: hp('5'),
      width: wp('10'),
      tintColor: '#796A6A',
    },
  
    pastSurveyContainer: {
      flex: 5,
      marginTop: hp('-2.8'),
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  
    pastSurveyNameTextStyle: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      //  fontSize: RFValue(17),
      marginTop: hp('2'),
      fontSize: 16,
    },
  
    cardDashLineMainContainer: {
      flex: 4,
      marginTop: hp('3.5'),
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    viewDetailsMainContainer: {
      flex: 1,
      flexDirection: 'column',
    },
  
    viewDetailesLabelContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  
    viewDetaileTextStyle: {
      color: '#3955CB',
      fontFamily: 'Proxima Nova',
      // fontSize: RFValue('13'),
      marginRight: wp('9'),
      marginTop: hp('0.8'),
      fontWeight: 'bold',
      fontSize: 12,
    },
  
    viewDetailesArrowContainer: {
      alignItems: 'flex-end',
      marginRight: wp('3'),
      marginBottom: hp('3.5'),
    },
  
    viewDetailsArrowStyle: {
      tintColor: '#3955CB',
      height: hp('4'),
      width: wp('4'),
    },
    //////////////////////////////////////////////
    SalesDetaileWhiteBG: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      flex: 1,
      borderColor: '#E6DFDF',
      alignSelf: 'center',
      borderRadius: wp('1.5'),
      height: hp('24'),
      width: wp('90'),
      borderWidth: wp('0.3'),
      alignItems: 'center',
      marginTop: hp('2'),
      justifyContent: 'center',
      alignContent: 'center',
    },
    SalesDetaileWhiteBGdata: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      flex: 1,
      borderColor: '#E6DFDF',
      alignSelf: 'center',
      borderRadius: wp('1.5'),
      height: hp('20'),
      width: wp('90'),
      //  height: 132,
      //  width: wp('90'),
      borderWidth: wp('0.3'),
      alignItems: 'center',
      marginTop: hp('2'),
      justifyContent: 'center',
      alignContent: 'center',
    },
  
    SalesDateRowContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    SalesrowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: wp('1'),
    },
  
    invDateLabelStyle: {
      color: '#362828',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
    },
  
    SalestextStyle: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      //   fontSize: RFValue(17),
      marginTop: hp('1'),
      fontSize: 16,
      marginLeft: hp('-3'),
    },
  
    salesColContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: wp('5'),
      marginTop: hp('1'),
    },
  
    salesLabelStyle: {
      color: 'grey',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      //  fontSize: RFValue(12),
      borderRadius: 20,
      padding: 8,
      backgroundColor: '#F8F4F4',
      marginRight: wp('3'),
      fontSize: 10,
    },
  
    salesNameStyle: {
      color: '#796A6A',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
      marginTop: hp('1'),
    },
  
    invDetDashContainer: {
      // flex:1,
      marginTop: hp('1'),
      alignContent: 'center',
      alignItems: 'center',
    },
  
    invDetDashStyle: {
      width: wp('85'),
      height: hp('1'),
    },
  
    TotalSaleMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    TotalSaleColContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: wp('5'),
    },
  
    TotalSaleLabelStyle: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      //    fontSize: RFValue(12),
      fontSize: 10,
    },
  
    TotalSaleMainAmount: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('-4'),
    },
  
    TotalSaleScondAmount: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: wp('5'),
    },
  
    TotalSaleAmount: {
      color: 'black',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(17),
      marginTop: hp('0.5'),
      fontWeight: 'bold',
    },
    myButton: {
      padding: 15,
      borderRadius: 20,
      backgroundColor: 'grey',
      color: 'grey',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
    },
  
    TotalChangeMainContainer: {
      flex: 1.1,
      flexDirection: 'column',
      marginLeft: wp('20'),
      marginTop: hp('-3'),
    },
  
    TotalChangeLabelContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginRight: wp('5'),
    },
  
    TotalChangeTextStyle: {
      color: '#796A6A',
      fontFamily: 'Proxima Nova',
      //   fontSize: RFValue('13'),
      fontWeight: 'bold',
      fontSize: 10,
    },
  
    TotalChangeArrowContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: hp('3.5'),
      marginLeft: hp('-1'),
    },
  
    TotalChangeArrowStyle: {
      tintColor: 'green',
      height: hp('4'),
      width: wp('5'),
    },
    ///////////////////////////////////////////performace
  
    pastSurveyimageContainer1: {
      flex: 1,
      alignItems: 'flex-start',
    },
  
    pastSurveyimageStyles1: {
      marginLeft: wp('1'),
      height: hp('5'),
      marginTop: hp('2'),
      width: wp('10'),
      tintColor: '#796A6A',
    },
  
    pastSurveyContainer1: {
      flex: 6,
      marginTop: hp('-2.8'),
      alignItems: 'center',
      marginLeft: hp('-1'),
      justifyContent: 'flex-start',
    },
  
    TriangleShapeCSS: {
      width: 0,
      height: 0,
      borderLeftWidth: 9,
      borderRightWidth: 9,
      borderBottomWidth: 18,
      borderStyle: 'solid',
      marginTop: hp('0.2'),
      marginLeft: hp('1'),
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#2FC36E',
    },
  
    pastSurveyNameTextStyle1: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      //   marginLeft:hp('-1'),
      marginTop: hp('2'),
      fontSize: 16,
    },
  
    cardDashLineMainContainer1: {
      flex: 4,
      marginTop: hp('3.5'),
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    viewDetailsMainContainer1: {
      flex: 1,
      flexDirection: 'column',
    },
  
    viewDetailesLabelContainer1: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    ////////////////////target css
    targetMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    targetinnerContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: wp('1'),
    },
    targetimageContainer1: {
      flex: 1,
      alignItems: 'flex-start',
    },
    targetimageStyles1: {
      marginLeft: wp('2'),
      height: hp('5'),
      width: wp('10'),
    },
  
    invDateLabelStyle: {
      color: '#362828',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
    },
  
    targettextStyle1: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 16,
      marginTop: hp('1'),
      marginRight: wp('4.5'),
      alignItems: 'flex-start',
      marginLeft: hp('0.3'),
    },
  
    targetColContainer1: {
      flex: 2,
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: wp('4'),
      marginTop: hp('1'),
    },
  
    targetLabelStyle1: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
      borderRadius: 20,
      padding: 8,
      backgroundColor: '#F8F4F4',
      marginRight: wp('3'),
    },
  
    targetNameStyle: {
      color: '#362828',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
      marginTop: hp('1'),
    },
  
    targetbelowMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    TargetLabelStyle11: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
    },
    TargetLabelStyle12: {
      color: '#362828',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 18,
    },
    TargetLabelStyle13: {
      color: '#362828',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
    },
  
    TotalSaleMainAmount: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('-4'),
    },
  
    TotalSaleScondAmount: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: wp('5'),
    },
  
    TotalSaleAmount: {
      color: 'black',
      fontFamily: 'Proxima Nova',
      //  fontSize: RFValue(17),
      marginTop: hp('0.5'),
      fontWeight: 'bold',
      fontSize: 18,
      color: '#362828',
    },
    myButton: {
      padding: 15,
      borderRadius: 20,
      backgroundColor: 'grey',
      color: 'grey',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
    },
    /////////////////////////////data upload
  
    DuMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    DuinnerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: wp('1'),
    },
    DuimageContainer1: {
      flex: 1,
      alignItems: 'flex-start',
    },
    DuimageStyles1: {
      marginLeft: wp('2'),
      height: hp('5'),
      width: wp('10'),
    },
  
    DutextStyle1: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 16,
      marginTop: hp('1'),
      alignItems: 'flex-start',
    },
  
    DuColContainer1: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: wp('2'),
      marginTop: hp('1'),
    },
  
    DuLabelStyle1: {
      color: 'grey',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
      borderRadius: 20,
      padding: 8,
      backgroundColor: '#F5F5F5',
      marginRight: wp('3'),
    },
  
    DuNameStyle: {
      color: '#362828',
      fontFamily: 'Proxima Nova',
      fontSize: RFValue(12),
      marginTop: hp('1'),
    },
    DubelowMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    DuColContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: wp('5'),
    },

    headerMainContainer: {
      flex: 0.3,
      backgroundColor: '#221818',
    },
  
    todaysRouteTextStyle: {
      color: '#ADA2A2',
      fontSize: 10,
      fontFamily: 'Proxima Nova',
      fontWeight: 'bold',
      marginLeft: wp('6'),
      marginTop: hp('4'),
    },
  
    dropDownContainer: {
      borderWidth: wp('0.5'),
      borderColor: '#E6DFDF',
      borderRadius: wp('2%'),
      width: wp('90'),
      height: hp('9'),
      marginTop: hp('2'),
      paddingRight: wp('3%'),
      marginVertical: hp('5'),
      marginHorizontal: wp('5'),
      backgroundColor: '#FFFFFF',
      paddingHorizontal: hp('2'),
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      padding: 15,
      fontSize: 11,
    },
  
    totalShopsMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: hp('2'),
    },
  
    totalShopColContainer: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  
    totalShopCountTextStyle: {
      color: '#221818',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: wp('11'),
      fontFamily: 'Proxima Nova',
    },
  
    totalShopHeadingTextStyle: {
      color: '#8C7878',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: hp('0.5'),
      marginLeft: wp('6%'),
      fontFamily: 'Proxima Nova',
    },
  
    shopVisitedColContainer: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  
    shopVisitedCountTextContainer: {
      color: '#221818',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: wp('8'),
      fontFamily: 'Proxima Nova',
      fontWeight: 'bold',
    },
  
    shopVisitedHeadingTextStyle: {
      color: '#8C7878',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: hp('0.5'),
      marginLeft: wp('-2'),
      fontFamily: 'Proxima Nova',
    },
  
    filterIconContainer: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginTop: hp('1'),
    },
  
    filterIconStyle: {
      justifyContent: 'center',
      height: hp('4'),
      width: wp('8'),
      marginRight: wp('5'),
    },
  
    dashLineContainer: {
      flex: 1,
      marginTop: hp('2.5'),
      alignContent: 'center',
      alignItems: 'center',
    },
  
    dashLineStyle: {
      width: wp('100'),
      height: hp('1'),
      color: '#ADA2A2',
    },
  
    shopListMainContainer: {
      marginTop: hp('3'),
    },
  
    shopDetailBackStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderColor: '#E6DFDF',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: wp('2'),
      height: hp('18'),
      width: wp('90'),
      borderWidth: hp('0.3'),
      marginHorizontal: wp('4'),
    },
    shopDetaildownload : {
      
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    //  width: wp('90'),
    },
    imageContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
  
    imageStyles: {
      marginLeft: wp('5'),
      height: hp('10'),
      width: hp('10'),
    },
  
    shopDetailsContainer: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: hp('-3'),
      marginLeft: wp('15'),
    },
    shopDetailsdownload :{
      //flex: 3,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  
    shopNameTextStyle: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 14,
      marginTop: hp('2'),
    },
  
    shopAddressTextStyle: {
      color: '#796A6A',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
      marginTop: wp('3'),
    },
  
    shopDistanceTextStyle: {
      color: '#796A6A',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
      marginTop: wp('3'),
    },
  
    callContainer: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginLeft: wp('5'),
    },
  
    callTextStyle: {
      color: '#3955CB',
      fontFamily: 'Proxima Nova',
      fontSize: 12,
    },
  
    shopListMainContainerCard: {
      marginTop: hp('3'),
    },
  
    shopListBackContainerCard: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E6DFDF',
      borderRadius: wp('2'),
      height: hp('48'),
      width: wp('90'),
      borderWidth: hp('0.3'),
      marginHorizontal: wp('4'),
    },
  
    shopNameAddContainerCard: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginLeft: wp('6'),
    },
    downloadContainerCard: {
      flexDirection: 'row',
      width: wp('90'),
    },
    downlodimageContainerCard: {
      alignItems: 'flex-end',
    //  flexDirection: 'row',
      marginLeft: wp('6'),
    },
  
    shopNameTextStyleCard: {
      color: '#796A6A',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      fontSize: 14,
      marginTop: hp('2'),
    },
  
    shopDistanceTextStyleCard: {
      color: '#796A6A',
      fontFamily: 'Proxima Nova',
      fontSize: 10,
      marginTop: wp('3'),
    },
    imgBackContainerCard: {
      backgroundColor: '#F8F4F4',
      borderRadius: wp('2'),
      height: hp('18'),
      width: wp('80'),
      marginTop: hp('3'),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    imageStylesCard: {
      // marginLeft: wp('4'),
      height: hp('17'),
      width: wp('22'),
    },
  
    NCMContainerCard: {
      flex: 1,
      flexDirection: 'row',
      marginTop : hp('3'),
    },
  
    navContainerCard: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: wp('6'),
    },
  
    navTextStyleCard: {
      color: '#362828',
      fontSize: 12,
     // fontWeight: 'bold',
      marginLeft: wp('6'),
      fontFamily: 'Proxima Nova',
    },
  
    callContainerCard: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    callTextStyleCard: {
      color: '#3955CB',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
      // marginLeft: wp('5'),
    },
  
    msgContainerCard: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  
    msgTextStyleCard: {
      color: '#3955CB',
      fontSize: 12,
      fontWeight: 'bold',
      marginRight: wp('6'),
      fontFamily: 'Proxima Nova',
    },
    mapIconStyle:{
      alignSelf:'flex-end',
      height: hp('4'),
      width: wp('6'),
      // width:  wp('25'),
      // height: hp('12'),
    },
  });
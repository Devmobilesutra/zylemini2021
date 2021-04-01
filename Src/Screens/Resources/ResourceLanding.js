import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, BackHandler, ActivityIndicator ,FlatList,PermissionsAndroid} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import moment from 'moment';
const db = new Database();
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
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

      async requestFineLocation() {
        try {
            if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  //  this.getUserPosition();
                  console.log('permission granted')
                }
                else { this.requestFineLocation() }

            } else {
               // this.getUserPosition();
            }
        } catch (err) {
            console.warn(err);
        }
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
      this.requestFineLocation();
        db.getResources().then((data)=>{
          console.log("Distributor Meeting",data);
              this.setState({ resourcesArray: data })
              console.log("resourcesArray : ",JSON.stringify(this.state.resourcesArray));
         })

       }


          toggleNumberOfLines = (index) => {
            var d = "Zylem POP For Recording Promotions of Products by the Company";
            console.log('index : '+index + " len : "+d.length)
            this.setState({
              textShown: this.state.textShown === index ? -1 : index,
            });
          };
       
          DownloadImage = (URL) => {
            var date = new Date();
           // var image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
            var ext = this.getExtention(URL);
            ext = "." + ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir
            let options = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + "/image_" + Math.floor(date.getTime()
                  + date.getSeconds() / 2) + ext,
                description: 'Image'
              }
            }
            config(options).fetch('GET', URL).then((res) => {
              alert("Image Downloaded Successfully.");
            });
          }

          DownloadVideo= (URL) => {
            var date = new Date();
           // var image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
            var ext = this.getExtention(URL);
            ext = "." + ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir
            let options = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + "/video" + Math.floor(date.getTime()
                  + date.getSeconds() / 2) + ext,
                description: 'Image'
              }
            }
            config(options).fetch('GET', URL).then((res) => {
              alert("Video Downloaded Successfully.");
            });
          }

         
          getExtention = (filename) => {
            return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
              undefined;
          }
         
      
render(){
  if(this.state.resourcesArray){
    return(

      <View>
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
            
            </View>
          </TouchableOpacity>
        </View>
          )
          
        }else if(item.ResourceType == 1){
          return(
            <View style={styles.shopListMainContainerCard}>
            {/* <TouchableOpacity> */}
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

            <View style={{flex : 1,justifyContent : 'center'}}>
            <TouchableOpacity 
            onPress={() =>this.DownloadImage(item.URL)}>
                <Image style={styles.mapIconStyle}
                tintColor = '#3955CB'
                   source = {require('../../assets/Icons/download.png')}/>
                   </TouchableOpacity>
            </View>
        </View>
                
                {/* <View style={styles.imgBackContainerCard}> */}
                <TouchableOpacity 
            onPress={() => Actions.ResourceWebView({URL: item.URL})}>
                <Image
                        style={styles.imgBackContainerCard}
                        source={{ uri: item.URL }}
                      />
               </TouchableOpacity>
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
            {/* </TouchableOpacity> */}
          </View>
          )
         
        }else if(item.ResourceType == 2){
          return(
            <View style={styles.shopListMainContainerCard}>
            {/* <TouchableOpacity> */}
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

                <View style={{flex : 1,justifyContent : 'center'}}>
                <TouchableOpacity 
                onPress={() =>this.DownloadVideo('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4')}>
                <Image style={styles.mapIconStyle}
                tintColor = '#3955CB'
                source = {require('../../assets/Icons/download.png')}/>
                </TouchableOpacity>
                </View>
                </View>
                {/* <View style={styles.imgBackContainerCard}> */}
                {/* <Image
                        style={styles.imgBackContainerCard}
                        source={{ uri: item.URL }}
                      /> */}
                  <TouchableOpacity
                   onPress={() => Actions.ResourceWebView({URL: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'})}>
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
                   </TouchableOpacity>   
               
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
            {/* </TouchableOpacity> */}
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
    shopListBackContainerCard: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E6DFDF',
      borderRadius: wp('2'),
      height: hp('48'),
      width: wp('90'),
      borderWidth: hp('0.3'),
      marginHorizontal: wp('4'),
    },
    shopDetaildownload : {
      
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    //  width: wp('90'),
    },
    shopDetailsdownload :{
      flex: 2,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    shopNameAddContainerCard: {
      alignItems: 'flex-start',
      flexDirection: 'row',
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
    mapIconStyle:{
      alignSelf:'center',
      height: hp('4'),
      width: wp('6'),
      // width:  wp('25'),
      // height: hp('12'),
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


   
  
    imageStylesCard: {
      // marginLeft: wp('4'),
      height: hp('17'),
      width: wp('22'),
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
   
  });
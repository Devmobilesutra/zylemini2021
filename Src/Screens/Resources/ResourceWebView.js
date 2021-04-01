import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler,AsyncStorage,ActivityIndicator,PermissionsAndroid } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { WebView } from "react-native-webview";
import { connect } from 'react-redux'

export  class ResourceWebView extends Component {
constructor(props) {
    super(props);
    this.state = {  
   
    visible: true   };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

showSpinner() {
    //console.log('Show Spinner');
    this.setState({ visible: true });
  }

  hideSpinner() {
    //console.log('Hide Spinner');
    this.setState({ visible: false });
  }

componentWillMount(){

}
componentDidMount(){  
  
   
    
  
    //console.log("rrrrrrrrrrrrrrresult-",res3)
    //console.log("lat.........",lat)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick); 
   
   
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.ResourceLanding();
     return true;
   }

render() {
    return (
       
        <View

        style={this.state.visible === true ? styles.stylOld : styles.styleNew}>
        {this.state.visible ? (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        ) : null}

        <WebView
          style={styles.WebViewStyle}
          //Loading URL
          source={{ uri: this.props.URL }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          //Want to show the view or not
          //startInLoadingState={true}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
      </View>

    );
  }
}


const mapStateToProps = (state) => {
    return {     
        login: state.login,
        servey:state.servey
    };
  };
  const mapDispatchToProps = dispatch => ({
   

  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(ResourceWebView)
const styles = StyleSheet.create({
    container : {
        flex:5, 
        flexDirection:'row',
        backgroundColor: '#210305'
    },

    companyBrandContainer: {
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-start',
        marginLeft: wp('6')
    },

    companyBrandTextStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12),
        fontWeight: 'bold',
        marginTop: hp('3%'), 
        fontFamily: 'Proxima Nova', 
        marginLeft: wp('5%'),
    },
  
    publishDateStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12), 
        marginTop: hp('1%'), 
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2')
    },


    timeRequiredRowContainer: {
        flex:0.5, 
        flexDirection:'row', 
        alignItems: 'flex-end',
        marginLeft: wp('4'),
    },

    timeRequiredTextStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12),
        marginTop: hp('1%'), 
        marginRight: wp('5%'), 
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2') ,
    },

    blueCardMainContainer:{
        marginTop:hp('2'), 
        alignItems:'center',
    },

    blueCardInnerContainer:{ 
        height:hp('100'), 
        width:wp('100'), 
        
        borderRadius:wp('2'), 
    },

    surveyImgContainer:{
        alignItems:'center',
    },

    surveyImgStyle:{
        height:hp('12'), 
        width:wp('15'), 
        marginTop:hp('10'), 
    },

    questionLableContainer:{
        marginTop:hp('1'), 
        marginLeft:wp('4'), 
        marginRight: wp('2'),
    },

    questionLableStyle:{
        color: 'white', 
        fontSize:RFValue(15), 
        fontFamily: 'Proxima Nova',  
    },

    questionContainer:{
        marginTop:hp('1'), 
        marginLeft:wp('4'), 
        marginRight: wp('2'),
    },

    questionStyle:{
        color: 'white', 
        fontSize:RFValue(20), 
        fontWeight:'bold',
        fontFamily: 'Proxima Nova', 
    },

    middleLineStyle:{
        width:wp('70'),    
        borderBottomColor: 'black',
        borderBottomWidth: wp('0.1'),
        alignSelf:'center',
        marginTop: hp('2.5')
    },
    stylOld: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      styleNew: {
        flex: 1,
      },
      WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 0.5,
      },
      ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
});
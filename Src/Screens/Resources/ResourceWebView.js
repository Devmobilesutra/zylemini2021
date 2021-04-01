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
 
      WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 0.5,
      },
      stylOld: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      styleNew: {
        flex: 1,
      },
      ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
});
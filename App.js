import React, {Component, useEffect} from 'react';
import {addNavigationHelpers} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './Src/Redux/Store';
import {View, Alert, Text, BackHandler} from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import RouterComponent from './Router';
import {bindActionCreators} from 'redux';

//new comment
//sdfsdf

import {connect} from 'react-redux';

export default function App() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  return <Provider store={store}>{<RouterComponent />}</Provider>;
}

// const bindAction = dispatch => {
//     return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch));
//     // add dispatch itself to props, so available for addNavigationHelpers
// };

// const mapStateToProps = state => ({
//   navigation: state.navigation, // needed for addNavigationHelpers
// });

// export default connect(mapStateToProps, bindAction)(App);

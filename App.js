import React, {Component} from 'react';
import {addNavigationHelpers} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './Src/Redux/Store';
import {View, Alert, Text} from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import RouterComponent from './Router';
import {bindActionCreators} from 'redux';

//new comment
import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return <Provider store={store}>{<RouterComponent />}</Provider>;
  }
}
export default App;

// const bindAction = dispatch => {
//     return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch));
//     // add dispatch itself to props, so available for addNavigationHelpers
// };

// const mapStateToProps = state => ({
//   navigation: state.navigation, // needed for addNavigationHelpers
// });

// export default connect(mapStateToProps, bindAction)(App);

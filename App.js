/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './Login'
import Loader from './Loader';
import Demo from './Business/Product/Demo';
import ProductList from './Business/Product/ProductList';
import ProductView from './Business/Product/ProductView';
import UploadView from './Business/Product/UploadView';


export const SimpleApp = StackNavigator({
    Login: { screen: Login },
    Demo: { screen: Demo },
    ProductList: { screen: ProductList },
    ProductView: { screen: ProductView },
    UploadView: { screen: UploadView },
});

export default class App extends Component {
    state = { loggedIn: false };
        

    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        return <SimpleApp />;
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

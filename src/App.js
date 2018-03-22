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
import Login from './../src/Login'
import Loader from './../src/Loader';
import Demo from './../src/Business/Product/Demo';
import Demo2 from './../src/Business/Product/Demo2';
import ProductList from './../src/Business/Product/ProductList';
import ProductView from './../src/Business/Product/ProductView';
import UploadView from './../src/Business/Product/UploadView';


export const SimpleApp = StackNavigator({
    Login: { screen: Login },
    Demo: { screen: Demo },
    Demo2: { screen: Demo2 },
    ProductList: { screen: ProductList },
    ProductView: { screen: ProductView },
    UploadView: { screen: UploadView },
});

export default class App extends React.Component {
    state = { loggedIn: false };


    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        return(
          <SimpleApp />
        );
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

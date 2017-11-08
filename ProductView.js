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
  TextInput,
  Image,
  Button,
  View
} from 'react-native';
import Common from './utils/Common';
import FetchBack from './utils/FetchBack';
import RNFS from 'react-native-fs';

export default class ProductView extends Component {
    constructor() {
        super();

        this.state = {
                      width:100,
                      height:101,
                      x:10,
                      y:20,
                      documentPath: RNFS.DocumentDirectoryPath+'/',
                      internalContainerwidth: 200,
                      internalContainerheight: 200,
                      internalContainerleft: 0,
                      internalContainertop: 0,
                      loading: false
                    };
        let params = {'start':'0',limit:'20','isNeedCategory': true, 'lastRefreshTime': '2016-09-25 09:45:12'};
                FetchBack.Post(this, params, function (target, set) {

                });
      }

    layoutchanged(e){
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y),
            internalContainerwidth: Math.ceil(e.nativeEvent.layout.width * 0.8),
            internalContainerheight: Math.ceil(e.nativeEvent.layout.height * 0.5),
            internalContainerleft: Math.ceil(e.nativeEvent.layout.width * 0.1),
            internalContainertop: Math.ceil(e.nativeEvent.layout.height * 0.25),
          });
    }

    internalContainerStyle() {
            return {
                flex: 1,
                flexDirection: 'column',
                marginTop: this.state.internalContainertop,
                marginBottom: this.state.internalContainertop,
                marginLeft: this.state.internalContainerleft,
                marginRight: this.state.internalContainerleft,
                width: this.state.internalContainerwidth,
                height: this.state.internalContainerheight,
                alignItems:'center',
                borderRadius: 15,
            }
     }
     internalImageStyle() {
             return {
                 width: this.state.internalContainerwidth *0.5 ,
                 height: this.state.internalContainerheight * 0.5,
             }
      }

    static navigationOptions = {
        title: 'ProductView',
        //header:null,
        headerRight: <Button title="Info" />,
        gesturesEnabled: true
    };


  render() {
    var localpath =  Common.GetLocalFullPath(this.props.navigation.state.params.ListViewClickItemHolder.Icon);
    return (
      <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
          <View style={this.internalContainerStyle()}>
            <View>
                <Image source={{uri:localpath}} style={this.internalImageStyle()} />
                     <Text>{ this.props.navigation.state.params.ListViewClickItemHolder.FirstName }</Text>
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width:'100%',
    height:'100%',
  },
    styleproducts:{
        width:'90%',
    },
    itemStyle: {
        // 主轴方向
        flexDirection:'row',
        // 下边框
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },

});

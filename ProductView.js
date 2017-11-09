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
                      avatarSource:null,
                      internalContainerwidth: 200,
                      internalContainerheight: 200,
                      internalContainerleft: 0,
                      internalContainertop: 0,
                      loading: false,
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

    upLoader() {
            var ImagePicker = require('react-native-image-picker');

            // More info on all the options is below in the README...just some common use cases shown here
            var options = {
              title: 'Select Avatar',
              customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
              ],
              storageOptions: {
                skipBackup: true,
                path: 'images'
              }
            };

            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info below in README)
             */
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                  avatarSource: source
                });
              }
            });
        }

  render() {
    var localpath =  Common.GetLocalFullPath(this.props.navigation.state.params.ListViewClickItemHolder.Icon);
    return (
      <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
          <View style={this.internalContainerStyle()}>
            <View>
                <Image source={{uri:localpath}} style={this.internalImageStyle()} />
                     <Text>{ this.props.navigation.state.params.ListViewClickItemHolder.FirstName }</Text>
                     <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
                     <Button onPress={this.upLoader.bind(this)} title='Load'></Button>
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
  uploadAvatar: {
      width:160,
      height:160,
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

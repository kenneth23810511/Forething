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
  ListView,
  Image,
  View
} from 'react-native';
import Common from './utils/Common';
import FetchBack from './utils/FetchBack';
import RNFS from 'react-native-fs';
import ProductView from './ProductView';
import { StackNavigator } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class ProductList extends Component {
    constructor(props) {
            super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
                      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
                      width:100,
                      height:101,
                      x:10,
                      y:20,
                      documentPath: RNFS.DocumentDirectoryPath+'/',
                    };
        let params = {'start':'0',limit:'20','isNeedCategory': true, 'lastRefreshTime': '2016-09-25 09:45:12'};
                FetchBack.Post(this, params, function (target, set) {
                     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                    set.returnObj.forEach(p =>{
                               var filename = p.Icon.replace(/^.*[\\\/]/, '');
                               var localpath =  target.state.documentPath + filename;
                                            RNFS.downloadFile({
                                                fromUrl: p.Icon,
                                                toFile: localpath,
                                              }).promise.then((r) => {
                                               p.Icon = localpath;
                                              });
                                              }
                                        );
                     target.setState({
                                  dataSource: ds.cloneWithRows(set.returnObj),
                             });
                });
      }
    layoutchanged(e){
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y)
          });
    }

    static navigationOptions = {
        title: 'Product',
    };

    linkTo(rowData) {
            this.setState({ error: '', loading: true });
            this.props.navigation.navigate('ProductView', { ListViewClickItemHolder: rowData  });
            this.setState({ error: '', loading: false });
        }

    renderRow(rowData){
        if(rowData.Icon != null)
        {
            var localpath =  Common.GetLocalFullPath(rowData.Icon);
             return(
                            <View style={styles.itemStyle}>
                                <Image source={{uri:localpath}} style={styles.imageStyle}/>
                                <View style={styles.subItemStyle}>
                                    <Text style={{marginTop:5, fontSize:17}}>{rowData.FirstName}</Text>
                                    <Text style={{marginBottom:5, fontSize:13, color:'green'}} onPress={this.linkTo.bind(this, rowData)}>{rowData.LastName}</Text>
                                </View>
                            </View>
                        );
         }
         return (<View style={styles.itemStyle}></View>);
        }

  render() {
    return (
      <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
        <Text>
              My Picture
              {this.state.width},
              {this.state.height},
              {this.state.x},
              {this.state.y},
            </Text>
        <ListView style={styles.styleproducts}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
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
    imageStyle: {
        // 尺寸
        width:60,
        height:60,
        // 边距
        marginLeft:10,
        margin:10
    },
    subItemStyle: {
        // 对齐方式
        justifyContent:'space-around'
    }
});

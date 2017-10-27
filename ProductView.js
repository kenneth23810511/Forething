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
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class ProductView extends Component {
constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      width:100,
      height:101,
      x:10,
      y:20,
    };
  }
layoutchanged(e){
    this.setState({
        width: Math.ceil(e.nativeEvent.layout.width),
        height: Math.ceil(e.nativeEvent.layout.height),
        x: Math.ceil(e.nativeEvent.layout.x),
        y: Math.ceil(e.nativeEvent.layout.y)
      });
  }

  render() {
    return (
      <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
        <Text style={styles.welcome}>
          Welcome to React Native Login!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <TextInput style={styles.inputbox} underlineColorAndroid='transparent'></TextInput>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Text>
              My Picture
              {this.state.width},
              {this.state.height},
              {this.state.x},
              {this.state.y},
            </Text>
        <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputbox:{
  fontSize: 20,
      textAlign: 'left',
      margin: 30,
      padding: 20,
      width:'90%',
      borderWidth: 1,
  },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
});

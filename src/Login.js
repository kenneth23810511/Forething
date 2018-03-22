/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    ImageBackground,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    View
} from 'react-native';


import Orientation from 'react-native-orientation';
import Constansts from './../src/utils/Constants.js';
import { StackNavigator } from 'react-navigation';
import Loader from './../src/Loader';
import FetchBack from './../src/utils/FetchBack';
import md5 from "react-native-md5";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orientation:'PORTRAIT',
            email: '',
            password: '',
            width: 100,
            height: 100,
            x: 10,
            y: 20,
            loginareawidth: 200,
            loginareaheight: 200,
            loginarealeft: 0,
            loginareatop: 0,
            loading: false
        };
    }



    componentWillMount() {
      Orientation.lockToPortrait();
      this._orientationDidChange = (orientation) => {
        console.log("_orientationDidChange:"+orientation);
        if (orientation === 'PORTRAIT') {
          //console.log("_orientationDidChange:do PORTRAIT");
          this.setState({ orientation: 'PORTRAIT' });
        } else {
          //console.log("_orientationDidChange:do LANDSCAPE");
          this.setState({ orientation: 'LANDSCAPE' });
        }
        //this.refs.login_space.height=curSpaceH;
        //this.refs.login_container_box.marginTop=curLoginareatop;
         // this.refs.login_space.setState({ height: curSpaceH});
         // this.refs.login_container_box.setState({ marginTop: curLoginareatop});
      };
      Orientation.addOrientationListener(this._orientationDidChange);
    }


    componentWillUnmount() {
      Orientation.getOrientation((err, orientation) => {
        console.log(`componentWillUnmount Current Device Orientation: ${orientation}`);
      });
      // Remember to remove listener
      Orientation.removeOrientationListener(this._orientationDidChange);
    }



    login() {

        this.setState({ error: '', loading: true });
        var usernmae = this.state.email;
        var password = this.state.password;
        var loginTime = new Date().toString();
        var nonce = "test";
        var encryption = md5.hex_md5(usernmae + password + loginTime + nonce);
        var inEntity ='{ UserName: "' + usernmae + '",LoginTime: "' + loginTime + '",Nonce: "' + nonce + '", AccessEchoEncryption: "' + encryption + '"}';

        this.props.navigation.navigate('Demo2');
        /*
        FetchBack.Post(this, Constansts.Login, inEntity , function (target, set) {
            if(set.errorCode == Constansts.Success)
            {
                alert("Login Succeed");
                target.props.navigation.navigate('Demo');
             }
             else
             {
                alert(set.errorCode+':'+ set.errorMessage);
                target.props.navigation.navigate('Demo');
             }
        });*/
        this.setState({ error: '', loading: false });
    }

    unlogin() {
        //alert(this.state.email);
    }

    register() {
        //alert(this.state.email);
    }

    layoutchanged(e) {
      // let initOtn = Orientation.getInitialOrientation();
      // console.log("layoutchanged:getInitialOrientation:"+initOtn);
      let curOtn = this.state.orientation;
      console.log("layoutchanged:curOtn:"+curOtn);
      let curLoginareatop=0;
      if (curOtn === 'PORTRAIT') {
        curLoginareatop= Math.ceil(e.nativeEvent.layout.height * 0.5);
      } else {
        curLoginareatop= Math.ceil(e.nativeEvent.layout.height * 0);
      }
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y),
            loginareawidth: Math.ceil(e.nativeEvent.layout.width * 0.8),
            loginareaheight: Math.ceil(e.nativeEvent.layout.height * 0.7),
            loginarealeft: Math.ceil(e.nativeEvent.layout.width * 0.1),
            loginareatop: curLoginareatop,
            loginareabottom: Math.ceil(e.nativeEvent.layout.height * 0.15),
        });
    }

    onLayoutchangedMidSpace(e) {
      // let initOtn = Orientation.getInitialOrientation();
      // let curSpaceH=30;
      // if (initOtn === 'PORTRAIT') {
      //   curSpaceH= 30;
      // } else {
      //   curSpaceH= 0;
      // }
      //   this.setState({
      //       height: curSpaceH
      //   });
    }

    loginareaStyle() {
      // let initOtn = Orientation.getInitialOrientation();
      // console.log("loginareaStyle:getInitialOrientation:"+initOtn);
      let curOtn = this.state.orientation;
      console.log("loginareaStyle:curOtn:"+curOtn);
      let curLoginareatop=0;
      if (curOtn === 'PORTRAIT') {
        curLoginareatop= 80;
      } else {
        curLoginareatop= 0;
      }

        return {
            flex: 1,
            flexDirection: 'column',
            marginTop: curLoginareatop,
            marginBottom: this.state.loginareabottom,
            marginLeft: this.state.loginarealeft,
            marginRight: this.state.loginarealeft,
            width: this.state.loginareawidth,
            height: this.state.loginareaheight,
        }
    }

    renderLoader() {
        if (this.state.loading) {
            return <Loader size="large" />;
        } else {
            return <TouchableOpacity style={styles.login_button} underlayColor='#fff' onPress={this.login.bind(this)}><Text style={{color: '#fff'}}>登录</Text></TouchableOpacity>;
        }
    }

    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };

    render() {

        return (
            <ImageBackground source={require('./../images/login/loginbg.jpg')} style={styles.login_background}>
                <View>
                    <Image style={styles.login_image}
                              source={require('./../images/login/logo.png')} />
                </View>
                <View  style={styles.login_container} onLayout={(event) => { this.layoutchanged(event) }}>
                    <View ref="login_container_box" style={this.loginareaStyle()}>
                        {/* <Text style={styles.login_title}>LOGIN</Text> */}
                        <TextInput
                            onChangeText={(email) => { this.setState({ email }) }}
                            style={styles.login_username}
                            placeholder='BC账号'
                            numberOfLines={1}
                            autoFocus={true}
                            underlineColorAndroid={'transparent'}
                            textAlign='center'
                        />
                        <View
                            style={{ height: 3, backgroundColor: '#CCCCCC' }}
                        />
                        <TextInput
                            onChangeText={(password) => { this.setState({ password }) }}
                            style={styles.login_password}
                            placeholder='BC密码'
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            textAlign='center'
                        />
                        <View
                            style={{ height: 3, backgroundColor: '#CCCCCC' }}
                        />
                        <TextInput
                            style={styles.login_password}
                            placeholder='柜台密码'
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            textAlign='center'
                        />
                        <View ref="login_space" style={styles.login_space_p} onLayout={(event) => { this.onLayoutchangedMidSpace(event) }}></View>
                        <View>
                            {this.renderLoader()}
                        </View>
                        <View>
                             <TouchableOpacity
                                       style={styles.login_close}
                                       underlayColor='#fff'>
                                       <Text style={{color: '#fff'}}>关闭</Text>
                              </TouchableOpacity>
                         </View>
                        <View style={styles.login_flex}></View>
                    </View>

                    <View style={styles.login_bottom}>
                        <TouchableHighlight onPress={this.unlogin.bind(this)} style={styles.login_unlogin}>
                            <Text style={styles.login_unlogintext}>
                                无法登录?
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.register.bind(this)} style={styles.login_register}>
                            <Text style={styles.login_registertext}>
                                新用户
                            </Text>
                        </TouchableHighlight>
                  </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    login_background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    login_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
    },
    login_image: {
        borderRadius: 3,
        height: 40,
        width: 94,
        marginTop: 40,
        alignSelf: 'center',
    },
    login_title: {
            borderRadius: 5,
            height: 40,
            marginTop: 40,
            alignSelf: 'center',
            color: 'white',
            fontSize: 22,
        },
    login_username: {
        backgroundColor: '#fff',
        marginTop: 10,
        height: 40,
    },
    login_password: {
        backgroundColor: '#fff',
        height: 40,
    },
    login_button: {
        marginTop: 15,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#D2B48C',
        height: 35,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_close: {
          marginTop: 3,
          marginLeft: 2,
          marginRight: 2,
          backgroundColor: 'transparent',
          height: 35,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#D2B48C',
          justifyContent: 'center',
          alignItems: 'center',
      },
    login_space_p: {
        height: 30,
    },
    login_space_l: {
        height: 0,
    },
    login_flex: {
        flex: 1
    },
    login_bottom: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        bottom: 10
    },
    login_unlogin: {
        marginLeft: 10,
    },
    login_register: {
        marginRight: 10,
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'row',
    },
    login_unlogintext: {
        fontSize: 12,
        color: '#fff',
    },
    login_registertext: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 12,
        color: '#fff',
        textAlign: 'right',
    },
});

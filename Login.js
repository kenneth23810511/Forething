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
import Constansts from './utils/Constants.js';
import { StackNavigator } from 'react-navigation';
import Loader from './Loader';
import FetchBack from './utils/FetchBack';
import md5 from "react-native-md5";
import base64 from "base-64";
import logincss from './styles/logincss.js';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usercode: 'admin',
            password: 'Kenneth123',
            width: 100,
            height: 100,
            x: 10,
            y: 20,
            loginareawidth: 200,
            loginareaheight: 200,
            loginarealeft: 0,
            loginareatop: 0,
            loading: false,
            session: '',
            verifycode: ''
        };
    }

    componentWillMount() {
        //Orientation.lockToPortrait();
        //Orientation.addOrientationListener(() => Orientation.lockToPortrait());

        this.state.session = new Date().toString();
        this.state.verifycode = 'keth';
        FetchBack.Verify(this, '{"SendKey":"' + this.state.session + '","SendPair":"' + this.state.verifycode + '"}', function (target, set) {
            if (set.ErrorCode == Constansts.Success) {

            }
            else {
                target.setState({ verifycode: '' });
            }
        });

        setTimeout(this.loginto, 3000, this);       
    }

    login() {
        this.loginto(this);
    }

    loginto(that){
        that.setState({ error: '', loading: true });
        var usercode = that.state.usercode;
        var password = base64.encode(that.state.password);
        var loginTime = new Date().toString();
        var nonce = "test";
        var md5pwd = md5.hex_md5(password + loginTime);
        var inEntity = '[{"SendKey":"usercode","SendPair":"' + usercode + '"},{"SendKey":"md5pwd","SendPair":"' + md5pwd + '"},{"SendKey":"ticks","SendPair":"' +
            loginTime + '"},{"SendKey":"session","SendPair":"' + that.state.session + '"},{"SendKey":"verifycode","SendPair":"' + that.state.verifycode + '"}]';

        //that.props.navigation.navigate('ProductList');

        FetchBack.Authorize(that, inEntity, function (target, set, fetch) {
            if (set.ErrorCode == Constansts.Success) {
                var returnObj = JSON.parse(set.ReturnObj);
                fetch.currentUserId = returnObj[0].SendPair;
                fetch.currentUserName = returnObj[1].SendPair;
                fetch.currentSessionId = returnObj[3].SendPair;
                fetch.currentStoreId = returnObj[4].SendPair;

                target.props.navigation.navigate('ShopUserList');
            }
            else {
                alert(set.ErrorCode + ':' + set.ErrorMessage);
            }
        });
        that.setState({ error: '', loading: false });
    }



    unlogin() {
        alert(this.state.usercode);
    }

    register() {
        alert(this.state.usercode);
    }

    layoutchanged(e) {
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y),
            loginareawidth: Math.ceil(e.nativeEvent.layout.width * 0.8),
            loginareaheight: Math.ceil(e.nativeEvent.layout.height * 0.7),
            loginarealeft: Math.ceil(e.nativeEvent.layout.width * 0.1),
            loginareatop: Math.ceil(e.nativeEvent.layout.height * 0.15),
        });
    }

    loginareaStyle() {
        return {
            flex: 1,
            flexDirection: 'column',
            marginTop: this.state.loginareatop,
            marginBottom: this.state.loginareatop,
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
            return <TouchableOpacity style={logincss.login_button} underlayColor='#fff' onPress={this.login.bind(this)}><Text style={{ color: '#fff' }}>登录</Text></TouchableOpacity>;
        }
    }

    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };

    render() {

        return (
            <ImageBackground source={require('./images/login/loginbg.jpg')} style={logincss.login_background}>
                <View>
                    <Image style={logincss.login_image}
                        source={require('./images/login/logo.png')} />
                </View>
                <View style={logincss.login_container} onLayout={(event) => { this.layoutchanged(event) }}>
                    <View style={this.loginareaStyle()}>
                        <Text style={logincss.login_title}>登录</Text>
                        <TextInput
                            onChangeText={(usercode) => { this.setState({ usercode }) }}
                            style={logincss.login_usercode}
                            placeholder='用户账号或手机号码'
                            numberOfLines={1}
                            autoFocus={true}
                            underlineColorAndroid={'transparent'}
                            textAlign='center'
                        />
                        <View
                            style={{ height: 3, backgroundColor: 'transparent' }}
                        />
                        <TextInput
                            onChangeText={(password) => { this.setState({ password }) }}
                            style={logincss.login_password}
                            placeholder='登录密码'
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            textAlign='center'
                        />
                        <View
                            style={{ height: 3, backgroundColor: 'transparent' }}
                        />

                        <View style={logincss.login_space}></View>
                        <View>
                            {this.renderLoader()}
                        </View>
                        <View>
                            <TouchableOpacity
                                style={logincss.login_close}
                                underlayColor='#fff'>
                                <Text style={{ color: '#fff' }}>关闭</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={logincss.login_flex}></View>

                        <View style={logincss.login_bottom}>
                            <TouchableHighlight onPress={this.unlogin.bind(this)} style={logincss.login_unlogin}>
                                <Text style={logincss.login_unlogintext}>
                                    无法登录?
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.register.bind(this)} style={logincss.login_register}>
                                <Text style={logincss.login_registertext}>
                                    新用户
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
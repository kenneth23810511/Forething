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
                this.state.verifycode = '';
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
            return <TouchableOpacity style={styles.login_button} underlayColor='#fff' onPress={this.login.bind(this)}><Text style={{ color: '#fff' }}>登录</Text></TouchableOpacity>;
        }
    }

    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };

    render() {

        return (
            <ImageBackground source={require('./images/login/loginbg.jpg')} style={styles.login_background}>
                <View>
                    <Image style={styles.login_image}
                        source={require('./images/login/logo.png')} />
                </View>
                <View style={styles.login_container} onLayout={(event) => { this.layoutchanged(event) }}>
                    <View style={this.loginareaStyle()}>
                        <Text style={styles.login_title}>登录</Text>
                        <TextInput
                            onChangeText={(usercode) => { this.setState({ usercode }) }}
                            style={styles.login_usercode}
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
                            style={styles.login_password}
                            placeholder='登录密码'
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={true}
                            textAlign='center'
                        />
                        <View
                            style={{ height: 3, backgroundColor: 'transparent' }}
                        />

                        <View style={styles.login_space}></View>
                        <View>
                            {this.renderLoader()}
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.login_close}
                                underlayColor='#fff'>
                                <Text style={{ color: '#fff' }}>关闭</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.login_flex}></View>

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
    login_usercode: {
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
    login_space: {
        height: 30,
    },
    login_flex: {
        flex: 1
    },
    login_bottom: {
        flex: 1, flexDirection: 'row', alignItems: 'flex-end', bottom: 10
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

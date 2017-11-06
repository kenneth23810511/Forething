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
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    ListView,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Loader from './Loader';
import ProductList from './ProductList';
import FetchBack from './utils/FetchBack';

export default class Login extends Component {      

    constructor(props) {
        super(props);
        this.state = {
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

    login() {        

        this.setState({ error: '', loading: true });
        console.log('your email is', this.state.email);
        console.log('your password is', this.state.password);
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('ProductList');
    }

    unlogin() {        
        alert(this.state.email);        

        
    }

    register() {
        alert(this.state.email);
    }

    layoutchanged(e) {
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y),
            loginareawidth: Math.ceil(e.nativeEvent.layout.width * 0.8),
            loginareaheight: Math.ceil(e.nativeEvent.layout.height * 0.5),
            loginarealeft: Math.ceil(e.nativeEvent.layout.width * 0.1),
            loginareatop: Math.ceil(e.nativeEvent.layout.height * 0.25),
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
            return <Button style={styles.login_button} onPress={this.login.bind(this)} title='Login' />
        }
    }

    static navigationOptions = {
        title: 'Welcome',
    };

    render() {       
       
        return (
            <View style={styles.login_container} onLayout={(event) => { this.layoutchanged(event) }}>
                <View style={this.loginareaStyle()}>
                    <Image
                        style={styles.login_image}
                        source={require('./images/login/qq.png')} />  
                    <TextInput
                        onChangeText={(email) => { this.setState({ email }) }}
                        style={styles.login_username}
                        placeholder='QQ号/手机号/邮箱'
                        numberOfLines={1}
                        autoFocus={true}
                        underlineColorAndroid={'transparent'}
                        textAlign='center'
                    />                  
                    <View
                        style={{ height: 1, backgroundColor: '#f4f4f4' }}
                    /> 
                    <TextInput
                        onChangeText={(password) => { this.setState({ password }) }}
                        style={styles.login_password}
                        placeholder='密码'
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        textAlign='center'
                    />  
                    <View style={styles.login_space}></View>
                    <View>                        
                        {this.renderLoader()}
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
        );
    }
}

const styles = StyleSheet.create({
    login_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',        
        alignItems: 'center',
        width: '100%', 
        backgroundColor: '#F5FFFF',
    },
    login_image: {
        borderRadius: 35,
        height: 70,
        width: 70,
        marginTop: 40,
        alignSelf: 'center',
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
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#63B8FF',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center', 
    },       
    login_space: {
        height: 60,
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
        color: '#63B8FF',
    },
    login_registertext: {
        flex: 1,
        flexDirection: 'row', 
        fontSize: 12,
        color: '#63B8FF',
        textAlign: 'right',
    },
});

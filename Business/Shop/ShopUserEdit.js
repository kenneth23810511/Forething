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
    TouchableOpacity,
    View
} from 'react-native';
import Constansts from './../../utils/Constants.js';
import Common from './../../utils/Common';
import FetchBack from './../../utils/FetchBack';
import RNFS from 'react-native-fs';
import globalcss from './../../styles/globalcss.js';
import buttoncss from './../../styles/buttoncss.js';
import inputcss from './../../styles/inputcss.js';

export default class ShopUserEdit extends Component {
    constructor() {
        super();

        this.state = {
            width: 100,
            height: 101,
            x: 10,
            y: 20,
            documentPath: RNFS.DocumentDirectoryPath + '/',
            avatarSource: null,
            internalContainerwidth: 200,
            internalContainerheight: 200,
            internalContainerleft: 0,
            internalContainertop: 0,
            loading: false,
        };

    }

    layoutchanged(e) {
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
            alignItems: 'center',
            borderRadius: 15,
        }
    }
    internalImageStyle() {
        return {
            width: this.state.internalContainerwidth * 0.5,
            height: this.state.internalContainerheight * 0.5,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'ShopUserEdit',
            header: (
                <View style={globalcss.headerStyle}>
                    <TouchableOpacity style={buttoncss.TransparentButtonStyle} activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('./../../images/Toolbar/back.png')}
                            style={buttoncss.ImageIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                    </View>
                    <TouchableOpacity style={buttoncss.SeparatorButtonStyle} activeOpacity={0.5} onPress={() => params.handleNew()}>
                        <Image
                            source={require('./../../images/Toolbar/new.png')}
                            style={buttoncss.ImageIconStyle}
                        />
                    </TouchableOpacity>
                </View>
            ),
        };
    }


    updateData(data) {
        let source = { uri: 'data:image/jpeg;base64,' + data };
        this.setState({
            avatarSource: source
        });
    }

    upLoader() {
        this.props.navigation.navigate('UploadView', { WhereFrom: 'Form Product View', updateData: this.updateData.bind(this) });
    }

    render() {
        if (this.props.navigation.state.params.ListItemSender == null) {
            return (
                <View style={globalcss.body}>
                    <View style={{ height: 40, width: 300 }}>
                        <TextInput
                            style={inputcss.commonInput}
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            textAlign='left'
                            value={this.state.message}
                        />
                    </View>
                    <View style={globalcss.container} onLayout={(event) => { this.layoutchanged(event) }}>
                        <View style={globalcss.columnSpace}></View>
                        <View style={globalcss.internalView}>
                            <View><Text style={inputcss.commonInputLabel}>用户名</Text></View>
                            <View>
                                <TextInput
                                    onChangeText={(usercode) => { this.setState({ usercode }) }}
                                    style={inputcss.commonInput}
                                    placeholder='请输入用户名'
                                    numberOfLines={1}
                                    autoFocus={true}
                                    underlineColorAndroid={'transparent'}
                                    textAlign='left'
                                />
                            </View>
                            <View><Text style={inputcss.commonInputLabel}>密码</Text></View>
                            <View>
                                <TextInput
                                    onChangeText={(password) => { this.setState({ password }) }}
                                    style={inputcss.commonInput}
                                    placeholder='请输入密码'
                                    numberOfLines={1}
                                    underlineColorAndroid={'transparent'}
                                    secureTextEntry={true}
                                    textAlign='left'
                                />
                            </View>
                            <View style={globalcss.internalView}>
                            </View>
                        </View>
                        <View style={globalcss.columnSpace}></View>
                    </View>
                </View>
            );
        }
        else {
            var localpath = Common.GetLocalFullPath(this.props.navigation.state.params.ListItemSender.Icon);
            return (
                <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
                    <View style={this.internalContainerStyle()}>
                        <View>
                            <Image source={{ uri: localpath }} style={this.internalImageStyle()} />
                            <Text>{this.props.navigation.state.params.ListItemSender.FirstName}</Text>
                            <Button onPress={this.upLoader.bind(this)} title='Load'></Button>
                            <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: '100%',
        height: '100%',
    },
    uploadAvatar: {
        width: 160,
        height: 160,
    }
});

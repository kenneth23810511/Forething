
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
    Button,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Animated,
    ImageBackground,
    View
} from 'react-native';

import Orientation from 'react-native-orientation';
import Constansts from './../../utils/Constants.js';
import Common from './../../utils/Common';
import FetchBack from './../../utils/FetchBack';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';


export default class Demo2 extends Component {
    componentWillMount() {
        //removeOrientationListener((Orientation.PORTRAIT) => {});
        //removeOrientationListener((Orientation.LANDSCAPE) => {});
        Orientation.lockToLandscape();
        //Orientation.addOrientationListener(() => Orientation.lockToLandscape());
    }

    constructor(props) {
        super(props);


        this.state = {
            date: new Date(),
            width: 100,
            height: 101,
            x: 10,
            y: 20,
            isShowMenu: false,

            pressStatus1: false,
            pressStatus2: true,
            pressStatus3: false,
            pressStatus4: true,
            pressStatus5: false,
            pressStatus6: false,
            pressStatus7: false,
            pressStatus8: true,
            pressStatus9: false,
            pressStatus10: false,

            leftmenu_subitem1: true,
            leftmenu_subitem2: false,
            leftmenu_subitem3: false,
            leftmenu_subitem4: false,

            Pagination1: true,
            Pagination2: false,
            Pagination3: false,
            Pagination4: false,
            Pagination5: false,

            isSelected1: true,
            isSelected2: false,
            isSelected3: false,
            isSelected4: true,
            isSelected5: false,
            isSelected6: false,
            isSelected7: false,
            isSelected8: false,
            isSelected9: false,
            isSelected10: false,
            isSelected11: true,
            isSelected12: false,
            isSelected13: true,
            isSelected14: false,
            isSelected15: false,
            isSelected16: false,
        };
    }

    layoutchanged(e) {
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y),

        });
    }

    static navigationOptions = {
        header: null,
        title: 'Demo',
    };

    _onPress1(e) {
        this.setState({ pressStatus1: !this.state.pressStatus1 });
    }
    _onPress2(e) {
        this.setState({ pressStatus2: !this.state.pressStatus2 });
    }
    _onPress3(e) {
        this.setState({ pressStatus3: !this.state.pressStatus3 });
    }
    _onPress4(e) {
        this.setState({ pressStatus4: !this.state.pressStatus4 });
    }
    _onPress5(e) {
        this.setState({ pressStatus5: !this.state.pressStatus5 });
    }
    _onPress6(e) {
        this.setState({ pressStatus6: !this.state.pressStatus6 });
    }
    _onPress7(e) {
        this.setState({ pressStatus7: !this.state.pressStatus7 });
    }
    _onPress8(e) {
        this.setState({ pressStatus8: !this.state.pressStatus8 });
    }
    _onPress9(e) {
        this.setState({ pressStatus9: !this.state.pressStatus9 });
    }
    _onPress10(e) {
        this.setState({ pressStatus10: !this.state.pressStatus10 });
    }

    _onMomentumScrollEnd(e, state, context) {
        if (state.index == 0) {
            this.setState({ Pagination1: true });
            this.setState({ Pagination2: false });
            this.setState({ Pagination3: false });
            this.setState({ Pagination4: false });
            this.setState({ Pagination5: false });
        }
        else if (state.index == 1) {
            this.setState({ Pagination1: false });
            this.setState({ Pagination2: true });
            this.setState({ Pagination3: false });
            this.setState({ Pagination4: false });
            this.setState({ Pagination5: false });
        }
        else if (state.index == 2) {
            this.setState({ Pagination1: false });
            this.setState({ Pagination2: false });
            this.setState({ Pagination3: true });
            this.setState({ Pagination4: false });
            this.setState({ Pagination5: false });
        }
        else if (state.index == 3) {
            this.setState({ Pagination1: false });
            this.setState({ Pagination2: false });
            this.setState({ Pagination3: false });
            this.setState({ Pagination4: true });
            this.setState({ Pagination5: false });
        }
        else if (state.index == 4) {
            this.setState({ Pagination1: false });
            this.setState({ Pagination2: false });
            this.setState({ Pagination3: false });
            this.setState({ Pagination4: false });
            this.setState({ Pagination5: true });
        }
    }

    showMenu() {
        this.setState({ isShowMenu: !this.state.isShowMenu });
    }

    _onPressleftmenu_subitem1() {
        this.setState({ leftmenu_subitem1: true });
        this.setState({ leftmenu_subitem2: false });
        this.setState({ leftmenu_subitem3: false });
        this.setState({ leftmenu_subitem4: false });
    }
    _onPressleftmenu_subitem2() {
        this.setState({ leftmenu_subitem1: false });
        this.setState({ leftmenu_subitem2: true });
        this.setState({ leftmenu_subitem3: false });
        this.setState({ leftmenu_subitem4: false });
    }
    _onPressleftmenu_subitem3() {
        this.setState({ leftmenu_subitem1: false });
        this.setState({ leftmenu_subitem2: false });
        this.setState({ leftmenu_subitem3: true });
        this.setState({ leftmenu_subitem4: false });
    }
    _onPressleftmenu_subitem4() {
        this.setState({ leftmenu_subitem1: false });
        this.setState({ leftmenu_subitem2: false });
        this.setState({ leftmenu_subitem3: false });
        this.setState({ leftmenu_subitem4: true });
    }

    _onRoutinePress1() {
        this.setState({ isSelected1: !this.state.isSelected1 });
    }
    _onRoutinePress2() {
        this.setState({ isSelected2: !this.state.isSelected2 });
    }
    _onRoutinePress3() {
        this.setState({ isSelected3: !this.state.isSelected3 });
    }
    _onRoutinePress4() {
        this.setState({ isSelected4: !this.state.isSelected4 });
    }
    _onRoutinePress5() {
        this.setState({ isSelected5: !this.state.isSelected5 });
    }
    _onRoutinePress6() {
        this.setState({ isSelected6: !this.state.isSelected6 });
    }
    _onRoutinePress7() {
        this.setState({ isSelected7: !this.state.isSelected7 });
    }
    _onRoutinePress8() {
        this.setState({ isSelected8: !this.state.isSelected8 });
    }
    _onRoutinePress9() {
        this.setState({ isSelected9: !this.state.isSelected9 });
    }
    _onRoutinePress10() {
        this.setState({ isSelected10: !this.state.isSelected10 });
    }
    _onRoutinePress11() {
        this.setState({ isSelected11: !this.state.isSelected11 });
    }
    _onRoutinePress12() {
        this.setState({ isSelected12: !this.state.isSelected12 });
    }
    _onRoutinePress13() {
        this.setState({ isSelected13: !this.state.isSelected13 });
    }
    _onRoutinePress14() {
        this.setState({ isSelected14: !this.state.isSelected14 });
    }
    _onRoutinePress15() {
        this.setState({ isSelected15: !this.state.isSelected15 });
    }
    _onRoutinePress16() {
        this.setState({ isSelected16: !this.state.isSelected16 });
    }

    _onDemoPress() {
        // this.props.navigation.navigate('Demo');
        // Orientation.lockToPortrait();
    }

    render() {
        return (
            <ImageBackground source={require('./../../../images/login/loginbg.jpg')} style={styles.entire_background}>
                <View style={styles.container}>
                    <Swiper style={styles.wrapper} onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}  horizontal={true} loop={false} showsPagination={false} >
                        <View style={styles.slide1}>
                            <Text style={styles.title}>What are your 1 biggestskin concerns?</Text>
                            <View style={styles.box}>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress1.bind(this)} style={[this.state.pressStatus1 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Texture</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress2.bind(this)} style={[this.state.pressStatus2 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.utton_round_l]}><Text style={styles.subtitle}>Firmness</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress3.bind(this)} style={[this.state.pressStatus3 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Wrinkles</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress4.bind(this)} style={[this.state.pressStatus4 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Skin tone</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress5.bind(this)} style={[this.state.pressStatus5 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Drynesss</Text></Ripple>
                            </View>
                            <View style={styles.box}>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress6.bind(this)} style={[this.state.pressStatus6 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Sagging</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress7.bind(this)} style={[this.state.pressStatus7 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Oiliness</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress8.bind(this)} style={[this.state.pressStatus8 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Pores</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress9.bind(this)} style={[this.state.pressStatus9 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Eye areas</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress10.bind(this)} style={[this.state.pressStatus10 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Dull skin</Text></Ripple>
                            </View>
                            <View style={styles.boxspace}></View>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.title}>What are your routine?</Text>
                            <View style={styles.box}>
                                <ImageBackground style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={require('./../../../images/common/icon_day.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected1 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress1.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected2 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress2.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected3 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress3.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected4 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress4.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected5 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress5.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected6 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress6.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                            </View>
                            <View style={styles.box}>
                                <ImageBackground style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={require('./../../../images/common/icon_night.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected9 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress9.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected10 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress10.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected11 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress11.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected12 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress12.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected13 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress13.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected14 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress14.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                            </View>
                            <View style={styles.boxspace}></View>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.title}>What are your 1 biggestskin concerns?</Text>
                            <View style={styles.box}>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress1.bind(this)} style={[this.state.pressStatus1 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Texture</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress2.bind(this)} style={[this.state.pressStatus2 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.utton_round_l]}><Text style={styles.subtitle}>Firmness</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress3.bind(this)} style={[this.state.pressStatus3 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Wrinkles</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress4.bind(this)} style={[this.state.pressStatus4 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Skin tone</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress5.bind(this)} style={[this.state.pressStatus5 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Drynesss</Text></Ripple>
                            </View>
                            <View style={styles.box}>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress6.bind(this)} style={[this.state.pressStatus6 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Sagging</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress7.bind(this)} style={[this.state.pressStatus7 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Oiliness</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress8.bind(this)} style={[this.state.pressStatus8 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Pores</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress9.bind(this)} style={[this.state.pressStatus9 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Eye areas</Text></Ripple>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPress10.bind(this)} style={[this.state.pressStatus10 ? styles.buttonPress : styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>Dull skin</Text></Ripple>
                            </View>
                            <View style={styles.boxspace}></View>
                        </View>
                        <View style={styles.slide4}>
                            <Text style={styles.title}>What are your routine?</Text>
                            <View style={styles.box}>
                                <ImageBackground style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={require('./../../../images/common/icon_day.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected1 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress1.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected2 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress2.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected3 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress3.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected4 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress4.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected5 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress5.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected6 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress6.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                            </View>
                            <View style={styles.box}>
                                <ImageBackground style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={require('./../../../images/common/icon_night.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected9 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress9.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected10 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress10.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected11 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress11.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected12 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress12.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected13 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress13.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                                <ImageBackground source={this.state.isSelected14 ? require('./../../../images/common/selected.png') : require('./../../../images/common/un_selected.png')} style={styles.button2}>
                                    <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onRoutinePress14.bind(this)} style={styles.routinbutton}></Ripple>
                                </ImageBackground>
                            </View>
                            <View style={styles.boxspace}></View>
                        </View>
                        <View style={styles.slide1}>
                            <View style={styles.box}>
                                <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onDemoPress.bind(this)} style={[styles.button, styles.button_sacnite, styles.button_round_l]}><Text style={styles.subtitle}>To Be Continued</Text></Ripple>
                            </View>
                        </View>
                    </Swiper>
                </View>

                <View style={styles.floatmenu}>
                    <ImageBackground source={require('./../../../images/common/sidebar.png')} style={styles.floatmenuicon}>
                        <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} style={styles.floatmenuicon_button} onPress={this.showMenu.bind(this)}></Ripple>
                    </ImageBackground>
                </View>

                <View style={this.state.isShowMenu ? styles.leftMenucontainer : styles.hideMenucontainer}>
                    <View style={styles.leftMenu}>
                        <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} rippleContainerBorderRadius={80} onPress={this._onPressleftmenu_subitem1.bind(this)} style={this.state.leftmenu_subitem1 ? styles.leftmenu_subitem_selected : styles.leftmenu_subitem}>
                            <View style={styles.leftmenu_subitem_icon}>
                                <Image style={{ width: 40, height: 40 }} source={require('./../../../images/common/icon_sidebar_01.png')} />
                            </View>
                            <View style={styles.leftmenu_subitem_title}>
                                <Text style={styles.leftmenu_text}>Skin</Text><Text style={styles.leftmenu_text}>Quesionnaire</Text>
                            </View>
                        </Ripple>
                        <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPressleftmenu_subitem2.bind(this)} style={this.state.leftmenu_subitem2 ? styles.leftmenu_subitem_selected : styles.leftmenu_subitem}>
                            <View style={styles.leftmenu_subitem_icon}>
                                <Image style={{ width: 40, height: 40 }} source={require('./../../../images/common/icon_sidebar_02.png')} />
                            </View>
                            <View style={styles.leftmenu_subitem_title}>
                                <Text style={styles.leftmenu_text}>Magic</Text><Text style={styles.leftmenu_text}>RingAnalysis</Text>
                            </View>
                        </Ripple>
                        <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPressleftmenu_subitem3.bind(this)} style={this.state.leftmenu_subitem3 ? styles.leftmenu_subitem_selected : styles.leftmenu_subitem}>
                            <View style={styles.leftmenu_subitem_icon}>
                                <Image style={{ width: 40, height: 40 }} source={require('./../../../images/common/icon_sidebar_03.png')} />
                            </View>
                            <View style={styles.leftmenu_subitem_title}>
                                <Text style={styles.leftmenu_text}>Product</Text><Text style={styles.leftmenu_text}>Catalog</Text>
                            </View>
                        </Ripple>
                        <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} onPress={this._onPressleftmenu_subitem4.bind(this)} style={this.state.leftmenu_subitem4 ? styles.leftmenu_subitem_selected : styles.leftmenu_subitem}>
                            <View style={styles.leftmenu_subitem_icon}>
                                <Image style={{ width: 40, height: 40 }} source={require('./../../../images/common/icon_sidebar_04.png')} />
                            </View>
                            <View style={styles.leftmenu_subitem_title}>
                                <Text style={styles.leftmenu_text}>Personal</Text><Text style={styles.leftmenu_text}>Beauty Guide</Text>
                            </View>
                        </Ripple>
                    </View>
                    <View style={styles.floatmenuclose}>
                        <ImageBackground source={require('./../../../images/common/sidebar_close.png')} style={styles.floatmenuicon}>
                            <Ripple rippleColor='#FF829B' rippleOpacity={0.8} rippleDuration={600} rippleDuration={1000} rippleContainerBorderRadius={80} style={styles.floatmenuicon_button} onPress={this.showMenu.bind(this)}></Ripple>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.floatPagination}>
                    <View style={styles.PaginationText}>
                        <Text style={styles.Pagination_text}>&lt;Back</Text>
                    </View>
                    <View style={this.state.Pagination1 ? styles.Pagination_selected : styles.Pagination}>
                    </View>
                    <View style={this.state.Pagination2 ? styles.Pagination_selected : styles.Pagination}>
                    </View>
                    <View style={this.state.Pagination3 ? styles.Pagination_selected : styles.Pagination}>
                    </View>
                    <View style={this.state.Pagination4 ? styles.Pagination_selected : styles.Pagination}>
                    </View>
                    <View style={this.state.Pagination5 ? styles.Pagination_selected : styles.Pagination}>
                    </View>
                    <View style={styles.PaginationText}>
                        <Text style={styles.Pagination_text}>Next&gt;</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    entire_background: {
        flex: 1,
        width: '100%',
    },

    container: {
        flex: 1
    },

    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flexDirection:'column',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    slide2: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    slide3: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    slide4: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    title: {
        flex: 1,
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        color: '#fff'
    },

    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    boxspace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#E9233A',
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        backgroundColor: 'transparent',
        borderRadius: 75,
    },
    buttonPress: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#E9233A',
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        backgroundColor: '#AD1136',
        borderRadius: 75,
    },

    button2: {
        margin: 5,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 60,
    },

    routinbutton: {
        margin: 5,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 60,
    },


    floatmenu: {
        position: 'absolute',
        left: 0,
        top: '40%',
        width: 20,
        height: 120
    },
    floatmenuclose: {
        position: 'absolute',
        flex: 1,
        left: 80,
        top: '40%',
        width: 20,
        height: 120
    },

    floatmenuicon: {
        width: 20,
        height: 120
    },

    floatmenuicon_button: {
        width: 20,
        height: 120
    },

    hideMenucontainer: {
        width: 0,
        height: 0
    },

    leftMenucontainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100,
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',

    },

    leftMenu: {
        position: 'absolute',
        left: 0,
        width: 80,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#111111',
    },

    leftMenuclose: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: '100%',
        backgroundColor: 'transparent',
    },

    leftmenu_subitem: {
        width: 80,
        height: 85,
        alignItems: 'center',
    },
    leftmenu_subitem_selected: {
        width: 80,
        height: 85,
        alignItems: 'center',
        backgroundColor: '#AC995E',
    },

    leftmenu_subitem_icon: {
        marginTop: 8,
        width: 40,
        height: 40,

    },
    leftmenu_subitem_title: {
        width: 80,
        height: 20,
    },
    leftmenu_text: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#fff'
    },

    floatPagination: {
        position: 'absolute',
        left: '10%',
        bottom: 25,
        width: '80%',
        height: 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    PaginationText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    Pagination_text: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#AF6A7C'
    },
    Pagination_selected: {
        flex: 1,
        marginTop: 13,
        height: 5,
        width: '100%',
        backgroundColor: '#E5CB76',
    },
    Pagination: {
        flex: 1,
        marginTop: 13,
        height: 5,
        width: '100%',
        backgroundColor: '#AB1135',
    },


});

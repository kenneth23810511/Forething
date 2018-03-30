'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import {
    Platform   
} from 'react-native';

import {colors, fonts, padding, dimensions} from './basecss.js'

module.exports = StyleSheet.create({

    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        margin: 0
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        margin: 0
    },
    headerStyle: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        width: '100%',
        height: 40,
        marginTop: Platform.OS == "ios" ? 20 : 0,
        justifyContent: 'center',
        borderStyle: 'solid',        
        borderBottomWidth: 1,
        borderBottomColor: colors.borderDefault,
    },
    headerFlexStyle: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',        
    },   
    commonTitleLabel: {
        backgroundColor: colors.transparent,
        marginTop: 5,
        height: 40,
        lineHeight: 36,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    rowSpace:{
        height: 3,
    },
    columnSpace:{
        width: 3,
    },
    labelView: {
        
    },
    internalView: {
        flex: 3,
        width: '100%',
        margin: 0,
    },
    flatlistbox: {       
        width: '100%',
        margin: 0,
    },
    flatlistboxSeparator: {
        width: '100%',        
        height: 5,
        backgroundColor: colors.buttonSeparatorLine
    },
    flatlistboxFooter: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: colors.borderDefault,
        height: 20
    },
    flatitemStyle: {
        // 主轴方向
        flexDirection: 'row',
        // 下边框
        borderBottomWidth: 0,
        borderBottomColor: 'gray'
    },
    flatimageStyle: {
        // 尺寸
        width: 60,
        height: 60,
        // 边距
        marginLeft: 10,
        margin: 10
    },
    flatsubItemStyle: {
        // 对齐方式
        justifyContent: 'space-around'
    }

});
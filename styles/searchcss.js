'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import {colors, fonts, padding, dimensions} from './basecss.js'


module.exports = StyleSheet.create({   
    SearchBoxStyle: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonDefault,
        borderWidth: .5,
        borderColor: colors.buttonBorderDefault,
        height: 32,
        borderRadius: 3,
        margin: 4,
    },   
    inputStyle: {
        flex: 3,
        backgroundColor: colors.inputDefault,       
        margin: 0, 
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 0,
        height: 30,
        justifyContent: 'center', 
        fontSize: 20,
        fontFamily: fonts.primary,
        fontWeight: 'normal',
        paddingVertical: 0,
        zIndex: -1,
        elevation: -1,
    },
    ImageIconStyle: {       
        margin: 2,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
    },   

    SeparatorLine: {
        backgroundColor: colors.buttonSeparatorLine,
        width: 1,
        height: '100%'
    }
});
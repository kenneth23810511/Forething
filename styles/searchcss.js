'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import {colors, fonts, padding, dimensions} from './basecss.js'


module.exports = StyleSheet.create({   
    searchBoxStyle: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonDefault,
        borderWidth: 1,
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
        borderWidth: 0,
        height: 30,
        justifyContent: 'center', 
        fontSize: 20,
        fontFamily: fonts.primary,
        fontWeight: 'normal',
        paddingVertical: 0,
        zIndex: -1,
        elevation: -1,
    },
    imageIconStyle: {       
        margin: 2,
        height: 28,
        width: 28,
        resizeMode: 'stretch',
    },   
    separatorLine: {
        backgroundColor: colors.buttonseparatorLine,
        width: 1,
        borderWidth: 0,        
        zIndex: -1,
        elevation: -1,
    }
});
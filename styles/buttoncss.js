'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import { colors, fonts, padding, dimensions } from './basecss.js'


module.exports = StyleSheet.create({
    transparentButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.transparent,
        borderWidth: .5,
        borderColor: colors.transparent,
        height: 32,
        borderRadius: 3,
        margin: 4,
    },
    separatorButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonDefault,
        borderWidth: .5,
        borderColor: colors.buttonBorderDefault,
        height: 32,
        borderRadius: 3,
        margin: 4,
    },
    imageIconStyle: {
        margin: 2,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
    },
    textStyle: {
        color: colors.buttonText,
        margin: 2,
        fontSize: fonts.sm,
        fontFamily: fonts.primary,
        fontWeight: 'normal'
    },
    separatorLine: {
        backgroundColor: colors.buttonseparatorLine,
        width: 1,
        borderWidth: 0,        
        zIndex: -1,
        elevation: -1,
    }
});
'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import { colors, fonts, padding, dimensions } from './basecss.js'


module.exports = StyleSheet.create({
    TransparentButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.transparent,
        borderWidth: .5,
        borderColor: colors.transparent,
        height: 32,
        borderRadius: 3,
        margin: 4,
    },
    SeparatorButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonDefault,
        borderWidth: .5,
        borderColor: colors.buttonBorderDefault,
        height: 32,
        borderRadius: 3,
        margin: 4,
    },
    ImageIconStyle: {
        margin: 2,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
    },
    TextStyle: {
        color: colors.buttonText,
        margin: 2,
        fontSize: fonts.sm,
        fontFamily: fonts.primary,
        fontWeight: 'normal'
    },

    SeparatorLine: {
        backgroundColor: colors.buttonSeparatorLine,
        width: 1,
        height: '100%'
    }
});
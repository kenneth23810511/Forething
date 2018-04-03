'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import { colors, fonts, padding, dimensions } from './basecss.js'


module.exports = StyleSheet.create({
    commonInput: {
        backgroundColor: colors.inputDefault,
        marginTop: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonInputLabel: {
        backgroundColor: colors.transparent,
        marginTop: 5,
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.transparent,
        borderWidth: .5,
        borderColor: colors.transparent,
        height: 32,
        borderRadius: 3,
        margin: 0,
    },
    inputStyle: {
        flex: 1,
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
    imageIconStyle: {
        margin: 2,
        height: 16,
        width: 16,
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
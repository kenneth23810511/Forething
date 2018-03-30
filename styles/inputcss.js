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
});
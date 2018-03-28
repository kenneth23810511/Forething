'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import { colors, fonts, padding, dimensions } from './basecss.js'


module.exports = StyleSheet.create({
    commonInput: {
        backgroundColor: '#fff',
        marginTop: 5,
        height: 40,        
        justifyContent: 'center',
        alignItems: 'center',
    },
});
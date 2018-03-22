'use strict';
import React, { Component } from 'react';
import RNFS from 'react-native-fs';

class Common extends React.Component {
    static  GetLocalFullPath(url) {
            var filename = url.replace(/^.*[\\\/]/, '');
            var localpath =  'file://' + RNFS.DocumentDirectoryPath + '/' + filename;
            return  localpath;
        }
}

module.exports = Common;
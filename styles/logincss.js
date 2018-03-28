'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

    login_background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    login_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
    },
    login_image: {
        borderRadius: 3,
        height: 40,
        width: 94,
        marginTop: 40,
        alignSelf: 'center',
    },
    login_title: {
        borderRadius: 5,
        height: 40,
        marginTop: 40,
        alignSelf: 'center',
        color: 'white',
        fontSize: 22,
    },
    login_usercode: {
        backgroundColor: '#fff',
        marginTop: 10,
        height: 40,
    },
    login_password: {
        backgroundColor: '#fff',
        height: 40,
    },
    login_button: {
        marginTop: 15,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#D2B48C',
        height: 35,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_close: {
        marginTop: 3,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: 'transparent',
        height: 35,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#D2B48C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_space: {
        height: 30,
    },
    login_flex: {
        flex: 1
    },
    login_bottom: {
        flex: 1, flexDirection: 'row', alignItems: 'flex-end', bottom: 10
    },
    login_unlogin: {
        marginLeft: 10,
    },
    login_register: {
        marginRight: 10,
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'row',
    },
    login_unlogintext: {
        fontSize: 12,
        color: '#fff',
    },
    login_registertext: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 12,
        color: '#fff',
        textAlign: 'right',
    },
});
'use strict';

var React = require('react-native');
var bkmTheme = require('../../themes/base-style').bkmTheme;
var { StyleSheet, Dimensions, Platform } = React;

//var primary = require('../../themes/variable').brandPrimary;
var deviceHeight = Dimensions.get('window').height;
//var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    background: {
        flex: 1,
        width: null,
        height: deviceHeight
    },
    bg: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 80,
        marginTop: Platform.OS === 'android' ? ((deviceHeight/6) - 45) : ((deviceHeight/6) - 10)
    },
    loginBtn: {
        marginTop: 40,
        marginBottom: 20,
        paddingTop: 10,
        alignSelf: 'center',
        height: 40,
        width: 260,
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: bkmTheme.blackColor
    },
    signUpBtn: {
        marginTop: 0,
        //marginBottom: 40,
        paddingTop: 10,
        alignSelf: 'center',
        height: 40,
        width: 260,
        //backgroundColor: 'transparent', //RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background colro to fix this, or apply the shadow to a more specific component.
        //backgroundColor: '#ed653c',
        backgroundColor: bkmTheme.redColor, //bkmTheme.secondaryButtonBackgroundColor,
        //borderWidth: 2,
        //borderColor: '#fff',
        borderRadius: 0
    },
    launchLogo: {
        padding: 20,
        width: 122,
        height: 122,
        marginBottom: 100,
        alignSelf: 'center'
    },
    fpLogo: {
        padding: 20,
        marginBottom: 20,
        alignSelf: 'center',
        opacity: 0.8,
    },
    fpText: {
        color: '#fff',
        alignSelf: 'center',
        opacity: 0.8,
    }

});

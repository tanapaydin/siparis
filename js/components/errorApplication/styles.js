'use strict';

var React = require('react-native');
var bkmTheme = require('../../themes/base-style').bkmTheme;
var {StyleSheet, Dimensions, Platform} = React;

//var primary = require('../../themes/variable').brandPrimary;
var deviceHeight = Dimensions.get('window').height;
//var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    background: {
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    infoText: {
        width: 300,
        fontSize: 14,
        fontWeight: '900',
        color: '#fff',
        //flexDirection: 'row',
        //justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    mainView: {
        flex: 1,
        //width: null,
        //height: null,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignSelf: 'stretch',
        //paddingTop: Platform.OS === 'android' ? 7 : 0
        padding: 20
    },
    signInImage: {
        marginTop: 20,
        padding: 20,
        width: 466 / 2,
        height: 408 / 2,
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: 'center'
    },
    signUpBtn: {
        marginTop: 0,
        marginBottom: 40,
        alignSelf: 'center',
        height: 50,
        width: 260,
        //backgroundColor: 'transparent', //RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background colro to fix this, or apply the shadow to a more specific component.
        //backgroundColor: '#ed653c',
        backgroundColor: bkmTheme.secondaryButtonBackgroundColor,
        borderWidth: 2,
        borderColor: '#fff'
    },

});

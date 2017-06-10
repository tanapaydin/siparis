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
        paddingBottom: 40,
        marginTop: Platform.OS === 'android' ? ((deviceHeight/6) - 45) : ((deviceHeight/6) - 10)
    },
    launchLogo: {
        padding: 20,
        width: 320,
        height: 250,
        marginBottom: 20,
        alignSelf: 'center'
    },

});

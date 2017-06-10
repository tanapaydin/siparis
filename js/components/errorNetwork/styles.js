'use strict';

var React = require('react-native');
//var bkmTheme = require('../../themes/variable').bkmTheme;
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
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 8
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
        //justifyContent: 'space-between',
        //alignSelf: 'stretch',
        //paddingTop: Platform.OS === 'android' ? 7 : 0
        padding: 20
    },
    signInImage: {
        marginTop: 20,
        padding: 20,
        width: 392 / 2,
        height: 392 / 2,
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: 'center'
    },

});

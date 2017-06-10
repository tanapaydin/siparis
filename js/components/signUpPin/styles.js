'use strict';

var React = require('react-native');
var bkmTheme = require('../../themes/base-style').bkmTheme;
var { StyleSheet, Dimensions, Platform } = React;

var deviceHeight = Dimensions.get('window').height;
var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({

    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    signupContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: Platform.OS === 'android' ? ((deviceHeight / 7) - 10): ((deviceHeight / 15) - 10)
    },
    signupHeader: {
        alignSelf: 'center',
        fontSize: 22,
        padding: 10,
        fontWeight: 'bold',
        marginTop: Platform.OS === 'android' ? (deviceHeight / 6) : ((deviceHeight / 15) + 10)
    },
    background: {
        flex: 1,
        width: null,
        height:null,
        //backgroundColor: primary
    },
    inputGrp: {
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: bkmTheme.inputGrpBackgroundColorGeneric, //'#FABC75',
        marginBottom: 20,
        borderWidth: 0,
        height: 50
    },
    input: {
        paddingLeft: 15
    },
    signupBtn: {
        //marginTop: 180,
        marginBottom: 40,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff'
    },
    termsText: {
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 100,
        opacity: 0.8,
        fontSize: 14,
        fontWeight: 'bold'
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
});

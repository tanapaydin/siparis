'use strict';

var React = require('react-native');

var { StyleSheet} = React;

module.exports = StyleSheet.create({

    container: {
        flex: 1,
        width: null,
        height: null
    },
    cardStyling: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 8
    },
    cardStyleLitePadding: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20
    },
    cardStylePadding: {
        padding: 20
    },
    cardBorderBottomStyling: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    cardHeader: {
        color: '#8b8885',
        fontWeight: '800'
    },
    cardStylingFailure: {
        //fontSize: 12, //View'de fontSize kullanilmasina kiziyor
        backgroundColor: '#f95345',
        borderWidth: 1,
        borderColor: '#ef4c3e'
    },
    cardStylingSuccess: {
        //fontSize: 12, //View'de fontSize kullanilmasina kiziyor
        backgroundColor: '#d6eab3',
        borderWidth: 1,
        borderColor: '#c9e19d'
    },
    textFailureInABox: {
        color: '#fff',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    textSuccessInABox: {
        color: '#465d43',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    colStyling: {
        color: 'black',
        fontSize: 14
    },
    loginBtn: {
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff',
    },
    loginBtnFailure: {
        marginTop: 20,
    },
    loginBtnSuccess: {
        marginTop: 20,
    },
    smallText: {
        //lineHeight: 30,
        color: '#616166',
        fontWeight: '800',
        fontSize: 14
    },
    largeText: {
        lineHeight: 30,
        color: '#616166',
        fontWeight: '800',
        fontSize: 23
    },

});

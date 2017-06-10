'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;

var deviceHeight = Dimensions.get('window').height;
var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({
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
        backgroundColor: primary
    },
    inputGrp: {
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        borderWidth: 0,
        paddingLeft: 15
    },
    input: {
        paddingLeft: 15
    },
    signupBtn: {
        height: 50,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    // termsText: {
    //     alignSelf: 'center',
    //     marginTop: 20,
    //     paddingBottom: 100,
    //     opacity: 0.8,
    //     fontSize: 14,
    //     fontWeight: 'bold'
    // },
    infoIcon: {
        height: 180,
        marginTop: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    userNotDefined: {
        width: 169,
        height: 150
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
    headerContainer: {
        marginTop: -5
    },
    headerBtns : {
        padding: 10,
        alignSelf: 'center'
    },
    headerIcons : {
        fontSize: 30
    },
    headerTextIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        marginTop: Platform.OS === 'android' ? -10 : 0,
        alignSelf: 'center'
    },




});

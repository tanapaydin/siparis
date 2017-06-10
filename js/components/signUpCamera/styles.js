'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;

var deviceHeight = Dimensions.get('window').height;
//var primary = require('../../themes/variable').brandPrimary;

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
        backgroundColor: '#FABC75',
        marginBottom: 20,
        borderWidth: 0,
        height: 50
    },
    input: {
        paddingLeft: 15
    },
    signupBtn: {
        //marginTop: 20, // 220,
        marginBottom: 40,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff'
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
    avatarContainer: {
        // borderColor: '#9B9B9B',
        borderWidth: 1, // PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        alignSelf: 'center',
        borderRadius: 8,
        borderColor: 'transparent',
        margin: 20,
        width: 133,
        height: 133
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

'use strict';

var React = require('react-native');
var { StyleSheet, Dimensions, Platform } = React;
var bkmTheme = require('../../themes/base-style').bkmTheme;
var deviceHeight = Dimensions.get('window').height;
var primary = require('../../themes/variable').brandPrimary;
var deviceWidth = Dimensions.get('window').width;

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
        width: deviceWidth,
        height: deviceHeight,
        //backgroundColor: primary
    },
    inputGrp: {
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: bkmTheme.inputGrpBackgroundColorGeneric,
        marginBottom: 20,
        borderWidth: 0,
        height: 50
    },
    input: {
    },
    signupBtn: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff',
    },
    termsText: {
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 100,
        opacity: 0.8,
        fontSize: 14,
        fontWeight: 'bold'
    },






    background_email: {
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
    blockChainUserInfo: {
        //backgroundColor: '#e6b26d', //Bu sacmaliyor arka plani kahverengi yapiyor.
        borderRadius: 8
    },
    cardTopic: {
        fontSize: 10,
        color: '#3a54a7',
        fontWeight: '800'
    },
    cardText: {
        fontSize: 14,
        color: '#374b4b',
        fontWeight: '800'
    },
    cardTextLarge: {
        fontSize: 18,
        color: '#374b4b',
        fontWeight: '800'
    },
    cardBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#f5ebdc',
        paddingBottom: 2,
        marginBottom: 3
    },
    cardBackgroundImage: {
        padding: 20,
        width: deviceWidth - 40,
        height: 200,
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
        justifyContent: 'space-between',
        //alignSelf: 'stretch',
        //paddingTop: Platform.OS === 'android' ? 7 : 0
        padding: 20,
    },
    middleView: {
        paddingTop: 30,
        paddingBottom: 30
    },
    statusViewTopic: {
        fontSize: 12,
        fontWeight: '800',
        color: '#4e4944',
        alignSelf: 'center'
    },
    statusViewTextLarge: {
        lineHeight: 24,
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
        alignSelf: 'center',
        textAlign: 'center',
    },
    statusViewText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#9897a2',
        alignSelf: 'center',
        textAlign: 'center'
    },




    cardStyling: {
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
        padding: 20,
        backgroundColor: '#F0FFFF'
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
        //fontSize: 12,
        backgroundColor: '#f95345',
        borderWidth: 1,
        borderColor: '#ef4c3e'
    },
    cardStylingSuccess: {
        //fontSize: 12,
        backgroundColor: '#d6eab3',
        borderWidth: 1,
        borderColor: '#c9e19d'
    },
    cardItemColorLite: {
        color: '#9a99ac',
    },


    infoViewImage: {
        padding: 20,
        width: 182,
        height: 180,
        borderRadius: 8
    },
    topView: {
        alignSelf: 'center'
    },



    userNotDefined: {
        width: 169,
        height: 150,
        alignSelf: 'center'
    },


    infoViewImageApproved: {
        padding: 20,
        width: 308/2,
        height: 152/2,
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: 'center',
    }

});

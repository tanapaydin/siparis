'use strict';

var React = require('react-native');
import {bkmTheme} from '../../../themes/base-style';
var {StyleSheet, Dimensions, Platform} = React;
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    background: {
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    profilePic: {
        width: 90,
        height: 90,
        borderRadius: 8
    },
    blockChainUserInfo: {
        //backgroundColor: '#e6b26d', //Bu sacmaliyor arka plani kahverengi yapiyor.
        borderRadius: 8
    },
    adSoyad: {
        paddingTop: 1,
        paddingLeft: 20,
        paddingBottom: 1,
        flex: 1,
        alignSelf: "stretch"
    },
    cardTopic: {
        fontSize: 9,
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
        borderBottomColor: bkmTheme.signUpResultCardSectionBorderBottomColor,
        paddingBottom: 2,
        marginBottom: 3
    },
    cardBackgroundImage: {
        padding: 18,
        width: deviceWidth - 40,
        height: 230,
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
    // mainView: {
    //   flex: 1,
    //   //width: null,
    //   //height: null,
    //   flexDirection: 'column',
    //   justifyContent: 'space-between',
    //   //alignSelf: 'stretch',
    //   //paddingTop: Platform.OS === 'android' ? 7 : 0
    //   padding: 20
    // },
    middleView: {
        paddingTop: deviceWidth / 30,
        paddingBottom: deviceWidth / 30
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
        color: '#4e4944',
        alignSelf: 'center',
        textAlign: 'center'
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

    signUpBtn: {
        marginTop: 0,
        //marginBottom: 40,
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

'use strict';

var React = require('react-native');
var bkmTheme = require('../../themes/base-style').bkmTheme;
var { StyleSheet, Dimensions, Platform } = React;

var deviceHeight = Dimensions.get('window').height;
var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({
    signupContainer: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 130,
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
        borderRadius: 7,
        backgroundColor: bkmTheme.inputGrpBackgroundColorGeneric, //'#FABC75',
        marginBottom: 10,
        borderWidth: 0,
        height: 50
    },
    input: {
    },
    backBtn: {
        flex: 1,
        //marginTop: 370,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        paddingTop: 9,
        alignSelf: 'center',
        height: 40,
        //width: 260,
        backgroundColor: 'transparent', //bkmTheme.redColor,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: bkmTheme.blackColor
    },
    nextBtn: {
        flex: 1,
        //marginTop: 370,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        paddingTop: 9,
        alignSelf: 'center',
        height: 40,
        //width: 260,
        backgroundColor: bkmTheme.redColor,
        borderRadius: 0
    },
    cameraBtn: {
        // flex: 1,
        // marginTop: 20,
        // marginBottom: 20,
        paddingTop: 9,
        alignSelf: 'center',
        height: 40,
        width: 140,
        //width: 260,
        backgroundColor: 'transparent', //bkmTheme.redColor,
        borderRadius: 0,
        //borderWidth: 1,
        borderColor: bkmTheme.blackColor
    },
    sonAdimBtn: {
        marginTop: 0,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: 'center',
        height: 40,
        flex: 1,
        //backgroundColor: 'transparent', //RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background colro to fix this, or apply the shadow to a more specific component.
        //backgroundColor: '#ed653c',
        backgroundColor: bkmTheme.redColor, //bkmTheme.secondaryButtonBackgroundColor,
        //borderWidth: 2,
        //borderColor: '#fff',
        borderRadius: 0
    },
    termsText: {
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 100,
        opacity: 0.8,
        fontSize: 14,
        fontWeight: 'bold'
    },
    signUpLogo: {
        width: 60,
        height: 60,
    },
    signUpLogoContainer: {
        alignSelf: 'center',
        height: 60,
        marginBottom: 60
    },
    statusBar: {
        flex: 1,
        height: 2,
        marginLeft: 10,
        backgroundColor: bkmTheme.blackColor,
        opacity: 0.5
    },
    statusBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 2,
        marginBottom: 80,
        paddingLeft: 40,
        paddingRight: 40

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
        backgroundColor: 'transparent',
        fontSize: 14,
        fontWeight: '500',
        color: bkmTheme.blackColor,
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.7
    }

});

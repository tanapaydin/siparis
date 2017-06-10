'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;
var bkmThemeCommon = require('../../themes/base-style').bkmThemeCommon;
var primary = require('../../themes/variable').brandPrimary;
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    keklikSectionTitlePadding: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: bkmThemeCommon.marginM + 10,
        paddingRight: bkmThemeCommon.marginM
    },
    keklikSectionPadding: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: bkmThemeCommon.marginM,
        paddingRight: bkmThemeCommon.marginM
    },
    artiIsaretiBox: {
        borderWidth: 1,
        borderColor: '#5B9EE8',
        width: 25,
        height: 25,
        borderRadius: 8,
        marginTop: 2,
        marginLeft: 8,
        alignSelf: 'center',
        alignItems: 'center'
    },
    artiIsaretiText: {
        color: '#5B9EE8',
        paddingTop: 3,
        fontSize: 18,
        fontWeight: '500'
    },
    rightArrowIconContainer: {
        color: '#0d0',
        alignSelf: 'flex-end',
    },
    rightArrowIcon : {
        flexDirection:'row',
        alignSelf: 'flex-end',
        fontSize: 15,
        marginLeft: Platform.OS === 'android' ? 15 : 0,
        paddingLeft: Platform.OS === 'android' ? 0 : 20,
        paddingRight: 5,
        marginTop: Platform.OS === 'android' ? -2 : 1,
        color: '#666'
    },
    loginBtn: {
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 160,
        backgroundColor: '#fff',
    },
    loginBtnSendMoney: {
        marginTop: 20
    },
    modalForEmailParent: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 550 : 510,
        bottom: 40,
        left: 42,
        right: 35,
        padding: 0,
        margin: 0,
        //marginTop: (deviceHeight < 650) ? 8 * 37.5 : 4 * 37.5, // iphone5/5s/SE device height is smaller than 600 px.
        marginTop: 60,
        //marginTop: (Platform.OS==='android') ? 40 : 0
        borderRadius: 8
    },
    modalForEmailChild: {
        flex: 1,
        alignSelf: 'stretch'
    },
    modal: {
        //marginTop: -25,
        //flex: 10,
        position: 'absolute',
        width: deviceWidth,
        height: deviceHeight
        //marginTop: (Platform.OS==='android') ? 40 : 0
    },
    modalListItem: {
        paddingTop: 10,
        paddingBottom: 10,
        //paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        width: deviceWidth
    },
    modalListItemText: {
        color: '#9a99ac',
        fontWeight: 'bold'
    },
    puanLabelContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    puanLabelText: {
        flexDirection: 'column',
        color: '#7a7a7a',
        fontWeight: '800',
        alignSelf: 'center',
        marginBottom: 15
    },
    bilgiText: {
        color: '#000',
        fontWeight: 'bold',
        marginTop: 18
    },

});

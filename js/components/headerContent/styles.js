'use strict';

var React = require('react-native');
var bkmTheme = require('../../themes/base-style').bkmTheme;

var { StyleSheet, Dimensions, Platform } = React;

module.exports = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingRight: 5,
        backgroundColor: bkmTheme.headerBackgroundColor,
        height: 40
    },
    rowHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        // paddingTop: Platform.OS === 'android' ? 7 : 0
    },
    btnHeader: {
        paddingTop: 10
    },
    imageHeader: {
        resizeMode: 'contain',
        marginTop: 0
    },
    ayarlayici: {
        width: 36,
        height: 36
    }
});

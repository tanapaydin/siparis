'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;

var primary = require('../../themes/variable').brandPrimary;
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    // iosShadow: {
    //     flex: 1,
    //     width: (deviceWidth/4)+12,
    //     height:  (deviceHeight/100),
    //     alignSelf: 'center',
    //     marginTop: (deviceHeight/5)
    // },
    // aShadow: {
    //     flex: 1,
    //     width:  (deviceWidth/3) + 8,
    //     height: (deviceHeight/20),
    //     padding: 20,
    //     alignSelf: 'center',
    //     marginTop: (deviceHeight/5) - 60
    // },
    background: { //image
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    // marketBackground: {
    //     height: deviceHeight - 50, // 50 is the roughly header size.
    //     borderRadius: 20,
    //     padding: 10
    // },
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 7,
        margin: 10
    },
    upperGrid: {
        padding: 15
    },
    lowerGrid: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 30,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(236, 236, 236, 0.82)'
    },
    inputGrp: {
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: '#EAEAEA',
        borderWidth: 0,
        width: 40
    },
    input: {
        color: '#7F7F7F',
        fontWeight: '800'
    },
    // bg: {
    //     flex: 1,
    //     marginTop: 2000,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    // },
    // loginBtn: {
    //     alignSelf: 'center',
    //     height: 50,
    //     width: 200,
    //     marginBottom: 10,
    // },
    buyBtn: {
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        shadowOpacity: 0,
    },
    purchaseBtn: {
        marginTop: 240,
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff',
    },
    marketBtn: {
        marginTop: 140,
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff',
    },
    pnrBtn: {
        marginTop: 90,
        marginBottom: 20,
        alignSelf: 'center',
        height: 50,
        width: 260,
        backgroundColor: '#fff',
    },
    // helpBtns: {
    //     opacity: 0.9,
    //     fontSize: 14,
    //     fontWeight: 'bold'
    // },
    // otherLinksContainer: {
    //     flexDirection: 'row'
    // },
    // categoryDropdown: {
    //     width: deviceWidth,
    //     marginTop: 10,
    //     alignItems: 'center',
    //     zIndex: 10,
    // },
    cardItemHeader: {
        color: '#666482',
        fontWeight: 'bold',
    },
    cardItemBody: {
        color: '#000',
    },
    cardItemAmount: {
        color: '#000',
        alignSelf: 'flex-end',
    },
    cardItemAmountIncrease: {
        color: '#0d0',
        alignSelf: 'flex-end',
    },
    // header: {
    //     width: Dimensions.get('window').width,
    //     paddingLeft: 15,
    //     paddingRight: 15
    // },
    // rowHeader: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignSelf: 'stretch',
    //     paddingTop: Platform.OS === 'android' ? 7 : 0
    // },
    // btnHeader: {
    //     paddingTop: 10
    // },
    // imageHeader: {
    //     height: 25,
    //     width: 95,
    //     resizeMode: 'contain',
    //     marginTop: 10
    // },
    cardStyling: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
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
        borderColor: '#ef4c3e',
        marginBottom: 10
    },
    colStyling: {
        color: 'black',
        fontSize: 12
    },
    largeText: {
        lineHeight: 20,
        color: '#616166',
        fontWeight: '800',
        fontSize: 12
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
    modal: {
        //marginTop: -25,
        //flex: 10,
        position: 'absolute',
        width: 250,
        marginLeft: 120
        //marginTop: (Platform.OS==='android') ? 40 : 0
    },
    profileInfo: {
        justifyContent: 'center',
        margin: 5,
    },
    profileUser: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 10
    },

});

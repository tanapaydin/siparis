'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;

var deviceOS = Platform.OS;
// Screen size
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var marginS = deviceWidth / 40; // small margin ~ 9.375
var marginM = deviceWidth / 20; // medium margin ~ 18.750
var marginL = deviceWidth / 10; // large margin  ~ 37.5

var vertMarginS = deviceHeight / 40; // ~ 16
var vertMarginM = deviceHeight / 20; // ~ 32
var vertMarginL = deviceHeight / 10; // ~ 64

var marginGeneric = marginM; // ~20
var paddingGeneric = marginM; // ~20
var borderRadiusGeneric = 0;
var fontWeightGeneric = '500';
var fontColorGeneric = '#3C3C3C';
var backgroundColorWhite = '#fff';

var statusBarWidth = 20;
var iphone44 = 44;

// Print common variables to the console.
// console.log('deviceOS: ', deviceOS);
// console.log('height-width: ', deviceHeight, deviceWidth);
// http://www.kylejlarson.com/blog/iphone-6-screen-size-web-design-tips/
// iphone 5/5S/SE: 568 - 320
// iphone 6/6S/7: 667 - 375
// iphone 6/6S/7 +: 736 - 414
// android 4.7' 720x1280:  640 - 360
// android Nexus 5X 1080x1920:  683.4 - 411.4
// android Nexus 6 1440x2560:  683.4 - 411.4
// console.log('margin S-M-L: ', marginS, marginM, marginL);

// bkm1 colors

// bkm2 colors

// bkm3 colors

var accountAndMarket = {


    // COMMON STYLES



    // HEADER
    // HEADER - END


    // LOGIN & REGISTER
    // LOGIN & REGISTER - END


    // ACCOUNT STYLE - START
    container: {
        flex: 1,
        width: deviceWidth,
        height: deviceHeight,
    },
    profileInfoContainer: {
        // paddingTop: 20,
        width: deviceWidth,
        height: deviceHeight / 7 + marginS, //+ profileInfo.margin
    },
    accountProfileInfoLeftGrid: {
        justifyContent: 'center',
        margin: marginM,
    },
    accountProfileInfoRightGrid: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: marginM,
    },
    accountProfileUser: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    accountProfileBalance: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    accountProfilePic: {
        width: 8 * marginS,
        height: 8 * marginS,
        borderRadius: 10
    },
    accountNoHistoryCard: {
        borderBottomWidth: 0,
        margin: marginM,
        backgroundColor: '#fff',
        paddingBottom: marginM,
        borderRadius: marginS,
    },
    accountNoPurchaseCard: {
        borderBottomWidth: 0,
        margin: marginM,
        padding: marginM,
    },
    accountNoHistoryText: {
        fontSize: 14,
        color: '#666482',
        fontWeight: 'bold',
        marginTop: marginS,
        alignSelf: 'center',
    },
    accountNothingImage: {
        alignSelf: 'center',
        marginTop: marginS,
        marginBottom: marginS,
        width: 10 * marginM,
        height: 10 * marginM,
    },
    changeMonth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: marginM,
        marginRight: marginM,
        marginTop: marginS,
        marginBottom: marginS,
    },
    previousMonth: {
        padding: marginM,
        // backgroundColor: 'transparent',
    },
    nextMonth: {
        padding: marginM,
        // backgroundColor: 'transparent',
        alignItems: 'flex-end',
    },
    transactionHistory: {
        marginLeft: marginM,
        marginRight: marginM,
        // flexWrap: 'wrap'
        marginBottom: deviceOS === 'ios' ? 8 * marginM : 15 * vertMarginS,
        borderRadius: 10,
    },
    accountCardItemHeader: {
        color: '#000',
        fontWeight: 'bold',
    },
    accountCardItemBody: {
        color: '#000',
    },
    accountCardItemAmount: {
        color: '#000',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    accountCardItemAmountIncrease: {
        color: '#0d0',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    accountContent: {
        marginRight: 0, 
        borderRadius: 0
    },
    accountList: {
        paddingTop: marginS,
        marginBottom: marginM - marginS,
        marginRight: marginM - marginS
    },
    accountListItem: {
        flex: 1,
        paddingVertical: 0,
        paddingLeft: 0,
        margin: 0,
        borderBottomWidth: 0,
        paddingBottom: marginS
    },
    accountListItemGrid: {
        flex: 1, 
        backgroundColor: '#fff', 
        padding: marginS,
        borderRadius: marginS
    },
    // ACCOUNT - END


    // TRANSFER STYLE - START
    // TRANSFER - END


    // MARKET STYLE - START
    background: { // background image
        flex: 1,
        width: deviceWidth,
        height: deviceHeight,
    },
    scrollContent: {
        padding: marginS,
        marginBottom: (deviceOS === 'android') ? marginM : 0,
    },
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 7,
        margin: marginS
    },
    upperGrid: { // item image title and description
        padding: marginS
    },
    itemThumb: {
        borderRadius: 7,
        width: 10 * marginS,
        height: 10 * marginS,
    },
    cardItemHeader: {
        color: '#666482',
        fontWeight: 'bold',
    },
    cardItemDate: {
        color: '#666482',
    },
    cardItemBody: {
        color: '#666482',
    },
    cardItemQuantity: {
        color: '#666482',
        paddingTop: marginM,
    },
    lowerGrid: { // item price and buy button
        padding: marginS,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(236, 236, 236, 0.82)'
    },
    buyBtn: {
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        shadowOpacity: 0,
    },
    inputGrp: {
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: '#EAEAEA',
        borderWidth: 0,
        width: 5 * marginS,
    },
    input: {
        color: '#7F7F7F',
        fontWeight: '800'
    },
    purchaseBtn: {
        //marginTop: 6 * marginL,
        marginTop: marginM,
        alignSelf: 'center',
        height: marginS + marginL,
        width: 7 * marginL,
        backgroundColor: '#fff',
    },
    marketBtn: {
        //marginTop: 7 * marginM,
        marginTop: marginM,
        alignSelf: 'center',
        height: marginS + marginL,
        width: 7 * marginL,
        backgroundColor: '#fff',
    },
    pnrBtn: {
        //marginTop: 9 * marginS,
        marginTop: marginM,
        alignSelf: 'center',
        height: marginS + marginL,
        width: 7 * marginL,
        backgroundColor: '#fff',
    },
    cardItemAmount: {
        color: '#000',
        alignSelf: 'flex-end',
    },
    cardItemAmountIncrease: {
        color: '#0d0',
        alignSelf: 'flex-end',
    },
    // Market main modal
    modal: {
        //marginTop: -25,
        //flex: 10,
        // position: 'absolute',
        // width: 13 * marginM + marginS,
        height: 6 * marginL,
        marginTop: (deviceHeight < 650) ? 8 * marginL : 5 * marginL, // iphone5/5s/SE device height is smaller than 600 px.
        marginLeft: 6 * marginM,
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
        width: 4 * marginS,
        height: 4 * marginS,
        borderRadius: 10
    },
    //Market fail/success
    cardStyling: {
        marginTop: marginM,
        marginLeft: marginM,
        marginRight: marginM,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    cardStylePadding: {
        padding: marginM, // change this to make bold cards.
    },
    cardStylingFailure: {
        //fontSize: 12, //View'de fontSize kullanilmasina kiziyor
        backgroundColor: '#f95345',
        borderWidth: 1,
        borderColor: '#ef4c3e',
    },
    cardStyleLitePadding: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: marginM,
        paddingRight: marginM
    },
    cardBorderBottomStyling: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    cardHeader: {
        color: '#8b8885',
        fontWeight: '800'
    },
    colStyling: {
        color: 'black',
        fontSize: 14
    },
    marketNoHistoryText: {
        fontSize: 14,
        color: '#666482',
        fontWeight: 'bold',
        marginTop: marginS,
        marginBottom: marginM,
        alignSelf: 'center',
    },
    largeText: {
        lineHeight: 20,
        color: '#616166',
        fontWeight: '800',
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center'
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
    // MARKET - END


    // PNR
    purchasedListContent: {
        marginBottom: deviceOS === 'ios' ? 0 : vertMarginM
    }
    // PNR - END

    // SETTINGS
    // SETTINGS - END



};


var bkmThemeCommon = {

    marginM: marginM,

    container: {
        flexGrow: 1,
        width: deviceWidth,   //null,
        height: deviceHeight  //null,
    },
    background: { // background image
        flex: 1,
        width: deviceWidth,
        height: deviceHeight,
    },
    whiteBackground: {
        backgroundColor: backgroundColorWhite
    },
    marginGeneric: {
        margin: marginGeneric
    },
    paddingGeneric: {
        padding: marginGeneric
    },
    gridColumnAffect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    middleView: {
        paddingTop: marginM,
        paddingBottom: marginM
    },

    // CARD BEGIN -------
    cardStyling: {
        marginTop: marginGeneric,
        marginLeft: marginGeneric,
        marginRight: marginGeneric,
        backgroundColor: 'white',
        borderRadius: borderRadiusGeneric
    },
    cardStylePadding: {
        padding: marginM, // change this to make bold cards.
    },
    cardTitle: {
        color: '#8b8885',
        fontWeight: fontWeightGeneric
    },
    cardSectionPadding: {
        padding: paddingGeneric
    },
    cardSectionPaddingLite: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20
    },
    cardSectionBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    cardSectionColor: {
        color: fontColorGeneric,
    },
    cardSectionColorLite: {
        color: '#9a99ac',
    },
    largeText: {
        lineHeight: 30,
        color: '#616166',
        fontWeight: fontWeightGeneric,
        fontSize: 23
    },
    justifyToRight: {
        //textAlign: 'right',  //View'ler icin textAlign props verilemiyor
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    // CARD END ---------

    // INPUT BEGIN ------
    inputGrpPrimary: {
        flexDirection: 'row',
        borderRadius: borderRadiusGeneric,
        backgroundColor: '#eaeaea', //Gri tonu
        marginBottom: 15
    },
    inputPrimary: {
        color: '#7a7a7a',
        paddingLeft: 15,
        fontSize: 12,
        fontWeight: '800'
    },
    textInputForms: {
        color: '#7a7a7a',
        paddingTop: 8,
        //paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        fontSize: 13,
        fontWeight: '400',
        backgroundColor: 'transparent', //'#eaeaea',
        borderColor: fontColorGeneric, //'#d9d5dc',
        borderWidth: 1,
        borderRadius: 0,
        height: 40
    },
    // INPUT END --------

    buttonVazgec: {
        flex:1,
        alignSelf: "stretch",
        backgroundColor: '#b3b3b3', //Gri tonu
        borderRadius: borderRadiusGeneric,
        marginBottom: marginGeneric,
        height: 50,
        padding: 15,
        marginRight: 10,
        //fontSize: 16  //Warning: Failed prop type: Invalid props.style key `fontSize` supplied to `View`.
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

    signUpBtnContainer: {
        position: 'absolute',
        bottom: 80,
        left: 40,
        right: 40,
    }

};

function newAnnouncementButtonStyleFunction(renk) {
    return  {
        top: 9,
        left: 2,
        width: 12,
        height: 12,
        zIndex: 100,
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: renk
    }
}

function newAnnouncementPageStyleFunction(renk) {
    return  {
        top: 5,
        right: 5,
        position: 'absolute',
        zIndex: 100,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: renk
    }
}

function buttonKaydetFunction(renk) {
    return  {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: renk, //'#f49f29',
        borderRadius: borderRadiusGeneric,
        marginBottom: marginGeneric,
        height: 50,
        //width: 160,
        padding: 15,
        marginLeft: 10,
        //fontSize: 16  //Warning: Failed prop type: Invalid props.style key `fontSize` supplied to `View`.
    }
}

// '-dev' for development
// '-test' for test
// '' for production
var ortam = '-dev';

// Variable to control whether gallery is available
// 'true' - directly opens camera during registration, better for production or customer facing builds.
// 'false' - asks opening either gallery or camera, better for development with simulator.
var isCameraOnly = false;
// This line below is a safe belt for production. We do not want users to select photos from gallery on production!
isCameraOnly = (ortam === '') ? true : isCameraOnly;

var renkTuruncu = '#f49f29'; //Turuncu tonu
var themeTuruncu = {

    katIsmi: 'T2',
    marketName: 'KATT2', // Account uses marketName
    // serverAddressMarket: 'https://t2'.concat(ortam, '.blockchain.biz.tr'),
    serverAddressMarket: 'http://192.168.2.30:8080',
    // This is the common server address where each app share to access same keychain, so it is important:
    serverAddressCoinGenerator: 'https://merkezyonetimi'.concat(ortam, '.blockchain.biz.tr'),
    androidGCMSenderId: '522572498599', // prod senderId
    androidGCMSenderIdTest: '1045206768977', // test senderId

    statusBarColor: renkTuruncu, //'#f49f29', //Turuncu tonu
    headerBackgroundColor: renkTuruncu, //'#f49f29',
    inputGrpBackgroundColorGeneric: '#FABC75',
    satinAlButtonColor: '#ED6D39',
    inputPlaceholderColor: '#9f8265',
    placeholderTextColorForForms: '#cfcfcf', //'#d3c1b4',
    inputTextColor: '#7a6a5f',
    signUpResultCardSectionBorderBottomColor: '#f5ebdc',
    buttonKaydet: buttonKaydetFunction(renkTuruncu),
    newAnnouncementButton: newAnnouncementButtonStyleFunction('#5491D2'),
    newAnnouncementCard: newAnnouncementPageStyleFunction(renkTuruncu),

    primaryButtonTextColor: '#3C3C3C', //'#4E4944',
    secondaryButtonBackgroundColor: 'transparent',

    blackColor: '#3C3C3C',
    redColor: '#F46F6F',
    masterWhileColor: '#FFFFFF',
    accentWhiteColor: '#F5F5F5'
};


module.exports = {
    ortam: ortam,
    isCameraOnly: isCameraOnly,
    katIsimleri: [themeTuruncu.katIsmi ], //, themeMavi.katIsmi, themeYesil.katIsmi, themeSiyah.katIsmi],
    accountAndMarket: accountAndMarket,
    bkmThemeCommon: bkmThemeCommon,
    bkmTheme: themeTuruncu // T2
    // bkmTheme: themeMavi // BKM2
    // bkmTheme: themeYesil // BKM3
    // bkmTheme: themeSiyah // BKM5
};

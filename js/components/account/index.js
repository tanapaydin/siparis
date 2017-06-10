'use strict';

//import Swiper from 'react-native-swiper';
//import Keychain from 'react-native-keychain';
//import pinchFetch from '../utility/pinchUtil';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, ListView, Alert, RefreshControl, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { replaceRoute } from '../../actions/route';
import { openDrawer } from '../../actions/drawer';
import { Container, Header, Content, Card, CardItem, Text, Thumbnail, List, ListItem } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import Utility from '../utility/';
import theme from '../../themes/base-theme';
import { accountAndMarket, bkmTheme, bkmThemeCommon } from '../../themes/base-style';

// var Fabric = require('react-native-fabric');
// var { Crashlytics } = Fabric;


class Account extends Component {

    constructor(props) {
        super(props);

        // Check out data.json for more information!
        // import data from './data.json';

        var data = {
            "transactionHistory": [
                {
                    "month": "def month",
                    "year": "def year",
                    "transactions": []
                }
            ]
        };

        this.state = {
            name: '',
            balance: {
                integerPart: '--',
                fractionalPart: '--'
            },
            currentSwiperIndex: -1,
            avatarImage: '',
            data: data,
            millisecondsForLatestAnnouncement: 0,
            millisecondsFromServerForLatestAnnouncement: 0
        };

        // this._onScrollBeginDrag = this._onScrollBeginDrag.bind(this);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    _onScrollBeginDrag(e, state, context) {
        this.setState({currentSwiperIndex: state.index});
    }

    _onMomentumScrollEnd(e, state, context) {
        //load new data here, fetch from the server and add it to the current state.
        //start initially from the current month and fetch the old data while swiping towards right.
        var swipedIndex = state.index;
        this.setState({currentSwiperIndex: swipedIndex});
    }

    componentWillMount() {
        var base64Avatar = 'data:image/png;base64,' + this.props.user.avatarImage;
        this.setState({ avatarImage: base64Avatar });

        this.fetchLatestAnnouncementDateFromServer();
        this.readDuyuruLatestMillisecondFromAsyncStorage();
    }

    componentDidMount() {
        this._fetchUserAccountHistory(0,0);
    }

    readDuyuruLatestMillisecondFromAsyncStorage() {

        let objNameOnAsyncStorage = Utility.getDuyuruLatestMillisecondObjectName();

        try {
            AsyncStorage.getItem(objNameOnAsyncStorage)
                .then((strValue) => {

                    let mrktName = bkmTheme.marketName;

                    if (!strValue) {
                        // Henuz bu kat uygulamasi icin AsyncStorage'a bu deger yazilmamis demektir.
                        let strObj = {};
                        strObj[mrktName] = this.state.millisecondsFromServerForLatestAnnouncement;
                        AsyncStorage.setItem(objNameOnAsyncStorage, JSON.stringify(strObj));
                    } else {
                        let strObj = JSON.parse(strValue);
                        let millisecondsForLatestAnnouncement = strObj[mrktName];
                        this.setState({ millisecondsForLatestAnnouncement });
                    }
                })
                .done();

        } catch (error) {
            Alert.alert('Hata', 'En güncel duyuru tarihi okunurken hata oluştu.');
            console.log('En güncel duyuru tarihi okunurken hata oluştu.');
        }
    }

    fetchLatestAnnouncementDateFromServer() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/campaign/newest-campaign-date';
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then( (responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                responseData.json()
                    .then((responseJson) => {

                        if (!responseJson) {
                            Alert.alert('Hata', 'Sunucudan en güncel duyuru tarihi okuma hatası.');
                        }

                        if (responseJson.responseCode != "MRKT0000") {
                            Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                            return;
                        }

                        let millisecondsFromServerForLatestAnnouncement = parseInt(responseJson.source);
                        this.setState({ millisecondsFromServerForLatestAnnouncement });
                    })
                    .catch((error) => {
                        Alert.alert('Hata', 'Sunucu duyuru entegrasyonunda hata oluştu: '.concat(error));
                    });
            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: registration/status/ + email: ', error.message);
            });
    }

    // startIndex: starts from 0 for the current month.
    // endIndex: starts from startIndex and increment by -1.
    // example: /0/0 returns all actions in the current month.
    //          /0/-1 returns all actions of current month and previous month.
    _fetchUserAccountHistory(startIndex, endIndex) {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/accounthistory/' + startIndex + '/' + endIndex;
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
            let tmpData = {
                transactionHistory: []
            };
            let prettyData = this._prettifyAccountHistoryData(responseData);
            tmpData.transactionHistory.push(prettyData);
            this.setState({
                data: tmpData
            });

            this._fetchUserBalance();
        })
        .catch((error) => {
            let networkError = {responseCode: -99, message: 'Network hatasi'};
            console.log('network hatasi - fetch account history: ', error);
            // fail sayfasini ac
        })
        .done();
    }

    _prettifyAccountHistoryData(responseData) {
        var prettyData = {};
        prettyData.month = 'compute month'; // compute this
        prettyData.year = 'compute year'; // compute this
        prettyData.transactions = [];

        for(let i = 0; i < responseData.length; i++) {
            let tmpAction = responseData[i] || {};
            let tmpPrettyAction = {};

            tmpPrettyAction.transactionDate = Utility.millisecondToDate(tmpAction.time);
            tmpPrettyAction.transactionTime = Utility.millisecondToHour(tmpAction.time);
            tmpPrettyAction.transactionNote = tmpAction.description;

            if (tmpAction.action === 'CREDIT_RECEIVED' && tmpAction.from === bkmTheme.marketName) { // Yukleme
                tmpPrettyAction.transactionType = 'Yükleme';
                tmpPrettyAction.transactionText = bkmTheme.katIsmi + ' tarafından';
                // assume amount is a number value like 1100.88 or 1200
                let tmpAmount = tmpAction.amount.toString().split(".");
                tmpPrettyAction.transactionAmount = '' + tmpAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (tmpAmount[1] ? ',' + (tmpAmount[1].length < 2 ? tmpAmount[1] + '0' : tmpAmount[1] ) : ',00');
            } else if(tmpAction.action === 'CREDIT_RECEIVED' && this._validateEmail(tmpAction.from)) { // Transfer - incoming
                tmpPrettyAction.transactionType = 'Gelen Keklik';
                tmpPrettyAction.transactionText = tmpAction.from;
                let tmpAmount = tmpAction.amount.toString().split(".");
                tmpPrettyAction.transactionAmount = '' + tmpAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (tmpAmount[1] ? ',' + (tmpAmount[1].length < 2 ? tmpAmount[1] + '0' : tmpAmount[1] ) : ',00');
            } else if(tmpAction.action === 'CREDIT_TRANSFERRED' && this._validateEmail(tmpAction.to)) { // Transfer - outgoing
                tmpPrettyAction.transactionType = 'Giden Keklik';
                tmpPrettyAction.transactionText = tmpAction.to;
                // assume amount is a number value like 1100.88
                let tmpAmount = tmpAction.amount.toString().split(".");
                tmpPrettyAction.transactionAmount = '' + tmpAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (tmpAmount[1] ? ',' + (tmpAmount[1].length < 2 ? tmpAmount[1] + '0' : tmpAmount[1] ) : ',00');
            } else if(tmpAction.action === 'ASSET_RECEIVED' && tmpAction.from === bkmTheme.marketName) { // Harcama, marketten item alma.
                tmpPrettyAction.transactionType = 'Harcama';
                tmpPrettyAction.transactionText = '' + tmpAction.marketItem.title;
                tmpPrettyAction.transactionNote = ''; // Assetlerde description gostermek istemiyoruz.
                tmpPrettyAction.transactionAmount = '' + tmpAction.marketItem.price.integerPart + ',' + tmpAction.marketItem.price.fractionalPart;
            } else {
                continue;
            }

            prettyData.transactions.push(tmpPrettyAction);

        }

        return prettyData;
    }

    _fetchUserBalance() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/balance/';
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({balance: {integerPart: responseData.integerPart, fractionalPart: responseData.fractionalPart}});
            })
            .catch((error) => {
                let networkError = {responseCode: -99, message: 'Network hatasi'};
                console.log('account - network hatasi - fetch user balance: ', error);
                // fail sayfasini ac
            })
            .done();
    }

    _validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    _showNewAnnouncementAlert() {
        return parseInt(this.state.millisecondsForLatestAnnouncement) < parseInt(this.state.millisecondsFromServerForLatestAnnouncement);
    }

    _crashTest() {
        // Crashlytics.crash();
        console.log('crash test');
    }

    render() {

        return (
            <Container theme={theme}>
                <Image source={require('../../../images/grad-bg.png')}  style={accountAndMarket.container} >
                    <Header style={{paddingLeft: 0}}>
                        <HeaderContent showHamburger={true} showLogo={true} showAnnouncementButton={true}
                                       showNewAnnouncementAlert={this._showNewAnnouncementAlert()}/>
                    </Header>

                    <View style={bkmThemeCommon.gridColumnAffect}>
                        <View style={accountAndMarket.accountProfileInfoLeftGrid}>
                            <Thumbnail source={{ uri: this.state.avatarImage }}
                                       style={accountAndMarket.accountProfilePic}
                                       accessibilityLabel="account_image"
                            />
                        </View>
                        <View style={accountAndMarket.accountProfileInfoRightGrid}>
                            {/*<TouchableOpacity onPress={() => this._crashTest()}>*/}
                                <Text style={accountAndMarket.accountProfileUser} accessibilityLabel="account_name">
                                    {this.props.user.name}
                                </Text>
                            {/*</TouchableOpacity>*/}
                            <Text style={[accountAndMarket.accountProfileUser, {marginBottom: 5}]} accessibilityLabel="account_name">
                                {this.props.user.surname}
                            </Text>
                            <Text style={{marginBottom: 5, fontSize: 12}} accessibilityLabel="account_name">
                                {this.props.user.userEmail}
                            </Text>
                            <View style={{borderTopWidth: 1, borderTopColor: '#fff'}}>
                                <Text style={[accountAndMarket.accountProfileBalance, {marginTop: 5}]} accessibilityLabel="account_balance">
                                    {this.state.balance.integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},{this.state.balance.fractionalPart} Keklik
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Content style={accountAndMarket.accountContent}>
                        {this.state.data.transactionHistory[0].transactions.length === 0 && !this.props.loaderVisible
                            ?
                            <View style={accountAndMarket.accountNoHistoryCard} key={'noAccountHistory'}>
                                <Image source={require('../../../images/nothing-here.png')}
                                       style={accountAndMarket.accountNothingImage}
                                       accessibilityLabel="no-history-image"
                                />
                                <Text style={accountAndMarket.accountNoHistoryText}
                                      accessibilityLabel="no-history-text1">
                                    Şimdiye kadar hiçbir işlem yapmadınız.
                                </Text>
                            </View>
                            :
                            <View >
                                <Text style={bkmThemeCommon.infoText}>
                                    Tüm keklik transferlerini ve {bkmTheme.katIsmi} mağazasında yaptığın işlemleri aşağıda görebilirsin.
                                </Text>

                                <List style={accountAndMarket.accountList}
                                      dataArray={this.state.data.transactionHistory[0].transactions}
                                      renderRow={(tmpTransaction) =>
                                    <ListItem style={accountAndMarket.accountListItem}>
                                        <Grid style={accountAndMarket.accountListItemGrid}>
                                            <Col style={{flex: 0.65}}>
                                                <Text style={accountAndMarket.cardItemHeader}
                                                      accessibilityLabel="transaction_type_date">{tmpTransaction.transactionType}</Text>
                                                <Text style={accountAndMarket.cardItemDate}
                                                      accessibilityLabel="transaction_type_date">{tmpTransaction.transactionDate} {tmpTransaction.transactionTime}</Text>
                                                <Text style={accountAndMarket.cardItemBody}
                                                      accessibilityLabel="transaction_text">{tmpTransaction.transactionText}</Text>
                                                <Text style={accountAndMarket.cardItemBody}
                                                      accessibilityLabel="transaction_note">{tmpTransaction.transactionNote}</Text>
                                            </Col>
                                            <Col style={{flex: 0.35, justifyContent: 'center'}}>
                                                <Text
                                                    style={tmpTransaction.transactionType === "Yükleme" || tmpTransaction.transactionType === "Gelen Keklik" ? accountAndMarket.cardItemAmountIncrease : accountAndMarket.cardItemAmount}
                                                    accessibilityLabel="transaction_amount">
                                                    {tmpTransaction.transactionType === "Yükleme" || tmpTransaction.transactionType === "Gelen Keklik" ? '+' : '-'} {tmpTransaction.transactionAmount}
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </ListItem>
                                }/>
                            </View>
                        }
                    </Content>


                </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        loaderVisible: state.loading.loaderVisible
    };
}

export default connect(mapStateToProps, bindAction)(Account);

'use strict';

import React, { Component } from 'react';
import { Image, Platform, Dimensions, Alert, TextInput, AsyncStorage, TouchableOpacity, ScrollView, Linking, RefreshControl } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import { login } from '../../actions/user';
import { buyItem, openMarketModal, closeMarketModal } from '../../actions/market';
import { Header, Container, Content, Text, Button, View, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContentMarket from './../headerContentMarket/';
import Modal from 'react-native-simple-modal';
import AppEventRegistery from '../utility/AppEventRegistery';
import theme from '../../themes/base-theme';
import { katIsimleri, accountAndMarket, bkmTheme, ortam } from '../../themes/base-style';


class MarketMain extends Component {

    constructor(props) {
        super(props);

        var data = {
            "type": "productList",
            "category": "all",
            "products": []
        }

        this.state = {
            data: data,
            accountBalance: {
                integerPart: '--',
                fractionalPart: '--'
            },
            text: 'useless placeholder',
            availableDeepLinks: [],
            isModalOpen: false,
            refreshing: false,
        };

        // this._purchaseItem = this._purchaseItem.bind(this);
        // this._fetchMarketItemList = this._fetchMarketItemList.bind(this);
        // this._fetchUserBalance = this._fetchUserBalance.bind(this);
        // this._onModalOpen = this._onModalOpen.bind(this);
        // this._onChangeMarket = this._onChangeMarket.bind(this);

    }

    // requestler;
    // http://t2market.blockchain.biz.tr/login.xhtml burak.doma@t2.com.tr bkm
    // http://coingenerator.blockchain.biz.tr/login.xhtml coinadmin@t2.com.tr bkm
    // Bakiye sorgulama
    // http://35.156.83.188:8080/market/services/rest/user/balance/metehan.danaci@t2.com.tr
    // /services/rest/user/balance
    // returns;
    // 918,42
    // errors;
    // {"responseCode": "MRKT0012"}

    // Market itemlari
    // /services/rest/market/all
    //

    // Marketten item almak
    // /merchandise/purchase/{market_item_id}/{quantity_for_purchasing}
    // http://35.156.83.188:8080/market/services/rest/user/purchase/metehan.danaci@t2.com.tr/1/1
    // returns;
    // [ {"id":"1","code":"5PXN3","purchased":true} ]
    // errors;
    // MRKT0012 - Kullanıcı bulunamadı
    // MRKT0015 - Belirtilen ürün markette bulunamadı.
    // MRKT0018 - Alınmak istenen miktar 0 olamaz
    // MRKT0019 - Yeterli sayıda hediye bulunmuyor
    // MRKT0020 - Alınmak istenen miktar için bakiye yetersiz

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    componentWillMount() {
        // console.log('marketMain - componentDidMount');
        // updatePosition(this.refs['SELECT1']);
        // updatePosition(this.refs['OPTIONLIST']);

        // this.setState({
        //   selectedCategory: this.props.selectedCategory
        // });

        this._fetchMarketItemList();
        // this._fetchUserBalance();

        // Compute which markets are available to go here
        this.setState({availableDeepLinks: this._availableMarkets(), isModalOpen: false});
    }


    // Compute which markets are available
    _availableMarkets() {

        var appIconsMap = {
            T2: require('../../../images/icon_T2.png'),
            BKM2: require('../../../images/icon_BKM2.png'),
            BKM3: require('../../../images/icon_BKM3.png'),
            BKM5: require('../../../images/icon_BKM5.png'),
        };

        var knownMarkets = katIsimleri;
        var availableMarkets = [];

        for (let i = 0; i < knownMarkets.length; i++) {
            let tmpKatIsmi = knownMarkets[i];
            let tmpKatIcon = appIconsMap[tmpKatIsmi];
            if (tmpKatIsmi === bkmTheme.katIsmi){
                continue; // We do not support a link to app itself.
            }
            let tmpUrl = 'bbn-' + tmpKatIsmi + ortam + '://';

            Linking.canOpenURL(tmpUrl)
                .then((supported) => {
                    if (!supported) {
                        // console.log('Cant handle url: ', tmpUrl);
                    }
                    else {
                        // console.log('adding url to availableMarketsList: ', tmpUrl);
                        // console.log('available image is:', tmpKatIcon );

                        availableMarkets.push(

                            <Grid style={{flex: 1, alignItems: 'center',borderBottomWidth: 1,borderBottomColor: 'rgba(236, 236, 236, 0.82)'}} key={tmpUrl + '_deeplink'}>
                                <Col style={{}}>
                                    <View style={accountAndMarket.profileInfo}>
                                        <TouchableOpacity onPress={() => this._onChangeMarket(tmpUrl)} accessibilityLabel="market_otherMarket_icon">
                                            <Thumbnail source={tmpKatIcon} style={accountAndMarket.profilePic} />
                                        </TouchableOpacity>
                                    </View>
                                </Col>
                                <Col style={{flex: 3, margin: 5}}>
                                    <TouchableOpacity onPress={() => this._onChangeMarket(tmpUrl)} accessibilityLabel="market_otherMarket">
                                        <Text style={accountAndMarket.cardItemHeader}>{tmpKatIsmi}</Text>
                                    </TouchableOpacity>
                                </Col>

                            </Grid>

                        )

                    }
                })
                .catch((err) => {
                    console.log('An error occured while linking', err);
                })
        }

        return availableMarkets;
    }


    _fetchMarketItemList() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/market/all/';
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('market new item listesi: ', responseData);
                // push market item data fetched from the server to populate static data.
                let tmpData = this.state.data;
                responseData.source.forEach((item) => {
                    tmpData.products.push(item);
                });

                this.setState({data: tmpData});
                this._fetchUserBalance();

            })
            .catch((error) => {
                let networkError = {responseCode: -99, message: 'Network hatasi'};
                // fail sayfasini ac
            })
            .done();
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
                this.setState({accountBalance: {integerPart: responseData.integerPart, fractionalPart: responseData.fractionalPart}});

                // You must finalize refreshing when all the fetches are complete.
                this.setState({refreshing: false});
            })
            .catch((error) => {
                let networkError = {responseCode: -99, message: 'Network hatasi'};
                // fail sayfasini ac
            })
            .done();

    }


    _purchaseItem(item) {

        if (parseInt(item.price.integerPart) > parseInt(this.state.accountBalance.integerPart) ||
            (parseInt(item.price.integerPart) == parseInt(this.state.accountBalance.integerPart) && parseInt(item.price.fractionalPart) > parseInt(this.state.accountBalance.fractionalPart))) {

            Alert.alert(
                item.title,
                'Bakiye yetersiz!',
                [
                    {text: 'Devam et', style: 'cancel'}
                ]
            )
        }
        else {
            this._convertProductFieldsToCorrespondingBuyItemFields(item);
            this.pushNewRoute('marketPurchase');
        }
    }

    _convertProductFieldsToCorrespondingBuyItemFields(item) {
        // convert product's fields to corresponding buyItem item fields.
        let purchasedItem = {
            itemId: item.id,
            itemTitle: item.title,
            itemDescription: item.description,
            itemPrice: {
                integerPart: item.price.integerPart,
                fractionalPart: item.price.fractionalPart
            },
            itemThumbnail: item.encodedImage,
            itemCode: 'default PNR',
            itemMarketQuantity: item.quantity.toString(),
        }

        this.props.buyItem(purchasedItem);
    }

    _onProductTextClick(item) {
        this._convertProductFieldsToCorrespondingBuyItemFields(item);
        this.pushNewRoute('marketPurchaseDescription');
    }

    // NOT: "AppEventRegistery.dispatchPageEvent" sayesinde her modal acip
    // kapandiginda timer resetlenmesi icin event fire ediyoruz.
    _onModalOpen() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this._fetchUserBalance();
    }

    _onModalClose() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({isModalOpen: false});
    }

    _onChangeMarket(url) {
        AppEventRegistery.dispatchAjaxEvent({subType: 'request_start'});

        Linking.canOpenURL(url)
            .then((supported) => {
                if(!supported) {
                    // console.log('Cant handle url: ', url);
                }
                else {
                    // console.log('opening url...', url);
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.log('An error occured while linking', err);
            })
    }

    _onRefresh() {
        // console.log('inside onRefresh');
        this.setState({refreshing: true});

        // var count = 0;
        // var timer = setInterval(()=>{
        //     debugger;
        //     if(count++ == 5){
        //         clearInterval(timer);
        //     }
        //     this.setState({
        //         refreshing : !this.state.refreshing
        //     })
        // },30);

        // this._fetchMarketItemList();

    }


    render() {
        var productList = [];

        if(this.state.data.products.length === 0 && !this.props.loaderVisible) {
            productList.push(
                <View style={[accountAndMarket.accountNoHistoryCard, accountAndMarket.cardView]} key={'noMarketItem'} accessibilityLabel="market_itemBox">
                    <Image source={require('../../../images/nothing-here.png')} style={accountAndMarket.accountNothingImage} accessibilityLabel="no-history-image"/>
                    <Text style={accountAndMarket.marketNoHistoryText} accessibilityLabel="no-history-text1">Mağazada ürün bulunmamaktadır.</Text>
                    {/*<Text style={accountAndMarket.accountNoHistoryText} accessibilityLabel="no-history-text2">Yaptığınız işlemleri buradan takip edebilirsiniz.</Text>*/}
                </View>
            );
        }
        else {
            this.state.data.products.forEach(function (tmpProduct) {
                productList.push(
                    <View style={accountAndMarket.cardView} key={tmpProduct.id} accessibilityLabel="market_itemBox">

                        <Grid style={accountAndMarket.upperGrid} accessibilityLabel="market_itemUpperGrid">
                            <Col style={{flex: 0.5}}>
                                <Thumbnail
                                    source={ tmpProduct.encodedImage ? { uri: 'data:image/png;base64,' + tmpProduct.encodedImage} : require('../../../images/sample-image.png')}
                                    style={accountAndMarket.itemThumb} accessibilityLabel="market_itemImage"/>
                            </Col>
                            <Col style={{paddingLeft: 10}}>
                                <TouchableOpacity onPress={() => this._onProductTextClick(tmpProduct)} accessibilityLabel="market_itemDescription_all">
                                    <Text style={accountAndMarket.cardItemHeader} numberOfLines={2}
                                          accessibilityLabel="market_itemTitle">{tmpProduct.title}</Text>
                                    <Text style={accountAndMarket.cardItemBody} numberOfLines={2}
                                          accessibilityLabel="market_itemDescription">{tmpProduct.description}</Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>

                        <Grid style={accountAndMarket.lowerGrid} accessibilityLabel="market_itemLowerGrid">
                            <Col >
                                <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemPrice">
                                    {tmpProduct.price.integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},{tmpProduct.price.fractionalPart} Keklik</Text>
                            </Col>
                            <Col >
                                <Button rounded style={accountAndMarket.buyBtn}
                                        textStyle={{fontSize: 14, fontWeight: 'bold', color: bkmTheme.satinAlButtonColor, paddingTop: 2, paddingLeft: 10, paddingRight: 10}}
                                        onPress={() => this._purchaseItem(tmpProduct)}
                                        accessibilityLabel="button_purchaseItemMain">
                                    Satın Al
                                </Button>
                            </Col>
                        </Grid>

                    </View>
                );
            }.bind(this));
        }

        return (
            <Container theme={theme}>
                <Image source={require('../../../images/grad-bg.png')} style={accountAndMarket.background} >

                    <Header style={{paddingLeft: 0}}>
                        <HeaderContentMarket openMarketModal={ () => this.setState({isModalOpen: true}) } />
                    </Header>


                    <Content style={accountAndMarket.scrollContent}>
                        {/*<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />*/}

                        {productList}

                    </Content>

                    <Modal
                        open={this.state.isModalOpen}
                        modalDidOpen={() => this._onModalOpen()}
                        modalDidClose={() => this._onModalClose()}
                        style={accountAndMarket.modal}>

                        <View>

                            <Grid style={{flex: 1, alignItems: 'center',borderBottomWidth: 1,borderBottomColor: 'rgba(236, 236, 236, 0.82)'}}>
                                <Col style={{}}>
                                    <View style={accountAndMarket.profileInfo}>
                                        <Thumbnail source={{ uri: 'data:image/png;base64,' + this.props.user.avatarImage }} style={accountAndMarket.profilePic} accessibilityLabel="market_profileImage"/>
                                    </View>
                                </Col>
                                <Col style={{flex: 3, margin: 5}}>
                                    <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_profileBalance">{this.state.accountBalance.integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},{this.state.accountBalance.fractionalPart} Keklik</Text>
                                </Col>
                            </Grid>

                            {/*<Grid style={{flex: 1, alignItems: 'center',borderBottomWidth: 1,borderBottomColor: 'rgba(236, 236, 236, 0.82)'}} >
                                <Col style={{}}>
                                    <View style={accountAndMarket.profileInfo}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-market-siyah.png')} style={accountAndMarket.profilePic} />
                                    </View>
                                </Col>
                                <Col style={{flex: 3, margin: 5}}>
                                    <TouchableOpacity onPress={() => this._onChangeMarket()} accessibilityLabel="market_otherMarket">
                                        <Text style={accountAndMarket.cardItemHeader}>Go to BKM2</Text>
                                    </TouchableOpacity>
                                </Col>

                            </Grid>


                            <Grid style={{flex: 1, alignItems: 'center',borderBottomWidth: 1,borderBottomColor: 'rgba(236, 236, 236, 0.82)'}}>
                                <Col style={{}}>
                                    <View style={accountAndMarket.profileInfo}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-market-siyah.png')} style={accountAndMarket.profilePic} />
                                    </View>
                                </Col>
                                <Col style={{flex: 3, margin: 5}}>
                                    <TouchableOpacity accessibilityLabel="market_otherMarket">
                                        <Text style={accountAndMarket.cardItemHeader}>Go to BKM3</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>*/}

                            {this.state.availableDeepLinks.length === 0 ?
                                <Grid style={{flex: 1, alignItems: 'center',borderBottomWidth: 1,borderBottomColor: 'rgba(236, 236, 236, 0.82)'}} key={'no_oteher_market_installed'}>
                                    <Col style={{}}>
                                        <View style={accountAndMarket.profileInfo}>
                                            <Thumbnail source={require('../../../images/sidebarIcons/icon-market-siyah.png')} style={accountAndMarket.profilePic} />
                                        </View>
                                    </Col>
                                    <Col style={{flex: 3, margin: 5}}>
                                        <Text style={accountAndMarket.cardItemHeader}>Telefonunuzda başka bir market uygulaması yüklü değildir.</Text>
                                    </Col>

                                </Grid>
                                :
                                this.state.availableDeepLinks
                            }


                        </View>


                    </Modal>

                </Image>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        loaderVisible: state.loading.loaderVisible
    };
}


export default connect(mapStateToProps, {buyItem, openMarketModal, closeMarketModal, login, replaceRoute, pushNewRoute})(MarketMain);

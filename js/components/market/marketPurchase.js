'use strict';

import React, { Component } from 'react';
import { Image, Platform, Dimensions, Alert, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect} from 'react-redux';
import { popRoute, pushNewRoute, replaceRoute } from '../../actions/route';
import { buyItem } from '../../actions/market';
import { Header, Container, Content, Text, InputGroup, Input, Button, View, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import theme from '../../themes/base-theme';
import {accountAndMarket, bkmTheme} from '../../themes/base-style';


class MarketPurchase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numOfItems: '1',
            text: '',
            accountBalance: {
                integerPart: '--',
                fractionalPart: '--'
            },
            itemTotalPrice: {
                integerPart: '--',
                fractionalPart: '--'
            },
        };

        this._purchaseItem = this._purchaseItem.bind(this);
        this._backToMarketMain = this._backToMarketMain.bind(this);
        this._calculateTotal = this._calculateTotal.bind(this);
        this._buyItem = this._buyItem.bind(this);
    }

    _buyItem (item) {
        this.props.buyItem(item);
    }

    popRoute(passProps) {
        this.props.popRoute(passProps);
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    // componentDidMount() {
    //   console.log('marketPurchase, item: ', this.props.item);
    //   // updatePosition(this.refs['SELECT1']);
    //   // updatePosition(this.refs['OPTIONLIST']);
    // }

    componentWillMount() {
        this._fetchUserBalance();
    }

    _fetchUserBalance() {
        // let userEmail = this.props.user.userEmail;
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/balance/';
        // console.log('fetchUserBalance url: ', url);
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('market, user balance: ', responseData);
                this.setState({accountBalance: {integerPart: responseData.integerPart, fractionalPart: responseData.fractionalPart}});
            })
            .catch((error) => {
                let networkError = {responseCode: -99, message: 'Network hatasi'};
                // console.log('network hatasi - fetch user balance: ', error);
                // fail sayfasini ac
            })
            .done();

    }

    _showAlertOnPurchase(purchaseAlert) {
        if(['MRKT0012','MRKT0015','MRKT0018','MRKT0019','MRKT0020'].indexOf(purchaseAlert.responseCode) >= 0) {
            Alert.alert(
                'Hata',
                purchaseAlert.message,
                [
                    {text: 'Tamam', onPress: () => console.log('Alert on purchase: ', purchaseAlert.message), style: 'cancel'}
                ]
            )
        }
    }

    _purchaseItem() {
        // Keyboard.dismiss(); // Satin Al'a basilinca klavyenin kaybolmasi icin.
        // console.log('satin al basildi.');

        // first check for if numOfItems is a valid value.
        if(this.state.numOfItems === '') {
            Alert.alert(
                this.props.item.itemTitle,
                'Lütfen 1-9 arasında geçerli bir adet giriniz.',
                [
                    {text: 'Devam et', style: 'cancel'}
                ]
            );
        } else {

            let url = bkmTheme.serverAddressMarket + '/services/rest/merchandise/purchase/' + this.props.item.itemId + '/' + this.state.numOfItems;


            fetch(url, {
                // method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.user.token
                }
            })
            .then((response) => response.json())
            .then((responseData) => {

                if(responseData.responseCode) {
                    this._showAlertOnPurchase(responseData);
                } else {
                    // console.log('satin alma durumu: ', responseData);
                    var item = this.props.item;
                    item.itemCode = responseData[0].code; // add returned PNR code to the newly purchased item.
                    // console.log('before _buyItem, item: ', item);
                    this._buyItem(item); // purchased item is saved to the store.
                    // open marketPurchaseSuccess page
                    this.pushNewRoute('marketPurchaseSuccess', {numOfItems: this.state.numOfItems});
                    //console.log('satin alinan item: ', item);
                }

            })
            .catch((error) => {
                let networkError = {responseCode: -99, message: 'Network hatasi'};
                // console.log('network hatasi - marketPurchase: ', error);
                // open marketPurchaseFail page
                this.pushNewRoute('marketPurchaseFail');
            })
            .done();

        }

    }

    _backToMarketMain() {
        // console.log('marketPurchase selected category on pop-> ', this.state.selectedCategory);
        this.popRoute();
    }

    _calculateTotal() {
        let integerPartSum = parseInt(this.props.item.itemPrice.integerPart) * parseInt(this.state.numOfItems);
        let fractionalPartSum = parseInt(this.props.item.itemPrice.fractionalPart) * parseInt(this.state.numOfItems) / 100;
        let sum = Math.round((integerPartSum + fractionalPartSum) * 100);
        // this.setState({itemTotalPrice: {integerPart: String(Math.floor(sum / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))} });
        // this.setState({itemTotalPrice: {fractionalPart: String((sum % 100 > 9 ? sum % 100 : '0' + (sum % 100)))} });
        return String(Math.floor(sum / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) + ',' + String((sum % 100 > 9 ? sum % 100 : '0' + (sum % 100)));
    }

    _checkMarketItemAmount(amount) {
        if(['', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(amount) >= 0) {
            // check if there is enough item at the market.
            if(parseInt(amount) > parseInt(this.props.item.itemMarketQuantity)) {
                Alert.alert(
                    this.props.item.itemTitle,
                    'Markette kalan ürün adedini aştınız.',
                    [
                        {text: 'Tamam', style: 'cancel'}
                    ]
                );
                this.setState({numOfItems: '1'});
            }
            else {
                this.setState({numOfItems: amount});
            }
        }
        else {
            Alert.alert(
                this.props.item.itemTitle,
                'Lütfen 1-9 arasında geçerli bir adet giriniz.',
                [
                    {text: 'Tamam', style: 'cancel'}
                ]
            );
        }
    }

    render() {

        // console.log('Purchased item: ', this.props.item);

        return (
            <Container theme={theme}>

                    <Image source={require('../../../images/grad-bg.png')} style={accountAndMarket.background} >

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} headerText={bkmTheme.katIsmi + "  |  Mağaza"}/>
                        </Header>

                        <Content bounces={false} style={accountAndMarket.scrollContent}>

                            <View style={accountAndMarket.cardView} accessibilityLabel="market_itemBox">

                                <Grid style={accountAndMarket.upperGrid}>
                                    <Col style={{flex: 0.5}}>
                                        <Thumbnail source={ this.props.item.itemThumbnail ? { uri: 'data:image/png;base64,' + this.props.item.itemThumbnail} : require('../../../images/sample-image.png')}
                                                   style={accountAndMarket.itemThumb} accessibilityLabel="market_itemImage"/>
                                    </Col>
                                    <Col style={{paddingLeft: 10}}>
                                        <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemTitle">{this.props.item.itemTitle}</Text>
                                        <TouchableOpacity onPress={() => this.pushNewRoute('marketPurchaseDescription')} accessibilityLabel="market_itemDescription_all">
                                            <Text style={accountAndMarket.cardItemBody}
                                                  numberOfLines={5}
                                                  accessibilityLabel="market_itemDescription">
                                                {this.props.item.itemDescription}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={accountAndMarket.cardItemQuantity} accessibilityLabel="market_itemDescription">Son {this.props.item.itemMarketQuantity} adet!</Text>
                                    </Col>
                                </Grid>

                                <Grid style={accountAndMarket.lowerGrid}>
                                    <Col style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <InputGroup style={accountAndMarket.inputGrp} accessibilityLabel="market_itemAmount">
                                            <Input placeholder=''
                                                   style={accountAndMarket.input}
                                                   value={this.state.numOfItems}
                                                   keyboardType="numeric"
                                                   maxLength={1}
                                                   onChangeText={(amount) => this._checkMarketItemAmount(amount)}
                                                   accessibilityLabel="input_quantity"/>
                                        </InputGroup>
                                        {/*<Text style={{color: '#666482', fontWeight: 'bold', marginLeft: 10}}>Adet</Text>*/}
                                        <Text style={{color: '#666482', fontWeight: 'bold', marginLeft: 10}}>x</Text>
                                        <Text style={{color: '#666482', fontWeight: 'bold', marginLeft: 10}} accessibilityLabel="market_itemPrice">{String(this.props.item.itemPrice.integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, "."))},{String(this.props.item.itemPrice.fractionalPart)}</Text>
                                    </Col>
                                    <Col style={{ }}>
                                        <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemPriceTotal"> = {this.state.numOfItems === '' ? 'Adet giriniz' : this._calculateTotal().toString() + ' Keklik'}</Text>
                                    </Col>
                                </Grid>

                                <Grid style={accountAndMarket.lowerGrid}>
                                    <Col >
                                        <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemTitle">Bakiyeniz:</Text>
                                    </Col>
                                    <Col >
                                        <Text style={accountAndMarket.cardItemBody} accessibilityLabel="market_itemDescription">{this.state.accountBalance.integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},{this.state.accountBalance.fractionalPart} Keklik</Text>
                                    </Col>
                                </Grid>

                            </View>

                            <Button rounded style={accountAndMarket.purchaseBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}
                                    onPress={() => this._purchaseItem()}
                                    accessibilityLabel="button_purchaseItemDetail">
                                Satın Al
                            </Button>

                        </Content>

                    </Image>

            </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route, passprops) => dispatch(replaceRoute(route, passprops)),
        pushNewRoute:(route, passprops) => dispatch(pushNewRoute(route, passprops)),
        popRoute:(passprops) => dispatch(popRoute(passprops)),
        buyItem: (item) => dispatch(buyItem(item))

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        item: state.market
    }
}


export default connect(mapStateToProps, bindActions)(MarketPurchase);

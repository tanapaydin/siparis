'use strict';

import React, { Component } from 'react';
import { Image, Platform, Dimensions, Alert, TextInput } from 'react-native';
import { connect} from 'react-redux';

import { popRoute, pushNewRoute, replaceRoute } from '../../actions/route';

import { Header, Container, Content, Card, CardItem, Text, InputGroup, Input, Button, Icon, View, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
// import styles from '../../themes/base-style';
import {accountAndMarket, bkmTheme} from '../../themes/base-style';
// import styles from './styles';

class MarketPurchaseFail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numOfItems: 1
    };

    this._purchaseItem = this._purchaseItem.bind(this);
    this._backToMarketMain = this._backToMarketMain.bind(this);
    this._calculateTotal = this._calculateTotal.bind(this);
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

  componentDidMount() {
    // console.log('marketPurchase - componentDidMount');
    // updatePosition(this.refs['SELECT1']);
    // updatePosition(this.refs['OPTIONLIST']);
  }

  _purchaseItem() {
    //console.log('satin al basildi in market purchase fail');
  }

  _backToMarketMain() {
    // console.log('marketPurchase selected category on pop-> ', this.state.selectedCategory);
    this.popRoute();
  }

  _calculateTotal() {
    return String(parseInt(this.props.item.itemPrice) * this.state.numOfItems);
  }

  render() {

    // console.log('ahmet: ', this.props.ahmet);
    //console.log('Purchased item: ', this.props.item);

    return (
      <Container theme={theme}>
        <Image source={require('../../../images/basic-grad-bg.png')} style={accountAndMarket.background} >
  
          <Header style={{paddingLeft: 0}}>
            <HeaderContent showBackButton={false} headerText={bkmTheme.katIsmi + "  |  Mağaza"}/>
          </Header>

          <Content bounces={false} style={accountAndMarket.background}>

            <View style={[accountAndMarket.cardStyling, accountAndMarket.cardStylePadding, accountAndMarket.cardStylingFailure]}>
              <Text style={[accountAndMarket.colStyling, accountAndMarket.textFailureInABox]}>Alışveriş gerçekleşmedi.</Text>
            </View>

            <View style={accountAndMarket.cardStyling}>

              <View style={[accountAndMarket.cardStylePadding, accountAndMarket.cardBorderBottomStyling]}>
                <Text style={accountAndMarket.cardHeader}>İŞLEMİ GERÇEKLEŞMEYEN ÜRÜN</Text>
              </View>


              <View style={[ accountAndMarket.cardBorderBottomStyling ]}>
                <Grid style={accountAndMarket.upperGrid}>
                  <Col style={{flex: 0.5}}>
                    <Thumbnail source={require('../../../images/sample-image.png')} style={accountAndMarket.itemThumb}/>
                  </Col>
                  <Col style={{paddingLeft: 10}}>
                    <Text style={accountAndMarket.cardItemHeader}>{this.props.item.itemTitle}</Text>
                    <Text style={accountAndMarket.cardItemBody}
                          numberOfLines={5}>
                      {this.props.item.itemDescription}
                    </Text>
                  </Col>
                </Grid>
              </View>


              <View style={accountAndMarket.cardStylePadding}>
                <Text style={accountAndMarket.largeText}>Hesabınızdan Keklik çıkışı olmamıştır.</Text>
              </View>

            </View>

            <Button rounded style={accountAndMarket.marketBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}
                    onPress={() => this.replaceRoute('marketMain')}
                    accessibilityLabel="button_purchaseItemDetail">
              Markete dön
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
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.market
  }
}


export default connect(mapStateToProps, bindActions)(MarketPurchaseFail);

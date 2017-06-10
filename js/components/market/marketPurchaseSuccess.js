'use strict';

import React, { Component } from 'react';
import { Image, Platform, Dimensions, Alert, TextInput, TouchableOpacity } from 'react-native';
import { connect} from 'react-redux';

import { popRoute, pushNewRoute, replaceRoute } from '../../actions/route';

import { Header, Container, Content, Card, CardItem, Text, InputGroup, Input, Button, Icon, View, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
// import styles from  '../../themes/base-style';
import {accountAndMarket, bkmTheme} from '../../themes/base-style';
// import styles from './styles';

class MarketPurchaseSuccess extends Component {

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

    //console.log('Purchased item: ', this.props.item);

    return (
      <Container theme={theme}>
        <Image source={require('../../../images/basic-grad-bg.png')} style={accountAndMarket.background} >
  
          <Header style={{paddingLeft: 0}}>
            <HeaderContent showBackButton={false} headerText={bkmTheme.katIsmi + "  |  Mağaza"}/>
          </Header>

          <Content bounces={false} style={accountAndMarket.background}>

            <View style={[accountAndMarket.cardStyling, accountAndMarket.cardStylePadding, accountAndMarket.cardStylingSuccess]}>
              <Text style={[accountAndMarket.colStyling, accountAndMarket.textSuccessInABox]}>Tebrikler! İşleminiz başarı ile gerçekleşti.</Text>
            </View>

            <View style={accountAndMarket.cardStyling}>

              <View style={[accountAndMarket.cardStylePadding, accountAndMarket.cardBorderBottomStyling]}>
                <Text style={accountAndMarket.cardHeader}>KOD</Text>
              </View>

              <View style={[accountAndMarket.cardStylePadding, accountAndMarket.cardBorderBottomStyling]}>
                <Text style={accountAndMarket.cardHeader}>{parseInt(this.props.numOfItems) === 1 ? this.props.item.itemCode : this.props.item.itemCode + ' , ...'}</Text>
              </View>

              <View style={[ accountAndMarket.cardBorderBottomStyling ]}>
                <Grid style={accountAndMarket.upperGrid}>
                  <Col style={{flex: 0.5}}>
                    <Thumbnail source={ this.props.item.itemThumbnail ? { uri: 'data:image/png;base64,' + this.props.item.itemThumbnail} : require('../../../images/sample-image.png')}
                               style={accountAndMarket.itemThumb}/>
                  </Col>
                  <Col style={{paddingLeft: 10}}>
                    <Text style={accountAndMarket.cardItemHeader}>{this.props.item.itemTitle}</Text>
                    <TouchableOpacity onPress={() => this.pushNewRoute('marketPurchaseDescription')} accessibilityLabel="market_itemDescription_all">
                      <Text style={accountAndMarket.cardItemBody}
                            numberOfLines={5}
                      >
                        {this.props.item.itemDescription}
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>


              <View style={accountAndMarket.cardStylePadding}>
                <Text style={accountAndMarket.largeText}>Satın aldığınız ürün kodlarına 'Satın Aldıklarım' menüsünden ulaşabilirsiniz.</Text>
              </View>

            </View>

            <Button rounded style={accountAndMarket.pnrBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}
                    onPress={() => this.replaceRoute('purchased')}
                    accessibilityLabel="button_purchaseItemDetail">
              Satın Aldıklarım
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


export default connect(mapStateToProps, bindActions)(MarketPurchaseSuccess);

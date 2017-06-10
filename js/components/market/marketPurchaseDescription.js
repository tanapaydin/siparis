'use strict';

import React, { Component } from 'react';
import { Image, Platform, Dimensions, Alert, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect} from 'react-redux';
import { popRoute, pushNewRoute, replaceRoute } from '../../actions/route';
import { Header, Container, Content, Text, View } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import theme from '../../themes/base-theme';
import {accountAndMarket, bkmTheme} from '../../themes/base-style';


class MarketPurchaseDescription extends Component {

    constructor(props) {
        super(props);
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
                                <Col style={{paddingLeft: 10}}>

                                    {this.props.purchasedItemDescription // this is true if the component is called from the purchased items list.
                                        ?
                                        <View>
                                            <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemTitle">{this.props.purchasedItemTitle}</Text>
                                            <Text style={accountAndMarket.cardItemBody} accessibilityLabel="market_itemDescription">{this.props.purchasedItemDescription}</Text>
                                        </View>
                                        :
                                        <View>
                                            <Text style={accountAndMarket.cardItemHeader} accessibilityLabel="market_itemTitle">{this.props.item.itemTitle}</Text>
                                            <Text style={accountAndMarket.cardItemBody}
                                                  accessibilityLabel="market_itemDescription">
                                                {this.props.item.itemDescription}
                                            </Text>
                                        </View>
                                    }
                                </Col>
                            </Grid>

                        </View>

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


export default connect(mapStateToProps, bindActions)(MarketPurchaseDescription);

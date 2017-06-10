'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { Icon, View, Text, Button } from 'native-base';
import { bkmTheme } from '../../themes/base-style';

//import Modal from 'react-native-simple-modal';

// import theme from '../../themes/base-theme';
import styles from './styles';

class HeaderContentMarket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };

        this._marketBtnPressed = this._marketBtnPressed.bind(this);
    }

    navigateTo(route) {
        this.props.closeDrawer();
    }

    popRoute() {
        this.props.popRoute();
    }

    _marketBtnPressed() {
        // console.warn('open modal for balance and change market', this.props);
        this.props.openMarketModal();
        // console.log('open modal for balance and change market', this.props.market.isMarketModalOpen);
    }


    render() {
        return (
            <View style={styles.header} >
                <View style={styles.rowHeader}>
                    <Button transparent style={styles.btnHeader} onPress={this.props.openDrawer} accessibilityLabel="icon_search">
                        <Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36}} />
                    </Button>

                    {/*<Image source={require('../../../images/top-bkmaaile-logo.png')} style={styles.imageHeader}></Image>*/}
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '900', lineHeight: 30}}
                              accessibilityLabel="market_header">
                            {bkmTheme.katIsmi} {' | '} Mağaza
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.btnHeader} onPress={() => this._marketBtnPressed()} accessibilityLabel="icon_marketModal">
                        {/*<Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36}} />*/}
                        <Image source={require('../../../images/sidebarIcons/icon-market-beyaz.png')}
                               style={styles.ayarlayici}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

const mapStateToProps = (state) => {
    return {
        market: state.market
    }
}

export default connect(mapStateToProps, bindAction)(HeaderContentMarket);

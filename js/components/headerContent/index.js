'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { popRoute, replaceOrPushRoute } from '../../actions/route';
import { Icon, View, Text, Button } from 'native-base';
import styles from './styles';
import { bkmTheme } from '../../themes/base-style';

class HeaderContent extends Component {

	navigateTo(route) {
        this.props.closeDrawer();
    }

    popRoute() {
        this.props.popRoute();
    }

    _onBackButtonPress() {
        //Not: SendMoney'deki TouchableWithoutFeedback isi gormuyor. O nedenle "Keyboard.dismiss();" ekledik buraya.
        Keyboard.dismiss();
        this.props.popRoute();
    }

    _onHamburgerMenuPress() {
        Keyboard.dismiss();
        this.props.openDrawer();
    }

    _onRightMenuPress(route) {
        Keyboard.dismiss();
        this.props.replaceOrPushRoute(route);
    }

	render() {
		return (
			<View style={styles.header} >
				<View style={styles.rowHeader}>


                    {/*SOLDAKI HAMBURGER VEYA BACK_BUTTON*/}

                    {this.props.showHamburger
                        ?
                        <Button transparent style={styles.btnHeader} onPress={() => this._onHamburgerMenuPress()} accessibilityLabel="icon_search">
                            <Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36}} />
                        </Button>
                        :
                        (
                            this.props.showBackButton
                                ?
                                <TouchableOpacity onPress={() => this._onBackButtonPress()} accessibilityLabel="icon_arrowBack">
                                    {/*<Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36}} />*/}
                                    <Image source={require('../../../images/back-arrow.png')}
                                           style={styles.ayarlayici}>
                                    </Image>
                                </TouchableOpacity>
                                :
                                <View style={styles.ayarlayici}>
                                    {/*Buraya bos view koyduk. Diger turlu ortadaki logoyu ortalamiyordu.*/}
                                </View>
                        )
                    }


                    {/*ORTADAKI KEKLIK LOGOSU VEYA SAYFA ISMI*/}

                    {this.props.showLogo
                        ?
                        <Image source={require('../../../images/top-bkmaaile-logo.png')} style={styles.imageHeader}>
                        </Image>
                        :
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: '900', lineHeight: 30}} accessibilityLabel="market_header">
                                {this.props.headerText ? this.props.headerText : 'BBN'}
                            </Text>
                        </View>
                    }



                    {/*<Button transparent style={styles.btnHeader} onPress={() => this.popRoute()}>*/}
                    {/*<Icon name='ios-search' style={{fontSize: 32, lineHeight: 36}} />*/}
                    {/*</Button>*/}


                    {/* Burada showAnnouncementButton duyuru butonunu komple gostersin mi ayarini yapiyor.
                        Diger showNewAnnouncementAlert ise, duyuru butonun uzerinde yuvarlar (renkli) daire ciksin mi ayarini yapiyor.
                     */}
                    {this.props.showAnnouncementButton
                        ?
                        <TouchableOpacity onPress={() => this._onRightMenuPress('announcements')}>
                            <View>
                                {this.props.showNewAnnouncementAlert
                                    ?
                                    <View style={bkmTheme.newAnnouncementButton}/>
                                    :
                                    <View/>
                                }
                                <Image source={require('../../../images/announcement-white.png')}
                                       style={styles.ayarlayici}>
                                </Image>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={styles.ayarlayici}>
                            {/*Buraya bos view koyduk. Diger turlu ortadaki logoyu ortalamiyordu.*/}
                        </View>
                    }


                </View>
			</View>
		);
	}
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        popRoute:()=>dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(HeaderContent);

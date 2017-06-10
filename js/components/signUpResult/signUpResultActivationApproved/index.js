'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute, resetRoute} from "../../../actions/route";
import {Container, Header, Text, Button, View} from "native-base";
import theme from "../../../themes/base-theme";
import styles from "./styles";
import HeaderContent from './../../headerContent/';
import {bkmThemeCommon} from '../../../themes/base-style';


class SignUpResultActivationApproved extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    popRoute() {
        this.props.popRoute();
    }

    resetRoute() {
        this.props.resetRoute();
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../../images/grad-bg.png')} style={styles.background}>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showLogo={true} />
                        </Header>

                        <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                            <View style={styles.cardStyling}>
                                <View style={[bkmThemeCommon.cardStylePadding, styles.cardBorderBottomStyling]}>
                                    <Text style={styles.statusViewTopic}>AKTİVASYON DURUMU</Text>
                                </View>

                                <View style={bkmThemeCommon.cardStylePadding}>
                                    <Image source={require('../../../../images/act-approved.png')} style={styles.infoViewImageApproved}>
                                    </Image>
                                    <Text style={styles.statusViewTextLarge}>ONAYLANDI</Text>
                                    {/*<Text style={styles.statusViewText}>AKTİVASYON TARİHİ 15.10.2016</Text>*/}
                                </View>
                            </View>

                            <Button rounded transparent block
                                    onPress={() => { this.resetRoute(); }}
                                    style={styles.signupBtn}
                                    textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                Giriş yap
                            </Button>



                        </View>

                    </Image>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops)),
        popRoute: () => dispatch(popRoute()),
        resetRoute: () => dispatch(resetRoute())
    }
}

export default connect(null, bindAction)(SignUpResultActivationApproved);

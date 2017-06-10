'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../../actions/route";
import {Container, Header, Text, View} from "native-base";
import theme from "../../../themes/base-theme";
import styles from "./styles";
import HeaderContent from '../../headerContent/';
import {bkmTheme, bkmThemeCommon} from '../../../themes/base-style';


class SignUpResultWaiting extends Component {

    constructor(props) {
        super(props);

        this.state = {}

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

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../../images/grad-bg.png')} style={styles.background}>

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>

                        <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                            <View style={styles.topView}>
                                <Image source={require('../../../../images/waiting-mail.png')} style={styles.infoViewImage}>
                                </Image>
                            </View>

                            <View style={styles.middleView}>
                                <Text style={styles.infoText}>
                                    Başvurun BBN {bkmTheme.katIsmi} tarafından değerlendiriliyor. Sonucu uygulama üzerinden ve e-posta adresinden takip edebilirsin.
                                </Text>
                            </View>

                            <View style={styles.cardStyling}>

                                <View style={[bkmThemeCommon.cardStylePadding, styles.cardBorderBottomStyling]}>
                                    <Text style={styles.statusViewTopic}>AKTİVASYON DURUMU</Text>
                                </View>

                                <View style={bkmThemeCommon.cardStylePadding}>
                                    <Text style={styles.statusViewTextLarge}>ONAY BEKLENİYOR</Text>
                                    {/*<Text style={styles.statusViewText}>Tahmini Aktivasyon Tarihi 15.12.2016</Text>*/}
                                </View>


                            </View>

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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUpResultWaiting);

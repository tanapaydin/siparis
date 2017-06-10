'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../actions/route";
import {Container, Header, Text, Button, View} from "native-base";
import theme from "../../themes/base-theme";
import styles from "./styles";
import HeaderContent from './../headerContent/';


var bkmThemeCommon = require('../../themes/base-style').bkmThemeCommon;

class emailSentInfo extends Component {

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
                    <Image source={require('../../../images/grad-bg.png')} style={styles.background_email}>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>

                        <View style={bkmThemeCommon.mainView}>

                            <View style={bkmThemeCommon.cardStyling}>

                                <View style={[bkmThemeCommon.cardSectionPadding]}>
                                    <Image source={require('../../../images/emailGonderildi.png')} style={styles.infoViewImageApproved}>
                                    </Image>
                                    <Text style={styles.statusViewTextLarge} textStyle={{color: '#000'}}>
                                        YENİ ŞİFRE OLUŞTURMAK İÇİN AKTİVASYON KODLARI E-POSTA ADRESİNE GÖNDERİLDİ.
                                    </Text>
                                </View>
                            </View>

                            <Text style={bkmThemeCommon.infoText}>
                                Şifre oluşturmak için e-posta adresine gönderilen kodları eklemen gerekiyor.
                            </Text>

                            <Button rounded
                                    onPress={() => this.pushNewRoute('rememberPinEnterCodes', {email: this.props.email})}
                                    style={styles.signupBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                Kodları ekle
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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(emailSentInfo);

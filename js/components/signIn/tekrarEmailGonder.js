'use strict';

import React, { Component } from "react";
import { Image, AsyncStorage, Alert } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Button, Text, View } from "native-base";
import theme from "../../themes/base-theme";
import { popRoute, pushNewRoute, resetRoute} from "../../actions/route";
import { login } from "../../actions/user";
import styles from "./styles";
import HeaderContent from '../headerContent/';
import pinchFetch from '../utility/pinchUtil';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';



class TekrarEmailGonder extends Component {

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

    onSubmit() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/send/verification/email/';
        pinchFetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.props.email
            })
        })
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                if (!responseData.bodyString) {
                    Alert.alert('Hata', 'Kütüphane hatası.');
                    return;
                }

                try {
                    let responseJson = JSON.parse(responseData.bodyString);

                    if (!responseJson) {
                        Alert.alert('Hata', 'Sunucu entegrasyon email doğrulama json hatası.');
                        return;
                    }

                    if (responseJson.responseCode == "MRKT0012") {
                        Alert.alert('Hata', 'Kullanıcı bulunamadı.');
                        return;
                    } else if (responseJson.responseCode != "MRKT0000") {
                        Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                        return;
                    }

                    Alert.alert('Bilgi', 'E-posta tekrar gönderildi.');

                    this.resetRoute();

                } catch(error) {
                    console.log('Sunucu email doğrulama entegrasyon hatası.');
                }

            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: /services/rest/user/verification/email/ + email: ', error);
                //this.pushNewRoute('errorApplication')
            })
            .done();
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/grad-bg.png')} style={styles.background}>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>

                        <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                            <View>
                                <Image source={require('../../../images/mail.png')} style={styles.sendEmailImage}>
                                </Image>

                                <Text style={styles.infoText}>
                                    Başvurun için e-postana gelen mesajı onaylaman bekleniyor.
                                </Text>
                            </View>

                            <Button transparent
                                    style={{alignSelf: 'center'}}
                                    onPress={() => this.onSubmit()}
                            >
                                <Text style={styles.helpBtns} >Onaylama e-postasını tekrar gönder</Text>
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
        resetRoute: () => dispatch(resetRoute()),
        login:(user) => dispatch(login(user))
    }
}

export default connect(null, bindAction)(TekrarEmailGonder);

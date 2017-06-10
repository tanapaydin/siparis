'use strict';

import React, {Component} from 'react';
import {Image, Platform, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import HeaderContent from './../headerContent/';
import {pushNewRoute} from '../../actions/route';
import {Container, Header, Text, Button, InputGroup, Input, View} from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';


class EnterEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    };

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    askDIFromMarket() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/di/ask/' + encodeURIComponent(this.state.email);
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responseData)=>responseData.json())
            .then((responseJson) => {

                //Alert.alert('/user/di/ask/email: ', responseJson.responseCode);

                if (responseJson.responseCode == "MRKT0000") {
                    //Do nothing. Zaten beklenen case bu.
                } else if (responseJson.responseCode == "MRKT0012") {
                    // MRKT0012: (IKINCI UYGULAMA SENARYOSU) "Kullanici bulunamadi"
                    // Kullanici katta da yok, chain'de de yok. Bu durumda surec sonlanacak.
                    Alert.alert('Hata', 'Kullanıcı bulunamadı.', [{text: 'Tamam'}]);
                    return;
                } else if (responseJson.responseCode == "MRKT0024") {
                    // MRKT0024: (IKINCI UYGULAMA SENARYOSU)
                    // Kullanici katta yok ama chain'de AKTIF olarak var.
                    Alert.alert('Hata', 'Bağlı olduğunuz ana uygulamaya giderek şifremi unuttum sürecini işletmeniz gerekiyor.', [{text: 'Tamam'}]);
                    return;
                } else if (responseJson.responseCode == "MRKT0025") {
                    // MRKT0025: (IKINCI UYGULAMA SENARYOSU) "Kullanici pasif"
                    // Kullanici katta yok ama chain'de PASIF olarak var.
                    // Bu durumda surec sonlanacak.
                    Alert.alert('Hata', 'Kullanıcı pasif.', [{text: 'Tamam'}]);
                    return;
                } else if (responseJson.message && responseJson.message.length > 0) {
                    Alert.alert('Hata', responseJson.message, [{text: 'Tamam'}]);
                    return;
                } else {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.', [{text: 'Tamam'}]);
                    return;
                }

                this.askRFromCoinGenerator();

            })
            .catch((error)=> {
                //Alert.alert('Hata', 'Sunucu hatasi: '.concat(error), [{text: 'Tamam'}]);
                console.log('Sunucu hatasi /di/ask/email: '.concat(error));
            })
            .done();
    }

    askRFromCoinGenerator() {
        let url = bkmTheme.serverAddressCoinGenerator + '/services/rest/user/prime/ask/' + encodeURIComponent(this.state.email);
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responseData)=>responseData.json())
            .then((responseJson) => {

                //Alert.alert('/user/prime/ask/email: ', responseJson.responseCode);

                if (responseJson.responseCode == "CG0000") {
                    //Do nothing. Zaten beklenen case bu.
                } else if (responseJson.message && responseJson.message.length > 0) {
                    Alert.alert('Hata', responseJson.message, [{text: 'Tamam'}]);
                    return;
                } else {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.', [{text: 'Tamam'}]);
                    return;
                }

                this.pushNewRoute('emailSentInfo', {email: this.state.email});
            })
            .catch((error)=> {
                //Alert.alert('Hata', 'Sunucu hatasi: '.concat(error), [{text: 'Tamam'}]);
                console.log('Sunucu hatasi /prime/ask/email: '.concat(error));
            })
            .done();
    }

    onSubmit() {
        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.

        if (!this.validateEmail(this.state.email)) {
            Alert.alert('Hata', 'E-posta hatalı.', [{text: 'Tamam'}]);
            return;
        }

        this.askDIFromMarket();
    };


    render() {
        return (
            <Container>
                <View theme={theme}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Image source={require('../../../images/grad-bg.png')} style={bkmThemeCommon.background}>

                            <Header style={{paddingLeft: 0}}>
                                <HeaderContent showBackButton={true} showLogo={true} />
                            </Header>

                            <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>


                                <View>
                                    <InputGroup style={styles.inputGrp}>
                                        <Input style={styles.input}
                                               keyboardType="email-address"
                                               returnKeyType="next"
                                               onSubmitEditing={() => this.onSubmit()}
                                               autoCapitalize="none"
                                               autoCorrect={false}
                                               autoFocus={true}
                                               placeholder='E-posta adresi'
                                               onChangeText={(email) => this.setState({email: email.trim()})}/>
                                    </InputGroup>

                                    <Button rounded
                                            onPress={() => this.onSubmit() }
                                            style={styles.signupBtn}
                                            textStyle={{color: bkmTheme.primaryButtonTextColor, fontSize: 17, fontWeight: '800'}}>
                                        E-posta gönder
                                    </Button>

                                    <Text style={[styles.infoText, {margin: 20}]}>
                                        Dijital kimlik bilgileriniz geri getirilirken yeniden şifre oluşturmanız gerekecek.
                                        Bunun için e-posta adresinize 2 farklı aktivasyon kodu gönderilecektir.
                                    </Text>
                                </View>


                            </View>

                        </Image>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops))
    }
}

export default connect(null, bindAction)(EnterEmail);

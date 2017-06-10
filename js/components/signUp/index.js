'use strict';

import React, { Component } from 'react';
import { Image, Platform, TouchableOpacity, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, popRoute } from '../../actions/route';
import { Container, Button, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';




class SignUp extends Component {

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

    popRoute() {
        this.props.popRoute();
    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    onSubmit() {
        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.

        let signObj = {email: this.state.email}
        this.pushNewRoute('signUp2', {signObj: signObj});
        return;



        if (!this.validateEmail(this.state.email)) {
            Alert.alert('Hata', 'E-posta hatalı.');
            return;
        }

        let url = bkmTheme.serverAddressMarket + '/services/rest/user/check/registration/allowed/' + encodeURIComponent(this.state.email);

        fetch(url)
            .then((responseData)=>responseData.json())
            .then((responseData) => {

                if (responseData.responseCode == "MRKT0009") {
                    //Do nothing. This is the majority of the cases.
                } else if (responseData.responseCode == "MRKT0010") {
                    //MRKT0010: Pasif ise kullanici uye olamaz
                    this.pushNewRoute('signUpNextUndefined');
                    return;
                } else if (responseData.responseCode == "MRKT0004") {
                    //Zaten AKTIF
                    Alert.alert('Hata', 'Kullanıcı sistemde aktif durumda. Giriş Yap tuşuna tıkladıktan sonra şifremi unuttum sürecini işletmeniz gerekiyor.');
                    return;
                } else if (responseData.responseCode == "MRKT0024") {
                    // MRKT0024: (IKINCI UYGULAMA SENARYOSU)
                    // Kullanici katta yok ama chain'de AKTIF olarak var
                    Alert.alert('Hata', 'Bağlı olduğunuz katınızın uygulamasına giderek şifremi unuttum sürecini işletmeniz gerekiyor.');
                    return;
                } else {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                    return;
                }

                let signObj = {email: this.state.email}
                this.pushNewRoute('signUpNext', {signObj: signObj})
            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI...');
                this.pushNewRoute('signUpNextUndefined')
            })
            .done();
    };

    onBackButtonPress() {
        //Not: SendMoney'deki TouchableWithoutFeedback isi gormuyor. O nedenle "Keyboard.dismiss();" ekledik buraya.
        Keyboard.dismiss();
        this.props.popRoute();
    }


    render() {
        return (
            <Container>
                <View theme={theme}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                            {/*<Header style={{paddingLeft: 0}}>*/}
                            {/*<HeaderContent showBackButton={true} showLogo={true} />*/}
                            {/*</Header>*/}


                            <View style={styles.signupContainer}>

                                <View style={styles.signUpLogoContainer}>
                                    <Image source={require('../../../images/launch-logo.png')} style={styles.signUpLogo} />
                                </View>

                                <View style={styles.statusBarContainer}>
                                    <View style={[styles.statusBar, {backgroundColor: bkmTheme.redColor, opacity: 1}]}></View>
                                    <View style={styles.statusBar}></View>
                                    <View style={styles.statusBar}></View>
                                    <View style={styles.statusBar}></View>
                                </View>

                                <View style={{}}>

                                    <TextInput
                                        accessibilityLabel="sendMoney_mesajText"
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Email'
                                        style={bkmThemeCommon.textInputForms}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        onChangeText={(mesaj) => this.setState({mesaj})}
                                        value={this.state.mesaj}
                                        maxLength={50}
                                    />

                                    <TextInput
                                        accessibilityLabel="sendMoney_mesajText"
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Input-1'
                                        style={bkmThemeCommon.textInputForms}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        onChangeText={(mesaj) => this.setState({mesaj})}
                                        value={this.state.mesaj}
                                        maxLength={50}
                                    />

                                    <TextInput
                                        accessibilityLabel="sendMoney_mesajText"
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Input-2'
                                        style={bkmThemeCommon.textInputForms}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        onChangeText={(mesaj) => this.setState({mesaj})}
                                        value={this.state.mesaj}
                                        maxLength={50}
                                    />
                                </View>



                                <View style={[bkmThemeCommon.gridColumnAffect, bkmThemeCommon.signUpBtnContainer]}>
                                    <Button rounded
                                            onPress={() => { this.onBackButtonPress(); }}
                                            style={styles.backBtn}
                                            textStyle={{color: '#4E4944', fontSize: 15, fontWeight: '500'}}>
                                        Geri
                                    </Button>

                                    <Button rounded
                                            onPress={() => { this.onSubmit(); }}
                                            style={styles.nextBtn}
                                            textStyle={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
                                        Devam et
                                    </Button>
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
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops)),
        popRoute:() => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp);

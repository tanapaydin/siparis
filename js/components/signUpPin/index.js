'use strict';

import React, {Component} from "react";
import {Image, AsyncStorage, Alert, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from "react-native";
import Keychain from 'react-native-keychain';
// import PushNotification from 'react-native-push-notification';
import {connect} from "react-redux";
import {popRoute, pushNewRoute, resetRoute} from "../../actions/route";
import {Container, Header, Text, Button, InputGroup, Input,Content, View} from "native-base";
import HeaderContent from '../headerContent/';
import theme from '../../themes/base-theme';
import styles from "./styles";
import ReactAES from 'react-native-aes-encryption';
import Utility from '../utility/';
import { bkmTheme } from '../../themes/base-style';

const RNFS = require('react-native-fs');


class SignUpPin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pin1: '',
            pin2: '',
            deviceToken: 'defaultToken',
            deviceOS: 'defaultOS'
        };
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

    justEncryptWithPin_DoNotSendToServer(signObj) {
        // Generate hash of Pin, encrypt digital identity and save:

        let key = this.state.pin1;

        //32 bit length--"d13feb0b7ed7395ccb96e3b603d24705"
        ReactAES.sha256(encodeURIComponent(key), 32)
            .then(result => {
                var hashOfPin = result;

                const digitalIdentity = JSON.stringify(signObj);
                var diStr = JSON.stringify(digitalIdentity);

                if (Platform.OS === 'android') {
                    ReactAES.encrypt(diStr, hashOfPin, "RHmr7oOkWR+Zhqg=")
                        .then( encryptedDIStr => this.saveIdentityToPhone(hashOfPin, encryptedDIStr) )
                        .catch( error => console.log('Encryption hatası: ', error) )
                } else {
                    // iPhone 4S ve 5 icin decryption yaparken patliyor. O nedenle butun iPhone'lar icin
                    // encryption ve decryption olaylarini kaldirdik. Zaten keychain'e yazdigimiz icin, kendisi
                    // sifrelenmis/guvenli oluyor.
                    this.saveIdentityToPhone(hashOfPin, diStr);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    saveIdentityToPhone(hashOfPin, digitalIdentity) {
        let server = bkmTheme.serverAddressCoinGenerator;
        let username = bkmTheme.marketName; // username is the customer origin.
        let passString = JSON.stringify({
            digitalIdentity: digitalIdentity,
            hashOfPin: hashOfPin
        });

        if (Platform.OS === 'android') {

            RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/Android/data/di.txt', passString, 'utf8')
                .then((success) => {
                    Alert.alert('Tebrikler', 'Kimlik bilgilerin başarıyla oluşturuldu. Oluşturduğun şifreyle uygulamaya giriş yapabilirsin.');
                    this.resetRoute();
                })
                .catch((err) => {
                    console.log(err.message);
                    Alert.alert('Hata', 'Kimlik bilgisi oluşturulurken hata oluştu.');
                });

        } else {

            Keychain.setInternetCredentials(server, username, passString)
                .then((result) => {
                    Alert.alert('Tebrikler', 'Kimlik bilgilerin başarıyla oluşturuldu. Oluşturduğun şifreyle uygulamaya giriş yapabilirsin.');
                    this.resetRoute();
                })
                .catch((error)=> {
                    Alert.alert('Hata', 'Kimlik bilgisi oluşturulurken hata oluştu.');
                })
                .done();

        }
    }

    validate() {
        if (this.state.pin1 != this.state.pin2) {
            Alert.alert('Hata', 'Girilen şifreler aynı olmalıdır.');
            this.setState({pin1: "", pin2: ""});
            return false;
        }

        if (this.state.pin1.length < 6) {
            Alert.alert('Hata', 'Lütfen 6-8 haneli bir şifre belirleyiniz.');
            this.setState({pin1: ""});
            this.setState({pin2: ""});
            return false;
        }

        return true;
    }

    onSubmit() {
        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.
        //Utility.showLoader();

        if (!this.validate()) {
            return;
        }

        let signObj = {
            name: this.props.signObj.name,
            surname: this.props.signObj.surname,
            email: this.props.signObj.email,
            phone: this.props.signObj.phone,
            avatarSource: this.props.signObj.avatarSource
        };

        if (!this.props.diRecovery) {
            //this.encryptSave(signObj);
            Utility.showLoader();
            setTimeout(()=> {
                Utility.encryptAndSave(signObj, this.state.pin1, this.pushNewRoute.bind(this));
            })

        } else {
            this.justEncryptWithPin_DoNotSendToServer(this.props.signObj);
        }
    }


    render() {

        // console.log('device token from redux is: ', this.props);

        return (
            <Container>
                <View theme={theme}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                            <Header style={{paddingLeft: 0}}>
                                <HeaderContent showBackButton={true} showLogo={true} />
                            </Header>

                            {/*Bu sekilde styles'dan almaya calistigimizda su hatayi veriyor:*/}
                            {/*Cannot read property 'padding' on number '205'*/}
                            {/*<Content contentContainerStyle={styles.mainView}>*/}

                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>

                                <View style={styles.signupContainer}>

                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input placeholder={'Şifre'}
                                               secureTextEntry={true}
                                               style={styles.input}
                                               onChangeText={(pin1) => this.setState({pin1: pin1})}
                                               value={this.state.pin1}
                                               maxLength={8}
                                               autoFocus={true}
                                        />
                                    </InputGroup>

                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input placeholder='Şifre (Tekrar)'
                                               secureTextEntry={true}
                                               style={styles.input}
                                               onChangeText={(pin2) => this.setState({pin2: pin2})}
                                               value={this.state.pin2}
                                               maxLength={8}
                                               returnKeyType="done"
                                               onSubmitEditing={() => this.onSubmit()}
                                        />
                                    </InputGroup>

                                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                                        <Text style={styles.infoText}>Dijital kimlik bilgilerin oluşturuldu ve
                                            telefonunda saklanacak. Güvenli olarak saklanabilmesi için bir
                                            şifre tanımlaman gerekiyor. Oluşturacağın şifre 6-8 karakter olmalı.
                                        </Text>

                                    </View>

                                    <Button rounded transparent block
                                            onPress={() => this.onSubmit() }
                                            style={styles.signupBtn}
                                            textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                        Şifre Oluştur
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
        popRoute: () => dispatch(popRoute()),
        resetRoute: () => dispatch(resetRoute())
    }
}

function mapStateToProps(state) {
    return {
        deviceToken: state.user.deviceToken,
        deviceOS: state.user.deviceOS,
    };
}

export default connect(mapStateToProps, bindAction)(SignUpPin);

'use strict';

import React, {Component} from "react";
import { Image, Text, AsyncStorage, Alert, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import Keychain from 'react-native-keychain';
import { connect } from "react-redux";
import { Container, Header, Button, InputGroup, Input, View } from "native-base";
import ReactAES from 'react-native-aes-encryption';
import RSAKey from 'react-native-rsa';
import { popRoute, pushNewRoute, resetRoute } from "../../actions/route";
import { login } from "../../actions/user";
import theme from "../../themes/base-theme";
import styles from "./styles";
import HeaderContent from '../headerContent/';
import Utility from '../utility/';
import pinchFetch from '../utility/pinchUtil';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';

const RNFS = require('react-native-fs');



class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pin: '',
            email: '',
            hashOfPin: '',
            privateKey: '',
            name: '',
            surname: '',
            avatarImage: '',
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

    componentWillMount() {

        if(Platform.OS === 'android') {

            RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Android/data/di.txt', 'utf8')
                .then((contents) => {
                    // console.log('signIn, set hashOfPin - readFile result: ', contents);

                    var value = JSON.parse(contents).hashOfPin;
                    if (value) {
                        this.setState({hashOfPin: value});
                    }

                })
                .catch((err) => {
                    console.log('signIn hashOfPin could not be accessed!', err.message, err.code);
                });

        } else {
            let server = bkmTheme.serverAddressCoinGenerator;
            Keychain.getInternetCredentials(server)
                .then((credentials) => {
                    // console.warn('hashOfPin - credentials are loaded for user: ', credentials.username, credentials.password);
                    // console.warn('hashOfPin - server is: ', server);

                    var value = JSON.parse(credentials.password).hashOfPin;
                    if (value) {
                        this.setState({hashOfPin: value});
                    }

                })
                .catch(function (error) {
                    console.warn('hashOfPin - keychain could not be accessed!', error);
                })
                .done();
        }



        AsyncStorage.getItem("numberOfInvalidPinEntryAttempts")
            .then((value) => {
                if (value) {
                    this.setState({numberOfInvalidPinEntryAttempts: value});
                }
            }).done();


    }

    getRandomAndThenToken() {
        //Kat server'dan random uretilen ve encrypt edilmis degeri al:
        let url = bkmTheme.serverAddressMarket + "/services/rest/auth/getRandom/" + encodeURIComponent(this.state.email);
        pinchFetch(url)
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
                        Alert.alert('Hata', 'Sunucu entegrasyon auth json hatası.');
                        return;
                    }

                    let encrypted = responseJson.source;

                    var privateKeyStr = JSON.stringify(this.state.privateKey);

                    //var privateKeyStr = "{\"n\":\"b3009c30acdc851e66635c45c193d790802c0d61138c14ba378fe1bbfb3c9bb73251e28d6ae9c8a997abafd4d87a78a6752e364028fa30d6908f5cba980dd8f3ff2ca182a008027e6cbb02d40c3fba64b255bb13885a091d03af7fb0b3b99cdadc17e7a755e576fcc1f540822ca170c4bcb9bf7ef72116b895b8f4aa3b160361\",\"e\":\"10001\",\"d\":\"7d3a6b0ade9434090d866bb25d77e9b22d09249f0a86d0a56a639d7fde870b4541cde99a17f6d02c5d707e4580e14570e6bfdab24e38a25c29ac322a546033ab6bcb0ead7d47d60be02a27594b6eea02a649966d06e038a944643560fbe07ce84148ecb5e217c5d772e1ea4b9db31722b947adb060d8b86ea1512c787f5885b1\",\"p\":\"df4493be40d31fad383fa0f511734535da39857996f048a6217e383efd930d97bb4664dc5d23f02134996aa28fa498a086dedc15e74be12db4d4b449575e83bd\",\"q\":\"cd3eb69f22addb771d0231b4709acfdcb9adb4ff67d0fe818ad18a0f76471e54b2d3be8dfbd59c758968bcef354662d7e5d17813dc0a11287c9426af5128e675\",\"dmp1\":\"762c5606dd48e1fb4d4a606756552cccd4349df13d72f100fdb9510c062b4f8680194249610324966ec0c53045d758f19e71570c40e068cf48674d0584b90201\",\"dmq1\":\"6d342f0ae0f2cc50c63882a5d53c29d8f15a81715b9591b4ef5daa2dabeb0f3255abe039bf82daaa97200956e56bbbefcfb1f247eecdd46f4c49af839c953c79\",\"coeff\":\"1c0d0a4bdb49605fa58d4284a9ae79049f7afcda48586662a17ac4f1af3c9ab980ba8a1c3ca64811af66f98a77184830773c6ec1f7fceecc956c9920e6778e90\"}";
                    //var privateKeyStr = "{\"n\":\"ddfbfa57084a544820738dd79a40c43cbe679d8f8ab066e5af8ca3bc42981c65e3220929af79bf3e62cd288302c3b320ac9008061cf0efb7367a991a1a3305239f0999ff0991e2c7106bfd8bec18a602be8aa452491d150116790d4303fc66f31a84714d32c3583e8d03e1ee7f46c87ee3407bb68f7b109bda32776124710a4b\",\"e\":\"10001\",\"d\":\"9a9a80445555cf555ca49e4966f96cb311b980971474bf7580ca66cf1b626d84d8a83fd174914a8cdcab1e680068e43d01725ee4430bdb28b31cb7bce23a5e7ca0743739ec0867483db57ac4ae8966078019f6474ff215172ec0f15ddabaa027d9754fa66fb1c25b5928e86ce6139de2599137898389a380b0d8b4057ff1ac81\",\"p\":\"f5d07138c5bafbbf984e5a188949f234b0217577d573c6e82f50c56f89eb2ddb9026fa918a0b38210803ebd78fa5aed96508f2704006851c1bcc6bc3826957fb\",\"q\":\"e72ec05ff207bf065d4643c167e36dbca8592106cad57ec5e56ddf274aa3585a0cb9b54de408f20755a3a26bd629cb345626bfc0b21abeb9efd61f8c3396f5f1\",\"dmp1\":\"b666637d530bba7ea30f90bf203064af3ffab3e5a5d7f1429cc97c979569936f96f9b578854c69ebe8bcb026160b45413f3d725864c9f1bfb7c8ea35faf11c3d\",\"dmq1\":\"8774dd435a8d2f608b46a06cb2728fd9faca3e8fbc495bfe986fc8513d6a785a4b1a85211e7c1f542cd9b4517b2b01e5a8950bc5dc95cf2b235c531fd31aa1\",\"coeff\":\"a7b96930ab08828f51226b70303f8626028d2d02749f77d1329e34df4ff06ca5e3a082536ebd7c2f16add727f08bf09e532e5ec7bffdf5a99752d16cb8d622e7\"}";
                    var rsa = new RSAKey();
                    rsa.setPrivateString(privateKeyStr);
                    var decryptedRandom = rsa.decrypt(encrypted); // decrypted == originText

                    //Kat server'da decrypt edilmis random'i geri gonder ve token'i al:
                    let url = bkmTheme.serverAddressMarket + "/services/rest/auth/createAuthToken/";
                    pinchFetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            //'Authorization': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            generatedRandom: decryptedRandom,
                            deviceIdentifier: this.props.deviceUuid,
                            deviceToken: this.props.deviceToken,
                            operatingSystem: this.props.deviceOS
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
                                    Alert.alert('Hata', 'Sunucudan token okuma hatası.');
                                }


                                if (!(responseJson.token)) {
                                    Alert.alert('Hata', 'Authentication hatası.', [{text: 'Tamam'}]);
                                    return;
                                }

                                let token = responseJson.token;

                                var user = {
                                    isLoggedIn: true,
                                    userEmail: this.state.email,
                                    token: token,
                                    hashOfPin: this.state.hashOfPin,
                                    privateKey: this.state.privateKey,
                                    name: this.state.name,
                                    surname: this.state.surname,
                                    avatarImage: this.state.avatarImage,
                                };

                                // console.log('signIn user: ', user); // this is important while debug to access token.
                                this.props.login(user);
                                this.pushNewRoute('account');

                            } catch(error) {
                                console.log('responseJson yapamadi... Hata: /services/rest/auth/createAuthToken/: ', error);
                            }

                        })
                        .catch((error)=> {
                            console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: /services/rest/auth/createAuthToken/: ', error.message);
                            this.pushNewRoute('errorApplication')
                        })
                } catch(error) {
                    console.log('Sunucu logout entegrasyon hatası.');
                }

            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: /services/rest/auth/getRandom/ + email: ', error.message);
                this.pushNewRoute('errorApplication')
            })
            .done();
    }

    doAutomaticRegistration(signObj) {
        let deviceID = this.props.deviceToken;
        let deviceOS = this.props.deviceOS;
        Utility.doAutomaticRegistrationFromAnotherApp(signObj, this.resetRoute.bind(this), deviceID, deviceOS);
    }

    saveNumberOfInvalidPinEntryAttempts(numberOfInvalidPinEntryAttempts) {
        if (!numberOfInvalidPinEntryAttempts) {
            numberOfInvalidPinEntryAttempts = 0;
        }

        this.setState({numberOfInvalidPinEntryAttempts: numberOfInvalidPinEntryAttempts});

        // Uygulamayi kapatip acabilir. O yuzden sadece state'e yazmak yeterli olmuyor. Asynch'e yazmak gerekiyor:
        AsyncStorage.setItem("numberOfInvalidPinEntryAttempts", numberOfInvalidPinEntryAttempts.toString());
    }

    checkStatus(digitalIdentity) {
        let signObj = JSON.parse(JSON.parse(digitalIdentity));

        if (!signObj) {
            Alert.alert('Hata', 'Bilgi decryption hatası.', [{text: 'Tamam'}]);
            return;
        }

        this.setState({
            email: signObj.email,
            privateKey: signObj.privateKey,
            name: signObj.name,
            surname: signObj.surname,
            avatarImage: signObj.avatarSource ? signObj.avatarSource.data : '',
        });

        let url = bkmTheme.serverAddressMarket + '/services/rest/user/check/registration/status/' + encodeURIComponent(this.state.email);
        pinchFetch(url)
            .then( (responseData) => {

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
                        Alert.alert('Hata', 'Sunucu entegrasyon status json hatası.');
                        return;
                    }

                    if (responseJson.responseCode == "MRKT0004") {
                        //ACTIVE:
                        //Do nothing in this if-block. This is the expected scenario for majority of the cases.

                    } else if (responseJson.responseCode == "MRKT0005") {
                        //PENDING_APPROVAL:
                        this.pushNewRoute('signUpResultWaiting');
                        return;

                    } else if (responseJson.responseCode == "MRKT0007") {
                        //REJECTED:
                        let signObj = {
                            email: this.state.email,
                            redNedeni: responseJson.message
                        };
                        this.pushNewRoute('signUpResultActivationRejected', {signObj: signObj});
                        return;

                    } else if (responseJson.responseCode == "MRKT0011") {
                        //PENDING_USER_EMAIL_VALIDATION:
                        this.pushNewRoute('tekrarEmailGonder', {email: this.state.email});
                        return;

                    } else if (responseJson.responseCode == "MRKT0012") {
                        // MRKT0012: (IKINCI UYGULAMA SENARYOSU)
                        // Kullanici katta da yok, chain'de de yok.
                        // (Kullanici henuz emaili onaylamamistir, ya da kat-admin tarafindan henuz onaylanmamistir.)
                        Alert.alert('Hata', 'Bağlı olduğunuz ana uygulamaya giderek üyelik sürecini tamamlamanız gerekiyor.', [{text: 'Tamam'}]);
                        return;

                    } else if (responseJson.responseCode == "MRKT0024") {
                        // MRKT0024: (IKINCI UYGULAMA SENARYOSU)
                        // Kullanici katta yok ama chain'de AKTIF olarak var.
                        // /register servisini cagirip, otomatik uyelik yapacagiz.
                        // (Bu asamada kullanicidan onay alinabilir. Onayliyor musunuz? Onaylamazsa cikis yap.)
                        // Yeni katta statusu direkt AKTIF olarak register ediliyor, onay bekleme sureclerine girmiyor.

                        Alert.alert('Bilgi', 'Bu uygulamaya kayıt olmak için ad, soyad, fotoğraf, e-posta ve telefon bilgileriniz firma ile paylaşılacaktır. Onay veriyor musunuz?',
                            [
                                {
                                    text: 'Tamam',
                                    onPress: () => this.doAutomaticRegistration(signObj)
                                },
                                {text: 'İptal'},
                            ]);

                        return;

                    } else if (responseJson.responseCode == "MRKT0025") {
                        // MRKT0025: (IKINCI UYGULAMA SENARYOSU)
                        // Kullanici katta yok ama chain'de PASIF olarak var.
                        // Bu durumda surec sonlanacak, adami register yapmiyoruz.
                        Alert.alert('Hata', 'Kullanıcı pasif.', [{text: 'Tamam'}]);
                        return;

                    } else if (responseJson.message && responseJson.message.length > 0) {
                        Alert.alert('Hata', responseJson.message, [{text: 'Tamam'}]);
                        return;

                    } else {
                        //Beklenmeyen bir cevap geldi:
                        Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.', [{text: 'Tamam'}]);
                        return;
                    }

                    this.getRandomAndThenToken();

                } catch(error) {
                    console.log('Sunucu status entegrasyon hatası.');
                }
            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: registration/status/ + email: ', error.message);
                //this.pushNewRoute('errorApplication')
            });
    }

    decryptIdentityAndCheckStatus(digitalIdentity, hashOfPin) {

        if (Platform.OS === 'android') {
            ReactAES.decrypt(digitalIdentity, hashOfPin, "RHmr7oOkWR+Zhqg=")
                .then(decryptedValue => this.checkStatus(decryptedValue) )
                .catch(error => console.log('Decryption hatası: ', error) )
        } else {
            // iPhone 4S ve 5 icin decryption yaparken patliyor. O nedenle butun iPhone'lar icin
            // encryption ve decryption olaylarini kaldirdik. Zaten keychain'e yazdigimiz icin, kendisi
            // sifrelenmis/guvenli oluyor.
            this.checkStatus(digitalIdentity);
        }
    }

    onSubmit() {

        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.

        if (!this.state.hashOfPin || this.state.hashOfPin.length === 0) {
            Alert.alert('Şifre hatalı.', [{text: 'Tamam'}]);
            return;
        }

        let key = this.state.pin;

        //32 bit length--"d13feb0b7ed7395ccb96e3b603d24705"
        ReactAES.sha256(encodeURIComponent(key), 32).then(
            hashOfPin => {

                if (hashOfPin != this.state.hashOfPin) {
                    if (this.state.numberOfInvalidPinEntryAttempts && this.state.numberOfInvalidPinEntryAttempts > 0) {
                        if (this.state.numberOfInvalidPinEntryAttempts >= 2) {
                            //Alert.alert('Şifre hatalı.', '3 defa hatalı şifre girdin. Dijital kimlik bilgilerin telefondan siliniyor.', [{text: 'Tamam'}]);
                            this.saveNumberOfInvalidPinEntryAttempts(0);
                            Utility.kimlikBilgilerimiSil(this.props.userEmail, this.state.deviceToken, this.resetRoute.bind(this), this.props.login.bind(this));

                        } else if (this.state.numberOfInvalidPinEntryAttempts == 1) {
                            this.saveNumberOfInvalidPinEntryAttempts(2);
                            Alert.alert('Şifre hatalı.', '2 defa hatalı şifre girdin. 3 hatalı girişten sonra dijital kimlik bilgilerin telefondan silinecek.', [{text: 'Tamam'}]);
                        }

                    } else {
                        this.saveNumberOfInvalidPinEntryAttempts(1);
                        Alert.alert('Şifre hatalı.', '3 hatalı girişten sonra dijital kimlik bilgilerin telefondan silinecek.', [{text: 'Tamam'}]);
                    }

                    return;

                } else {
                    //Sifre dogru. Daha once hatali sifre girme olasiligina karsi, hataliSifreSayisi bilgisini sifir yap:
                    this.saveNumberOfInvalidPinEntryAttempts(0);
                }

                if (Platform.OS === 'android') {

                    RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Android/data/di.txt', 'utf8')
                        .then((contents) => {

                            // console.log('singIn - readFile result: ', contents);
                            var value = JSON.parse(contents).digitalIdentity;
                            // console.log('singIn - readFile value: ', value);

                            if (!value) {
                                Alert.alert('Hata', 'Bilgi okuma hatası.', [{text: 'Tamam'}]);
                                return;
                            }

                            this.decryptIdentityAndCheckStatus(value, hashOfPin);
                        })
                        .catch((err) => {
                            console.log(err.message, err.code);

                            // DI icin file yokken read yapmaya calisirsak sifre hatirlatma asamasini baslat.
                            // console.log('login, rememberPinEnterEmail, keychain could not be accessed!');
                            this.pushNewRoute('rememberPinEnterEmail');

                        });

                } else {

                    let server = bkmTheme.serverAddressCoinGenerator;
                    Keychain.getInternetCredentials(server)
                        .then((credentials) => {

                            var value = JSON.parse(credentials.password).digitalIdentity;

                            if (!value) {
                                Alert.alert('Hata', 'Bilgi okuma hatası.', [{text: 'Tamam'}]);
                                return;
                            }

                            this.decryptIdentityAndCheckStatus(value, hashOfPin);
                        })
                        .catch(function (error) {
                            console.warn('keychain could not be accessed!', error);
                        });
                }
            })
            .catch(error=> {
                //ReactAES sha256 hatasi:
                console.log('Encryption hatasi: ', error);
            });
    }


    render() {
        return (
            <Container>
                <View theme={theme}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                            <Header style={{paddingLeft: 0}}>
                                <HeaderContent showBackButton={true} showLogo={true} />
                            </Header>

                            <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                                <View>
                                    <Image source={require('../../../images/locked-profile.png')} style={styles.signInImage} />

                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input placeholder='Şifre' secureTextEntry={true} style={styles.input}
                                               onChangeText={(pin) => this.setState({pin})}
                                               returnKeyType="go"
                                               onSubmitEditing={() => this.onSubmit()}
                                               value={this.state.pin1}
                                               autoFocus={true}
                                               maxLength={8}
                                        />
                                    </InputGroup>

                                    <Button rounded transparent block
                                            onPress={() => this.onSubmit()}
                                            style={styles.signupBtn}
                                            textStyle={{color: bkmTheme.primaryButtonTextColor, fontSize: 17, fontWeight: '800'}}>
                                        Giriş yap
                                    </Button>

                                    <Button transparent
                                            style={[bkmThemeCommon.marginGeneric, {alignSelf: 'center'}]}
                                            onPress={() => this.pushNewRoute('rememberPinEnterEmail')}
                                    >
                                        <Text style={styles.helpBtns}>Şifremi unuttum</Text>
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
        resetRoute: () => dispatch(resetRoute()),
        login: (user) => dispatch(login(user))
    }
}

function mapStateToProps(state) {
    return {
        deviceUuid: state.user.deviceUuid,
        deviceToken: state.user.deviceToken,
        deviceOS: state.user.deviceOS,
    };
}

export default connect(mapStateToProps, bindAction)(SignIn);

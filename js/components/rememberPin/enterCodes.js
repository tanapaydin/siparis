'use strict';

import React, {Component} from "react";
import {Image, AsyncStorage, Alert, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../actions/route";
import {Container, Header, Text, Button, InputGroup, Input, View} from "native-base";
import HeaderContent from '../headerContent/';
import theme from '../../themes/base-theme';
import styles from "./styles";
import {bkmTheme} from '../../themes/base-style';


class enterCodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kodA: '',
            kodB: ''
        };
    }


    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    popRoute() {
        this.props.popRoute();
    }

    // Convert a hex string to a byte array
    hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    objectToByte(obj) {
        var bytes = [];
        for (var i = 0; i < obj.length; ++i) {
            bytes.push(obj.charCodeAt(i));
        }
        return bytes;
    }

    byteToObject(bytes) {
        // const binArrayToString = array => array.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
        // return binArrayToString;
        return String.fromCharCode.apply(null, bytes);
        // for (var i = 0; i < bytes.length; ++i) {
        //     bytes.push(bytes[i].charCodeAt(i));
        // }
    }

    // Convert a byte array to a hex string
    bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    getPrivateKeyJson_FromRStr_And_PrivateKeyPrime(rStr, privateKeyPrimeStr) {
        // Burada yapilan: bize verilen rStr ve privateKeyPrimeJson degerlerini
        // XOR isleminden gecirip privateKey elde etmek.

        var privateKeyPrimeJson = JSON.parse(privateKeyPrimeStr);
        var rJson = JSON.parse(rStr);

        var privateKeyPrime_n_bytes = this.objectToByte(privateKeyPrimeJson.n);
        var privateKeyPrime_e_bytes = this.objectToByte(privateKeyPrimeJson.e);
        var privateKeyPrime_d_bytes = this.objectToByte(privateKeyPrimeJson.d);
        var privateKeyPrime_p_bytes = this.objectToByte(privateKeyPrimeJson.p);
        var privateKeyPrime_q_bytes = this.objectToByte(privateKeyPrimeJson.q);
        var privateKeyPrime_dmp1_bytes = this.objectToByte(privateKeyPrimeJson.dmp1);
        var privateKeyPrime_dmq1_bytes = this.objectToByte(privateKeyPrimeJson.dmq1);
        var privateKeyPrime_coeff_bytes = this.objectToByte(privateKeyPrimeJson.coeff);

        var r_n_bytes = this.objectToByte(rJson.n);
        var r_e_bytes = this.objectToByte(rJson.e);
        var r_d_bytes = this.objectToByte(rJson.d);
        var r_p_bytes = this.objectToByte(rJson.p);
        var r_q_bytes = this.objectToByte(rJson.q);
        var r_dmp1_bytes = this.objectToByte(rJson.dmp1);
        var r_dmq1_bytes = this.objectToByte(rJson.dmq1);
        var r_coeff_bytes = this.objectToByte(rJson.coeff);

        var privateKey_n_bytes = [];
        var privateKey_e_bytes = [];
        var privateKey_d_bytes = [];
        var privateKey_p_bytes = [];
        var privateKey_q_bytes = [];
        var privateKey_dmp1_bytes = [];
        var privateKey_dmq1_bytes = [];
        var privateKey_coeff_bytes = [];

        for (let i = 0; i < privateKeyPrime_n_bytes.length; i++) {
            privateKey_n_bytes.push(privateKeyPrime_n_bytes[i] ^ r_n_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_e_bytes.length; i++) {
            privateKey_e_bytes.push(privateKeyPrime_e_bytes[i] ^ r_e_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_d_bytes.length; i++) {
            privateKey_d_bytes.push(privateKeyPrime_d_bytes[i] ^ r_d_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_p_bytes.length; i++) {
            privateKey_p_bytes.push(privateKeyPrime_p_bytes[i] ^ r_p_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_q_bytes.length; i++) {
            privateKey_q_bytes.push(privateKeyPrime_q_bytes[i] ^ r_q_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_dmp1_bytes.length; i++) {
            privateKey_dmp1_bytes.push(privateKeyPrime_dmp1_bytes[i] ^ r_dmp1_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_dmq1_bytes.length; i++) {
            privateKey_dmq1_bytes.push(privateKeyPrime_dmq1_bytes[i] ^ r_dmq1_bytes[i]);
        }
        for (let i = 0; i < privateKeyPrime_coeff_bytes.length; i++) {
            privateKey_coeff_bytes.push(privateKeyPrime_coeff_bytes[i] ^ r_coeff_bytes[i]);
        }

        var privateKeyJson = {
            'n': this.byteToObject(privateKey_n_bytes),
            'e': this.byteToObject(privateKey_e_bytes),
            'd': this.byteToObject(privateKey_d_bytes),
            'p': this.byteToObject(privateKey_p_bytes),
            'q': this.byteToObject(privateKey_q_bytes),
            'dmp1': this.byteToObject(privateKey_dmp1_bytes),
            'dmq1': this.byteToObject(privateKey_dmq1_bytes),
            'coeff': this.byteToObject(privateKey_coeff_bytes),
        };

        return privateKeyJson;
    }


    getDIFromMarket(rStr) {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/di/get/' + encodeURIComponent(this.props.email) + '/' + this.state.kodB;

        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responseData)=>responseData.json())
            .then((responseJson) => {
                if (responseJson.responseCode == "MRKT0001") {
                    Alert.alert('Hata', 'Sunucu genel hata.');
                    return;
                } else if (responseJson.responseCode == "MRKT0006") {
                    Alert.alert('Hata', 'Kullanıcı pasif.');
                    return;
                } else if (responseJson.responseCode == "MRKT0012") {
                    Alert.alert('Hata', 'Kullanıcı bulunamadı.');
                    return;
                } else if (responseJson.responseCode == "MRKT0022") {
                    Alert.alert('Hata', 'Kullanıcı aday statüsünde.');
                    return;
                } else if (responseJson.responseCode != "MRKT0000") {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                    return;
                } else if (!responseJson.source || responseJson.source.length == 0) {
                    Alert.alert('Hata', 'Sunucudan beklenen cevap gelmedi.');
                    return;
                }

                let source = responseJson.source;
                let privateKeyPrimeStr = source.pkxork;
                if (!privateKeyPrimeStr || privateKeyPrimeStr.length <= 0) {
                    Alert.alert('Hata', 'Sunucudan eksik bilgi geldi.');
                    return;
                }

                let privateKeyJson = this.getPrivateKeyJson_FromRStr_And_PrivateKeyPrime(rStr, privateKeyPrimeStr);

                var diObj = {
                    name: source.name,
                    surname: source.surname,
                    email: source.email,
                    phone: source.phone,
                    publicKey_n: source.publicKey,
                    publicKeyExponent: source.publicKeyExponent,
                    pkxork: source.pkxork, //PrimaryKeyXORed bilgisi Kat'a gidiyor
                    avatarSource: {
                        uri: 'empty String',
                        isStatic: true,
                        data: source.selfieByteArray
                    },
                    privateKey: privateKeyJson
                };

                // const digitalIdentity = JSON.stringify(diObj);
                // var diStr = JSON.stringify(digitalIdentity);
                // AsyncStorage.setItem("digitalIdentity", diStr);

                this.pushNewRoute('signUpPin', {signObj: diObj, diRecovery: true});
            })
            .catch((error)=> {
                Alert.alert('Hata', 'Sunucu hatası: '.concat(error));
            })
            .done();
    }

    getRFromCoinGenerator() {
        let url = bkmTheme.serverAddressCoinGenerator + '/services/rest/user/prime/get/' + encodeURIComponent(this.props.email) + '/' + this.state.kodA;

        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responseData)=>responseData.json())
            .then((responseJson) => {

                if (responseJson.responseCode == "CG0001") {
                    Alert.alert('Hata', 'Sunucu genel hata.');
                    return;
                } else if (responseJson.responseCode == "CG0003") {
                    Alert.alert('Hata', 'Kullanıcı bulunamadı.');
                    return;
                } else if (responseJson.responseCode != "CG0000") {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                    return;
                } else if (!responseJson.source || responseJson.source.length == 0) {
                    Alert.alert('Hata', 'Sunucudan beklenen cevap gelmedi.');
                    return;
                }

                let rStr = responseJson.source.r;
                this.getDIFromMarket(rStr);
            })
            .catch((error)=> {
                Alert.alert('Hata', 'Sunucu hatası: '.concat(error));
            })
            .done();
    }

    onSubmit() {
        if (this.state.kodA === '' || this.state.kodB === '') {
            Alert.alert('Hata', 'Lütfen kodları eksiksiz giriniz.');
        }
        else {
            this.getRFromCoinGenerator();
        }
    };


    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>


                        <View style={styles.signupContainer}>

                            <InputGroup borderType='rounded' style={styles.inputGrp}>
                                <Input placeholder='Kod A'
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       style={styles.input}
                                       onChangeText={(kod1) => this.setState({kodA: kod1.trim()})}
                                       value={this.state.kodA}
                                />
                            </InputGroup>

                            <InputGroup borderType='rounded' style={styles.inputGrp}>
                                <Input placeholder = 'Kod B'
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       style={styles.input}
                                       onChangeText={(kod2) => this.setState({kodB: kod2.trim()})}
                                       value={this.state.kodB}
                                />
                            </InputGroup>

                            <Text style={styles.infoText}>
                                Yeni şifre oluşturabilmek için e-posta adresinize gönderilen kodları eklemeniz gerekir.
                            </Text>


                            <Button rounded transparent block
                                    onPress={() => { this.onSubmit(); }}
                                    style={styles.signupBtn}
                                    textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                Kullanıcıyı yeniden oluştur
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

export default connect(null, bindAction)(enterCodes);

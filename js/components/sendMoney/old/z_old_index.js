'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, replaceRoute } from '../../../actions/route';
import { Container, Content, Header, Text, Button, Icon, View } from 'native-base';
import HeaderContent from './../headerContent/';
import theme from '../../../themes/base-theme';
import styles from '../styles';
import Modal from 'react-native-simple-modal';
import Gonderilen from './z_old_gonderilen';
import Miktar from './z_old_miktar';
import Mesaj from './z_old_mesaj';
import AppEventRegistery from '../../utility/AppEventRegistery';
import { bkmTheme, bkmThemeCommon } from '../../../themes/base-style';


class Z_old_SendMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openGonderilenModal: false,
            openMiktarModal: false,
            openMesajModal: false,
            hesap: 'Birikim Hesabı',
            bakiyeObj: {integerPart: 0, fractionalPart: 0},
            bakiyeMiktar: 0.0,
            gonderilen: {
                email: ''
            },
            miktar: '0',
            tamSayi: '',
            ondalik: '',
            mesaj: ''
        };

        // Not: setMiktar function'i child component'e props olarak verdigimiz icin, bind(this) yapmak gerekiyor.
        // Bunu ister burada constructor icinde 1 seferde yapabiliyoruz. Istersek de props olarak verdigimiz yerde
        // function'in sonunda bind(this) ekliyoruz:
        //
        //this.setMiktar = this.setMiktar.bind(this);

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }
    }

    _fetchUserBalance() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/balance/';
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {

                if (!responseData) {
                    Alert.alert('Hata', 'Sunucudan bakiye okuma hatası.');
                }

                let bakiyeObj = {integerPart: responseData.integerPart, fractionalPart: responseData.fractionalPart};
                let bakiyeMiktar = bakiyeObj.integerPart ?
                    bakiyeObj.integerPart.toString().concat('.', bakiyeObj.fractionalPart) :
                    0.0;

                this.setState({bakiyeObj: bakiyeObj, bakiyeMiktar: bakiyeMiktar});
            })
            .catch((error) => {
                Alert.alert('Hata', 'Sunucu hatasi: '.concat(error));
            })
            .done();

    }

    componentWillMount() {

        this._fetchUserBalance();

        AsyncStorage.getItem("sonGonderilenEmail1").then((value) => {
            this.setState({"sonGonderilenEmail1": value});
        }).done();

        AsyncStorage.getItem("sonGonderilenEmail2").then((value) => {
            this.setState({"sonGonderilenEmail2": value});
        }).done();

        AsyncStorage.getItem("sonGonderilenEmail3").then((value) => {
            this.setState({"sonGonderilenEmail3": value});
        }).done();

        AsyncStorage.getItem("sonGonderilenEmail4").then((value) => {
            this.setState({"sonGonderilenEmail4": value});
        }).done();
    }


    // NOT: "AppEventRegistery.dispatchPageEvent" sayesinde her modal acip
    // kapandiginda timer resetlenmesi icin event fire ediyoruz.

    modalGonderilenO() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openGonderilenModal: true});
    }
    modalMiktarO() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openMiktarModal: true});
    }
    modalMesajO() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openMesajModal: true});
    }

    modalGonderilenX() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openGonderilenModal: false});
    }
    modalMiktarX() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openMiktarModal: false});
    }
    modalMesajX() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openMesajModal: false});
    }



    setGonderilen(gonderilen) {
        this.setState({
            gonderilen: {
                email: gonderilen ? gonderilen.email : ''
            }
        });
    }

    setMiktar(tamSayi, ondalik) {
        let tamTemp = tamSayi ? tamSayi : '0';
        let ondalikTemp = ondalik ? ondalik : '0';
        let miktarTemp = tamTemp.toString().concat('.', ondalikTemp); //Dikkat: Burada nokta kullaniyoruz, gosterirken virgul.
        if (tamSayi) {
            tamSayi = tamSayi.toString().replace(/\./g, '');
        }
        this.setState({
            tamSayi: tamSayi,
            ondalik: ondalik,
            miktar: miktarTemp
        });
    }

    setMesaj(mesaj) {
        this.setState({mesaj: mesaj});
    }


    popRoute() {
        this.props.popRoute();
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    onSubmit() {
        if (!this.state.gonderilen || !this.state.gonderilen.email || this.state.gonderilen.email.length <= 0) {
            Alert.alert('Hata', 'Alıcı e-posta adresini girmedin.');
            return;
        } else if (this.state.gonderilen.email == this.props.user.userEmail){
            Alert.alert('Hata', 'Kullanıcı kendisine transfer yapamaz.');
            return;
        } else if (!this.state.miktar || parseFloat(this.state.miktar) <= 0.0){
            Alert.alert('Hata', 'Göndermek istediğin keklik miktarını girmedin.');
            return;
        } else if (parseFloat(this.state.miktar) > parseFloat(this.state.bakiyeMiktar)) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            return;
        }
        // else if (!this.state.mesaj || this.state.mesaj.length <= 0) {
        //     Alert.alert('Hata', 'Lüten bilgi mesajı giriniz.');
        //     return;
        // }

        this.sendMoneyToServer();
    }

    sendMoneyToServer() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/merchandise/transfer/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            },
            body: JSON.stringify({ // JSON value 'null' of type NSNull cannot be converted to NSString hatasi aliniyor.
                //fromEmail: this.props.user.userEmail,
                toEmail: this.state.gonderilen ? this.state.gonderilen.email : '',
                credit: {
                    integerPart: this.state.tamSayi,
                    fractionalPart: this.state.ondalik
                },
                message: this.state.mesaj
            })
        })
            .then((responseData)=> responseData.json())
            .then((responseData) => {

                if (!responseData || responseData.length <= 0) {
                    Alert.alert('Hata', 'Sunucu entegresyon hatası.');
                    return;
                // } else if ("MRKT0012" == responseData.responseCode) {
                //     Alert.alert('Hata', 'Kullanıcı bulunamadı.');
                //     return;
                } else if ("MRKT0000" != responseData.responseCode) {
                    this.failureSayfasiniAc(responseData);
                    return;
                }

                this.successSayfasiniAc();
            })
            .catch((error)=> {
                let networkHatasi = {responseCode: -99, message: 'Network hatası: '.concat(error)};
                this.failureSayfasiniAc(networkHatasi)
            })
            .done();
    }

    failureSayfasiniAc(error) {
        this.replaceRoute('sendMoneyFailure', {
            gonderilen: this.state.gonderilen,
            gosterilecekMiktar: this.showMiktar(),
            mesaj: this.state.mesaj,
            hata: ''.concat(error.message)
        });
    }

    successSayfasiniAc() {
        this.saveData();

        this.replaceRoute('sendMoneySuccess', {
            gonderilen: this.state.gonderilen,
            gosterilecekMiktar: this.showMiktar(),
            mesaj: this.state.mesaj
        });
    }

    saveData() {
        try {
            if (this.state.gonderilen && this.state.gonderilen.email) {
                if (this.state.gonderilen.email != this.state.sonGonderilenEmail1
                    && this.state.gonderilen.email != this.state.sonGonderilenEmail2
                    && this.state.gonderilen.email != this.state.sonGonderilenEmail3
                    && this.state.gonderilen.email != this.state.sonGonderilenEmail4) {

                    if (this.state.gonderilen && this.state.gonderilen.email) {
                        AsyncStorage.setItem("sonGonderilenEmail1", this.state.gonderilen.email);
                    }
                    if (this.state.sonGonderilenEmail1) {
                        AsyncStorage.setItem("sonGonderilenEmail2", this.state.sonGonderilenEmail1);
                    }
                    if (this.state.sonGonderilenEmail2) {
                        AsyncStorage.setItem("sonGonderilenEmail3", this.state.sonGonderilenEmail2);
                    }
                    if (this.state.sonGonderilenEmail3) {
                        AsyncStorage.setItem("sonGonderilenEmail4", this.state.sonGonderilenEmail3);
                    }
                }
            }

        } catch (error) {
            console.log('E-posta storage hatası.');
        }
    }

    tamSayiyaGerekiyorsaNoktaEkle(sayi) {
        // if (!sayi || sayi.length <= 3) {
        //     return sayi;
        // }
        //
        // var processed = '';
        // var counter = 0;
        // for (let i = sayi.length - 1; i >= 0; --i) {
        //     if (counter > 0 && counter % 3 == 0) {
        //         processed = '.'.concat(processed);
        //     }
        //     processed = sayi.charAt(i).concat(processed);
        //     ++counter;
        // }
        // return processed;

        if (sayi) {
            sayi = sayi.toString().replace(/\./g, ''); //Eger varsa once noktalari kaldir.
        }
        return sayi.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    showMiktar() {
        if (this.state.tamSayi == '' && this.state.ondalik == '') {
            return '';
        }

        let tamSayiTemp = this.state.tamSayi;
        let ondalikTemp = this.state.ondalik;

        //En az biri null degil:
        if (this.state.tamSayi == '') {
            tamSayiTemp = '0';
        } else if (this.state.ondalik == '') {
            ondalikTemp = '00';
        }

        tamSayiTemp = this.tamSayiyaGerekiyorsaNoktaEkle(tamSayiTemp);
        ondalikTemp = ondalikTemp.length < 2 && ondalikTemp <= 9 ? ondalikTemp + '0' : ondalikTemp;

        return tamSayiTemp.toString().concat(',', ondalikTemp);
    }

    bakiyeToString() {
        if (!this.state.bakiyeObj) {
            return '';
        } else if (this.state.bakiyeObj.integerPart == '' && this.state.bakiyeObj.fractionalPart == '') {
            return '';
        }

        let tamSayiTemp = this.state.bakiyeObj.integerPart;
        let ondalikTemp = this.state.bakiyeObj.fractionalPart;

        //En az biri null degil:
        if (this.state.bakiyeObj.integerPart == '') {
            tamSayiTemp = '0';
        } else if (this.state.bakiyeObj.fractionalPart == '') {
            ondalikTemp = '00';
        }

        tamSayiTemp = this.tamSayiyaGerekiyorsaNoktaEkle(tamSayiTemp);
        ondalikTemp = ondalikTemp.length < 2 && ondalikTemp <= 9 ? ondalikTemp + '0' : ondalikTemp;

        return tamSayiTemp.toString().concat(',', ondalikTemp);
    }


    render() {
        //Yellow Warning'leri kaldiriyor:
        //console.disableYellowBox = true;

        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/basic-grad-bg@2x.png')} style={bkmThemeCommon.container} >

                        <Header>
                            <HeaderContent showHamburger={true} headerText={bkmTheme.katIsmi.concat(" | Keklik Transferi")} />
                        </Header>

                        <Content theme={theme}>
                            <View style={bkmThemeCommon.cardStyling}>
                                <View style={[bkmThemeCommon.cardSectionPadding, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                                    <Text style={bkmThemeCommon.cardTitle}>BAKİYE:</Text>
                                    <Text style={bkmThemeCommon.cardTitle}>{this.bakiyeToString()} Keklik</Text>
                                </View>

                                {/*<View style={bkmThemeCommon.cardSectionPaddingLite}>*/}
                                    {/*<Text style={bkmThemeCommon.cardSectionColor}>*/}
                                        {/*{this.bakiyeToString()} Keklik*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                            </View>


                            <View style={bkmThemeCommon.cardStyling}>
                                <TouchableOpacity accessibilityLabel="sendMoney_toButton" onPress={() => this.modalGonderilenO()}>
                                    <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                                        <View style={bkmThemeCommon.gridColumnAffect}>
                                            <Text style={bkmThemeCommon.cardTitle}>KİME</Text>
                                            <Text style={styles.rightArrowIconContainer}>
                                                <Icon name='ios-arrow-forward' style={styles.rightArrowIcon} />
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={bkmThemeCommon.cardSectionPaddingLite}>
                                        <Text style={bkmThemeCommon.cardSectionColor}>{this.state.gonderilen ? this.state.gonderilen.email : ''}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={bkmThemeCommon.cardStyling}>
                                <TouchableOpacity accessibilityLabel="sendMoney_quantityButton" onPress={() => this.modalMiktarO()}>
                                    <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                                        <View style={bkmThemeCommon.gridColumnAffect}>
                                            <Text style={bkmThemeCommon.cardTitle}>GÖNDERİLECEK KEKLİK</Text>
                                            <Text style={styles.rightArrowIconContainer}>
                                                <Icon name='ios-arrow-forward' style={styles.rightArrowIcon} />
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={bkmThemeCommon.cardSectionPaddingLite}>
                                        <Text style={bkmThemeCommon.cardSectionColor}>{this.showMiktar()}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={bkmThemeCommon.cardStyling}>
                                <TouchableOpacity accessibilityLabel="sendMoney_messageButton" onPress={() => this.modalMesajO()}>
                                    <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                                        <View style={bkmThemeCommon.gridColumnAffect}>
                                            <Text style={bkmThemeCommon.cardTitle}>MESAJ</Text>
                                            <Text style={styles.rightArrowIconContainer}>
                                                <Icon name='ios-arrow-forward' style={styles.rightArrowIcon} />
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={bkmThemeCommon.cardSectionPaddingLite}>
                                        <Text style={bkmThemeCommon.cardSectionColor}
                                              numberOfLines={2}>
                                            {this.state.mesaj}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/*NOT: Yeni native-base versiyonuna gectikten sonra (react-native upgrade) asagidaki Button'a
                            textStyle'a fontSize verine artik console'da improper props fontSize hatasi veriyor. O nedenle
                            fontSize: 17 kismini kaldirmak zorunda kaldik:
                            textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}*/}

                            <Button rounded onPress={() => this.onSubmit()}
                                    style={[styles.loginBtn, styles.loginBtnSendMoney]} textStyle={{color: '#4E4944', fontWeight: '800'}}
                                    accessibilityLabel="sendMoney_onayButton">
                                Gönder
                            </Button>


                            <Modal
                                //offset={this.state.offset}
                                open={this.state.openGonderilenModal}
                                //modalDidOpen={() => console.log('openGonderilenModal did open')}
                                modalDidClose={() => this.setState({openGonderilenModal: false})}
                                style={styles.modal}>

                                <Gonderilen
                                    backButtonOnPress={this.modalGonderilenX.bind(this)}
                                    buttonOnPress={this.modalGonderilenX.bind(this)}
                                    setGonderilen={this.setGonderilen.bind(this)}
                                    sonGonderilenEmail1={this.state.sonGonderilenEmail1}
                                    sonGonderilenEmail2={this.state.sonGonderilenEmail2}
                                    sonGonderilenEmail3={this.state.sonGonderilenEmail3}
                                    sonGonderilenEmail4={this.state.sonGonderilenEmail4}
                                    gonderilen = {this.state.gonderilen}
                                />
                            </Modal>

                            <Modal
                                //offset={this.state.offset}
                                open={this.state.openMiktarModal}
                                //modalDidOpen={() => console.log('openMiktarModal did open')}
                                modalDidClose={() => this.setState({openMiktarModal: false})}
                                style={styles.modal}>

                                <Miktar
                                    bakiye={this.bakiyeToString()}
                                    buttonOnPress={this.modalMiktarX.bind(this)}
                                    setMiktar={this.setMiktar.bind(this)}
                                    tamSayi = {this.state.tamSayi}
                                    ondalik = {this.state.ondalik}
                                />
                            </Modal>

                            <Modal
                                //offset={this.state.offset}
                                open={this.state.openMesajModal}
                                //modalDidOpen={() => console.log('openMesajModal did open')}
                                modalDidClose={() => this.setState({openMesajModal: false})}
                                style={styles.modal}>

                                <Mesaj
                                    setMesaj={this.setMesaj.bind(this)}
                                    backButtonOnPress={this.modalMesajX.bind(this)}
                                    buttonOnPress={this.modalMesajX.bind(this)}
                                    mesaj={this.state.mesaj}
                                />
                            </Modal>
                        </Content>
                    </Image>
                </View>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function bindActions(dispatch){
    return {
        popRoute:() => dispatch(popRoute()),
        replaceRoute:(route, passprops) => dispatch(replaceRoute(route, passprops)),
        pushNewRoute:(route, passprops) => dispatch(pushNewRoute(route, passprops))
    }
}


export default connect(mapStateToProps, bindActions)(Z_old_SendMoney);

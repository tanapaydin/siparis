'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, AsyncStorage, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Text, Button, View } from 'native-base';
import Modal from 'react-native-simple-modal';
import Contacts from 'react-native-contacts';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import HeaderContent from './../headerContent/';
import theme from '../../themes/base-theme';
import styles from './styles';
import KontaklarEmail from './kontaklarEmail'
import AppEventRegistery from '../utility/AppEventRegistery';
import pinchFetch from '../utility/pinchUtil';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';


class SendMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openGonderilenModal: false,
            bakiyeObj: {integerPart: 0, fractionalPart: 0},
            bakiyeMiktar: 0.0,
            email: '',
            tamSayi: '',
            ondalik: '',
            mesaj: '',
            contacts: []
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
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                responseData.json()
                    .then((responseJson) => {

                        if (!responseJson) {
                            Alert.alert('Hata', 'Sunucudan bakiye okuma hatası.');
                        }

                        let bakiyeObj = {integerPart: responseJson.integerPart, fractionalPart: responseJson.fractionalPart};
                        let bakiyeMiktar = bakiyeObj.integerPart ?
                            bakiyeObj.integerPart.toString().concat('.', bakiyeObj.fractionalPart) :
                            0.0;

                        this.setState({bakiyeObj: bakiyeObj, bakiyeMiktar: bakiyeMiktar});
                    })
                    .catch((error) => {
                        Alert.alert('Hata', 'Sunucu entegrasyonunda hata oluştu: '.concat(error));
                    })
            })
            .catch((error) => {
                Alert.alert('Hata', 'Sunucu hatası: '.concat(error));
            })
            .done();

    }

    componentWillMount() {
        this._fetchUserBalance();
    }

    componentDidMount() {
        Contacts.getAll( (err, contacts) => {
            if (err) {
                if (err.type == 'permissionDenied') {
                    console.log('Kontaklar okunurken permissionDenied hatasi alindi.');
                }
            } else {
                if (contacts) {
                    let contactsArr = [];
                    for (let i = 0; i < contacts.length; i++) {

                        //Sadece email adresi tanimli olan kontaklari ekle:
                        if (contacts[i].emailAddresses.length > 0) {
                            contactsArr.push(contacts[i]);
                        }
                    }

                    this.setState({contacts: contactsArr});
                }
            }

        });
    }


    // NOT: "AppEventRegistery.dispatchPageEvent" sayesinde her modal acip
    // kapandiginda timer resetlenmesi icin event fire ediyoruz.

    modalGonderilenO() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openGonderilenModal: true});
    }

    modalGonderilenX() {
        AppEventRegistery.dispatchPageEvent({route: 'modal'});
        this.setState({openGonderilenModal: false});
    }

    setEmail(email) {
        this.setState({ email: email });
    }

    calculateMiktar(tamSayi, ondalik) {
        let tamTempNoktasiz = tamSayi ? tamSayi.toString().replace(/\./g, '') : '0';
        let ondalikTemp = ondalik ? ondalik : '0';
        let miktarTemp = tamTempNoktasiz.toString().concat('.', ondalikTemp); //Dikkat: Burada nokta kullaniyoruz, gosterirken virgul.

        return miktarTemp;
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

    validate50chararacterLimit(value) {
        if (!value) {
            return true;
        }

        if (value.toString().length > 50) {
            return false;
        }

        return true;
    }

    onSubmit() {
        // VALIDATIONS:
        if (!this.state.email || this.state.email.length <= 0) {
            Alert.alert('Hata', 'Alıcı e-posta adresini girmedin.');
            return;
        }
        if (this.state.email === this.props.user.userEmail){
            Alert.alert('Hata', 'Kullanıcı kendisine transfer yapamaz.');
            return;
        }

        const miktar = parseFloat(this.calculateMiktar(this.state.tamSayi, this.state.ondalik));

        if (miktar <= 0.0) {
            Alert.alert('Hata', 'Göndermek istediğin keklik miktarını girmedin.');
            return;
        }
        if (miktar > parseFloat(this.state.bakiyeMiktar)) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            return;
        }
        // else if (!this.state.mesaj || this.state.mesaj.length <= 0) {
        //     Alert.alert('Hata', 'Lüten bilgi mesajı giriniz.');
        //     return;
        // }


        // VALIDATE 50 CHARACTERS LIMIT:
        if (!this.validate50chararacterLimit(this.state.email)) {
            Alert.alert('Hata', 'Alıcı e-posta adresi çok büyük.');
            return;
        }
        if (!this.validate50chararacterLimit(this.state.mesaj)) {
            Alert.alert('Hata', 'Mesaj alanı çok büyük.');
            return;
        }


        this.sendMoneyToServer();
    }



    sendMoneyToServer() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/merchandise/transfer/';

        pinchFetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            },
            body: JSON.stringify({ // JSON value 'null' of type NSNull cannot be converted to NSString hatasi aliniyor.
                //fromEmail: this.props.user.userEmail,
                toEmail: this.state.email,
                credit: {
                    integerPart: this.state.tamSayi ? this.butunNoktaVeVirgulleriKaldir(this.state.tamSayi) : '0',
                    fractionalPart: this.state.ondalik ? this.state.ondalik : '0'
                },
                message: this.state.mesaj
            })
        })
            .then((responseData)=> {

                // console.log('RESPONSE: ', responseData);

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
                    // console.log('responseJson: ', responseJson);

                    if (!responseJson || responseJson.length <= 0) {
                        Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                        return;
                        // } else if ("MRKT0012" == responseJson.responseCode) {
                        //     Alert.alert('Hata', 'Kullanıcı bulunamadı.');
                        //     return;
                    } else if ("MRKT0000" != responseJson.responseCode) {
                        this.failureSayfasiniAc(responseJson);
                        return;
                    }

                    this.successSayfasiniAc();

                } catch(error) {
                    let networkHatasi = { responseCode: -98, message: 'Json hatası: '.concat(error) };
                    this.failureSayfasiniAc(networkHatasi)
                }
            })
            .catch((error)=> {
                console.log('ERROR: ', error);
                let networkHatasi = { responseCode: -99, message: 'Entegrasyon hatası: '.concat(error.message) };
                this.failureSayfasiniAc(networkHatasi)
            });

    }

    failureSayfasiniAc(error) {
        this.replaceRoute('sendMoneyFailure', {
            email: this.state.email,
            gosterilecekMiktar: this.showMiktar(),
            mesaj: this.state.mesaj,
            hata: ''.concat(error.message)
        });
    }

    successSayfasiniAc() {
        this.replaceRoute('sendMoneySuccess', {
            email: this.state.email,
            gosterilecekMiktar: this.showMiktar(),
            mesaj: this.state.mesaj
        });
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
            sayi = sayi.toString().replace(/\./g, ''); //Eger varsa once butun noktalari kaldir.
            sayi = Number(sayi); //En basinda gereksiz sifir varsa yok ediyoruz.
        }
        return sayi ? sayi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : sayi;
    }

    butunNoktaVeVirgulleriKaldir(str) {
        str = str.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        str = str.toString().replace(/,/g, ''); //Butun virgulleri kaldir.
        return str;
    }

    validateMiktarTamSayi(tamSayi) {
        if (!this.state.bakiyeMiktar || this.state.bakiyeMiktar <= 0.0) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
            return;
        }

        tamSayi = this.butunNoktaVeVirgulleriKaldir(tamSayi);

        if (!tamSayi) {
            //Tam sayi icin sadece nokta veya virgul girilmisse, onu sil.
            this.setState({tamSayi: ''});
            return;
        }

        if (isNaN(tamSayi)) {
            Alert.alert('Hata', 'Hatalı giriş yaptın.');
            this.setState({tamSayi: ''});
            return;
        }

        let sayi = Number(tamSayi.toString().concat('.', this.state.ondalik ? this.state.ondalik : '0'));

        // //Ornek bakiye: 1.234,50
        // let bakiye = this.state.bakiyeMiktar.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        // //bakiye: 1234,50 oldu
        // bakiye = bakiye.replace(',', '.'); //Virgulu nokta ile degistir.
        // //bakiye: 1234.50 oldu

        if (sayi > this.state.bakiyeMiktar) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
        } else {
            tamSayi = this.tamSayiyaGerekiyorsaNoktaEkle(tamSayi);
            this.setState({tamSayi});
        }
    }

    validateMiktarOndalik(ondalik) {
        if (!this.state.bakiyeMiktar || this.state.bakiyeMiktar <= 0.0) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
            return;
        }

        ondalik = this.butunNoktaVeVirgulleriKaldir(ondalik);

        if (!ondalik) {
            //Ondalik icin sadece nokta veya virgul girilmisse, onu sil.
            this.setState({ondalik: ''});
            return;
        }

        if (isNaN(ondalik)) {
            Alert.alert('Hata', 'Hatalı giriş yaptın.');
            this.setState({ondalik: ''});
            return;
        }

        let tamSayi = this.state.tamSayi.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        tamSayi = tamSayi.toString().replace(/,/g, ''); //Butun virgulleri kaldir.

        let sayi = Number(tamSayi + '.' + ondalik);

        // //Ornek bakiye: 1.234,50
        // let bakiye = this.state.bakiyeMiktar.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        // //bakiye: 1234,50 oldu
        // bakiye = bakiye.replace(',', '.'); //Virgulu nokta ile degistir.
        // //bakiye: 1234.50 oldu

        if (sayi > this.state.bakiyeMiktar) {
            Alert.alert('Hata', 'Bakiye yetersiz');
            this.setState({tamSayi: '', ondalik: ''});
        } else {
            this.setState({ondalik});
        }
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
            <Container theme={theme}>

                <Image source={require('../../../images/basic-grad-bg.png')} style={bkmThemeCommon.container} >

                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showHamburger={true} headerText={bkmTheme.katIsmi.concat(" | Keklik Transferi")} />
                        </Header>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>

                        <View style={bkmThemeCommon.container}>


                            <View style={bkmThemeCommon.cardStyling}>

                                <View style={[styles.keklikSectionTitlePadding, bkmThemeCommon.cardSectionBorderBottom]}>
                                    <Text style={[bkmThemeCommon.cardTitle, {opacity: 0.85}]}>Bakiye: {this.bakiyeToString()} Keklik</Text>
                                </View>

                                <View style={[styles.keklikSectionTitlePadding, {paddingBottom: 3}]}>
                                    <Text style={bkmThemeCommon.cardTitle}>Kime</Text>
                                </View>

                                <View style={[ {paddingLeft: bkmThemeCommon.marginM, paddingRight: bkmThemeCommon.marginM, paddingBottom: 14},
                                    bkmThemeCommon.cardSectionBorderBottom,
                                    {flexDirection: 'row', justifyContent: 'space-between'} ]}
                                >
                                    <TextInput
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType='email-address'
                                        returnKeyType="done"
                                        //onSubmitEditing={() => this.buttonOnPressKaydet()}
                                        accessibilityLabel="sendMoney_emailLabel"
                                        style={[bkmThemeCommon.textInputForms, {flex: 1, alignSelf: "stretch"}]}
                                        placeholder='Göndereceğiniz kişinin e-postası'
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        value={this.state.email}
                                        maxLength={50}
                                        onChangeText={(girilenEmail) => this.setState({ email: girilenEmail.trim() })}
                                    />

                                    <TouchableOpacity onPress={() => this.modalGonderilenO()}>
                                        <View style={styles.artiIsaretiBox}>
                                            <Text style={styles.artiIsaretiText}>+</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                <View style={[styles.keklikSectionTitlePadding, {paddingBottom: 3}]}>
                                    <Text style={bkmThemeCommon.cardTitle}>Keklik</Text>
                                </View>


                                <View style={[ {paddingLeft: bkmThemeCommon.marginM, paddingRight: bkmThemeCommon.marginM, paddingBottom: 14},
                                    bkmThemeCommon.cardSectionBorderBottom,
                                    bkmThemeCommon.gridColumnAffect]}>

                                    <TextInput
                                        keyboardType='numeric' accessibilityLabel = "sendMoney_miktar_tamSayi"
                                        placeholder='00'
                                        style={[bkmThemeCommon.textInputForms,
                                            {flex: 0.30, justifyContent: 'center', textAlign: 'right'}]}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        value={this.state.tamSayi}
                                        onChangeText={(tamSayi) => this.validateMiktarTamSayi(tamSayi)}
                                    />

                                    <Text style={[
                                        {justifyContent: 'center', alignItems: 'center'},
                                        styles.cardItemHeader,
                                        {color: 'black', fontWeight: '800',}
                                    ]}>
                                        {' '},{' '}
                                    </Text>

                                    <TextInput
                                        keyboardType='numeric' accessibilityLabel = "sendMoney_miktar_ondalikSayi"
                                        placeholder='00'
                                        style={[bkmThemeCommon.textInputForms, {width: 35, textAlign: 'center', paddingLeft: 5, paddingRight: 5}]}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        value={this.state.ondalik}
                                        onChangeText={(ondalik) => this.validateMiktarOndalik(ondalik)}
                                        maxLength={2}
                                    />

                                    <Text style={{flex: 0.5}}>
                                        {/*Buraya bos bir text koyduk. Diger turlu "flex: 0.30" ise yaramiyor!*/}
                                    </Text>

                                </View>


                                <View style={[styles.keklikSectionTitlePadding, {paddingBottom: 3}]}>
                                    <Text style={bkmThemeCommon.cardTitle}>Mesaj</Text>
                                </View>

                                <View style={{paddingLeft: bkmThemeCommon.marginM, paddingRight: bkmThemeCommon.marginM, paddingBottom: bkmThemeCommon.marginM}}
                                >
                                    <TextInput
                                        accessibilityLabel="sendMoney_mesajText"
                                        autoCorrect={false}
                                        multiline={true}
                                        placeholder='Mesaj girebilirsin (50 karakter)'
                                        style={[bkmThemeCommon.textInputForms, {height: 60}]}
                                        placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                        onChangeText={(mesaj) => this.setState({mesaj})}
                                        value={this.state.mesaj}
                                        maxLength={50}
                                    />
                                </View>

                            </View>

                            {/*NOT: Yeni native-base versiyonuna gectikten sonra (react-native upgrade) asagidaki Button'a
                             textStyle'a fontSize verine artik console'da improper props fontSize hatasi veriyor. O nedenle
                             fontSize: 17 kismini kaldirmak zorunda kaldik:
                             textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}*/}

                            <Button rounded onPress={() => this.onSubmit()}
                                    style={[styles.loginBtn, {marginTop: 15}]} textStyle={{color: '#4E4944', fontWeight: '800'}}
                                    accessibilityLabel="sendMoney_onayButton">
                                Gönder
                            </Button>

                        </View>
                    </TouchableWithoutFeedback>

                    <Modal
                        //offset={this.state.offset}
                        open={this.state.openGonderilenModal}
                        //modalDidOpen={() => console.log('openGonderilenModal did open')}
                        modalDidClose={() => this.setState({openGonderilenModal: false})}
                        style={styles.modalForEmailParent}>

                        <KontaklarEmail
                            contacts = {this.state.contacts}
                            closeModal = {this.modalGonderilenX.bind(this)}
                            setEmail = {this.setEmail.bind(this)}
                        />

                    </Modal>


                </Image>

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


export default connect(mapStateToProps, bindActions)(SendMoney);

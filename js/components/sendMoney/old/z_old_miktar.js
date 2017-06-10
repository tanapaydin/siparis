'use strict';

import React, { Component } from 'react';
import { Image, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, InputGroup, Input } from 'native-base';
import styles from '../styles';

var bkmTheme = require('../../themes/base-style').bkmTheme;
var bkmThemeCommon = require('../../themes/base-style').bkmThemeCommon;


export default class Miktar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tamSayi: this.props.tamSayi,
            ondalik: this.props.ondalik
        };
    }

    buttonOnPressVazgec() {
        this.props.buttonOnPress();
    }

    buttonOnPressKaydet() {
        //TODO numeric disinda bir deger varsa invalidate edilecek!
        let tamKisim = this.state.tamSayi ? this.state.tamSayi : 0;
        tamKisim = tamKisim.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        let sayi = Number(tamKisim.toString().concat('.', this.state.ondalik ? this.state.ondalik : 0));
        if (!sayi || sayi <= 0) {
            Alert.alert('Hata', 'Lütfen geçerli miktar giriniz.');
            this.setState({tamSayi: '', ondalik: ''});
            return;
        }
        this.setMiktar();
        this.props.buttonOnPress();
    }

    setMiktar() {
        let tamKisim = this.state.tamSayi ? this.state.tamSayi : 0;
        let ondalikKisim = this.state.ondalik ? this.state.ondalik : 0;
        //let setEdilecekOlan = tamKisim.toString().concat(',', ondalikKisim);
        this.props.setMiktar(tamKisim, ondalikKisim);
    }

    tamSayiyaGerekiyorsaNoktaEkle(sayi) {
        sayi = sayi.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        return sayi.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    validateMiktarTamSayi(tamSayi) {
        tamSayi = tamSayi.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        let sayi = Number(tamSayi.toString().concat('.', this.state.ondalik ? this.state.ondalik : 0));


        if (!this.props.bakiye) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
            return;
        }

        //Ornek bakiye: 1.234,50
        let bakiye = this.props.bakiye.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        //bakiye: 1234,50 oldu
        bakiye = bakiye.replace(',', '.'); //Virgulu nokta ile degistir.
        //bakiye: 1234.50 oldu

        if (sayi > bakiye) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
        } else {
            tamSayi = this.tamSayiyaGerekiyorsaNoktaEkle(tamSayi);
            this.setState({tamSayi: tamSayi});
        }
    }

    validateMiktarOndalik(ondalik) {
        let tamSayi = this.state.tamSayi.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        let sayi = Number(tamSayi + '.' + ondalik);

        if (!this.props.bakiye) {
            Alert.alert('Hata', 'Bakiye yetersiz.');
            this.setState({tamSayi: '', ondalik: ''});
            return;
        }

        //Ornek bakiye: 1.234,50
        let bakiye = this.props.bakiye.toString().replace(/\./g, ''); //Butun noktalari kaldir.
        //bakiye: 1234,50 oldu
        bakiye = bakiye.replace(',', '.'); //Virgulu nokta ile degistir.
        //bakiye: 1234.50 oldu

        if (sayi > bakiye) {
            Alert.alert('Hata', 'Bakiye yetersiz');
            this.setState({tamSayi: '', ondalik: ''});
        } else {
            this.setState({ondalik: ondalik});
        }
    }


    render() {
        return (
            <View style={{marginTop: 15}}>
                <View style={[bkmThemeCommon.whiteBackground]}>
                    <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>
                        <View style={bkmThemeCommon.gridColumnAffect}>
                            <Text style={[{flex: 0.40}, styles.puanLabelContainer, styles.puanLabelText]}>Keklik</Text>

                            {/*<InputGroup borderType='rounded'  style={[{flex: 0.55, justifyContent: 'center'}, bkmThemeCommon.inputGrpPrimary]}>*/}
                                {/*<Input keyboardType='numeric' accessibilityLabel = "sendMoney_miktar_tamSayi"*/}
                                       {/*placeholder='00'*/}
                                       {/*style={bkmThemeCommon.inputPrimary}*/}
                                       {/*value={this.state.tamSayi}*/}
                                       {/*onChangeText={(tamSayi) => this.validateMiktarTamSayi(tamSayi)}  />*/}
                            {/*</InputGroup>*/}

                            <TextInput
                                keyboardType='numeric' accessibilityLabel = "sendMoney_miktar_tamSayi"
                                placeholder='00'
                                style={[bkmThemeCommon.textInputForms,
                                    {flex: 0.40, justifyContent: 'center', textAlign: 'right'}]}
                                placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                value={this.state.tamSayi}
                                onChangeText={(tamSayi) => this.validateMiktarTamSayi(tamSayi)}
                            />

                            <Text style={[
                                {flex: 0.05, justifyContent: 'center', alignItems: 'center'},
                                styles.cardItemHeader,
                                {color: 'black', fontWeight: '800',}
                                ]}>
                                {' '},
                            </Text>

                            {/*<InputGroup borderType='rounded' style={[{flex: 0.2, justifyContent: 'center'}, bkmThemeCommon.inputGrpPrimary]}>*/}
                                {/*<Input keyboardType='numeric'  accessibilityLabel = "sendMoney_miktar_ondalikSayi"*/}
                                       {/*placeholder='00'*/}
                                       {/*style={bkmThemeCommon.inputPrimary}*/}
                                       {/*value={this.state.ondalik}*/}
                                       {/*onChangeText={(ondalik) => this.validateMiktarOndalik(ondalik)}*/}
                                       {/*maxLength={2} />*/}
                            {/*</InputGroup>*/}

                            <TextInput
                                keyboardType='numeric' accessibilityLabel = "sendMoney_miktar_ondalikSayi"
                                placeholder='00'
                                style={[bkmThemeCommon.textInputForms, {flex: 0.15, justifyContent: 'center'}]}
                                placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                value={this.state.ondalik}
                                onChangeText={(ondalik) => this.validateMiktarOndalik(ondalik)}
                                maxLength={2}
                            />

                        </View>


                        <View style={bkmThemeCommon.gridColumnAffect}>
                            <Button rounded onPress={() => this.buttonOnPressVazgec()}
                                    style={bkmThemeCommon.buttonVazgec} textStyle={{color: '#fff', fontWeight: '800'}}
                                    accessibilityLabel="sendMoney_emailSaveButton">
                                Vazgeç
                            </Button>

                            <Button rounded onPress={() => this.buttonOnPressKaydet()}
                                    style={bkmTheme.buttonKaydet} textStyle={{color: '#fff', fontWeight: '800'}}
                                    accessibilityLabel="sendMoney_onayButton">
                                Devam et
                            </Button>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}
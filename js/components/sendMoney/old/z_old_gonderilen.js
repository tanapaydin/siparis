'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Alert, AsyncStorage, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, InputGroup, Input } from 'native-base';
import styles from '../styles';

var bkmTheme = require('../../themes/base-style').bkmTheme;
var bkmThemeCommon = require('../../themes/base-style').bkmThemeCommon;


export default class Gonderilen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            girilenEmail: this.props.gonderilen ? this.props.gonderilen.email : '',
            son4Kisi: ''
        };
    }

    componentWillMount() {
        let key = 1;
        let son4Kisi = [];

        if (this.props.sonGonderilenEmail1 && this.props.sonGonderilenEmail1.length > 0) {
            son4Kisi.push({key: key, email: this.props.sonGonderilenEmail1});
            key = key + 1;
        }
        if (this.props.sonGonderilenEmail2 && this.props.sonGonderilenEmail2.length > 0) {
            son4Kisi.push({key: key, email: this.props.sonGonderilenEmail2});
            key = key + 1;
        }
        if (this.props.sonGonderilenEmail3 && this.props.sonGonderilenEmail3.length > 0) {
            son4Kisi.push({key: key, email: this.props.sonGonderilenEmail3});
            key = key + 1;
        }
        if (this.props.sonGonderilenEmail4 && this.props.sonGonderilenEmail4.length > 0) {
            son4Kisi.push({key: key, email: this.props.sonGonderilenEmail4});
            key = key + 1;
        }
        if (son4Kisi.length > 0) {
            this.setState({son4Kisi: son4Kisi});
        }
    }

    saveDataAndClose(value) {
        this.props.setGonderilen(value);
        this.props.buttonOnPress();
    }

    buttonOnPressVazgec() {
        Keyboard.dismiss(); // Vaz Gec'e basilinca klavyenin kaybolmasi icin.
        this.props.backButtonOnPress();
    }

    buttonOnPressKaydet() {
        Keyboard.dismiss(); // Devam et'e basilinca klavyenin kaybolmasi icin.
        if (!this.validateEmail(this.state.girilenEmail)) {
            Alert.alert('Hata', 'E-posta hatalı.');
            return;
        }

        let kisi = {email: this.state.girilenEmail};
        this.saveDataAndClose(kisi);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    render() {
        var recents = [];

        if (this.state.son4Kisi) {
            this.state.son4Kisi.forEach(function(item) {
                recents.push(
                    <TouchableOpacity style={{flexDirection: 'row'}} key={item.key}
                                      onPress={() => this.saveDataAndClose(item)}>
                        <View style={styles.modalListItem}>
                            <Text style={styles.modalListItemText}>
                                {item.email}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            }.bind(this));
        }

        return (
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                <View style={{marginTop: 15}}>
                    <View style={[bkmThemeCommon.whiteBackground]}>
                        <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                            {/*<InputGroup borderType='rounded' style={bkmThemeCommon.inputGrpPrimary}>*/}
                                {/*<Input autoCapitalize="none" accessibilityLabel="sendMoney_emailLabel"*/}
                                       {/*placeholder='Göndereceğiniz kişinin e-postası'*/}
                                       {/*style={bkmThemeCommon.inputPrimary}*/}
                                       {/*value={this.state.girilenEmail}*/}
                                       {/*onChangeText={(girilenEmail) => this.setState({girilenEmail})}*/}
                                {/*/>*/}
                            {/*</InputGroup>*/}

                            <TextInput
                                autoCapitalize="none"
                                keyboardType='email-address'
                                returnKeyType="done"
                                onSubmitEditing={() => this.buttonOnPressKaydet()}
                                accessibilityLabel="sendMoney_emailLabel"
                                autoCorrect={false}
                                style={bkmThemeCommon.textInputForms}
                                placeholder='Göndereceğiniz kişinin e-postası'
                                placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                                value={this.state.girilenEmail}
                                onChangeText={(girilenEmail) => this.setState({girilenEmail: girilenEmail.trim()})}
                            />

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

                            <Text style={styles.bilgiText}>
                                {this.state.son4Kisi && this.state.son4Kisi.length > 0
                                    ? 'Son gönderilenler:'
                                    : ''}
                            </Text>

                            {recents}

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
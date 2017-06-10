'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button, InputGroup, Input } from 'native-base';

var bkmTheme = require('../../themes/base-style').bkmTheme;
var bkmThemeCommon = require('../../themes/base-style').bkmThemeCommon;


export default class Mesaj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mesaj: this.props.mesaj
        };
    }

    setMesaj(mesaj) {
        this.props.setMesaj(mesaj);
    }

    backButtonOnPress() {
        this.props.backButtonOnPress();
    }

    buttonOnPressVazgec() {
        this.props.buttonOnPress();
    }

    buttonOnPressKaydet() {
        if (!this.state.mesaj || this.state.mesaj.length <= 0) {
            Alert.alert('Hata', 'Lütfen mesaj giriniz.');
            return;
        }

        this.props.setMesaj(this.state.mesaj);
        this.props.buttonOnPress();
    }

    render() {

        return (
            <View style={{marginTop: 15}}>
                <View style={[bkmThemeCommon.whiteBackground]}>
                    <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                        {/*<InputGroup borderType='rounded' style={bkmThemeCommon.inputGrpPrimary}>*/}
                            {/*<Input*/}
                                {/*accessibilityLabel="sendMoney_mesajText"*/}
                                {/*multiline={true}*/}
                                {/*placeholder='Mesaj giriniz...'*/}
                                {/*style={[bkmThemeCommon.inputPrimary, {height: 50, paddingTop: 5, paddingLeft: 5}]}*/}
                                {/*onChangeText={(mesaj) => this.setState({mesaj})}*/}
                                {/*value={this.state.mesaj}*/}
                            {/*/>*/}
                        {/*</InputGroup>*/}

                        <TextInput
                            accessibilityLabel="sendMoney_mesajText"
                            autoCorrect={false}
                            multiline={true}
                            placeholder='Mesaj giriniz...'
                            style={[bkmThemeCommon.textInputForms, {height: 60, paddingTop: 5, paddingBottom: 5}]}
                            placeholderTextColor={bkmTheme.placeholderTextColorForForms}
                            onChangeText={(mesaj) => this.setState({mesaj})}
                            value={this.state.mesaj}
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

                    </View>
                </View>
            </View>

        )
    }
}
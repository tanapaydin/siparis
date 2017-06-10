'use strict';

import React, { Component } from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    Keyboard,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import styles from './styles';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';


export default class KontaklarEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };
    }

    componentWillMount() {
        LayoutAnimation.spring();
    }

    setEmailAndCloseModal(email) {
        Keyboard.dismiss(); // Klavyenin kaybolmasi icin.
        this.props.setEmail(email);
        this.props.closeModal();
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                <View style={styles.modalForEmailChild}>

                    <SearchBar
                        filterText = {this.state.filterText}
                        onUserInput = {this.handleUserInput.bind(this)}
                    />

                    <ScrollView>
                        <Kontaklar
                            contacts = {this.props.contacts}
                            filterText = {this.state.filterText}
                            setEmailAndCloseModal = {this.setEmailAndCloseModal.bind(this)}
                        />
                    </ScrollView>

                </View>
            </TouchableWithoutFeedback>
        )
    }
}


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(filterText) {
        this.props.onUserInput(filterText);
    }

    render() {
        return (
            <View style={{borderBottomWidth: 1, borderBottomColor: '#b0b0b0',
                paddingTop: 16, paddingBottom: 16, paddingLeft: 20, paddingRight: 20}}>

                <View style={{flexDirection: 'row', alignSelf: 'stretch',
                    backgroundColor: '#eaeaea', borderRadius: 8}}>

                    <TextInput
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        autoFocus={true}
                        keyboardType = 'email-address'
                        returnKeyType = "done"
                        //onSubmitEditing={() => this.buttonOnPressKaydet()}
                        //accessibilityLabel="sendMoney_kontak_ara"
                        style = {[bkmThemeCommon.textInputForms, {flex: 1, alignSelf: "stretch"}]}
                        placeholder = 'Ara'
                        placeholderTextColor = {bkmTheme.placeholderTextColorForForms}
                        value = {this.props.filterText}
                        onChangeText = {(enteredText) => this.handleChange(enteredText)}
                    />

                    <Image source={require('../../../images/search-icon.png')} style={{width: 25, height: 20, marginTop: 4}} />

                </View>

            </View>
        );
    }
}

class Kontaklar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    contactTouched(itemKey) {
        this.setState({touchedContact: itemKey});
    }

    render() {
        var kontaklar = [];

        if (this.props.contacts) {
            for (let i = 0; i < this.props.contacts.length; i++) {

                let item = this.props.contacts[i];
                let itemkey = item.givenName + ' ' + item.familyName + ' ' + item.recordID;

                //Eger searchBar'a bir filterText girilmisse, o filterText'i icermeyen kontaklari array'e ekleme:
                if (itemkey && this.props.filterText) {
                    if (itemkey.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
                        continue;
                    }
                }

                let emailler = [];

                for (let j = 0; j < item.emailAddresses.length; j++) {
                    let emailKey = item.emailAddresses[j].label + ' ' + item.emailAddresses[j].email;

                    emailler.push(
                        <View style={{paddingLeft: 10, paddingTop: 8, paddingBottom: 8,
                            borderTopWidth: 1, borderTopColor: '#d6d6d6'}}
                              key = {emailKey}
                              visible = {false}
                        >

                            <TouchableOpacity onPress={() => this.props.setEmailAndCloseModal(item.emailAddresses[j].email)}
                                              style={{flexDirection: 'row', justifyContent: 'flex-start'}}
                            >
                                <Text style={{color: '#bababa', fontSize: 12}}>{item.emailAddresses[j].label}{' | '}</Text>
                                <Text style={{color: '#8b8885', fontSize: 12}}>{item.emailAddresses[j].email}</Text>
                            </TouchableOpacity>

                        </View>
                    );
                };

                if (emailler.length > 0) {
                    kontaklar.push(
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#b0b0b0',
                            paddingLeft: 20, paddingRight: 20, paddingTop: 8}}
                              key = {itemkey}
                        >
                            <TouchableOpacity onPress={() => this.contactTouched(itemkey)}>
                                <Text style={[{paddingBottom: 8, color: '#8b8885',
                                    fontWeight: '600'},
                                    {color: '#8b8885'},
                                ]}>
                                    {item.givenName}{' '}{item.familyName}
                                </Text>
                            </TouchableOpacity>

                            {
                                this.state.touchedContact === itemkey
                                    ? emailler
                                    : null
                            }

                        </View>
                    );
                }

            };
        }

        return (
            <View>
                {kontaklar}
            </View>
        );
    }
}
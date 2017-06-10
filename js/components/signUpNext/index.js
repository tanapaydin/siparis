'use strict';

import React, {Component} from "react";
import {Image, Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../actions/route";
import {Container, Header, Content, Button, InputGroup, Input, View} from "native-base";
import HeaderContent from '../headerContent/';
import theme from '../../themes/base-theme';
import styles from "../signUp/styles";


class SignUpNext extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            phone: "",
        };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    onSubmit() {
        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.

        if (!this.state.name || !this.state.surname || !this.state.phone) {
            Alert.alert('Hata', 'Lütfen boş alan bırakmayınız.');
            return;
        }

        let signObj = {
            name: this.state.name,
            surname: this.state.surname,
            phone: this.state.phone,
            email: this.props.signObj.email
        }

        if (this.validateEntries(signObj)) {
            this.pushNewRoute('signUpCamera', {signObj: signObj})
        }
    }

    validateEntries(Obj) {
        if (Obj.phone.length < 11) {
            Alert.alert('Hata', 'Telefon numarası 11 haneli olmalıdır.');
            return 0;
        }

        if (!(this.validateAdSoyad(Obj.name)) || !(this.validateAdSoyad(Obj.surname))) {
            Alert.alert('Hata', 'Ad veya soyad yanlış girilmiştir.');
            return 0;
        }

        return 1;
    }


    validateAdSoyad(name)  {
        if (!name.match(/^[a-zA-ZŞşıIğĞüÜçÇöÖ ]+$/)){
            return 0;
        } else {
            return 1;
        }
    }

    popRoute() {
        this.props.popRoute();
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

                            <View style={styles.signupContainer}>
                                <InputGroup borderType='rounded'
                                            style={styles.inputGrp}>
                                    <Input keyboardType='default'
                                           returnKeyType="next"
                                           onSubmitEditing={() => this.onSubmit()}
                                           autoFocus={true}
                                           maxLength={25}
                                           placeholder='Ad'
                                           autoCorrect={false}
                                           style={styles.input}
                                           onChangeText={(name) => this.setState({name: name})}/>
                                </InputGroup>

                                <InputGroup borderType='rounded'
                                            style={styles.inputGrp}>
                                    <Input keyboardType='default'
                                           returnKeyType="next"
                                           onSubmitEditing={() => this.onSubmit()}
                                           maxLength={25}
                                           autoCorrect={false}
                                           placeholder='Soyad'
                                           style={styles.input}
                                           onChangeText={(surname) => this.setState({surname: surname})}/>
                                </InputGroup>

                                <InputGroup borderType='rounded' style={styles.inputGrp}>
                                    <Input keyboardType='phone-pad'
                                           returnKeyType="next"
                                           onSubmitEditing={() => this.onSubmit()}
                                           maxLength={11}
                                           placeholder='05********'
                                           style={styles.input}
                                           onChangeText={(phone) => this.setState({phone: phone})}/>
                                </InputGroup>


                                <Button rounded
                                        onPress={() => {this.onSubmit();}}
                                        style={styles.signupBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                    Devam et
                                </Button>

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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUpNext);

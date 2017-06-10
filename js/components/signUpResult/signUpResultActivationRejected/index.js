'use strict';

import React, { Component } from "react";
import { Image, Platform, TouchableOpacity, AsyncStorage, Alert } from "react-native";
// import PushNotification from 'react-native-push-notification';
import { connect } from "react-redux";
import { popRoute, pushNewRoute, resetRoute } from "../../../actions/route";
import { login } from '../../../actions/user';
import { Container, Header, Text, Button, View } from "native-base";
import theme from "../../../themes/base-theme";
import styles from "./styles";
import HeaderContent from './../../headerContent/';
import Utility from '../../utility/';
import { bkmThemeCommon } from '../../../themes/base-style';


class SignUpResultActivationRejected extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.signObj ? this.props.signObj.email : '',
            redNedeni: this.props.signObj ? this.props.signObj.redNedeni : '',
            deviceToken: '',
        };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }

    }

    componentWillMount() {
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                // console.log( 'TOKEN:', token );
                this.setState({deviceToken: token.token});
            }.bind(this),

        });
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

    onSubmit() {
        Utility.kimlikBilgilerimiSil(this.props.userEmail, this.state.deviceToken, this.resetRoute.bind(this), this.props.login.bind(this));
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../../images/grad-bg.png')} style={styles.background}>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showLogo={true} />
                        </Header>

                        <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                            <View style={styles.cardStyling}>
                                <View style={[bkmThemeCommon.cardStylePadding, styles.cardBorderBottomStyling]}>
                                    <Text style={styles.statusViewTopic}>AKTİVASYON DURUMU</Text>
                                </View>

                                <View style={[bkmThemeCommon.cardStylePadding, styles.alignSelfCenter]}>
                                    <Image source={require('../../../../images/act-rejected.png')} style={styles.infoViewImageRejected}>
                                    </Image>
                                    <Text style={styles.statusViewTextLarge}>ÜZGÜNÜZ, ÜYELİĞİNİZ ONAYLANMADI</Text>
                                    <Text style={styles.statusViewText}>Red Nedeni: {this.state.redNedeni}</Text>
                                </View>
                            </View>

                            <Text style={styles.infoText}>
                                Dilerseniz kimlik bilgilerinizi telefondan silip, kayıt sürecine baştan başlayabilirsiniz.
                            </Text>

                            <Button rounded transparent block
                                    onPress={() => this.onSubmit()}
                                    style={styles.signupBtn}
                                    textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                Kimlik bilgilerimi sil
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
        popRoute: () => dispatch(popRoute()),
        resetRoute: () => dispatch(resetRoute()),
        login:(user) => dispatch(login(user))
    }
}

function mapStateToProps(state) {
    return {
        userEmail: state.user.userEmail,
    };
}

export default connect(mapStateToProps, bindAction)(SignUpResultActivationRejected);

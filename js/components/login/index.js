'use strict';

import React, {Component} from 'react';
import { AsyncStorage, Image, Alert, Platform, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, View } from 'native-base';
import Keychain from 'react-native-keychain';
import { pushNewRoute, replaceRoute, resetRoute } from '../../actions/route';
import { login } from '../../actions/user';
import Utility from '../utility/';
import theme from '../../themes/base-theme';
import styles from './styles';
import { bkmTheme, ortam } from '../../themes/base-style';

const RNFS = require('react-native-fs');


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        };
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    resetRoute() {
        this.props.resetRoute();
    }






    render() {
        return (
            <Container theme={theme}>
                <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                    <View style={[styles.bg, {flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}]}>

                        <Image source={require('../../../images/launch-logo.png')} style={styles.launchLogo}></Image>

                        <Button rounded onPress={() => this.pushNewRoute('account')}
                                style={styles.loginBtn}
                                textStyle={{color: bkmTheme.primaryButtonTextColor, fontSize: 17, fontWeight: '500'}}
                        >
                            Giriş yap
                        </Button>

                        <Button rounded onPress={() => this.pushNewRoute('signUp')}
                                style={styles.signUpBtn}
                                textStyle={{color: '#fff', fontSize: 17, fontWeight: '500'}}
                         >
                            Kayıt ol
                        </Button>

                    </View>
                </Image>
            </Container>
        )
    }
}


function bindActions(dispatch) {
    return {
        replaceRoute: (route, passprops) => dispatch(replaceRoute(route, passprops)),
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops)),
        resetRoute: () => dispatch(resetRoute()),
        setDeviceToken: (token) => dispatch(setDeviceToken(token)),
        login: (user) => dispatch(login(user))
    }
}


function mapStateToProps(state) {
    return {
        userEmail: state.user.userEmail, // adam login olmadan storedan user okunamiyor!! O da signIn'de oluyor.
        loaderVisible: state.loading.loaderVisible
    };
}


export default connect(mapStateToProps, bindActions)(Login);

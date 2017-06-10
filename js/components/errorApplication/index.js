'use strict';

import React, {Component} from "react";
import {Image, AsyncStorage, Alert} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../actions/route";
import { login } from "../../actions/user";
import {Container, Header, Text, Button, View} from "native-base";
import theme from "../../themes/base-theme";
import styles from "./styles";
import HeaderContent from './../headerContent/';


class ErrorApplication extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    }

    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/grad-bg.png')} style={styles.background}>
                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>

                        <View style={styles.mainView}>

                            <Image source={require('../../../images/app-error.png')} style={styles.signInImage}>
                            </Image>

                            <Text style={styles.infoText}>Uygulama Hatası.</Text>

                            {/*<Button rounded onPress={() => this.onSubmit()}*/}
                                    {/*style={styles.signUpBtn} textStyle={{color: '#fff', fontSize: 17, fontWeight: '800'}}*/}
                                    {/*accessibilityLabel="button_signUp">*/}
                                {/*Hatayı e-posta gönder*/}
                            {/*</Button>*/}

                            <Text/>

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
        login:(user) => dispatch(login(user))
    }
}

export default connect(null, bindAction)(ErrorApplication);

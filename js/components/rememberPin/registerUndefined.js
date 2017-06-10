'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute} from "../../actions/route";
import {Container, Header, Content, Button, Text, View, Thumbnail} from "native-base";
import theme from "../login/login-theme";
import styles from "./styles";
import HeaderContent from '../headerContent/';
import {pushNewRoute} from '../../actions/route';


class registerUndefined extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    };

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

                        <Content padder>

                            <View style={styles.infoIcon}>
                                <Thumbnail source={require('../../../images/user-not-defined.png')} style={styles.userNotDefined} />
                            </View>
                            <Text style={styles.infoText}> Üzgünüz,sistemde üyeliğiniz bulunmuyor. Dilerseniz kayıt olabilirsiniz.</Text>
                            <Button rounded
                                    onPress={() => this.pushNewRoute('signUp')}
                                    style={styles.signupBtn} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                Kayıt ol
                            </Button>
                        </Content>
                    </Image>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops))
    }
}

export default connect(null, bindAction)(registerUndefined);

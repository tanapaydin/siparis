'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute} from "../../actions/route";
import {Container, Header, Content, Text, View, Thumbnail} from "native-base";
import theme from '../../themes/base-theme';
import styles from "./styles";
import HeaderContent from '../headerContent/';


class SignUpNextUndefined extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
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

                        <Content padder>

                            <View style={styles.infoIcon}>
                                <Thumbnail source={require('../../../images/user-not-defined.png')} style={styles.userNotDefined} />
                            </View>
                            <Text style={styles.infoText}> Üzgünüz sistemde tanımlı değilsiniz.</Text>
                        </Content>
                    </Image>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUpNextUndefined);

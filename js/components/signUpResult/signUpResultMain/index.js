'use strict';

import React, {Component} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute, resetRoute} from "../../../actions/route";
import {Container, Header, Text, View} from "native-base";
import theme from "../../../themes/base-theme";
import styles from "./styles";
import HeaderContent from '../../headerContent/';
import {bkmThemeCommon} from '../../../themes/base-style';


class SignUpResult extends Component {

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

    resetRoute() {
        this.props.resetRoute();
    }

    componentWillMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
            navigator.resetTo({
                id: 'login',
            });
        }, 30000);
    }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../../images/grad-bg.png')} style={styles.background}>

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showLogo={true}/>
                        </Header>

                        <View style={[bkmThemeCommon.mainView, bkmThemeCommon.paddingGeneric]}>

                            <View style={[styles.blockChainUserInfo, ]}>
                                <Image source={require('../../../../images/card-bg.png')} style={styles.cardBackgroundImage}>

                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{paddingTop: 1, paddingRight: 1, paddingBottom: 1}}>
                                            {this.props.signObj
                                                ?
                                                <Image style={styles.profilePic} source={this.props.signObj.avatarSource} />
                                                :
                                                <Text/>
                                            }
                                        </View>

                                        <View style={styles.adSoyad}>

                                            <Text style={styles.cardTopic}>AD</Text>

                                            <View style={styles.cardBorderBottom}>
                                                <Text style={styles.cardText}>
                                                    {this.props.signObj
                                                        ? this.props.signObj.name
                                                        : ''}
                                                </Text>
                                            </View>

                                            <Text style={styles.cardTopic}>SOYAD</Text>

                                            <View style={styles.cardBorderBottom}>
                                                <Text style={styles.cardText}>
                                                    {this.props.signObj
                                                        ? this.props.signObj.surname
                                                        : ''}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={{marginTop: 18}}>
                                        <Text style={styles.cardTopic}>E-POSTA</Text>

                                        <View style={styles.cardBorderBottom}>
                                            <Text style={styles.cardText}>
                                                {this.props.signObj ? this.props.signObj.email : ''}
                                            </Text>
                                        </View>

                                        <Text style={styles.cardTopic}>TELEFON</Text>

                                        <View style={styles.cardBorderBottomssss}>
                                            <Text style={styles.cardText}>
                                                {this.props.signObj ? this.props.signObj.phone : ''}
                                            </Text>
                                        </View>
                                    </View>
                                </Image>
                            </View>

                            <View style={styles.middleView}>
                                <Text style={styles.infoText}> İşlem tamam. E-postana gönderilecek bilgiye
                                    tıklayarak aktivasyonu başlat. Sonucu bu uygulamadan ve e-postadan takip edebilirsin.
                                </Text>
                            </View>

                            <View style={styles.cardStyling}>

                                <View style={[bkmThemeCommon.cardStylePadding, styles.cardBorderBottomStyling]}>
                                    <Text style={styles.statusViewTopic}>AKTİVASYON DURUMU</Text>
                                </View>

                                <View style={bkmThemeCommon.cardStylePadding}>
                                    <Text style={styles.statusViewTextLarge}>ONAY BEKLENİYOR</Text>
                                    {/*<Text style={styles.statusViewText}>Tahmini Aktivasyon Tarihi 15.12.2016</Text>*/}
                                </View>

                            </View>

                            {/*<Button rounded onPress={() => this.resetRoute()}*/}
                            {/*style={styles.signUpBtn}*/}
                            {/*textStyle={{color: '#fff', fontSize: 17, fontWeight: '800'}}*/}
                            {/*accessibilityLabel="button_signUp">*/}
                            {/*Ana sayfa*/}
                            {/*</Button>*/}

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
        resetRoute: () => dispatch(resetRoute())
    }
}

export default connect(null, bindAction)(SignUpResult);

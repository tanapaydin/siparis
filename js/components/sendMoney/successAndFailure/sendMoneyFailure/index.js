'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect} from 'react-redux';
import { replaceRoute } from '../../../../actions/route';
import { Container, Content, Header, Text, Button, View } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from '../../../headerContent/';
import theme from '../../../../themes/base-theme';
import styles from '../styles';
import { bkmThemeCommon } from '../../../../themes/base-style';



class SendMoneyFailure extends Component {

    constructor(props) {
        super(props);
        this.state = { };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        }
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    render() {
        return (
            <Container>
                <View theme={theme}>

                    <Image source={require('../../../../../images/basic-grad-bg@2x.png')} style={styles.container} >

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showHamburger={true} showLogo={true} />
                        </Header>

                        <Content theme={theme} bounces={false}>

                            <View style={bkmThemeCommon.mainView}>

                                <View>

                                    <View style={[styles.cardStyling, styles.cardStylePadding, styles.cardStylingFailure]}>
                                        <Text style={[styles.colStyling, styles.textFailureInABox]}>Keklik gönderilmedi.</Text>
                                    </View>

                                    <View style={styles.cardStyling}>

                                        <View style={[styles.cardStylePadding, styles.cardBorderBottomStyling]}>
                                            <Text style={styles.cardHeader}>BAŞARISIZ İŞLEM</Text>
                                        </View>



                                        <View style={[styles.cardStylePadding]}>
                                            {/*<Grid>*/}
                                            {/*<Col style={{flex: 0.35}}>*/}
                                            {/*<Text style={styles.colStyling}>Hesap</Text>*/}
                                            {/*</Col>*/}
                                            {/*<Col>*/}
                                            {/*<Text style={styles.colStyling}>Birikim Hesabı</Text>*/}
                                            {/*</Col>*/}
                                            {/*</Grid>*/}
                                            <Grid>
                                                <Col style={{flex: 0.45}}>
                                                    <Text style={styles.colStyling}>Gönderilen</Text>
                                                </Col>
                                                <Col>
                                                    <Text style={styles.colStyling}>{this.props.email}</Text>
                                                </Col>
                                            </Grid>
                                            <Grid>
                                                <Col style={{flex: 0.45}}>
                                                    <Text style={styles.colStyling}>Keklik</Text>
                                                </Col>
                                                <Col>
                                                    <Text style={styles.colStyling}>{this.props.gosterilecekMiktar}
                                                        {/*{this.props.tamSayi*/}
                                                            {/*? this.props.tamSayi.toString().concat(',', this.props.ondalik)*/}
                                                            {/*: ''}*/}
                                                    </Text>
                                                </Col>
                                            </Grid>
                                            <Grid>
                                                <Col style={{flex: 0.45}}>
                                                    <Text style={styles.colStyling}>Mesaj</Text>
                                                </Col>
                                                <Col>
                                                    <Text numberOfLines={1} style={styles.colStyling}>{this.props.mesaj}</Text>
                                                </Col>
                                            </Grid>
                                            <Grid>
                                                <Col style={{flex: 0.45}}>
                                                    <Text numberOfLines={2} style={styles.colStyling}>Hata</Text>
                                                </Col>
                                                <Col>
                                                    <Text numberOfLines={2} style={styles.colStyling}>{this.props.hata}</Text>
                                                </Col>
                                            </Grid>
                                        </View>

                                        {/*<View style={styles.cardStylePadding}>*/}
                                        {/*<Text style={styles.largeText}>Hesabınızdan keklik çıkışı olmamıştır.</Text>*/}
                                        {/*</View>*/}

                                    </View>

                                </View>

                                <Button rounded onPress={() => this.replaceRoute('sendMoney')}
                                        style={[styles.loginBtn, styles.loginBtnFailure]} textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}
                                        accessibilityLabel="button_sendMoney">
                                    Tekrar Dene
                                </Button>

                            </View>

                        </Content>
                    </Image>
                </View>

            </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route, passprops) => dispatch(replaceRoute(route, passprops))
    }
}


export default connect(null, bindActions)(SendMoneyFailure);

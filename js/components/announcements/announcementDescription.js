'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect} from 'react-redux';
import { popRoute } from '../../actions/route';
import { Header, Container, Content, Text, View, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import theme from '../../themes/base-theme';
import { accountAndMarket, bkmTheme } from '../../themes/base-style';


class announcementDescription extends Component {

    constructor(props) {
        super(props);
    }

    popRoute(passProps) {
        this.props.popRoute(passProps);
    }


    render() {

        return (
            <Container theme={theme}>

                <Image source={require('../../../images/grad-bg.png')} style={accountAndMarket.background} >

                    <Header style={{paddingLeft: 0}}>
                        <HeaderContent showBackButton={true} headerText={bkmTheme.katIsmi + "  |  Duyuru"}/>
                    </Header>

                    <Content style={accountAndMarket.scrollContent}>

                        <View style={accountAndMarket.cardView}>
                            <Grid style={accountAndMarket.upperGrid}>
                                <Col style={{flex: 0.5}}>
                                    <Thumbnail
                                        source={ this.props.encodedImage ? { uri: 'data:image/png;base64,' + this.props.encodedImage} : require('../../../images/sample-image.png')}
                                        style={accountAndMarket.itemThumb}
                                    />
                                </Col>
                                <Col style={{paddingLeft: 10, justifyContent: 'flex-end'}}>
                                    <Text style={accountAndMarket.cardItemHeader}>{this.props.title}</Text>
                                </Col>
                            </Grid>
                            <Grid style={accountAndMarket.lowerGrid}>
                                <Col style={{paddingLeft: 10}}>
                                    <Text style={accountAndMarket.cardItemBody}>{this.props.description}</Text>
                                </Col>
                            </Grid>
                        </View>

                    </Content>
                </Image>
            </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute:(passprops) => dispatch(popRoute(passprops))
    }
}


export default connect(null, bindActions)(announcementDescription);

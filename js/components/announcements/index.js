'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import { Container, Content, Header, Text, View, Thumbnail } from 'native-base';
import HeaderContent from './../headerContent/';
import { Grid, Col } from 'react-native-easy-grid';
import Utility from '../utility/';
import theme from '../../themes/base-theme';
import { accountAndMarket, bkmThemeCommon, bkmTheme } from '../../themes/base-style';


class Announcements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            millisecondsFromAsyncStorageLatestSaved: 0
        };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        };
    }

    componentWillMount(){
        let url = bkmTheme.serverAddressMarket + '/services/rest/campaign/all';
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                responseData.json()
                    .then((responseJson) => {

                        if (!responseJson) {
                            Alert.alert('Hata', 'Sunucudan duyuru okuma hatası.');
                        }

                        if (responseJson.responseCode != "MRKT0000") {
                            Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                            return;
                        }

                        this.setState({announcements: responseJson.source});
                    })
                    .catch((error) => {
                        Alert.alert('Hata', 'Sunucu entegrasyonunda hata oluştu: '.concat(error));
                    })
            })
            .catch((error)=> {
                Alert.alert('Hata', 'Sunucu hatası: '.concat(error));
            })
            .done();
    }

    componentDidMount() {
        this.fetchLatestAnnouncementDateFromServerAndUpdateAsyncStorage();
    }

    fetchLatestAnnouncementDateFromServerAndUpdateAsyncStorage() {
        let url = bkmTheme.serverAddressMarket + '/services/rest/campaign/newest-campaign-date';
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then( (responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                responseData.json()
                    .then((responseJson) => {

                        if (!responseJson) {
                            Alert.alert('Hata', 'Sunucudan en güncel duyuru tarihi okuma hatası.');
                        }

                        if (responseJson.responseCode != "MRKT0000") {
                            Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                            return;
                        }

                        let millisecondsFromServerForLatestAnnouncement = parseInt(responseJson.source);

                        try {
                            AsyncStorage.getItem(Utility.getDuyuruLatestMillisecondObjectName())
                                .then((strObj) => {
                                    let mrktName = bkmTheme.marketName;

                                    if (!strObj) {
                                        strObj = {};
                                    } else {
                                        strObj = JSON.parse(strObj);
                                        let millisecondsFromAsyncStorageLatestSaved = strObj[mrktName];
                                        this.setState({millisecondsFromAsyncStorageLatestSaved});
                                    }
                                    strObj[mrktName] = millisecondsFromServerForLatestAnnouncement;

                                    AsyncStorage.setItem(Utility.getDuyuruLatestMillisecondObjectName(), JSON.stringify(strObj));
                                }).done();

                        } catch (error) {
                            Alert.alert('Hata', 'En güncel duyuru tarihi yazarken hata oluştu: '.concat(error));
                            console.log('En güncel duyuru tarihi yazarken hata oluştu. ', concat(error));
                        }

                    })
                    .catch((error) => {
                        Alert.alert('Hata', 'Sunucu duyuru entegrasyonunda hata oluştu: '.concat(error));
                    });
            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI... Hata: /services/rest/campaign/newest-campaign-date: ', error.message);
            });
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
         this.props.pushNewRoute(route, passProps);
    }

    _onDescriptionTextClick(item) {
        let obj = {
            title: item.title,
            description: item.description,
            encodedImage: item.encodedImage
        };
        this.pushNewRoute('announcementDescription', obj);
    }

    _showNewAnnouncementAlert(startDate) {
        return parseInt(startDate) > parseInt(this.state.millisecondsFromAsyncStorageLatestSaved);
    }


    render() {

        //Yellow Warning'leri kaldiriyor:
        //console.disableYellowBox = true;

        var announcements = [];

        if (this.state.announcements.length === 0 && !this.props.loaderVisible) {
            announcements.push(
                <View style={[accountAndMarket.cardView, accountAndMarket.accountNoPurchaseCard ]} key={'noItem'}>
                    <Image source={require('../../../images/nothing-here.png')} style={accountAndMarket.accountNothingImage}/>
                    <Text style={accountAndMarket.accountNoHistoryText}>Duyuru bulunmamaktadır.</Text>
                </View>
            );
        } else {
            for (let i = 0; i < this.state.announcements.length; i++) {
                let item = this.state.announcements[i];

                announcements.push(
                    <View style={[accountAndMarket.cardView, bkmThemeCommon.cardStylePadding]} key={item.id}>

                        <Grid>
                            <Col style={{flex: 0.5}}>
                                <Thumbnail
                                    source={ item.encodedImage ? { uri: 'data:image/png;base64,' + item.encodedImage} : require('../../../images/announcement-sample.png')}
                                    style={accountAndMarket.itemThumb}
                                />
                            </Col>
                            <Col style={{paddingLeft: 10}}>
                                <TouchableOpacity onPress={() => this._onDescriptionTextClick(item)}>
                                    <Text style={accountAndMarket.cardItemHeader} numberOfLines={2}
                                          accessibilityLabel="market_itemTitle">{item.title}
                                    </Text>
                                    <Text style={accountAndMarket.cardItemBody} numberOfLines={3}
                                          accessibilityLabel="market_itemDescription">{item.description}
                                    </Text>

                                </TouchableOpacity>
                            </Col>
                        </Grid>

                        {this._showNewAnnouncementAlert(item.startDate)
                            ?
                            <View style={bkmTheme.newAnnouncementCard}/>
                            :
                            <View />
                        }

                    </View>
                );
            }
        }


        return (
            <Container theme={theme}>
                <Image source={require('../../../images/grad-bg.png')} style={bkmThemeCommon.container} >

                    <Header style={{paddingLeft: 0}}>
                        <HeaderContent showHamburger={true} headerText={bkmTheme.katIsmi.concat("  |  Duyurular")} />
                    </Header>

                    <Content style={accountAndMarket.purchasedListContent}>
                        {announcements}
                    </Content>

                </Image>
            </Container>
        )
    }

}


function mapStateToProps(state) {
    return {
        user: state.user,
        loaderVisible: state.loading.loaderVisible
    };
}

function bindActions(dispatch){
    return {
        replaceRoute:(route, passprops) => dispatch(replaceRoute(route, passprops)),
        pushNewRoute:(route, passprops) => dispatch(pushNewRoute(route, passprops))
    }
}


export default connect(mapStateToProps, bindActions)(Announcements);

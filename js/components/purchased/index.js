'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import { Container, Content, Header, Text, View } from 'native-base';
import HeaderContent from './../headerContent/';
import { Grid, Col } from 'react-native-easy-grid';
import Utility from '../utility/';
import theme from '../../themes/base-theme';
import { accountAndMarket, bkmThemeCommon, bkmTheme } from '../../themes/base-style';



class Purchased extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pnrs: [
                // {
                //     "id": '100',
                //     "title": "HOT WHEELS GREEN CAR 332",
                //     "pnr_no": '455AV19001',
                //     price: {'integerPart': '22', 'fractionalPart': '45'},
                //     "tarih": "5/10.2016 20:00 Tarihinde satın alındı."
                // },
                // {
                //     "id": '101',
                //     "title": 'CINEMAMAXIMUM SINEMA BILETI 2D',
                //     "pnr_no": '624AP20300',
                //     price: {'integerPart': '22', 'fractionalPart': '45'},
                //     "tarih": "5/10.2016 20:10 Tarihinde satın alındı.",
                //     "description": 'Biletinizi 30 gün icerisinde kullanabilirsiniz. Bu PNR kodu adiniza tanimli olup sadece sizin tarafinizdan kullanilabilir.'
                // },
                // {
                //     "id": '102',
                //     "title": 'PRESTIGE SINEMA BILETI IMAX',
                //     "pnr_no": '112FT194509',
                //     price: {'integerPart': '22', 'fractionalPart': '45'},
                //     "tarih": "6/10.2016 14:00 Tarihinde satın alındı."
                // },
                // {
                //     "id": '103',
                //     "title": "T2 YEMEKHANE",
                //     "pnr_no": '455AV19001',
                //     //price: {'integerPart': '22', 'fractionalPart': '45'},
                //     "tarih": "5/10.2016 20:00 Tarihinde satın alındı."
                // },
                // {
                //     "id": '104',
                //     "title": "BOLU YEDIGOLLER GEZI",
                //     "pnr_no": '455AV19001',
                //     price: {'integerPart': '22', 'fractionalPart': '45'},
                //     "tarih": "5/10.2016 20:00 Tarihinde satın alındı."
                // }
            ]
        };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object
        };

        //this._msToDate = this._msToDate.bind(this);
        //this._msToHour = this._msToHour.bind(this);
    }

    componentWillMount(){

        let url = bkmTheme.serverAddressMarket + '/services/rest/user/purchaseditems';
        fetch(url, {
            // method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.token
            }
        })
            .then((responseData)=>responseData.json())
            .then((responseJson) => {
                //console.log('PNR Response: ', responseJson);

                if (responseJson.responseCode == "MRKT0001") {
                    // Alert.alert('Hata', 'Sunucu genel hata.');
                    // Sunucudan hic source data gelmedi. Kullanici hicbir item satin almamis olabilir.
                    return;
                } else if (responseJson.responseCode != "MRKT0000") {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                    return;
                }

                this.setState({pnrs: responseJson.source});

            })
            .catch((error)=> {
                Alert.alert('Hata', 'Sunucu hatası: '.concat(error));
            })
            .done();
    }

    replaceRoute(route, passProps) {
        this.props.replaceRoute(route, passProps);
    }

    pushNewRoute(route, passProps) {
         this.props.pushNewRoute(route, passProps);
    }

    silinsinMi(pnr_id, pnr_title) {
        Alert.alert(
            'PNR: '.concat(pnr_title),
            'Dikkat silinecek!',
            [
                //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Vazgeç', style: 'cancel'},
                {text: 'Sil', onPress: () => this.silinsin(pnr_id)},
            ]
        )
    };

    silinsin(pnr_id) {
        if (this.state.pnrs) {
            var tempPnrs = this.state.pnrs;
            var index = '';

            for (var i = 0; i < tempPnrs.length; i++) {
                if (tempPnrs[i].id == pnr_id) {
                    index = i;
                }
            }

            //TODO Burada server'a gidip PNR'i silmemiz gerekiyor.
            if (index) {
                tempPnrs.splice(index, 1);
                this.setState({pnrs: tempPnrs}); //update state, and this will force to re-render!
            }
        }
    }


    render() {

        //Yellow Warning'leri kaldiriyor:
        //console.disableYellowBox = true;

        var pnrs = [];

        if(this.state.pnrs.length === 0 && !this.props.loaderVisible) {
            pnrs.push(
                <View style={[accountAndMarket.cardView, accountAndMarket.accountNoPurchaseCard ]} key={'noPnrsItem'} accessibilityLabel="purchased_itemBox">
                    <Image source={require('../../../images/nothing-here.png')} style={accountAndMarket.accountNothingImage} accessibilityLabel="no-purchased-image"/>
                    <Text style={accountAndMarket.accountNoHistoryText} accessibilityLabel="no-history-text1">Satın aldığınız ürün bulunmamaktadır.</Text>
                    {/*<Text style={accountAndMarket.accountNoHistoryText} accessibilityLabel="no-history-text2">Yaptığınız işlemleri buradan takip edebilirsiniz.</Text>*/}
                </View>
            );
        }
        else {
            for (let i = 0; i < this.state.pnrs.length; i++) {
                let item = this.state.pnrs[i];

                pnrs.push(
                    <View style={bkmThemeCommon.cardStyling} key={item.assetDTO.createDate}>
                        <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>

                            <Grid >
                                <Col style={{flex: 0.9}}>
                                    <Text style={bkmThemeCommon.cardTitle}>{item.marketItem.title}</Text>
                                </Col>
                                <Col style={[{flex: 0.1}, bkmThemeCommon.justifyToRight]}>
                                    {/*<TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.silinsinMi(item.id, item.title)}>
                                     <Image source={require('../../../images/cross-tiny@2x.png')} style={{width:10, height:10}} />
                                     </TouchableOpacity>*/}
                                </Col>
                            </Grid>
                        </View>

                        <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>
                            <Text selectable={true} style={bkmThemeCommon.largeText}>{item.assetDTO.assetName}</Text>
                        </View>

                        <View style={bkmThemeCommon.cardSectionPadding}>
                            <Text
                                style={bkmThemeCommon.cardSectionColorLite}>{item.marketItem.price.integerPart},{item.marketItem.price.fractionalPart} Keklik</Text>
                            <Text style={bkmThemeCommon.cardSectionColorLite}>{Utility.millisecondToDate(item.assetDTO.updateDate)}
                                - {Utility.millisecondToHour(item.assetDTO.updateDate)}</Text>
															<TouchableOpacity onPress={() => this.pushNewRoute('marketPurchaseDescription', {purchasedItemTitle: item.marketItem.title, purchasedItemDescription: item.marketItem.description})} accessibilityLabel="market_itemDescription_all">
                                <Text style={bkmThemeCommon.cardSectionColorLite}
                                      numberOfLines={5}>
                                    {item.marketItem.description ? item.marketItem.description : ''}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
        }

        // this.state.pnrs.forEach(function(item) {
        //     pnrs.push(
        //         <View style={bkmThemeCommon.cardStyling} key={item.createDate}>
        //             <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>
        //
        //                 <Grid >
        //                     <Col style={{flex: 0.9}}>
        //                         <Text style={bkmThemeCommon.cardTitle}>{item.assetName}</Text>
        //                     </Col>
        //                     <Col style={[{flex: 0.1}, bkmThemeCommon.justifyToRight]}>
        //                         <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.silinsinMi(item.id, item.title)}>
        //                             <Image source={require('../../../images/cross-tiny@2x.png')} style={{width:10, height:10}} />
        //                         </TouchableOpacity>
        //                     </Col>
        //                 </Grid>
        //             </View>
        //
        //             <View style={[bkmThemeCommon.cardSectionPadding, bkmThemeCommon.cardSectionBorderBottom]}>
        //                 <Text style={bkmThemeCommon.largeText}>{item.assetName}</Text>
        //             </View>
        //
        //             <View style={bkmThemeCommon.cardSectionPadding}>
        //                 <Text style={bkmThemeCommon.cardSectionColorLite}>{item.creditValue} Keklik</Text>
        //                 <Text style={bkmThemeCommon.cardSectionColorLite}>{Utility.millisecondToDate(item.createDate)} - {Utility.millisecondToHour(item.createDate)}</Text>
        //                 {/*<Text style={bkmThemeCommon.cardSectionColorLite}>{item.description ? item.description: ''}</Text>*/}
        //             </View>
        //         </View>
        //     );
        // }.bind(this));


        return (
            <Container theme={theme}>
                <Image source={require('../../../images/grad-bg.png')} style={bkmThemeCommon.container} >

                    <Header style={{paddingLeft: 0}}>
                        <HeaderContent showHamburger={true} headerText={bkmTheme.katIsmi.concat("  |  Satın Aldıklarım")} />
                    </Header>

                    <Content style={accountAndMarket.purchasedListContent}>
                        {pnrs}
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


export default connect(mapStateToProps, bindActions)(Purchased);

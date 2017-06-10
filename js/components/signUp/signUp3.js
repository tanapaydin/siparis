'use strict';

import React, { Component } from 'react';
import { Image, Platform, TouchableOpacity, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect} from 'react-redux';
import { pushNewRoute, popRoute } from '../../actions/route';
import { Container, Button, View, Text } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import { bkmTheme, bkmThemeCommon } from '../../themes/base-style';



class SignUp3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    };

    pushNewRoute(route, passProps) {
        this.props.pushNewRoute(route, passProps);
    };

    popRoute() {
        this.props.popRoute();
    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    onSubmit() {
        Keyboard.dismiss(); // Giris yap'a basilinca klavyenin kaybolmasi icin.

        let signObj = {email: this.state.email}
        this.pushNewRoute('signUp4', {signObj: signObj});
        return;



        if (!this.validateEmail(this.state.email)) {
            Alert.alert('Hata', 'E-posta hatalı.');
            return;
        }

        let url = bkmTheme.serverAddressMarket + '/services/rest/user/check/registration/allowed/' + encodeURIComponent(this.state.email);

        fetch(url)
            .then((responseData)=>responseData.json())
            .then((responseData) => {

                if (responseData.responseCode == "MRKT0009") {
                    //Do nothing. This is the majority of the cases.
                } else if (responseData.responseCode == "MRKT0010") {
                    //MRKT0010: Pasif ise kullanici uye olamaz
                    this.pushNewRoute('signUpNextUndefined');
                    return;
                } else if (responseData.responseCode == "MRKT0004") {
                    //Zaten AKTIF
                    Alert.alert('Hata', 'Kullanıcı sistemde aktif durumda. Giriş Yap tuşuna tıkladıktan sonra şifremi unuttum sürecini işletmeniz gerekiyor.');
                    return;
                } else if (responseData.responseCode == "MRKT0024") {
                    // MRKT0024: (IKINCI UYGULAMA SENARYOSU)
                    // Kullanici katta yok ama chain'de AKTIF olarak var
                    Alert.alert('Hata', 'Bağlı olduğunuz katınızın uygulamasına giderek şifremi unuttum sürecini işletmeniz gerekiyor.');
                    return;
                } else {
                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                    return;
                }

                let signObj = {email: this.state.email}
                this.pushNewRoute('signUpNext', {signObj: signObj})
            })
            .catch((error)=> {
                console.log('NETWORK HATASI SAYFASINA YONLENDIRILMELI...');
                this.pushNewRoute('signUpNextUndefined')
            })
            .done();
    };

    onBackButtonPress() {
        //Not: SendMoney'deki TouchableWithoutFeedback isi gormuyor. O nedenle "Keyboard.dismiss();" ekledik buraya.
        Keyboard.dismiss();
        this.popRoute();
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title: 'Lütfen Özçekim Ekleyiniz',
            cancelButtonTitle: 'Vazgeç',
            takePhotoButtonTitle: 'Şimdi Fotoğraf Çek',
            chooseFromLibraryButtonTitle: 'Galeriden Fotoğraf Seç'
        };


        if (isCameraOnly) {
            // Sadece kamerayi available etmek icin.
            ImagePicker.launchCamera(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                    //console.log('User cancelled photo picker');
                } else if (response.error) {
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    var source;
                    // You can display the image using either:
                    // source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    source = {data: response.data, isStatic: true};

                    // Or:
                    if (Platform.OS === 'android') {
                        source = {uri: response.uri, isStatic: true, data: response.data};
                    } else {
                        source = {uri: response.uri.replace('file://', ''), isStatic: true, data: response.data};
                    }

                    this.setState({avatarSource: source});
                }
            });
        }
        else {

            // Kamera ve galeri icin.
            ImagePicker.showImagePicker(options, (response) => {
                //console.log('Response = ', response);

                if (response.didCancel) {
                    //console.log('User cancelled photo picker');
                } else if (response.error) {
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    var source;
                    // You can display the image using either:
                    // source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    source = {data: response.data, isStatic: true};

                    // Or:
                    if (Platform.OS === 'android') {
                        source = {uri: response.uri, isStatic: true, data: response.data};
                    } else {
                        source = {uri: response.uri.replace('file://', ''), isStatic: true, data: response.data};
                    }

                    this.setState({avatarSource: source});
                }
            });
        }
    }


    render() {
        return (
            <Container>
                <View theme={theme}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                            {/*<Header style={{paddingLeft: 0}}>*/}
                            {/*<HeaderContent showBackButton={true} showLogo={true} />*/}
                            {/*</Header>*/}


                            <View style={styles.signupContainer}>

                                <View style={styles.signUpLogoContainer}>
                                    <Image source={require('../../../images/launch-logo.png')} style={styles.signUpLogo} />
                                </View>

                                <View style={styles.statusBarContainer}>
                                    <View style={styles.statusBar}></View>
                                    <View style={styles.statusBar}></View>
                                    <View style={[styles.statusBar, {backgroundColor: bkmTheme.redColor, opacity: 1}]}></View>
                                    <View style={styles.statusBar}></View>
                                </View>

                                {/*<View style={[styles.avatar, styles.avatarContainer, {backgroundColor: 'yellow'}]}>*/}
                                    {/*{ this.state.avatarSource === null ?*/}
                                        {/*<Image source={require('../../../images/pic-add.png')} style={styles.avatar} />*/}
                                        {/*:*/}
                                        {/*<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>*/}
                                            {/*<Image source={this.state.avatarSource} style={styles.avatar} />*/}
                                        {/*</TouchableOpacity>*/}
                                    {/*}*/}
                                {/*</View>*/}

                                <View>
                                    <View style={{alignSelf: 'center', height: 110}}>
                                        <Image source={require('../../../images/pic-add.png')} style={{width: 110, height: 110}} />
                                    </View>

                                    <View style={{height: 50, marginBottom: 20}}>
                                        <Text style={styles.infoText}>Dijital kimliğinizi oluşturmak için</Text>
                                        <Text style={styles.infoText}>fotoğrafınıza ihtiyacımız var.</Text>
                                    </View>

                                    <View style={{height: 40}}>
                                        <Button rounded
                                                onPress={() => { this.onBackButtonPress(); }}
                                                style={styles.cameraBtn}
                                                textStyle={{color: '#4E4944', fontSize: 15, fontWeight: '500'}}>
                                            Kamerayı aç
                                        </Button>
                                    </View>
                                </View>



                                <View style={[bkmThemeCommon.gridColumnAffect, bkmThemeCommon.signUpBtnContainer]}>
                                    <Button rounded
                                            onPress={() => { this.onBackButtonPress(); }}
                                            style={styles.backBtn}
                                            textStyle={{color: '#4E4944', fontSize: 15, fontWeight: '500'}}>
                                        Geri
                                    </Button>

                                    <Button rounded
                                            onPress={() => { this.onSubmit(); }}
                                            style={styles.nextBtn}
                                            textStyle={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
                                        Devam et
                                    </Button>
                                </View>
                                
                            </View>


                        </Image>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute: (route, passprops) => dispatch(pushNewRoute(route, passprops)),
        popRoute:() => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp3);

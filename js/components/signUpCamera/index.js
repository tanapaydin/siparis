'use strict';

import React, {Component} from "react";
import {Image, Platform, Alert, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {popRoute, pushNewRoute} from "../../actions/route";
import {Container, Header, Button, View, Text} from "native-base";
import HeaderContent from '../headerContent/';
import ImagePicker from "react-native-image-picker";
import theme from '../../themes/base-theme';
import styles from "./styles";
import { isCameraOnly } from '../../themes/base-style';

class SignUpCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        };
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

    onSubmit() {

        if (this.state.avatarSource == null) {
            Alert.alert('Hata', 'Lütfen geçerli bir profil resmi oluşturun.', [{text: 'Tamam'}]);
            return;
        }

        let signObj = {
            name: this.props.signObj.name,
            surname: this.props.signObj.surname,
            phone: this.props.signObj.phone,
            email: this.props.signObj.email,
            avatarSource: this.state.avatarSource
        };

        this.pushNewRoute('signUpPin', {signObj: signObj});
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

    // renderConditionalComponent() {
    //     if (this.state.avatarSource != null) {
    //         < Button rounded transparent block
    //                  onPress={() => {
    //                      this.pushNewRoute('signUpCamera')
    //                  }}
    //                  style={[styles.signupBtn]}>
    //             Bu fotografı kullan
    //         </Button>
    //
    //     }
    // }

    render() {
        return (
            <Container>
                <View theme={theme}>
                    <Image source={require('../../../images/grad-bg.png')} style={styles.background}>

                        <Header style={{paddingLeft: 0}}>
                            <HeaderContent showBackButton={true} showLogo={true} />
                        </Header>

                        <View style={styles.mainView}>

                            <View style={styles.signupContainer}>
                                    <View style={[styles.avatar, styles.avatarContainer]}>
                                        { this.state.avatarSource === null ?
                                            <Image source={require('../../../images/pic-add.png')} style={styles.avatar} />
                                            :
                                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                                <Image source={this.state.avatarSource} style={styles.avatar} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                            </View>

                            <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                                <Text style={styles.infoText}>Dijital kimliğinizi oluşturmak için şimdi fotoğrafınızı çekmeniz gerekiyor.</Text>
                            </View>

                            {this.state.avatarSource === null ?
                                <Button rounded transparent block
                                        onPress={() => this.selectPhotoTapped() }
                                        style={styles.signupBtn}
                                        textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                    Kamerayı aç
                                </Button>
                                :
                                <Button rounded transparent block
                                        onPress={() => this.onSubmit() }
                                        style={styles.signupBtn}
                                        textStyle={{color: '#4E4944', fontSize: 17, fontWeight: '800'}}>
                                    Kayıt ol
                                </Button>
                            }

                            {/*{this.renderConditionalComponent}*/}

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
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUpCamera);

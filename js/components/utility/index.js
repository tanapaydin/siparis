'use strict';

import { Alert, AsyncStorage, Platform } from "react-native";
import Keychain from 'react-native-keychain';
import { connect } from "react-redux";
import ReactAES from 'react-native-aes-encryption';
import RSAKey from 'react-native-rsa';
import { bkmTheme } from '../../themes/base-style';
import GlobalStore from './GlobalStore';
import { showLoader as showLoaderAction, hideLoader as hideLoaderAction } from '../../actions/loading';
import pinchFetch from './pinchUtil';

const RNFS = require('react-native-fs');



var hideTimeout = null;
const showLoaderDebounce = function() {
    if ( hideTimeout ) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    } else {
        Utility.dispatch(showLoaderAction());
    }
};

const hideLoaderDebounce = function() {
    var later = function() {
        hideTimeout = null;
        Utility.dispatch(hideLoaderAction());
    };
    if ( !hideTimeout ) {
        hideTimeout = setTimeout(later, 100);
    }
};

let fetchCounter = 0;
export default class Utility {

    static dispatch(e) {
        GlobalStore.dispatch(e);
    }

    static getReduxState() {
        return GlobalStore.getState();
    }

    static showLoader() {
        if (fetchCounter == 0) {
            showLoaderDebounce();
        }
        ++fetchCounter;
    }

    static hideLoader() {
        --fetchCounter;
        if (fetchCounter == 0) {
            hideLoaderDebounce();
        }
    }


    // ---------------------------------------------------------------------------------------------------------

    static generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    // ---------------------------------------------------------------------------------------------------------

    // Convert a hex string to a byte array
    static hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    static objectToByte(obj) {
        var bytes = [];
        for (var i = 0; i < obj.length; ++i) {
            bytes.push(obj.charCodeAt(i));
        }
        return bytes;
    }

    static byteToObject(bytes) {
        // const binArrayToString = array => array.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
        // return binArrayToString;
        return String.fromCharCode.apply(null, bytes);
        // for (var i = 0; i < bytes.length; ++i) {
        //     bytes.push(bytes[i].charCodeAt(i));
        // }
    }

    // Convert a byte array to a hex string
    static bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    static encryptAndSave(signObj, pin, pushNewRoute) {

        //Generate RSA keys:
        const bits = 1024;
        const exponent = '10001'; // must be a string. This is hex string. decimal = 65537

        var rsa = new RSAKey();
        rsa.generate(bits, exponent);
        var publicKeyStr = rsa.getPublicString(); // return json encoded string
        var privateKeyStr = rsa.getPrivateString(); // return json encoded string

        var publicKeyJson = JSON.parse(publicKeyStr);
        var privateKeyJson = JSON.parse(privateKeyStr);

        // --------------------------------------------------------------------------------
        // // Encrypt:
        //
        // rsa = new RSAKey();
        // rsa.setPublicString(publicKeyStr);
        // var originText = 'sample String Value';
        // var encrypted = rsa.encrypt(originText);
        //
        //
        // // Decrypt:
        //
        // rsa.setPrivateString(privateKeyStr);
        // var decrypted = rsa.decrypt(encrypted); // decrypted == originText
        // --------------------------------------------------------------------------------

        var rsa2 = new RSAKey();
        rsa2.generate(bits, exponent);
        // var publicKeyStr2 = rsa2.getPublicString(); // return json encoded string
        var rStr = rsa2.getPrivateString(); // return json encoded string (Random r)
        var rJson = JSON.parse(rStr);

        var privateKey_n_bytes = this.objectToByte(privateKeyJson.n);
        var privateKey_e_bytes = this.objectToByte(privateKeyJson.e);
        var privateKey_d_bytes = this.objectToByte(privateKeyJson.d);
        var privateKey_p_bytes = this.objectToByte(privateKeyJson.p);
        var privateKey_q_bytes = this.objectToByte(privateKeyJson.q);
        var privateKey_dmp1_bytes = this.objectToByte(privateKeyJson.dmp1);
        var privateKey_dmq1_bytes = this.objectToByte(privateKeyJson.dmq1);
        var privateKey_coeff_bytes = this.objectToByte(privateKeyJson.coeff);

        var r_n_bytes = this.objectToByte(rJson.n);
        var r_e_bytes = this.objectToByte(rJson.e);
        var r_d_bytes = this.objectToByte(rJson.d);
        var r_p_bytes = this.objectToByte(rJson.p);
        var r_q_bytes = this.objectToByte(rJson.q);
        var r_dmp1_bytes = this.objectToByte(rJson.dmp1);
        var r_dmq1_bytes = this.objectToByte(rJson.dmq1);
        var r_coeff_bytes = this.objectToByte(rJson.coeff);

        var xored_n_bytes = [];
        var xored_e_bytes = [];
        var xored_d_bytes = [];
        var xored_p_bytes = [];
        var xored_q_bytes = [];
        var xored_dmp1_bytes = [];
        var xored_dmq1_bytes = [];
        var xored_coeff_bytes = [];

        for (let i = 0; i < privateKey_n_bytes.length; i++) {
            xored_n_bytes.push(privateKey_n_bytes[i] ^ r_n_bytes[i]);
        }
        for (let i = 0; i < privateKey_e_bytes.length; i++) {
            xored_e_bytes.push(privateKey_e_bytes[i] ^ r_e_bytes[i]);
        }
        for (let i = 0; i < privateKey_d_bytes.length; i++) {
            xored_d_bytes.push(privateKey_d_bytes[i] ^ r_d_bytes[i]);
        }
        for (let i = 0; i < privateKey_p_bytes.length; i++) {
            xored_p_bytes.push(privateKey_p_bytes[i] ^ r_p_bytes[i]);
        }
        for (let i = 0; i < privateKey_q_bytes.length; i++) {
            xored_q_bytes.push(privateKey_q_bytes[i] ^ r_q_bytes[i]);
        }
        for (let i = 0; i < privateKey_dmp1_bytes.length; i++) {
            xored_dmp1_bytes.push(privateKey_dmp1_bytes[i] ^ r_dmp1_bytes[i]);
        }
        for (let i = 0; i < privateKey_dmq1_bytes.length; i++) {
            xored_dmq1_bytes.push(privateKey_dmq1_bytes[i] ^ r_dmq1_bytes[i]);
        }
        for (let i = 0; i < privateKey_coeff_bytes.length; i++) {
            xored_coeff_bytes.push(privateKey_coeff_bytes[i] ^ r_coeff_bytes[i]);
        }


        var xoredJson = {
            'n': this.byteToObject(xored_n_bytes),
            'e': this.byteToObject(xored_e_bytes),
            'd': this.byteToObject(xored_d_bytes),
            'p': this.byteToObject(xored_p_bytes),
            'q': this.byteToObject(xored_q_bytes),
            'dmp1': this.byteToObject(xored_dmp1_bytes),
            'dmq1': this.byteToObject(xored_dmq1_bytes),
            'coeff': this.byteToObject(xored_coeff_bytes),
        };


        // Generate hash of Pin, encrypt digital identity and save:

        //let key = this.state.pin1;
        let key = pin;

        //32 bit length--"d13feb0b7ed7395ccb96e3b603d24705"
        ReactAES.sha256(encodeURIComponent(key), 32)
            .then(result => {

                var hashOfPin = result;

                signObj.publicKey_n = publicKeyJson.n;
                signObj.privateKey = privateKeyJson;
                signObj.pkxork = JSON.stringify(xoredJson);

                const digitalIdentity = JSON.stringify(signObj);
                var diStr = JSON.stringify(digitalIdentity);

                if (Platform.OS === 'android') {
                    ReactAES.encrypt(diStr, hashOfPin, "RHmr7oOkWR+Zhqg=")
                        .then(encryptedDIStr => {
                            this.sendRandomThenRegisterThenSaveToKeychain(signObj, rStr, hashOfPin, encryptedDIStr, pushNewRoute);
                        })
                        .catch(error => {
                            Utility.hideLoader();
                            console.log(error)
                        })
                } else {
                    // iPhone 4S ve 5 icin decryption yaparken patliyor. O nedenle butun iPhone'lar icin
                    // encryption ve decryption olaylarini kaldirdik. Zaten keychain'e yazdigimiz icin, kendisi
                    // sifrelenmis/guvenli oluyor.
                    this.sendRandomThenRegisterThenSaveToKeychain(signObj, rStr, hashOfPin, diStr, pushNewRoute);
                }
            })
            .catch(error => {
                Utility.hideLoader();
                console.log(error);
            }
        );

    }

    static sendRandomThenRegisterThenSaveToKeychain(signObj, rStr, hashOfPin, digitalIdentity, pushNewRoute) {
        //Merkez Bankasina Random uretilen 'r' degerini gonder:
        let url = bkmTheme.serverAddressCoinGenerator + '/services/rest/user/prime/';
        //Yarim saniye (500ms) beklet
        setTimeout(() => Utility.hideLoader(), 500);
        pinchFetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: signObj.email,
                code: rStr //R bilgisi MB'ye gidiyor
            })
        })
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                if (!responseData.bodyString) {
                    Alert.alert('Hata', 'Kütüphane hatası.');
                    return;
                }

                try {
                    let responseJson = JSON.parse(responseData.bodyString);

                    if (!responseJson || "CG0000" !== responseJson.responseCode) {
                        Alert.alert('Hata', 'Sunucu entegrasyonu json hatası.');
                        return;
                    }

                    //Kat server'a registration yap:
                    let url = bkmTheme.serverAddressMarket + '/services/rest/user/register/';
                    pinchFetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: signObj.name,
                            surname: signObj.surname,
                            email: signObj.email,
                            phone: signObj.phone,
                            publicKey: signObj.publicKey_n,
                            publicKeyExponent: "10001",
                            pkxork: signObj.pkxork, //PrimaryKeyPrime bilgisi Kat'a gidiyor
                            selfie: signObj.avatarSource ? signObj.avatarSource.data : ''
                        })
                    })
                        .then((responseData) => {

                            // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                            if (responseData.status !== 200) {
                                Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                                return;
                            }

                            if (!responseData.bodyString) {
                                Alert.alert('Hata', 'Kütüphane hatası.');
                                return;
                            }

                            try {
                                let responseJson = JSON.parse(responseData.bodyString);

                                if (!responseJson) {
                                    Alert.alert('Hata', 'Sunucu entegrasyonu register json hatası.');
                                    return;
                                }

                                if (responseJson.responseCode == "MRKT0008") {
                                    //BASARILI: Basvurunuz alindi incelemeden sonra onaylanacaktir.
                                    //Do nothing in this if-block. This is the expected scenario for majority of the cases.
                                    // registerDevice could also be added here.
                                } else if (responseJson.responseCode == "MRKT0003") {
                                    Alert.alert('Hata', 'Aday kullanıcılar arasında değilsiniz.');
                                    return;
                                } else if (responseJson.responseCode == "MRKT0004") {
                                    Alert.alert('Hata', 'Kullanıcı zaten aktif.');
                                    return;
                                } else if (responseJson.responseCode == "MRKT0006") {
                                    Alert.alert('Hata', 'Kullanıcı pasif durumda.');
                                    return;
                                } else if (responseJson.responseCode == "MRKT0002") {
                                    Alert.alert('Hata', 'Hatalı parametre.');
                                    return;
                                } else if (responseJson.responseCode != "MRKT0008") {
                                    Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                                    return;
                                }


                                // AsyncStorage.setItem("digitalIdentity", encryptedDIStr);
                                // AsyncStorage.setItem("hashOfPin", hashOfPin);
                                let server = bkmTheme.serverAddressCoinGenerator;
                                let username = bkmTheme.marketName; // username is the original(initial) client market.
                                let passString = JSON.stringify({
                                    digitalIdentity: digitalIdentity, // Eski encryptedDIStr
                                    hashOfPin: hashOfPin
                                });

                                if (Platform.OS === 'android') {

                                    RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/Android/data/di.txt', passString, 'utf8')
                                        .then((success) => {
                                            // console.log('FILE WRITTEN!');
                                            pushNewRoute('signUpResult', {signObj: signObj});
                                        })
                                        .catch((err) => {
                                            console.log(err.message);
                                            Alert.alert('Hata', 'Kimlik bilgisi oluşturulurken hata oluştu.');
                                        });

                                } else {

                                    Keychain.setInternetCredentials(server, username, passString)
                                        .then((result) => pushNewRoute('signUpResult', {signObj: signObj}) )
                                        .catch((error)=> {
                                            Alert.alert('Hata', 'Kimlik bilgisi kaydedilirken hata oluştu.');
                                            console.log(error);
                                        })
                                        .done();
                                }

                            } catch(error) {
                                console.log('Register POST JSON ERROR', error)
                            }

                        })
                        .catch((error)=> {
                            console.log('Register POST ERROR', error.message)
                        })
                        .done();

                } catch(error) {
                    console.log('MB POST JSON ERROR', error)
                }

            })
            .catch((error)=> {
                console.log('MB POST ERROR', error.message)
            })
            .done();
    }



    static doAutomaticRegistrationFromAnotherApp(signObj, resetRoute, deviceToken, deviceOS) {

        //Kat server'a registration yap:
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/register/';
        pinchFetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: signObj.name,
                surname: signObj.surname,
                email: signObj.email,
                phone: signObj.phone,
                publicKey: signObj.publicKey_n,
                publicKeyExponent: "10001",
                pkxork: signObj.pkxork, //PrimaryKeyPrime bilgisi Kat'a gidiyor
                selfie: signObj.avatarSource ? signObj.avatarSource.data : ''
            })
        })
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                if (!responseData.bodyString) {
                    Alert.alert('Hata', 'Kütüphane hatası.');
                    return;
                }

                try {
                    let responseJson = JSON.parse(responseData.bodyString);

                    if (!responseJson) {
                        Alert.alert('Hata', 'Sunucu entegrasyon register json hatası.');
                        return;
                    }

                    if (responseJson.responseCode == "MRKT0008") {
                        //BASARILI: Basvurunuz alindi incelemeden sonra onaylanacaktir.
                        //Do nothing in this if-block. This is the expected scenario for majority of the cases.
                    } else if (responseJson.responseCode == "MRKT0003") {
                        Alert.alert('Hata', 'Aday kullanıcılar arasında değilsiniz.');
                        return;
                    } else if (responseJson.responseCode == "MRKT0004") {
                        Alert.alert('Hata', 'Kullanıcı zaten aktif.');
                        return;
                    } else if (responseJson.responseCode == "MRKT0006") {
                        Alert.alert('Hata', 'Kullanıcı pasif durumda.');
                        return;
                    } else if (responseJson.responseCode == "MRKT0002") {
                        Alert.alert('Hata', 'Hatalı parametre.');
                        return;
                    } else if (responseJson.responseCode != "MRKT0008") {
                        Alert.alert('Hata', 'Sunucudan beklenmeyen bir cevap geldi.');
                        return;
                    }


                    Alert.alert('Tebrikler', 'Şifrenle artık BBN '.concat(bkmTheme.katIsmi, ' uygulamasına giriş yapabilirsin.'));
                    resetRoute();

                } catch(error) {
                    console.log('Register POST JSON ERROR', error)
                }

            })
            .catch((error)=> {
                console.log('Register POST ERROR', error.message)
            })
            .done();
    }


    static kimlikBilgilerimiSil(userEmail, deviceUuid, resetRoute, login) {

        let server = bkmTheme.serverAddressCoinGenerator;
        let username = bkmTheme.marketName; // username is the original(initial) client market.
        let passString = JSON.stringify({
            digitalIdentity: '',
            hashOfPin: ''
        });

        if (Platform.OS === 'android') {

            RNFS.unlink(RNFS.ExternalStorageDirectoryPath + '/Android/data/di.txt')
                .then(() => this.doKimlikBilgilerimiSil(userEmail, deviceUuid, resetRoute, login))
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                    console.log('Kimlik bilgileri silinirken hata oldu: ', err.message);
                });

        } else {
            // Here there might be some issues.
            // If user do not signIn once successfully we could not save his email to redux.
            // So deleting DI before signing in once could cause the device did not removed properly from the backend.
            // This does not cause any unwanted push notifications to the user but just a proliferation on the registered devices tables.
            Keychain.setInternetCredentials(server, username, passString)
                .then(() => this.doKimlikBilgilerimiSil(userEmail, deviceUuid, resetRoute, login))
                .catch((err) => {
                    console.log('Kimlik bilgileri silinirken hata oldu: ', err.message);
                });
        }

    }


    static doKimlikBilgilerimiSil(userEmail, deviceUuid, resetRoute, login) {

        // Burada bos bir user objesi ile login olarak redux store'u temizle:
        let emptyUser = {
            isLoggedIn: false,
            userEmail: '',
            token: '',
            hashOfPin: '',
            privateKey: '',
            name: '',
            surname: '',
            avatarImage: ''
        };

        //Redux store'u temizlemek aslinda ici bos bir user nesnesi kaydetmek anlamina geliyor:
        login(emptyUser);

        //Kimlik bilgilerini silerken ayrica hatali girilen sifre sayisini sifirlamak gerekiyor.
        AsyncStorage.setItem("numberOfInvalidPinEntryAttempts", '0');


        // Remove device from the server for push notifications.
        let url = bkmTheme.serverAddressMarket + '/services/rest/user/removeDevice/';
        pinchFetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                deviceIdentifier: deviceUuid,
            })
        })
            .then((responseData) => {

                // HTTP "status:200" basarili haricindekilerde hata veriyoruz:
                if (responseData.status !== 200) {
                    Alert.alert('Hata', 'Sunucu entegrasyon hatası.');
                    return;
                }

                if (!responseData.bodyString) {
                    Alert.alert('Hata', 'Kütüphane hatası.');
                    return;
                }

                try {
                    let responseJson = JSON.parse(responseData.bodyString);

                    if (!responseJson) {
                        Alert.alert('Hata', 'Sunucu entegrasyon removeDevice json hatası.');
                        return;
                    }


                    // if (responseJson.responseCode == "MRKT0000") {
                    //     // Success.
                    //     // Do nothing. This is the majority of the cases.
                    // } else if (responseJson.responseCode == "MRKT0002") {
                    //     // MRKT0002: Hatali parametre
                    //     // Request parametrelerinde hata var.
                    // } else if (responseJson.responseCode == "MRKT0012") {
                    //     // MRKT0012: Kullanici bulunamadi.
                    //     // Katta bu email ile kayitli bir kullanici yoktur.
                    //     // Buraya hic dusmemesi gerekir.
                    // } else if (responseJson.responseCode == "MRKT0027") {
                    //     // MRKT0027: Cihaz sistemde tanimli degil.
                    // } else {
                    //
                    // }

                } catch(error) {
                    console.log('RemoveDevice POST JSON ERROR', error)
                }

            })
            .catch((error)=> {
                console.log('Sunucudan push notification removeDevice entegrasyon hatası.');
            })
            .done();


        Alert.alert('Bilgi', 'Kimlik bilgileriniz telefondan silinmiştir.', [{text: 'Tamam'}]);
        resetRoute();
    }

    static millisecondToDate(milliseconds) {
        let date = new Date(milliseconds);
        let day = date.getDate();
        day = day > 9 ? '' + day : '0' + day;
        let month = date.getMonth() + 1;
        month = month > 9 ? '' + month : '0' + month;
        let year = date.getFullYear();
        return '' + day + '.' + month + '.' + year;
    }

    static millisecondToHour(milliseconds) {
        let date = new Date(milliseconds);
        let hours = date.getHours();
        hours = hours > 9 ? '' + hours : '0' + hours;
        let minutes = date.getMinutes();
        minutes = minutes > 9 ? '' + minutes : '0' + minutes;
        return '' + hours + ':' + minutes;
    }

    static getDuyuruLatestMillisecondObjectName() {
        return 'duyuruLatestDateObjectName';
    }

}

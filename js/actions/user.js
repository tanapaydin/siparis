'use strict';

import { Alert } from 'react-native';
import type { Action } from './types';
import pinchFetch from '../components/utility/pinchUtil';
import { ortam, bkmTheme } from '../themes/base-style';
// var Fabric = require('react-native-fabric');
import { Platform } from 'react-native';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_DEVICE_TOKEN = "SET_DEVICE_TOKEN";

export function login(user:any):Action {
    // if ( user && Fabric && Fabric.Crashlytics ) {
    //     let userIdentifier = bkmTheme.katIsmi + '_' + ortam + '_' + Platform.OS;
    //     Fabric.Crashlytics.setUserEmail(JSON.stringify(user.userEmail));
    //     Fabric.Crashlytics.setUserIdentifier(userIdentifier);
    //     console.log('user logged in: ', JSON.stringify(user.userEmail), userIdentifier);
    // }

    return {
        type: LOGIN_USER,
        user: user
    }
}

export function logout(token:any):Action {
    let url = bkmTheme.serverAddressMarket + '/services/rest/auth/logout/';

    pinchFetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
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
                    Alert.alert('Hata', 'Sunucu entegrasyon logout json hatası.');
                    return;
                }

                if ("MRKT0000" !== responseJson.responseCode) {
                    Alert.alert('Hata', 'Sunucu logout servis hatası.');
                    return;
                }

            } catch(error) {
                console.log('Sunucu logout entegrasyon hatası.');
            }

        })
        .catch((error)=> {
            console.log('networkHatasi: ', error.message);
        })
        .done();

    return {
        type: LOGOUT_USER
    }

}

export function setDeviceToken(token:any):Action {
    return {
        type: SET_DEVICE_TOKEN,
        token:token
    }
}

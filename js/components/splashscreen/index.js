'use strict';

import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';
import styles from './styles';
import { bkmTheme } from '../../themes/base-style';


export default class SplashPage extends Component {

    componentWillMount () {

        var navigator = this.props.navigator;
        setTimeout (() => {
            navigator.replace({
                id: 'login'
            });
        }, 500);
    }


    render () {
        {/*<Image source={require('../../../images/launchscreen.png')} style={{flex: 1, height: null, width: null}} />*/}
        return (
            // <Image source={require('../../../images/grad-bg.png')} style={styles.background}>
            //     <View style={[styles.bg, {flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}]}>
            //
            //         <Image source={require('../../../images/launch-logo.png')} style={styles.launchLogo}>
            //         </Image>
            //
            //         <Text style={{height: 162}}>{''}</Text>
            //
            //     </View>
            // </Image>

            <View style={{backgroundColor: '#fff'}}>

            </View>
        );
    }
}

'use strict';

import React from 'react';
import {connect} from 'react-redux';
import { ActivityIndicatorIOS, Platform, StyleSheet, View, Text, Image } from 'react-native';
import NativeBaseComponent from 'native-base/Components/Base/NativeBaseComponent';
import computeProps from 'native-base/Utils/computeProps';
//import { Spinner } from 'native-base';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    progressBar: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});

class BusyIndicator extends NativeBaseComponent {

    prepareRootProps() {
        var defaultProps = {
            isDismissible: false,
            overlayWidth: 120,
            overlayHeight: 100,
            overlayColor: '#333333',
            color: '#f5f5f5',
            startVisible: false,
            text: 'Lütfen bekleyiniz...',
            textColor: '#f5f5f5',
            textFontSize: 14
        };

        return computeProps(this.props, defaultProps);
    }

    render() {
        let cProps = this.prepareRootProps();

        const customStyles = StyleSheet.create({
            overlay: {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 10,
                backgroundColor: cProps.overlayColor,
                width: cProps.overlayWidth,
                height: cProps.overlayHeight
            },
            text: {
                color: cProps.textColor,
                fontSize: cProps.textFontSize,
                marginTop: 8
            }
        });

        if ( !this.props.loaderVisible ) {
            return (<View />);
        } else {
            return (
                <View style={[styles.container]}>
                    {/*<View style={customStyles.overlay}>*/}
                        {/*<Spinner/>*/}
                        {/*<Text numberOfLines={1} style={customStyles.text}>*/}
                            {/*{cProps.text}*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                    <Image source={require('../../../images/bbn_loading_screen.gif')}
                           style={{width: 60, height: 60, borderRadius: 8}}
                    />

                </View>
            );
        }
    }

}


const mapStateToProps = (state) => {
    return {
        loaderVisible: state.loading.loaderVisible
    }
}

export default connect(mapStateToProps, null)(BusyIndicator);
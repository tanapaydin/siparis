'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Drawer} from 'native-base';
import {BackAndroid, Platform, StatusBar, Linking} from 'react-native';
import {closeDrawer} from './actions/drawer';
import { pushNewRoute, popRoute, resetRoute } from './actions/route';
import Account from './components/account/';
import Announcements from './components/announcements/';
import AnnouncementDescription from './components/announcements/announcementDescription';
import EmailSentInfo from "./components/rememberPin/emailSentInfo";
import EnterCodes from "./components/rememberPin/enterCodes";
import EnterEmail from "./components/rememberPin/enterEmail";
import ErrorApplication from './components/errorApplication/';
import ErrorNetwork from './components/errorNetwork/';
import Login from './components/login/';
import MarketMain from './components/market/marketMain';
import MarketPurchase from './components/market/marketPurchase';
import MarketPurchaseDescription from './components/market/marketPurchaseDescription';
import MarketPurchaseFail from './components/market/marketPurchaseFail';
import MarketPurchaseSuccess from './components/market/marketPurchaseSuccess';
import Navigator from 'Navigator';
import Purchased from './components/purchased/';
import SendMoney from './components/sendMoney/';
import SendMoneyNew from './components/sendMoney/index';
import SendMoneyFailure from './components/sendMoney/successAndFailure/sendMoneyFailure/';
import SendMoneySuccess from './components/sendMoney/successAndFailure/sendMoneySuccess/';
import SideBar from './components/sideBar';
import SignIn from './components/signIn/';
import SignUp from './components/signUp/';
import SignUp2 from './components/signUp/signUp2';
import SignUp3 from './components/signUp/signUp3';
import SignUp4 from './components/signUp/signUp4';
import SignUpApprove from './components/signUp/signUpApprove';
import SignUpCamera from './components/signUpCamera/';
import SignUpNext from './components/signUpNext/';
import SignUpNextUndefined from "./components/signUpNextUndefined"
import SignUpPin from './components/signUpPin'
import SignUpResultMain from "./components/signUpResult/signUpResultMain";
import SignUpResultActivationApproved from "./components/signUpResult/signUpResultActivationApproved";
import SignUpResultActivationRejected from "./components/signUpResult/signUpResultActivationRejected";
import SignUpResultWaiting from "./components/signUpResult/signUpResultWaiting";
import SplashPage from './components/splashscreen/';
import RegisterUndefined from "./components/rememberPin/registerUndefined";
import TekrarEmailGonder from './components/signIn/tekrarEmailGonder';
import BusyIndicator from './components/loaders/BusyIndicator';
//import _ from 'lodash/core';
//import {closeMarketModal} from './actions/market';


//import {statusBarColor} from "./themes/base-theme";
var bkmTheme = require('./themes/base-style').bkmTheme;



Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack,
    }, () => {
        this._enableScene(destIndex);
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack);
        });
    });
};

export var globalNav = {};
// sample format: '35.156.111.72:8080'

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=> {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
        var currentState = state;

        if (currentState) {
            while (currentState.children) {
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};

const drawerStyle = {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};

class AppNavigator extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        this.props.store.subscribe(() => {
            if (this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if (this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close();
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {

            try {
                this.closeDrawer(); // On Android, first close the drawer if it is open.
            }
            catch(error) {
                console.warn('back action error on drawer close: ', error);
            }

            try {
                var routes = this._navigator.getCurrentRoutes();

                if (routes[routes.length - 1].id == 'login' ) { // login'de ise back butonunda app'den cikar.
                    return false;
                }
                else if (routes[routes.length - 2].id == 'signIn') { // signIn ekranina 1 uzaklikta ise back butonunda login'e gonder, stack'i sifirla.
                    this.resetRoute();
                    return true;
                }
                else {
                    this.popRoute();
                    return true;
                }
            }
            catch (error) {
                console.warn('back action error on route: ', error);
                return false;
            }
        });

        const url = Linking.getInitialURL().then(url => {
            if (url) {
                const route = url.replace(/.*?:\/\//g, "");
                // console.warn('App is opened via linking and goes to: ', route);
                // this._navigator.replace(this.state.routes[route]);
                try {
                    this.pushNewRoute(route);
                } catch(error) {
                    console.warn('this is not a valid route=>',route, error);
                }

            }
        });
    }

    popRoute() {
        this.props.popRoute();
    }

    resetRoute() {
        this.props.resetRoute();
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if (this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<SideBar navigator={this._navigator}/>}
                tapToClose={true}
                acceptPan={true}
                panOpenMask={.1}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.1}
                panCloseMask={0.1}
                negotiatePan={true}>
                <StatusBar
                    backgroundColor={bkmTheme.statusBarColor}
                    barStyle="light-content"
                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return {
                            ...Navigator.SceneConfigs.PushFromRight, //http://stackoverflow.com/questions/32505190/is-it-possible-to-change-transitions-in-react-native-navigator
                            gestures: {}
                        };
                    }}
                    initialRoute={{
                        id: (Platform.OS === "android" || Platform.OS === "ios") ? 'splashscreen' : 'login',
                        statusBarHidden: true
                    }}
                    renderScene={this.renderScene}
                />
                <BusyIndicator />
            </Drawer>
        );
    }

    renderScene(route, navigator) {
        if (route.component) {
            var Component = route.component;
            return (
                <Component navigator={navigator} route={route} {...route.passProps} />
            );
        }

        switch (route.id) {
            case 'account':
                return <Account navigator={navigator}/>;
            case 'announcements':
                return <Announcements navigator={navigator}/>;
            case 'announcementDescription':
                return <AnnouncementDescription navigator={navigator} route={route} {...route.passProps}/>;
            case 'emailSentInfo':
                return <EmailSentInfo navigator={navigator} route={route} {...route.passProps}/>;
            case 'errorApplication':
                return <ErrorApplication navigator={navigator}/>;
            case 'errorNetwork':
                return <ErrorNetwork navigator={navigator}/>;
            case 'login':
                return <Login navigator={navigator}/>;
            case 'marketMain':
                return <MarketMain navigator={navigator} route={route} {...route.passProps}/>;
            case 'marketPurchase':
                return <MarketPurchase navigator={navigator} route={route} {...route.passProps}/>;
            case 'marketPurchaseDescription':
                return <MarketPurchaseDescription navigator={navigator} route={route} {...route.passProps}/>;
            case 'marketPurchaseFail':
                return <MarketPurchaseFail navigator={navigator} route={route} {...route.passProps}/>;
            case 'marketPurchaseSuccess':
                return <MarketPurchaseSuccess navigator={navigator} route={route} {...route.passProps}/>;
            case 'rememberPinEnterEmail':
                return <EnterEmail navigator={navigator} />;
            case 'rememberPinEnterCodes':
                return <EnterCodes navigator={navigator} route={route} {...route.passProps}/>;
            case 'sendMoney':
                return <SendMoney navigator={navigator} route={route} {...route.passProps} />;
            case 'sendMoney_new':
                return <SendMoneyNew navigator={navigator} route={route} {...route.passProps} />;
            case 'sendMoneyFailure':
                return <SendMoneyFailure navigator={navigator} route={route} {...route.passProps} />;
            case 'sendMoneySuccess':
                return <SendMoneySuccess navigator={navigator} route={route} {...route.passProps} />;
            case 'sideBar':
                return <SideBar navigator={navigator}/>;
            case 'signIn':
                return <SignIn navigator={navigator} route={route} {...route.passProps} />;
            case 'signUp':
                return <SignUp navigator={navigator} route={route} {...route.passProps} />;
            case 'signUp2':
                return <SignUp2 navigator={navigator} route={route} {...route.passProps} />;
            case 'signUp3':
                return <SignUp3 navigator={navigator} route={route} {...route.passProps} />;
            case 'signUp4':
                return <SignUp4 navigator={navigator} route={route} {...route.passProps} />;
            case 'signUpApprove':
                return <SignUpApprove navigator={navigator} route={route} {...route.passProps} />;
            case 'signUpCamera':
                return <SignUpCamera navigator={navigator} route={route} {...route.passProps} />;
            case 'signUpNext':
                return <SignUpNext navigator={navigator} route={route} {...route.passProps} />;
            case 'signUpNextUndefined':
                return <SignUpNextUndefined navigator={navigator}/>
            case 'signUpPin':
                return <SignUpPin navigator={navigator} route={route} {...route.passProps}/>;
            case 'signUpResult':
                return <SignUpResultMain navigator={navigator} route={route} {...route.passProps}/>;
            case 'signUpResultWaiting':
                return <SignUpResultWaiting navigator={navigator} route={route} {...route.passProps}/>;
            case 'signUpResultActivationApproved':
                return <SignUpResultActivationApproved navigator={navigator} route={route} {...route.passProps}/>;
            case 'signUpResultActivationRejected':
                return <SignUpResultActivationRejected navigator={navigator} route={route} {...route.passProps}/>;
            case 'splashscreen':
                return <SplashPage navigator={navigator}/>;
            case 'purchased':
                return <Purchased navigator={navigator}/>;
            case 'registerUndefined':
                return <RegisterUndefined navigator={navigator} />;
            case 'tekrarEmailGonder':
                return <TekrarEmailGonder navigator={navigator} route={route} {...route.passProps} />;
            default :
                return <Login navigator={navigator}/>;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: (passProps) => dispatch(popRoute(passProps)),
        pushNewRoute: (route) => dispatch(pushNewRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
    }
}

const mapStateToProps = (state) => {
    return {
        drawerState: state.drawer.drawerState
    }
}

export default connect(mapStateToProps, bindAction)(AppNavigator);

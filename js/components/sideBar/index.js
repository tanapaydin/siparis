'use strict';

import React, { Component} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { closeDrawer } from '../../actions/drawer';
import { logout } from "../../actions/user";
import { replaceOrPushRoute, resetRoute } from '../../actions/route';
import { Container, Content, Text, List, ListItem, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import theme from '../../themes/base-theme';
import styles from './styles';

class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    resetRoute(route) {
        this.props.closeDrawer();
        this.props.resetRoute(route);
    }

    logout() {
        this.props.closeDrawer();
        this.props.resetRoute();
        this.props.logout(this.props.user.token);
    }

    render(){
        return (
            <Container theme={theme} >
                <View style={styles.background} >
                    <Content style={styles.drawerContent} bounces={false}>

                        <Image source={require('../../../images/sidebarIcons/top-circles.png')}/>

                        <List>
                            <ListItem accessibilityLabel="sideBar_profilHesapHareketleri" button onPress={() => this.navigateTo('account')} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-profile.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Profil & Hesap Hareketleri</Text>
                                    </Col>
                                </Grid>
                            </ListItem>

                            <ListItem button onPress={() => this.navigateTo('announcements')} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-announcement.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Duyurular</Text>
                                    </Col>
                                </Grid>
                            </ListItem>

                            <ListItem accessibilityLabel="sideBar_transferYap" button onPress={() => this.navigateTo('sendMoney')} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-transfer.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Keklik Transferi</Text>
                                    </Col>
                                </Grid>
                            </ListItem>

                            <ListItem accessibilityLabel="sideBar_market" button onPress={() => this.navigateTo('marketMain')} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-market-siyah.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Mağaza</Text>
                                    </Col>
                                </Grid>
                            </ListItem>

                            <ListItem accessibilityLabel="sideBar_pnrKodlarim" button onPress={() => this.navigateTo('purchased')} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-pnr.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Satın Aldıklarım</Text>
                                    </Col>
                                </Grid>
                            </ListItem>

                            {/*<ListItem accessibilityLabel="sideBar_ayarlar" button onPress={() => this.navigateTo('login')} iconLeft style={styles.links} >*/}
                                {/*<Grid >*/}
                                    {/*<Col style={styles.listItemIcon}>*/}
                                        {/*<Thumbnail source={require('../../../images/sidebarIcons/icon-settings.png')} style={styles.profilePic} />*/}
                                    {/*</Col>*/}
                                    {/*<Col style={styles.listItemText}>*/}
                                        {/*<Text style={styles.linkText} >Ayarlar</Text>*/}
                                    {/*</Col>*/}
                                {/*</Grid>*/}
                            {/*</ListItem>*/}

                            <ListItem accessibilityLabel="sideBar_cikisYap" button onPress={() => this.logout()} iconLeft style={styles.links} >
                                <Grid >
                                    <Col style={styles.listItemIcon}>
                                        <Thumbnail source={require('../../../images/sidebarIcons/icon-door.png')} style={styles.profilePic} />
                                    </Col>
                                    <Col style={styles.listItemText}>
                                        <Text style={styles.linkText} >Çıkış</Text>
                                    </Col>
                                </Grid>
                            </ListItem>


                            {/*
                            <ListItem button onPress={() => this.navigateTo('home')} iconLeft style={styles.links} >
                                <Icon name='ios-grid-outline' />
                                <Text style={styles.linkText} >NEWS</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('channels')}  iconLeft style={styles.links} >
                                <Icon name='ios-keypad-outline' />
                                <Text style={styles.linkText}>CHANNELS</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('overview')}  iconLeft style={styles.links} >
                              <Icon name='ios-stats' />
                              <Text style={styles.linkText}> OVERVIEW</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('calendar')}  iconLeft style={styles.links} >
                                <Icon name='ios-calendar-outline' />
                                <Text style={styles.linkText}>CALENDAR</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('timeline')}  iconLeft style={styles.links} >
                                <Icon name='ios-timer-outline' />
                                <Text style={styles.linkText}>TIMELINE</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('profile')} iconLeft style={styles.links} >
                                <Icon name='ios-person-outline' />
                                <Text style={styles.linkText}> PROFILE</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('widgets')}  iconLeft style={styles.links} >
                                <Icon name='ios-grid' />
                                <Text style={styles.linkText}>WIDGETS</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('settings')} iconLeft style={styles.links}>
                                <Icon name='ios-settings-outline' />
                                <Text style={styles.linkText}>SETTINGS</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('feedback')} iconLeft style={styles.links} >
                                <Icon name='ios-paper-outline' />
                                <Text style={styles.linkText}>FEEDBACK</Text>
                            </ListItem>
                            */}
                        </List>


                        {/*
                        <View style={styles.logoutContainer}>
                            <View style={styles.logoutbtn}  foregroundColor={'white'}>
                                <Grid>
                                    <Col>
                                        <TouchableOpacity onPress={() => this.resetRoute('login')} style={{alignSelf: 'flex-start'}}>
                                            <Text style={{fontWeight: 'bold', color: '#fff'}}>LOG OUT</Text>
                                            <Text note style={{color: '#fff'}} >Kumar Sanket</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity style={{alignSelf: 'flex-end'}}  onPress={() => this.navigateTo('profile')}>
                                            <Thumbnail source={require('../../../images/contacts/sanket.png')} style={styles.profilePic} />
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </View>
                        </View>
                        */}


                    </Content>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        logout:(token) => dispatch(logout(token))
    }
}

export default connect(mapStateToProps, bindAction)(SideBar);

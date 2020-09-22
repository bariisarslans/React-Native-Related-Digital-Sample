import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet,AsyncStorage, Alert } from 'react-native';

import { Router, Scene, Actions } from 'react-native-router-flux';
import RMCFunctions from './functions/RMCFunctions';

import {euroMessageApi,visilabsApi,AddEventListener,RequestPermissions} from './data/rmcConfig'
import User from './functions/User';


import globalStyles, { color } from './styles/globalStyles'

import Home from './Home';
import Product from './Product';
import Login from './Login';
import Signup from './Signup';
import Campaigns from './Campaigns';
import Category from './Category';
import Basket from './Cart';
import Purchase from './Purchase';
import Profile from './Profile';


export default class Root extends Component {

  constructor(props) {
    super(props);

    this.addListeners();
    RequestPermissions();

  }

  addListeners(){
    AddEventListener('register', async (token) => {
      AsyncStorage.setItem('pushToken', token)
      RMCFunctions.tokenRegister(token)
      User.getUser().then(user => { (user.token = token, User.setUser(user,"root")) })
      Alert.alert("token",token)
    }, (notificationPayload) => {
      console.log('notification payload', notificationPayload)
    }, euroMessageApi)
 
    AddEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)
  }

  _renderLeftButton() {
    return (
      <TouchableOpacity onPress={() => Actions.Home()}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{ uri: "https://www.relateddigital.com/i/assets/rd-2019/images/footer-logo.png" }} />
        </View>
      </TouchableOpacity>
    );
  }

  _renderRight() {
    return (
      <View style={[globalStyles.row, { alignItems: 'center' }]}>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => Actions.Basket()}>
          {/* <Icon color={color.primary} size={25} name={"shopping-basket"} /> */}
          <Text style={styles.touchDesc}>Cart</Text>
        </TouchableOpacity>
        <View style={globalStyles.vr} />
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => Actions.Profile()}>
          {/* <Icon color={color.primary} size={25} name={"user-circle"} /> */}
          <Text style={styles.touchDesc}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (

      <Router>
        <Scene
          key='Root'>

          <Scene
            key='Login'
            component={Login}
            hideNavBar
            inital
          />

          <Scene
            key='Signup'
            component={Signup}
            hideNavBar
          />

          <Scene
            key='Purchase'
            component={Purchase}
            title={"Purchase"}
            titleStyle={styles.titleStyle}
            renderLeftButton={this._renderLeftButton()}
            renderRightButton={this._renderRight()}
          />
          

          <Scene
            key='Profile'
            component={Profile}
            title={"Profile"}
            titleStyle={styles.titleStyle}
            renderLeftButton={this._renderLeftButton()}
            renderRightButton={this._renderRight()}
            inital
          />


          <Scene
            key='Home'
            component={Home}
            title={"Home"}
            titleStyle={styles.titleStyle}
            renderLeftButton={this._renderLeftButton()}
            renderRightButton={this._renderRight()}
          />

          <Scene
            key='Basket'
            component={Basket}
            inital
            title={"Cart"}
            titleStyle={styles.titleStyle}
            renderLeftButton={this._renderLeftButton()}
            renderRightButton={this._renderRight()}
          />

          <Scene
            key='Category'
            component={Category}
            title={"Category"}
            titleStyle={styles.titleStyle}
            renderLeftButton={this._renderLeftButton()}
            renderRightButton={this._renderRight()}
          />

          <Scene
            key='Product'
            component={Product}
            title={"Product"}
            titleStyle={styles.titleStyle}
            renderRightButton={this._renderRight()}
          />
          <Scene
            key='Campaigns'
            component={Campaigns}
            title={"Campaigns"}
            titleStyle={styles.titleStyle}
          />


        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    marginHorizontal: 15,
    alignItems: 'center'
  },
  touchDesc: {
    color: color.primary,
    fontSize: 15,
  },
  logo: {
    width: 50,
    height: "80%",
    resizeMode: 'contain',
    marginLeft: 10
  },
  logoContainer: {
    height: "70%",
    justifyContent: 'center',
  },
  titleStyle: {
    color: color.primary
  }
})

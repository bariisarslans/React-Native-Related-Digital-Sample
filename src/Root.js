import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crossroads from 'crossroads'

import { Router, Scene, Actions, Reducer } from 'react-native-router-flux';
import RMCFunctions from './functions/RMCFunctions';

import { euroMessageApi, visilabsApi, AddEventListener, RequestPermissions, appAlias } from './data/rmcConfig'
import User from './functions/User';

// crossroads kütüphanesi eklenecek
// crossroads.addRoute ile sayfalar eklenecek
// Linking kütüphensi eklenip uygulama açılışında urller handle edilecek
// url parse edilip yönlendirme yapılacak.

import globalStyles, { color } from './styles/globalStyles'

import Home from './Home';
import Product from './Product';
import Login from './Login';
import Signup from './Signup';
import Campaigns from './Campaigns';
import Category from './Category';
import Basket from './Cart';
import Test from './Test';
import Purchase from './Purchase';
import Profile from './Profile';

const DEEP_URL = "rs";

crossroads.addRoute('Home', Actions.Home);
crossroads.addRoute('Product', Actions.Product);
crossroads.addRoute('Login', Actions.Login);
crossroads.addRoute('Signup', Actions.Signup);
crossroads.addRoute('Campaigns', Actions.Campaigns);
crossroads.addRoute('Category', Actions.Category);
crossroads.addRoute('Basket', Actions.Basket);
crossroads.addRoute('Purchase', Actions.Purchase);
crossroads.addRoute('Profile', Actions.Profile);
crossroads.addRoute('Test', Actions.Test);

export default class Root extends Component {

  constructor(props) {
    super(props);
    this.addListeners();
    RequestPermissions();

    this.createReducer = this.createReducer.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  addListeners() {
    AddEventListener('register', async (token) => {
      // AsyncStorage.setItem('pushToken', token)
      // RMCFunctions.tokenRegister(token)
      // User.getUser().then(user => { (user.token = token, User.setUser(user, "root")) })
      // Alert.alert("token", token)
      console.log("token",token)
    }, (notificationPayload) => {
      // const parameters = {
      //   "utm_campaign": notificationPayload.utm_campaign,
      //   "utm_source": notificationPayload.utm_source,
      //   "utm_medium": notificationPayload.utm_medium,
      //   "OM.exVisitorID": "baris.arslan@euromsg.com", //RMC sistemindeki referansınız
      //   "OM.sys.TokenID":  "fd69d3b1a7d331f28a1375a2d4edfe6b456fa640c5c0d8258e3cf0ef9f3c93cf",
      //   "OM.sys.AppID": "RelatedStoreIOS"
      // }
      // visilabsApi.customEvent("Campaign",parameters)
      console.log("notificationPayload",notificationPayload)
    }, euroMessageApi, visilabsApi)

    AddEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)
  }

  componentDidMount() {
    Linking
      .getInitialURL()
      .then(url => {
        this.handleOpenURL({ url });
      })
      .catch(error => console.error(error));
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    if (event.url && event.url.indexOf(DEEP_URL + '://') === 0) {
      console.log("Depp url",event.url.slice(DEEP_URL.length + 3));
      crossroads.parse(event.url.slice(DEEP_URL.length + 3));
    }
    else{
      console.log("no Depp url");
    }
  }

  createReducer(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      return defaultReducer(state, action);
    };
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

      <Router createReducer={this.createReducer}>
        <Scene
          key='Root'>

<Scene
            key='Test'
            component={Test}
            hideNavBar
            inital
          />
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
            navTransparent
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

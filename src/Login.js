import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStyles, { color } from './styles/globalStyles'

import User from './functions/User';
import { visilabsApi, euroMessageApi } from './data/rmcConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        keyID: ""
      }
    }
    //RMC
    visilabsApi.customEvent("Login", {});


  }

  UNSAFE_componentWillMount() {
    this.animatedOpacity = new Animated.Value(0);
  }

  eventEt() {
    visilabsApi.customEvent("Deneme", {
      "OM.pb": "1;2",
      "OM.pbid": "10000",
      "OM.ppr": "60;20",
      "OM.pu": "6;1"
    });
  }

  componentDidMount() {
    this.getUserData();

    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 500,
      delay: 50,
      useNativeDriver: true,
    }).start();
  }

  getUserData() {
    User.getUser().then(user => user ? (this.setState({ user })) : false);
  }

  getCustomTime = () => {
    var d = new Date();
    var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((d.getMinutes()).toString().length == 2 ? (d.getMinutes()).toString() : "0" + (d.getMinutes()).toString()) + ":" + (d.getSeconds()).toString();
    return date_format_str
  }

  addExtra = async () => {
    // RMC
    await euroMessageApi.setUserProperty("email", this.user.email);
    await euroMessageApi.setUserProperty("keyID", this.user.keyID);
    await euroMessageApi.setUserProperty("pushPermit", this.user.pushPermit);
    await euroMessageApi.setUserProperty('ConsentTime', this.getCustomTime());
    await euroMessageApi.setUserProperty('RecipientType', "BIREYSEL");
    await euroMessageApi.setUserProperty('ConsentSource', "HS_MOBIL");
  }
  // geofence isteği
  // relateddigialridge.swift dosyasında loggingEnable satırı eklendi
  // http://s.visilabs.net/geojson?OM.oid=676D325830564761676D453D&OM.siteID=356467332F6533766975593D&OM.cookieID=D45987C7-6811-4441-8EC1-008EC28534DD&OM.exVisitorID=Baris.arslan1234%40euromsg.com&OM.sys.TokenID=becc4361ebe2bfab832060fcdde8ff52452dfedf82750dbd518fcc1f3eed2450&OM.sys.AppID=RelatedStoreIOS&actid=401&act=process&OM.latitude=41%0510746701559&OM.longitude=29%0568785627490&OM.locationid=27&OM.apiver=ios

  Login() {
    this.getUserData();

    //RMC
    this.user = {
      ...this.state.user,
      pushPermit: "Y",
      "token":"fd69d3b1a7d331f28a1375a2d4edfe6b456fa640c5c0d8258e3cf0ef9f3c93cf"
    };


    if (this.user.token === null || this.user.token === undefined || this.user.token === "") {
      AsyncStorage.getItem('pushToken').then(token => this.addExtra().then(() => euroMessageApi.subscribe(token)))
    }
    else {
      this.addExtra().then(() => (console.log("subscibe"),euroMessageApi.subscribe(this.user.token)));
    }


    let userData = {
      "OM.exVisitorID": this.user.keyID,
      "OM.b_login": "1"
    };
    visilabsApi.customEvent("Login", userData);
    User.setUser(this.user);
    AsyncStorage.setItem('isLoggedIn', "1");
    // Actions.reset("Home");
  }

  _RDView() {
    const opacity = this.animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const scale = this.animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [25.5, 1]
    })
    return (
      <Animated.View style={{ width: "100%", alignItems: 'center',zIndex:9, opacity,transform: [{ scale }] }} useNativeDriver={true}>
        <Text style={[globalStyles.RD]}>Related Digital</Text>
        <Image style={[globalStyles.logoXL]} source={{ uri: "https://www.relateddigital.com/i/assets/rd-2019/images/footer-logo.png" }} />
      </Animated.View>
    )
  }


  render() {
    return (
      <View style={[globalStyles.containerCenter, globalStyles.horPadding]}>
        {this._RDView()}
        <Text style={[globalStyles.title, styles.pageName]}>Login</Text>
        <Text style={[globalStyles.header, { color: color.primary }]}>Email</Text>
        <View style={globalStyles.inputRowContainer}>
          <TextInput
            style={[globalStyles.input, { width }]}
            placeholder={"Email adresinizi girin.."}
            placeholderTextColor="gray"
            onChangeText={email => this.setState(prevState => ({
              user: {
                ...prevState.user,
                email,
                keyID: email
              }
            }))}
            value={this.state.user.email}
          />
          <Text
            style={globalStyles.customClearButton}
            onPress={() => this.setState({ email: "" })}>Temizle</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.button]}
          onPress={() => this.Login()}>
          <Text style={[globalStyles.whitehHeader]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button]}
          onPress={() => this.eventEt()}>
          <Text style={[globalStyles.whitehHeader]}>Test</Text>
        </TouchableOpacity>

        <View style={[globalStyles.linkButton]}>
          <TouchableOpacity
            onPress={() => Actions.Signup()}>
            <Text style={[globalStyles.linkButtonText]}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageName: {
    position: 'absolute',
    top: 35,
    left: 15,
    color: color.primary
  }
});
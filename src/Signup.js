import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput,Animated,AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStyles,{color} from './styles/globalStyles'

import User from './functions/User';
import {visilabsApi,euroMessageApi} from './data/rmcConfig';


const { width, height } = Dimensions.get('window');

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        keyID: ""
      }
    }
    //RMC
    visilabsApi.customEvent(this.props.navigation.state.routeName,{});
  }

  UNSAFE_componentWillMount() {
    this.animatedOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    // User.getUser().then(user => this.setState({ email: user.email }));
    User.getUser().then(user => this.setState({ user }));
    // AsyncStorage.getItem('isLoggedIn').then(val => val === "1" ? Actions.reset("Home") : null);

    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }

  addExtra = async () => {
    // RMC
    await euroMessageApi.setUserProperty("email",this.user.email);
    await euroMessageApi.setUserProperty("keyID",this.user.keyID);
    await euroMessageApi.setUserProperty("pushPermit",this.user.pushPermit);
  }

  Signup() {
    //RMC
    this.user = {
      ...this.state.user,
      pushPermit: "Y",
    };
    
    this.addExtra().then(()=>euroMessageApi.subscribe(this.user.token));

    let userData = {
      "OM.exVisitorID":this.user.keyID,
      "OM.b_sgnp":"1"
    };
    visilabsApi.customEvent("SignUp",userData);

    User.setUser(this.user);
    AsyncStorage.setItem('isLoggedIn', "1");
    Actions.reset("Home");
  }

  _RDView() {
    const opacity = this.animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
    return (
      <Animated.View style={{ width: "100%", alignItems: 'center', opacity }} useNativeDriver={true}>
        <Text style={[globalStyles.RD]}>Related Digital</Text>
        <Image style={[globalStyles.logoXL]} source={{ uri: "https://www.relateddigital.com/i/assets/rd-2019/images/footer-logo.png" }} />
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={[globalStyles.containerCenter, globalStyles.horPadding]}>
        <Text style={[globalStyles.title,styles.pageName]}>Signup</Text>
        {this._RDView()}
        <Text style={[globalStyles.header,{color:color.primary}]}>Email</Text>
        <View style={globalStyles.inputRowContainer}>
          <TextInput
            style={[globalStyles.input,{width}]}
            placeholder={"Email adresinizi girin.."}
            placeholderTextColor="gray"
            onChangeText={email => this.setState(prevState => ({
              user: {
                ...prevState.user,
                email,
                keyID:email
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
          onPress={() => this.Signup()}>
          <Text style={[globalStyles.whitehHeader]}>Signup</Text>
        </TouchableOpacity>

        <View style={[globalStyles.linkButton]}>
          <TouchableOpacity
            onPress={() => Actions.Login()}>
            <Text style={[globalStyles.linkButtonText]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageName:{
    position:'absolute',
    top:15,
    left:15,
    color:color.primary
  }
});
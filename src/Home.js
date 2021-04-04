import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Products from './components/products';
import PRODUCTS from './data/products.json';
import Swiper from './components/swiper';
import User from './functions/User';
import globalStyles, { color } from './styles/globalStyles';
import Menu from './components/menu';

import Story from './components/story/Story'

import {visilabsApi} from './data/rmcConfig';
import Inapps from './components/Inapps';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        keyID: "",
      }
    }
    //RMC
    visilabsApi.customEvent(this.props.navigation.state.routeName,{});
    console.log("neden log yazilmiyor");
  }

  componentDidMount() {
    User.getUser().then(user => this.setState({ user }));
  }

  action(url){
    Actions[url].call()
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.containerItemCenter}>
          
        <Story 
          size={100}            // Optional
          action={this.action}  // Required
        />

          <Text style={globalStyles.title}>
            {
              this.state.user.email ? "Hoşgeldin " + this.state.user.email : "Email is empty"
            }
          </Text>
          <Inapps/>
          <Menu />
          <ScrollView style={globalStyles.ScrollView}>

            <Swiper autoplay={false}/>
            <View style={styles.customView}>
              <Products productList={PRODUCTS} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  }
});
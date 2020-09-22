import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Products from './components/products';
import PRODUCTS from './data/products.json';
import Swiper from './components/swiper';
import User from './functions/User';
import globalStyles, { color } from './styles/globalStyles';
import Menu from './components/menu'

import {visilabsApi} from './data/rmcConfig';

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
    visilabsApi.customEvent(this.props.navigation.state.routeName);
  }

  componentDidMount() {
    User.getUser().then(user => this.setState({ user }));
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.containerItemCenter}>
          <Text style={globalStyles.title}>
            {
              this.state.user.email ? "Hoşgeldin " + this.state.user.email : "Email is empty"
            }
          </Text>
          <Menu />
          <ScrollView style={globalStyles.ScrollView}>
            <Swiper />
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
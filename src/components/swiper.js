import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
// import api from './data/rmcConfig';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  slide: {
    height: 200,
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: "absolute",
    top: 5,
  },
  buttonText: {
    fontSize: 50,
    color: "white"
  }
})

export default class SwiperComponent extends Component {
  
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true}
        loop={true}
        horizontal={true}
        loadMinimal={true}
        paginationStyle={{ bottom: 10 }}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        dot={<View style={{ backgroundColor: 'rgba(255,255,255,1)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
        activeDot={<Image style={{ width: 30, height: "100%", resizeMode: 'contain' }} source={{ uri: "https://www.relateddigital.com/i/assets/rd-2019/images/footer-logo.png" }}></Image>}
      >
        <View style={styles.slide} key={10001}>
          <TouchableOpacity style={styles.slide}
            onPress={() => Actions.Campaigns({id:"10001",img:"https://i.ytimg.com/vi/QTNj5FzAoSI/maxresdefault.jpg"})}>
            <Image style={{ width: "100%", flex: 1 }} source={{ uri: "https://i.ytimg.com/vi/QTNj5FzAoSI/maxresdefault.jpg" }}></Image>
            <Text style={styles.text}>Wellcome</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide} key={10002}>
          <TouchableOpacity style={styles.slide}
            onPress={() => Actions.Campaigns({id:"10002",img:"https://blog.relateddigital.com/wp-content/uploads/2020/06/TemmuzAgustos-1200x628-1.png"})}>
            <Image style={{ width: "100%", flex: 1 }} source={{ uri: "https://blog.relateddigital.com/wp-content/uploads/2020/06/TemmuzAgustos-1200x628-1.png" }}></Image>
            <Text style={styles.text}>Beautiful</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide} key={10003}>
          <TouchableOpacity style={styles.slide}
            onPress={() => Actions.Campaigns({id:"10003",img:"https://blog.euromsg.com/wp-content/uploads/2019/07/Q2-RN-1200x628.png"})}>
            <Image style={{ width: "100%", flex: 1 }} source={{ uri: "https://blog.euromsg.com/wp-content/uploads/2019/07/Q2-RN-1200x628.png" }}></Image>
            <Text style={styles.text}>And simple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide} key={10004}>
          <TouchableOpacity style={styles.slide}
            onPress={() => Actions.Campaigns({id:"10004",img:"https://image.slidesharecdn.com/martsonsunum-190301075444/95/mart-aynda-dijital-pazarlama-almalarnzda-deerlendirebileceiniz-45-nemli-gn-10-638.jpg?cb=1551426900"})}>
            <Image style={{ width: "100%", flex:1 }} source={{ uri: "https://image.slidesharecdn.com/martsonsunum-190301075444/95/mart-aynda-dijital-pazarlama-almalarnzda-deerlendirebileceiniz-45-nemli-gn-10-638.jpg?cb=1551426900" }}></Image>
            <Text style={styles.text}>Related Digital</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}
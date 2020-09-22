import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity,Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Cart from '../functions/Cart';
import RMCFunctions from '../functions/RMCFunctions';

import globalStyles, { color } from '../styles/globalStyles'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pCard: {
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: .5,
    borderColor: 'rgba(200,200,200,.6)'
  },
  pImage: {
    height: 100,
    width: width / 3,
    margin: 5,
    resizeMode: 'contain',
    margin: 3
  },
  pInfoView: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: -.5
  },
  pName: {
    color: 'black',
    fontSize: 15,
    fontWeight: "300",
    width: '100%',
    justifyContent: 'center',
    marginLeft: 5
  },
  pPrice: {
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 2
  },
  pDPrice: {
    color: 'gray',
    fontSize: 10,
    textDecorationLine: "line-through",
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 2
  },
  pBadge: {
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingBottom: 10
  },
  pBadgeText: {
    fontSize: 10,
    borderWidth: .5,
    fontWeight: "300",
    borderRadius: 5,
    borderColor: "rgba(250,0,0,1)",
    padding: 2,
    flexWrap: "nowrap",
    color: 'rgba(250,0,0,1)'
  },
  priceView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  fastAdd: {
    width: 45,
    height: 45,
    marginLeft: -70,
    zIndex: 50,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 22,
    backgroundColor: color.primary
  },
  fastText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
    color: color.buttonText
  }
});

function productBasket(name,id,quantity,price) {
  let basket = {
      pbid: 10000,
      pb: id,
      pu: quantity,
      ppr: price
  };
  Cart.addToCart(basket);
  Alert.alert("Bilgilendirme", name + " sepete eklendi.");

  setTimeout(() => {
      //RMC
      Cart.getCart().then((val) => {
          RMCFunctions.updateCart(val);
      });
  }, 500);
}

const Products = ({ productList }) => (
  productList.map((product) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} key={product.id} onPress={() => Actions.Product({ id: product.id })}>
        <View style={[styles.pCard, {}]}>
          <Image style={[styles.pImage, {}]} source={{ uri: product.imageUrl }}></Image>
          <View style={[styles.pInfoView, {}]}>
            <View style={[styles.pBadge, {}]}>
              <Text adjustsFontSizeToFit={true} style={[styles.pBadgeText, {}]}>{product.attr1}</Text>
            </View>
            <Text style={[styles.pName, {}]}>{product.name}</Text>
            <View style={styles.priceView}>
              <Text style={[styles.pDPrice, {}]}>{parseFloat(product.price) + 50},99 TL</Text>
              <Text style={[styles.pPrice, {}]}>{product.price} TL</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.fastAdd}
          onPress={() => productBasket(product.name,product.id,1,product.price)}>
          <Text style={styles.fastText}>Fast Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  })
);

export default Products;
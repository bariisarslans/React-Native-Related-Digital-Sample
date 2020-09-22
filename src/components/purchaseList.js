import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Cart from '../functions/Cart';
import Icon from 'react-native-vector-icons/FontAwesome';
import PRODUCTS from '../data/products.json';


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
        fontSize: 17,
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
    quantity: {
        color: 'gray',
        fontSize: 15,
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
    quantityFuncionsView: {
        position: 'absolute',
        marginRight: 15,
        right: 0,
        alignItems: 'center',
        padding: 10
    }
});

const PurchasedItems = ({ productList }) => (
    productList.map((product) => {
        if (product.pb !== "") {
            const id = product.pb,
                imageUrl = PRODUCTS[product.pb - 1].imageUrl,
                attr1 = PRODUCTS[product.pb - 1].attr1,
                name = PRODUCTS[product.pb - 1].name,
                salesPrice = PRODUCTS[product.pb - 1].price,
                price = product.ppr,
                quantity = product.pu;

            return (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} key={id} onPress={() => Actions.Product({ id: id })}>
                    <View style={[styles.pCard, {}]}>
                        <Image style={[styles.pImage, {}]} source={{ uri: imageUrl }}></Image>
                        <View style={[styles.pInfoView, {}]}>
                            <Text style={[styles.pName, {}]}>{name}</Text>
                            <Text style={[styles.pPrice, {}]}>{salesPrice} TL x {quantity} = {price} TL</Text>
                        </View>
                    </View>
                    <Text>{quantity}</Text>
                </TouchableOpacity>
            );
        }

    })
);

export default PurchasedItems;
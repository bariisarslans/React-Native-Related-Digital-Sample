import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';

import RMCFunctions from './functions/RMCFunctions'
import PRODUCTS from './data/products.json';
import Swiper from 'react-native-swiper';
import globalStyles, { color } from './styles/globalStyles';

import {visilabsApi} from './data/rmcConfig';
import Cart from './functions/Cart';

const { width, height } = Dimensions.get('window');

class Product extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            quantity: 1
        };
    }

    productView() {
        //RMC
        var data = {
            "OM.pv": PRODUCTS[this.id - 1].id,
            "OM.pn": PRODUCTS[this.id - 1].name,
            "OM.ppr": PRODUCTS[this.id - 1].price,
            "OM.pv.1": "Related", // Brand
            "OM.inv": "150", // Inventory
        };
        visilabsApi.customEvent("Product View", data);
    }

    productBasket() {
        let basket = {
            pbid: 10000,
            pb: PRODUCTS[this.id - 1].id,
            pu: this.state.quantity,
            ppr: (PRODUCTS[this.id - 1].price * this.state.quantity)
        };
        Cart.addToCart(basket);
        Alert.alert("Bilgilendirme", PRODUCTS[this.id - 1].name + " sepete eklendi.");

        setTimeout(() => {
            //RMC
            Cart.getCart().then((val) => {
                RMCFunctions.updateCart(val);
            });
        }, 500);
    }

    componentDidMount() {
        this.productView();
    }


    _returnProduct() {
        if (this.id) {
            return (
                <View key={PRODUCTS[this.id - 1].id} style={[styles.pCard, {}]}>
                    <View style={[styles.pInfoView, {}]}>
                        <Text style={[globalStyles.productText, {}]}>{PRODUCTS[this.id - 1].name}</Text>
                        <Text style={[globalStyles.productText, {}]}>{PRODUCTS[this.id - 1].price} TL</Text>
                    </View>
                </View>
            );
        }
    }

    _returnSwiper() {
        return (
            <Swiper
                style={styles.wrapper}
                loop={false}
                horizontal={true}
                loadMinimal={true}
                showsButtons={false}
                paginationStyle={{ bottom: -20 }}
            >
                <View style={globalStyles.slideItem}>
                    <Image style={[styles.slideImage, { resizeMode: "contain" }]} source={{ uri: PRODUCTS[this.id - 1].imageUrl }}></Image>
                </View>
                <View style={globalStyles.slideItem}>
                    <Image style={styles.slideImage} source={{ uri: "https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/02/22202310/MG_3851-HDR-1200x800.jpg" }}></Image>
                </View>
                <View style={globalStyles.slideItem}>
                    <Image style={styles.slideImage} source={{ uri: "https://www.westinstore.cn/media/catalog/product/cache/19/image/9df78eab33525d08d6e5fb8d27136e95/w/e/westin-us-eu-ap-reed-diffuser-sticker-606-v8.jpg" }}></Image>
                </View>
                <View style={globalStyles.slideItem}>
                    <Image style={{ width: "100%", height: "50%", resizeMode: 'contain' }} source={{ uri: "https://www.relateddigital.com/i/assets/rd-2019/images/footer-logo.png" }}></Image>
                </View>
            </Swiper>
        );
    }

    returnQuantityButton(q) {
        return (
            <TouchableOpacity
                style={{
                    margin: 5,
                    backgroundColor: color.primary,
                    borderRadius: 20,
                    width: 40
                }}
                onPress={() => this.setState({ quantity: q })}>
                <Text
                    style={[globalStyles.title, globalStyles.buttonText]}>{q}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: height * .5 }}>
                    {this._returnSwiper()}
                </View>
                {this._returnProduct()}
                <View style={[globalStyles.containerItemCenter, globalStyles.row, {
                    marginBottom: 15
                }]}>

                    <Text style={globalStyles.title}>Quantity :</Text>
                    {this.returnQuantityButton(1)}
                    {this.returnQuantityButton(2)}
                    {this.returnQuantityButton(3)}
                </View>
                <View style={globalStyles.addToCartBtn}>
                    <TouchableOpacity style={[globalStyles.row, globalStyles.containerItemCenter]} onPress={() => this.productBasket()}>
                        <Text style={[globalStyles.buttonText, { fontSize: 40, fontWeight: "bold" }]}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.quantityIconContainer}>
                        <Text style={styles.quantityIcon}>
                            x{this.state.quantity}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    pCard: {
        width,
        marginTop: 20
    },
    pImage: {
        height: width,
        margin: 5,
        resizeMode: 'contain',
    },
    pInfoView: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: -.5
    },
    wrapper: {
        height: height / 2,
    },
    slideImage: {
        width: "100%",
        flex: 1
    },
    quantityIcon: {
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: color.white,
    },
    quantityIconContainer:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: color.primary,
        height: height * .1,
        width: height * .1,
        alignItems:'center',
        justifyContent:'center'
    }
});


export default Product;
import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import CartItems from './components/cart';
import globalStyles, { color } from './styles/globalStyles';
import Cart from './functions/Cart';
import RMCFunctions from './functions/RMCFunctions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: "",
            totalBasketAmount: 0
        };

        this.getCart();
    }

    getCart() {
        Cart.getCart().then((val) => {
            console.log("val", val);
            val = val && val.length > 0 ? val : [{ pbid: "10000", pb: "", pu: "", ppr: "0" }];
            this.setState({ productList: val });
            RMCFunctions.updateCart(val);
            this.checkTotalAmount();
        });
    }

    update(id, quantity) {
        let tempProducts = [];
        this.state.productList.forEach(product => {
            let tempProduct = {};
            tempProduct = product;
            if (product.pb == id) {
                tempProduct.ppr = (product.ppr / product.pu) * (tempProduct.pu + quantity);
                tempProduct.pu += quantity;
            }
            if (tempProduct.pu > 0)
                tempProducts.push(tempProduct);

        });
        this.setState({
            productList: tempProducts
        });
        Cart.setToCart(tempProducts);
        this.getCart();
        this.checkTotalAmount();
    }

    checkTotalAmount() {
        let totalBasketAmount = 0;
        this.state.productList.forEach(product => {
            totalBasketAmount += parseFloat(product.ppr);
        });
        this.setState({ totalBasketAmount });
    }

    remove(id) {
        let tempProducts = [];
        this.state.productList.forEach(product => {
            let tempProduct = {};
            tempProduct = product;
            if (product.pb != id)
                tempProducts.push(tempProduct);
        });
        this.setState({
            productList: tempProducts
        });
        Cart.setToCart(tempProducts);
        this.getCart();
        this.checkTotalAmount();
    }

    returnCart() {
        if (this.state.productList === "" || this.state.productList === null || this.state.productList === undefined) {
            return (
                <Text style={{ color: "gray", fontStyle: 'italic' }}>empty</Text>
            )
        }
        else {
            return (
                <CartItems
                    productList={this.state.productList}
                    update={this.update.bind(this)}
                    remove={this.remove.bind(this)} />
            )
        }
    }

    clearBasket() {
        Cart.clearCart();
        //RMC
        RMCFunctions.updateCart(this.state.productList);
        this.setState({ productList: "" });
    }

    _returnPurchaseButton() {
        if (this.state.totalBasketAmount > 0) {
            return (
                <TouchableOpacity
                    onPress={() => Actions.Purchase()}
                    style={styles.purchaseButton}>
                    <Text style={[globalStyles.buttonText, { fontSize: 40, fontWeight: "bold" }]}>Satın Al</Text>
                </TouchableOpacity>
            )
        }
    }

    _returnClearButtonAndTotalInfo(){
        if (this.state.totalBasketAmount > 0) {
            return (
                <View style={[globalStyles.row,{justifyContent:'space-between',width}]}>
                    <TouchableOpacity
                        onPress={() => this.clearBasket()}>
                        <Text style={styles.clearBasket}>Clear Basket</Text>
                    </TouchableOpacity>
                    <Text style={styles.total}>{this.state.totalBasketAmount} TL</Text>
                </View>
            )
        }
        
    }

    render() {
        return (
            <View style={globalStyles.containerItemCenter}>
                {this._returnClearButtonAndTotalInfo()}
                <ScrollView style={styles.scrollView}>
                    {this.returnCart()}
                </ScrollView>
                {this._returnPurchaseButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 15,
    },
    purchaseButton: {
        width,
        height: height * .1,
        backgroundColor: color.primary,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearBasket: {
        color: color.buttonText,
        backgroundColor: color.primary,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        marginLeft:width/3
    },
    total: {
        backgroundColor: color.primary,
        color: color.buttonText,
        fontSize: 17,
        paddingHorizontal: 10,
        paddingVertical: 15,
        position: 'absolute',
        right: 0,
        top: 0
    }
})

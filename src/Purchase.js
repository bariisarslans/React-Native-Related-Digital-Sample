import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import PurchasedItems from './components/purchaseList';
import globalStyles, { color } from './styles/globalStyles';
import Cart from './functions/Cart';
import RMCFunctions from './functions/RMCFunctions';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

export default class Purchase extends Component {
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
            
            //RMC
            RMCFunctions.purchase(val);

            this.checkTotalAmount();
            Cart.clearCart();
        });
    }


    checkTotalAmount() {
        let totalBasketAmount = 0;
        this.state.productList.forEach(product => {
            totalBasketAmount += parseFloat(product.ppr);
        });
        this.setState({ totalBasketAmount });
    }


    returnCart() {
        if (this.state.productList.length > 0) {
            return (
                <PurchasedItems
                    productList={this.state.productList} />
            )
        }
    }


    render() {
        return (
            <View style={globalStyles.containerItemCenter}>
                <View style={[globalStyles.row, styles.notification]}>
                    <Text style={styles.total}>Purchase Completed</Text>
                    <Text style={styles.total}>Total : {this.state.totalBasketAmount} TL</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {this.returnCart()}
                </ScrollView>
                <TouchableOpacity style={styles.home} onPress={()=>Actions.reset('Home')}>
                    <Text style={{color:color.buttonText}}>Home</Text>
                </TouchableOpacity>
                {/* <Icon onPress={()=>Actions.reset('Home')} style={styles.home} color={color.buttonText} size={30} name={"home"} /> */}
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

    },
    total: {
        color: color.buttonText,
        fontSize: 17,
        fontWeight: "bold",
        // fontStyle:"italic",
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    notification: {
        backgroundColor: color.success,
        width: "100%",
        justifyContent: 'space-between'
    },
    home:{
        position:'absolute',
        right:15,
        bottom:35,
        padding:15,
        borderRadius:25,
        backgroundColor:color.primary,
        color:color.buttonText,
        zIndex:9999
    }
})

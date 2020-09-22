import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import Products from './components/products';
import PRODUCTS from './data/products.json';
import globalStyles from './styles/globalStyles';
import {visilabsApi} from './data/rmcConfig';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchKeyword:""
        };
        this.categoryName = this.props.catName ? this.props.catName : this.props.navigation.state.routeName;
        this.categoryCode = this.props.code ? this.props.code : 0;

        // Burada gönderilecek kategori kodu, web site ve ürün dosyasındaki kod ile aynı olmalıdır.
        var data = {
            "OM.clist": this.categoryCode
        };
        visilabsApi.customEvent("Category View", data);
    }

    _search() {
        var data = {
            "OM.OSS": this.state.searchKeyword,
            "OM.OSSR": PRODUCTS.length
        };
        visilabsApi.customEvent("In App Search", data);
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>{this.categoryName}</Text>
                <View style={[globalStyles.center]}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder={"Aramak istediğiniz kelimeyi girin..."}
                        onChangeText={(searchKeyword) => this.setState({ searchKeyword })} />
                    <TouchableOpacity
                        onPress={() => this._search()}
                        style={[globalStyles.searchButton, {
                            position: 'absolute',
                            right: "7%"
                        }]}>
                        <Text style={globalStyles.buttonText}>Ara</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView marginTop={10}>
                    <Products productList={PRODUCTS} />
                </ScrollView>
            </View>
        )
    }
}

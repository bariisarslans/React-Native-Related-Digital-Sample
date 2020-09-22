import {AsyncStorage} from 'react-native';

const Cart = {
    addToCart: function (item) {
        if (item === "" || item === null || item === undefined)
            return false;

        let basket = [];

        this.getCart().then((res) => {
            let isThere = false;
            if (res) {
                basket = Object.values(res);
                basket.forEach(product => {
                    if (product.pb == item.pb) {
                        isThere = true;
                        product.pu = parseFloat(item.pu) + parseFloat(product.pu);
                        product.ppr = parseFloat(item.ppr) + parseFloat(product.ppr);
                    }
                });
            }

            if (!isThere)
                basket.push(item);

            AsyncStorage.setItem('Cart', JSON.stringify(basket));

        }).catch((err) => console.log("Error", err));

        console.log("Added item : ", item);
    },
    setToCart: function (data) {
        if (data.lenght <= 0)
        data={
            pbid:"",
            pb:"",
            pu:"",
            ppr:""
        }

        AsyncStorage.setItem('Cart', JSON.stringify(data));
    },
    clearCart: function () {
        AsyncStorage.setItem('Cart', "");
        return "Success clean";
    },
    getCart: async function () {
        return JSON.parse(await AsyncStorage.getItem('Cart'));
    },
};

export default Cart;

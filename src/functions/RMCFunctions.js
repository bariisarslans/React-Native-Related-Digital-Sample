import {visilabsApi,euroMessageApi} from '../data/rmcConfig';

const RMCFunctions = {
    updateCart: function (cartData) {
        if (cartData.length <= 0)
            return false;

        let data = {},
            pb = "",
            pu = "",
            ppr = "";

        cartData.forEach(product => {
            pb += product.pb + ";";
            pu += product.pu + ";";
            ppr += parseFloat(product.ppr) + ";";
        });
        data["OM.pbid"] = cartData[0].pbid ? cartData[0].pbid : "";
        data["OM.pb"] = pb.substr(0, pb.length - 1);
        data["OM.pu"] = pu.substr(0, pu.length - 1);
        data["OM.ppr"] = ppr.substr(0, ppr.length - 1);

        visilabsApi.customEvent("Product Basket", data);
        console.log("Event RMC sunucularına gönderildi.", data);
    },
    purchase: function (cartData) {
        if (cartData.length <= 0)
            return false;

        let data = {},
            pb = "",
            pu = "",
            ppr = "";

        cartData.forEach(product => {
            pb += product.pb + ";";
            pu += product.pu + ";";
            ppr += parseFloat(product.ppr) + ";";
        });
        data["OM.tid"] = cartData[0].pbid ? cartData[0].pbid : "";
        data["OM.pp"] = pb.substr(0, pb.length - 1);
        data["OM.pu"] = pu.substr(0, pu.length - 1);
        data["OM.ppr"] = ppr.substr(0, ppr.length - 1);

        visilabsApi.customEvent("Cart", data);
        console.log("Event RMC sunucularına gönderildi.", data);
    },
    tokenRegister: async function (token) {
        if (!token || token.length <= 0)
            return false;
            
        const subscribeResult = await euroMessageApi.subscribe(token)
        console.log("Euromessage token register result",subscribeResult);
 
        visilabsApi.register(token, (result) => {
              console.log("Visilabs token register result",result);
        })
    }
};

export default RMCFunctions;
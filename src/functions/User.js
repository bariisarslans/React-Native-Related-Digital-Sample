import AsyncStorage from '@react-native-async-storage/async-storage';

const User = {
    setUser: function (user,page = "") {
        console.log("user "+page+" : "+new Date().getTime(),user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        return "Successful login";
    },
    getUser: async function () {
        
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        return (user === null ? {} : user);
    }
};

export default User;

import React, { Component } from 'react';
import { Text, Alert, View, Switch, TextInput, Dimensions, ScrollView, TouchableOpacity, Clipboard, Platform } from 'react-native';
import globalStyles, { color } from './styles/globalStyles'
import User from './functions/User';
import {visilabsApi,euroMessageApi} from './data/rmcConfig';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                keyID: "",
            }
        }
        //RMC
        visilabsApi.customEvent(this.props.navigation.state.routeName,{});
    }

    changeEmailPermit = (value) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                emailPermit: value ? "Y" : "X"
            }
        }))
    }
    changePushPermit = (value) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                pushPermit: value ? "Y" : "N"
            }
        }))
    }
    changeGsmPermit = (value) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                gsmPermit: value ? "Y" : "X"
            }
        }))
    }

    componentDidMount() {
        User.getUser().then(user => { 
            this.setState({ user }), 
            !user.token ? 
                AsyncStorage.getItem('pushToken').then(token => this.setState({ 
                    user:{
                        ...this.state.user,
                        token
                    } })) : 
                false 
        });
        
    }

    getCustomTime = () => {
        var d = new Date();
        var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((d.getMinutes()).toString().length == 2 ? (d.getMinutes()).toString() : "0" + (d.getMinutes()).toString()) + ":" + (d.getSeconds()).toString();
        return date_format_str
    }

// fB6BT22cQ46CulCjSCirE6:APA91bG2qbTf12VzkX2F2tma1kCew2Z9GUxfd1Dx9UfsfGCd15U9LVdtbd18HSxPvALefDgqqbJfr7ZiDafIwWZYW4ssaitFyxB5ryPuCpENQ9q6McMjfZ8UugDa_v5Bm8iyxs43bnXg
    addExtra = async () => {
        // RMC
        await euroMessageApi.setUserProperty("email",this.state.user.email);
        await euroMessageApi.setUserProperty("keyID",this.state.user.keyID);
        await euroMessageApi.setUserProperty("pushPermit",this.state.user.pushPermit);
        await euroMessageApi.setUserProperty("gsmPermit",this.state.user.gsmPermit);
        await euroMessageApi.setUserProperty("emailPermit",this.state.user.emailPermit);
        await euroMessageApi.setUserProperty('ConsentTime', this.getCustomTime());
        await euroMessageApi.setUserProperty('RecipientType', "BIREYSEL");
        await euroMessageApi.setUserProperty('ConsentSource', "HS_MOBIL");
    }

    save() {
        User.setUser(this.state.user);
        this.addExtra().then(()=>(euroMessageApi.subscribe(this.state.user.token),Alert.alert("Info", "User saved success")));
    }

    _returnSwitchRow(permitType, fnc, txt) {
        return (
            <View style={[globalStyles.row, globalStyles.center, { margin: 10 }]}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={fnc}
                    value={permitType === "Y" || permitType === "A" ? true : false}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
                <Text style={[globalStyles.title, { marginLeft: 15 }]}>{txt} Permit</Text>
            </View>
        )
    }

    _returnEmailInputView() {
        return (
            <View style={globalStyles.inputRowContainer}>
                <TextInput
                    style={[globalStyles.input]}
                    placeholder={"Email adresinizi girin.."}
                    placeholderTextColor="gray"
                    onChangeText={email => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            email,
                            keyID: email
                        }
                    }))}
                    value={this.state.user.email}
                />
                <Text
                    style={[globalStyles.customClearButton, { marginRight: 25 }]}
                    onPress={() => this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            email: ""
                        }
                    }))}>Temizle</Text>
            </View>
        )
    }

    _userStatus() {
        return (
            <View style={globalStyles.container}>
                <View style={[globalStyles.row,{display:Platform.OS === "ios" ? "flex" : "flex"}]}>
                    <TouchableOpacity
                        style={{ padding: 5, borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}
                        onPress={() => (AsyncStorage.getItem('pushToken').then(token => (
                            this.setState(prevState => ({
                            user: {
                                ...prevState.user,
                                token
                            }
                        })), Alert.alert("Info", "Token is already up to date. "+ token))))}
                        >
                        <Text>Get Push Token</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyles.title, { color: this.state.user.token ? color.success : color.text }]}>Token :
                    {this.state.user.token ? (this.state.user.token.length > 15 ? this.state.user.token.substr(0, 15) + "..." : this.state.user.token) : "Token is null"}
                    </Text>
                    <TouchableOpacity
                        style={{ padding: 5, borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}
                        onPress={() => (Clipboard.setString(this.state.user.token), Alert.alert("Info", "Token has been copied."))}>
                        <Text>Copy</Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={[globalStyles.title, { color: this.state.user.email ? color.success : color.text }]}>Email :
                    {this.state.user.email ? this.state.user.email : "Email is empty"}
                </Text>
                <Text style={[globalStyles.title, { color: this.state.user.emailPermit === "Y" ? color.success : color.text }]}>Email İzni : {this.state.user.emailPermit === "Y" ? "Aktif" : "Pasif"}</Text>
                <Text style={[globalStyles.title, { color: this.state.user.pushPermit === "Y" ? color.success : color.text }]}>Push İzni : {this.state.user.pushPermit === "Y" ? "Aktif" : "Pasif"}</Text>
                <Text style={[globalStyles.title, { color: this.state.user.gsmPermit === "Y" ? color.success : color.text }]}>Sms İzni : {this.state.user.gsmPermit === "Y" ? "Aktif" : "Pasif"}</Text>
            </View>
        )
    }

    _returnSaveButton() {
        return (
            <TouchableOpacity
                style={[globalStyles.button]}
                onPress={() => this.save()}>
                <Text style={[globalStyles.whitehHeader]}>Save</Text>
            </TouchableOpacity>
        )
    }

    deleteStorage(){
        AsyncStorage.clear();
    }

    _returnClearStorageButton() {
        return (
            <TouchableOpacity
                style={[globalStyles.button]}
                onPress={() => this.deleteStorage()}>
                <Text style={[globalStyles.whitehHeader]}>Clear Storage</Text>
            </TouchableOpacity>
        )
    }



    render() {
        return (
            <ScrollView>
                {this._returnSwitchRow(this.state.user.emailPermit, this.changeEmailPermit, "Email")}
                {this._returnSwitchRow(this.state.user.pushPermit, this.changePushPermit, "Push")}
                {this._returnSwitchRow(this.state.user.gsmPermit, this.changeGsmPermit, "Sms")}
                <Text style={[globalStyles.header, { marginLeft: 25 }]}>Email</Text>
                {this._returnEmailInputView()}
                {this._userStatus()}
                {this._returnSaveButton()}
                {this._returnClearStorageButton()}
            </ScrollView>
        )
    }
}

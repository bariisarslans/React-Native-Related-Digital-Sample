import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { visilabsApi } from './data/rmcConfig';


class Banner extends Component {
    constructor(props) {
        super(props)
        this.id = this.props.id ? this.props.id : 1;
        this.img = this.props.img ? this.props.img : "https://i.ytimg.com/vi/QTNj5FzAoSI/maxresdefault.jpg";
    
        //RMC
        var data = { 
            "OM.OSB": this.id
        };
        visilabsApi.customEvent("Banner Click", data);
    }
    
    render() {
        return (
            <ImageBackground 
            source={{uri:this.img}}
            blurRadius={50}
            style={{ flex: 1,backgroundColor:'white',alignItems:'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 30,fontWeight:"bold", justifyContent: 'center', alignItems: 'center' }}>{this.id}</Text>
                <Image style={{ width: "100%", height: 250 }} source={{ uri: this.img }} />
            </ImageBackground>
        );
    }
}

export default Banner;
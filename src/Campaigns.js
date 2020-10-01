import React, { Component } from 'react';

import { View, Text, Image } from 'react-native';


class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    componentDidMount() {
        var data = { "OM.OSB": this.state.id ? this.state.id : "0" };
        // api.customEvent("Banner Click", data);

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ width: "100%", height: 250 }} source={{ uri: this.state.img }} />
                <Text style={{ color: "red", fontSize: 30, justifyContent: 'center', alignItems: 'center' }}>{this.state.id}</Text>
            </View>
        );
    }
}

export default Banner;
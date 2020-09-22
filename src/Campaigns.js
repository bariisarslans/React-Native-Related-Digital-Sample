import React, { Component } from 'react';

import { View, Text, Platform, Image } from 'react-native';
// import { create_api } from '@relateddigital/visilabs-react-native';

import { Actions } from 'react-native-router-flux';

// var organizationID = "676D325830564761676D453D";
// var siteID = "356467332F6533766975593D";
// var segmentURL = "http://lgr.visilabs.net";
// var dataSource = "visistore";
// var realTimeURL = "http://rt.visilabs.net";
// var channel = "RelatedApp-" + Platform.OS;
// var euroMsgApplicationKey = Platform.OS === "ios" ? "RelatedStoreIOS" : "RelatedStoreAndroid";
// var euroMsgSubscriptionURL = "https://pushs.euromsg.com/subscription";
// var euroMsgRetentionURL = "https://pushr.euromsg.com/retention";
// var locale = "tr-TR";
// var api = create_api(organizationID, siteID, segmentURL, dataSource, realTimeURL, channel, euroMsgApplicationKey, euroMsgSubscriptionURL, euroMsgRetentionURL, locale);



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
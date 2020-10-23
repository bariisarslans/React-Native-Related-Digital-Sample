import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import StoryItem from './StoryItem';
import tempStoryData from './tempStoryData.json'

import { returnSeenStories,fetchWithCallback } from './utils'

export default class Story extends Component {
    constructor(props) {
        super(props)
        this.size = this.props.size ? this.props.size : 100
        this.state = {
            data: tempStoryData
        }
        this.callback = this.callback.bind(this)
        
        // fetchWithCallback("url",POST,{},function() {
            // Gelen datayı state'e yolla.
        // })

        this.seenStories()
    }


    seenStories(){
        returnSeenStories(tempStoryData).then(res =>
            this.setState({ data: res })
        )
    }

    callback(key) {
        let newData = this.state.data
        newData.forEach(obj => {
            if (obj.key === key) {
                obj.seen = true
            }
        });
        this.setState({ data: newData })
    }

    storyItems = (items) => (
        items.map((item) => {
            return (
                <StoryItem
                    key = {item.key}
                    size={this.size}
                    data={item}
                    action={this.props.action}
                    callback={this.callback} />
            );
        })
    );

    render() {
        return (
            <View style={{ height: this.size }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {this.storyItems(this.state.data)}
                </ScrollView>
            </View>
        );
    }
}
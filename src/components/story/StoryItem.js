import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { dots,seen } from './utils'

export default class StoryItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            story:this.props.data,
            action : this.props.action,
            size : this.props.size - (this.props.data.seen ? 27 : 30)
        }
    }

    press() {
        seen(this.state.story.key)
        this.state.action(this.state.story.url)
        this.props.callback(this.state.story.key)
    }

    render() {
        const width = this.state.size,
            height = this.state.size,
            borderRadius = this.state.size / 2
        return (
            <TouchableOpacity
                style={styles.center}
                onPress={() => this.press()}>
                <View style={[
                    styles.itemContainer,
                    { width, height, borderRadius },
                    this.state.story.seen && (styles.seen)]}>
                    <Image source={{ uri: this.state.story.image }} style={[styles.item, { borderRadius: this.state.size / 2 }]} />
                </View>
                <Text>{dots(this.state.story.title, 7)}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 3,
        padding: 3,
        borderWidth: 2,
        borderColor: "#cb2d8c",
        marginHorizontal:5
    },
    seen:{
        padding: 4,
        borderWidth: 1,
        borderColor: "#aaa"
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flex: 1
    }
})

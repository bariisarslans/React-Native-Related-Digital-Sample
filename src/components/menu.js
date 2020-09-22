import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStyles,{color} from '../styles/globalStyles'

export default class menu extends Component {
    render() {
        return (
            <View style={[globalStyles.row]}>
                <TouchableOpacity
                    onPress={() => Actions.Category({catName:"Kadın",code:1})}
                    style={globalStyles.menuItem}>
                    <Text style={[globalStyles.title,globalStyles.white,{backgroundColor:color.primary},styles.customText]}>Kadın</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Actions.Category({catName:"Erkek",code:2})}
                    style={globalStyles.menuItem}>
                    <Text style={[globalStyles.title,globalStyles.white,{backgroundColor:color.primary},styles.customText]}>Erkek</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    customText:{borderRadius:5}
})


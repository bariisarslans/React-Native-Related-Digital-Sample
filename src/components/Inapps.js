import React, { Component } from 'react'
import { Button, View, Text } from 'react-native'
import {visilabsApi} from '../data/rmcConfig';

export default class Inapps extends Component {

    TamEkranInApp = () => {
        visilabsApi.customEvent('TamEkranInApp', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    GorselBaslikMetin = () => {
        visilabsApi.customEvent('GorselBaslikMetin', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }


    MiniIconText = () => {
        visilabsApi.customEvent('MiniIconText', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    SadeceGorsel = () => {
        visilabsApi.customEvent('SadeceGorsel', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    gorselBaslikMetinII = () => {
        visilabsApi.customEvent('gorselBaslikMetinII', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    anketInApp = () => {
        visilabsApi.customEvent('anketInApp', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    NPSINAPP = () => {
        visilabsApi.customEvent('NPSINAPP', {
            'OM.exVisitorID': 'baris.arslan@euromsg.com',
        })
    }

    render() {
        return (
            <View>
                <Text style={{textAlign:'center',fontSize:15}}>In App Messages</Text>
                <Button 
                    title='Tam Ekran'
                    onPress={() => {
                        this.TamEkranInApp()
                    }}
                />
                <Button
                    title='Görsel, Başlık, Metin'
                    onPress={() => {
                        this.GorselBaslikMetin()
                    }}
                />

                <Button
                    title='Görsel, Başlık ve Metin v2'
                    onPress={() => {
                        this.gorselBaslikMetinII()
                    }}
                />

                <Button
                    title='Altta Çıkan Bildirim'
                    onPress={() => {
                        this.MiniIconText()
                    }}
                />

                <Button
                    title='Sadece Görsel'
                    onPress={() => {
                        this.SadeceGorsel()
                    }}
                />

                <Button
                    title='Anket'
                    onPress={() => {
                        this.anketInApp()
                    }}
                />

                <Button
                    title='NPS'
                    onPress={() => {
                        this.NPSINAPP()
                    }}
                />
            </View>
        )
    }
}

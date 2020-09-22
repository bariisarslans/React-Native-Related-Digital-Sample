import React, { useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import User from './functions/User';

export let TOKEN = {};

const PushNotif = {
    getToken: async function (type) {
        if (type === 'apns') {
            return await firebase.messaging().getAPNSToken().then(x => (
                this.setToken(x),
                console.log("apnstoken",x),
                TOKEN = x));
        }
        else {
           return await firebase
                .messaging()
                .getToken(firebase.app().options.messagingSenderId)
                .then(x => (
                    console.log("Token", x),
                    this.setToken(x),
                    TOKEN = x))
                .catch(e => console.log(e));
        }
    },
    setToken: function (token) {
        User.getUser().then(user => { (user.token = token, User.setUser(user)) });
    },
    showNotification: function (notification: FirebaseMessagingTypes.Notification) {
        // console.log("notificationnnn", notification);
        // console.log(JSON.stringify(notification));
        // PushNotification.localNotification({
        //     title: notification.title,
        //     message: notification.body,
        // });
    },
    pushHandle: function () {
        // Burada reportRead gönderilecek
        // firebase.messaging().onMessage(response => {
        //     console.log(response);
        //     if (Platform.OS === 'ios') {
        //         console.log("ios");
        //         PushNotificationIOS.requestPermissions().then(
        //             this.showNotification(response.data.notification),
        //         );
        //     } else {
        //         console.log("else");
        //         this.showNotification(response.notification);
        //     }
        // });
    },
    setBackgroundNotificationHandle: function () {
        // firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        //     console.log("remoteMessage", remoteMessage);
        //     this.showNotification(remoteMessage);
        // });
    },
    onNotificationOpenedApp: function () {
        // firebase.messaging().onNotificationOpenedApp(async (message) => {
        //     console.log("Açıldı", message);
        // });
        // firebase.messaging().getInitialNotification().then(initialMessage => {
        //     console.log("Initial Messagee: ", initialMessage); 
        //  })
    },
    onTokenRefresh: async function () {
        // firebase.messaging().onTokenRefresh(async (fcmToken) => {
        //     alert("Info", 'New FCM Token:' + fcmToken);
        //     return fcmToken;
        // });
    }
};

// const PushNotif = () => {
//     const showNotification = (
//         notification: FirebaseMessagingTypes.Notification,
//     ) => {
//         PushNotification.localNotification({
//             title: notification.title,
//             message: notification.body,
//         });
//     };
//     useEffect(() => {
//         firebase
//             .messaging()
//             .getToken(firebase.app().options.messagingSenderId)
//             .then(x => console.log(x))
//             .catch(e => console.log(e));

//         firebase.messaging().onMessage(response => {
//             console.log(JSON.stringify(response));
//             if (Platform.OS === 'ios') {
//                 PushNotificationIOS.requestPermissions().then(
//                     showNotification(response.notification),
//                 );
//             } else {
//                 showNotification(response.notification);
//             }
//         });
//     }, []);
//     return <></>;
// };
export default PushNotif;
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Platform, PushNotificationIOS } from "react-native";
import { Text, View } from "react-native";
import Appbar from "../../components/Appbar";
import Colors from "../../style/Colors/colors";
import PushNotification from "react-native-push-notification";
import { OneSignal } from "react-native-onesignal";

const NotificationScreen = () => {
    useEffect(() => {
        OneSignal.Notifications.addEventListener('click', (event) => {
            console.log('OneSignal: notification clicked:', event);
          });
    }, []);

    return (
        <View>
            <Appbar title={'Notification'} />
            <View style={styles.container}>
                <Text style={styles.date}>Today</Text>
                <View style={styles.notification}>
                    <Text>New Task for you ,from Mr. Karim Hene
                        He want a worker for seeling plaster..........</Text>
                </View>
            </View>

        </View>
    )
}
export default NotificationScreen;
const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    notification: {
        borderColor: Colors.card_bg,
        backgroundColor: Colors.card_bg,
        elevation: 8,
        padding: 12,
        fontFamily: 'Roboto-Regular',
    },
    date: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        marginBottom: 10
    }
})
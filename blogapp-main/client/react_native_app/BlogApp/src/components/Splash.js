import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import Storage from "../utils/Storage";
import Cache from "../utils/Cache";
import Key from "../utils/Key";

const Splash = () => {

    const [isShowSplash, setIsShowSplash] = useState(true)

    useEffect(() => {

        const fetchUser = async () => {
            const user = await Storage.get(Key.USER)
            if (user != undefined) {
                Cache.setSessionValue(Key.USER, user);
            }
            setTimeout(() => {
                setIsShowSplash(false)
            }, 3000)
        }

        fetchUser().catch(err => { console.log(err) })
    }, []);

    if (isShowSplash) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Bloggy</Text>
                <Text style={styles.footer}>Powered by App</Text>
            </View>
        )
    }
    else {
        return (
            <AppNavigator />
        );
    }

}

export default Splash;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    label: { fontSize: 40, color: '#923bcc', fontStyle: 'italic' },
    footer: { position: 'absolute', bottom: 0, fontSize: 20, color: '#d6a9b0', marginBottom: 20 }
});
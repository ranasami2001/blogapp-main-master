import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Cache from "../utils/Cache";
import Spinner from 'react-native-loading-spinner-overlay';
import AxiosInstance from "../network/RequestHandler";
import Storage from "../utils/Storage";
import Key from "../utils/Key";
import Screen from "../utils/Screen";

let allblogs = []
let myblogs = []
const Home = ({ navigation }) => {
    const [isShowLoader, setIsShowLoader] = useState(false)

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            fetchBlogs();
        });
        return listener;
    }, []);

    const fetchBlogs = () => {
        setIsShowLoader(true)

        AxiosInstance.post(
            '/service.php', {
            'action': 'GET_BLOGS',
            'userId': Cache.getSessionValue(Key.USER)
        }).then((response) => {
            setIsShowLoader(false);
            let res = response.data;
            allblogs = res.allBlogs;
            myblogs = res.myBlogs;

            Cache.setSessionValue(Key.ALL_BLOGS, allblogs, Cache.JSON)
            Cache.setSessionValue(Key.MY_BLOGS, myblogs, Cache.JSON)
        }).catch((error) => {
            console.log(error);
            setIsShowLoader(false);
        });
    }

    onAllBlogsClicked = () => {
        if (allblogs.length > 0) {
            navigation.navigate(Screen.ALLBLOGS);
        }
        else {
            Alert.alert("Bloggy", 'Blogs are not available', [
                {
                    text: "OK",
                    onPress: () => {
                    }
                }
            ]);
        }
    }

    onMyBlogsClicked = () => {
        navigation.navigate(Screen.MYBLOGS);
    }

    onLogoutClicked = () => {
        Alert.alert(
            'Bloggy',
            `Are you sure? you wants to logout from the app?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes, Sure',
                    onPress: () => {
                        Storage.clear();
                        Cache.clearSession();
                        setTimeout(() => {
                            navigation.goBack();
                        }, 100);
                    }
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 150, padding: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={onAllBlogsClicked}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../assets/ic_blog.png')} />
                    <Text style={{ fontSize: 17, color: '#923bcc', fontWeight: '500', padding: 10 }}>All Blogs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={onMyBlogsClicked}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../assets/my_blog.png')} />
                    <Text style={{ fontSize: 17, color: '#923bcc', fontWeight: '500', padding: 10 }}>My Blogs</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 150, padding: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center' }}
                    onPress={onLogoutClicked}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../assets/ic_logout.png')} />
                    <Text style={{ fontSize: 17, color: '#923bcc', fontWeight: '500', padding: 10 }}>Logout</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                </View>
            </View>

            <Text style={{ position: 'absolute', bottom: 0, fontSize: 20, color: '#d6a9b0', marginBottom: 20 }}>Powered by App</Text>

            <Spinner
                visible={isShowLoader}
                textContent={'Please wait...'}
                textStyle={{ color: '#923bcc' }} />
        </View>
    )


}

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
    label: { fontSize: 40, color: '#923bcc', fontStyle: 'italic' }
});
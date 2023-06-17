import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import Cache from "../utils/Cache";
import Spinner from 'react-native-loading-spinner-overlay';
import AxiosInstance from "../network/RequestHandler";
import Key from "../utils/Key";
import Screen from "../utils/Screen";

const BlogItemType = ({ index, item, onEdit, onDelete }) => (
    <View style={index % 2 == 0 ? styles.listItem1 : styles.listItem2}>
        <View style={styles.contentBox}>
            <Text style={index % 2 == 0 ? styles.title1 : styles.title2}>{item.title}</Text>
            <Text style={styles.detail}>{item.description}</Text>
            <Text style={styles.detail}>{item.dateTime}</Text>
        </View>

        <View style={styles.ImageBox}>
            <TouchableOpacity style={{ marginVertical: 5 }} onPress={onEdit}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/ic_edit.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: 5 }} onPress={onDelete}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/ic_delete.png')} />
            </TouchableOpacity>
        </View>
    </View>
)

const MyBlogs = ({ navigation }) => {
    const [blog, setBlog] = useState([])
    const [isShowLoader, setIsShowLoader] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const blogs = Cache.getSessionValue(Key.MY_BLOGS, Cache.JSON)
            setBlog(blogs)
        });

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../assets/ic_home.png')} />

                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate(Screen.ADDBLOG)}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../assets/ic_add.png')} />

                </TouchableOpacity>
            ),
        });

        return unsubscribe;

    }, []);

    const onEditClicked = (item) => {
        Cache.setSessionValue(Key.BLOG, item, Cache.JSON);
        navigation.navigate(Screen.EDITBLOG);
    }

    const onDeleteClicked = (item) => {
        Alert.alert(
            'Bloggy',
            `Are you sure? you wants to delete this blog?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes, Sure',
                    onPress: () => {
                        deleteBlog(item);
                    }
                },
            ],
            { cancelable: false },
        );
    }

    const deleteBlog = (blog) => {
        setIsShowLoader(true)

        AxiosInstance.post(
            '/service.php', {
            'action': 'DELETE_BLOG',
            'userId': Cache.getSessionValue(Key.USER),
            'blogId': blog.blogId
        }).then((response) => {
            let res = response.data;
            if (res.status) {
                fetchBlogs();
            }
            else {
                setIsShowLoader(false);
            }
        }).catch((error) => {
            console.log(error);
            setIsShowLoader(false);
        });
    }

    const fetchBlogs = () => {
        AxiosInstance.post(
            '/service.php', {
            'action': 'GET_BLOGS',
            'userId': Cache.getSessionValue(Key.USER)
        }).then((response) => {
            setIsShowLoader(false);
            let res = response.data;

            setBlog(res.myBlogs)

            Cache.setSessionValue(Key.ALL_BLOGS, res.allBlogs, Cache.JSON)
            Cache.setSessionValue(Key.MY_BLOGS, res.myBlogs, Cache.JSON)

        }).catch((error) => {
            console.log(error);
            setIsShowLoader(false);
        });
    }

    const renderItem = ({ item, index }) => (
        <BlogItemType
            index={index}
            item={item}
            onEdit={() => { onEditClicked(item) }}
            onDelete={() => { onDeleteClicked(item) }} />
    );

    if (blog.length > 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={blog}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                />
                <Spinner
                    visible={isShowLoader}
                    textContent={'Please wait...'}
                    textStyle={{ color: '#923bcc' }} />
            </View>
        );
    }
    else {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.label}>{`You have not added any blog`}</Text>
                <Spinner
                    visible={isShowLoader}
                    textContent={'Please wait...'}
                    textStyle={{ color: '#923bcc' }} />
            </View>
        );
    }

}

export default MyBlogs;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listItem1: { flex: 1, padding: 10, margin: 10, backgroundColor: '#eadff2', borderRadius: 10, flexDirection: 'row' },
    listItem2: { flex: 1, padding: 10, margin: 10, backgroundColor: '#dfe6f2', borderRadius: 10, flexDirection: 'row' },
    contentBox: { flex: 8 },
    ImageBox: { flex: 2, alignItems: 'flex-end', justifyContent: 'center' },
    title1: { fontSize: 22, color: '#923bcc', fontWeight: '600' },
    title2: { fontSize: 22, color: '#095be8', fontWeight: '600' },
    detail: { color: '#000' },
    emptyContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    label: { fontSize: 16, color: '#923bcc' }
});
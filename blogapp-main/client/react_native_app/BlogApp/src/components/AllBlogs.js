import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Cache from "../utils/Cache";
import Key from "../utils/Key";

const BlogItem = ({ item, index }) => (
    <View style={index % 2 == 0 ? styles.listItem1 : styles.listItem2}>
        <Text style={index % 2 == 0 ? styles.title1 : styles.title2}>{item.title}</Text>
        <Text style={styles.detail}>{item.bloggerName}</Text>
        <Text style={styles.detail}>{item.description}</Text>
        <Text style={styles.detail}>{item.dateTime}</Text>
    </View>
)

const AllBlogs = ({ navigation }) => {
    const [blog, setBlog] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const blogs = Cache.getSessionValue(Key.ALL_BLOGS, Cache.JSON)
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
        });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={blog}
                renderItem={BlogItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index} />
        </View>
    );
}

export default AllBlogs;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listItem1: { flex: 1, padding: 10, margin: 10, backgroundColor: '#eadff2', borderRadius: 10 },
    listItem2: { flex: 1, padding: 10, margin: 10, backgroundColor: '#dfe6f2', borderRadius: 10 },
    title1: { fontSize: 22, color: '#923bcc', fontWeight: '600' },
    title2: { fontSize: 22, color: '#095be8', fontWeight: '600' },
    detail: { color: '#000' }
});
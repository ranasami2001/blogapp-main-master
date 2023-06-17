import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import AxiosInstance from "../network/RequestHandler";
import Spinner from 'react-native-loading-spinner-overlay';
import Cache from "../utils/Cache";
import Key from "../utils/Key";

let blog = undefined;

const EditBlog = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [isShowLoader, setIsShowLoader] = useState(false)

    useEffect(() => {
        blog = Cache.getSessionValue(Key.BLOG, Cache.JSON)
        setTitle(blog.title)
        setDescription(blog.description)

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../assets/ic_back.png')} />

                </TouchableOpacity>
            )
        });
    }, [])

    onUpdateBlogClicked = () => {
        setError('');
        setIsError(false);

        if (title.length < 1) {
            setError('please enter title');
            setIsError(true);
        }
        else if (title.length < 3) {
            setError('title should be atleast 3 character long');
            setIsError(true);
        }
        else if (description.length < 1) {
            setError('please enter description');
            setIsError(true);
        }
        else if (description.length < 20) {
            setError('description should be atleast 20 character long');
            setIsError(true);
        }
        else {
            setError('');
            setIsError(false);
            setIsShowLoader(true);

            AxiosInstance.post(
                '/service.php', {
                'action': 'UPDATE_BLOG',
                'userId': Cache.getSessionValue(Key.USER),
                'blogId': blog.blogId,
                'title': title,
                'description': description
            }).then((response) => {
                setIsShowLoader(false);
                let res = response.data;

                if (res.status) {
                    setTitle('');
                    setDescription('');

                    fetchBlogs();
                }
                else {
                    Alert.alert("Bloggy", res.message, [
                        {
                            text: "OK",
                            onPress: () => {
                            }
                        }
                    ]);
                }
            }).catch((error) => {
                console.log(error);
                setIsShowLoader(false);
            });
        }
    }

    const fetchBlogs = () => {
        setIsShowLoader(true)

        AxiosInstance.post(
            '/service.php', {
            'action': 'GET_BLOGS',
            'userId': Cache.getSessionValue(Key.USER)
        }).then((response) => {
            setIsShowLoader(false);
            let res = response.data;
            Cache.setSessionValue(Key.ALL_BLOGS, res.allBlogs, Cache.JSON)
            Cache.setSessionValue(Key.MY_BLOGS, res.myBlogs, Cache.JSON)
            navigation.goBack();
        }).catch((error) => {
            console.log(error);
            setIsShowLoader(false);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    placeholder={'Enter title'}
                    value={title}
                    onChangeText={title => setTitle(title)} />

                <Text style={[styles.label, { marginTop: 20 }]}>Description</Text>
                <TextInput
                    style={[styles.input, { height: 200, marginTop: 10 }]}
                    autoCorrect={false}
                    placeholder={'Enter Description'}
                    multiline={true}
                    value={description}
                    onChangeText={description => setDescription(description)} />
                {
                    isError &&
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={onUpdateBlogClicked}>
                    <Text style={styles.buttonText}>{`Update Blog`}</Text>
                </TouchableOpacity>
            </View>
            <Spinner
                visible={isShowLoader}
                textContent={'Please wait...'}
                textStyle={{ color: '#923bcc' }} />
        </View>
    )
}

export default EditBlog;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
    loginBox: { width: '90%', backgroundColor: '#fffafa', padding: 20, borderRadius: 5, marginTop: 20 },
    label: { fontSize: 18, color: '#923bcc' },
    input: { width: '100%', height: 40 },
    error: { fontSize: 14, color: '#b83044' },
    button: { width: '100%', height: 40, backgroundColor: '#923bcc', marginTop: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    buttonText: { color: '#fff' }
});
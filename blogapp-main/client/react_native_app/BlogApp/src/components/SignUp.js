import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AxiosInstance from "../network/RequestHandler";
import Spinner from 'react-native-loading-spinner-overlay';
import Storage from '../utils/Storage';
import Cache from "../utils/Cache";
import Key from "../utils/Key";
import Screen from "../utils/Screen";

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('')
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [isShowLoader, setIsShowLoader] = useState(false)

    useEffect(() => {
        const user = Cache.getSessionValue(Key.USER)
        if (user != undefined) {
            navigation.navigate(Screen.HOME);
        }
    }, [])

    onRegisterClicked = () => {
        setError('');
        setIsError(false);

        if (name.length < 1) {
            setError('please enter your name');
            setIsError(true);
        }
        else if (name.length < 3) {
            setError('name should be atleast 3 character long');
            setIsError(true);
        }
        else {
            setError('');
            setIsError(false);
            setIsShowLoader(true);

            AxiosInstance.post(
                '/service.php', {
                'action': 'REGISTER_USER',
                'userName': name
            }).then((response) => {
                setIsShowLoader(false);
                let res = response.data;
                if (res.status) {
                    setName('');
                    Storage.save(Key.USER, res.userId);
                    Cache.setSessionValue(Key.USER, res.userId);
                    navigation.navigate(Screen.HOME);
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

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    placeholder={'Enter you name'}
                    onChangeText={name => setName(name)} />
                {
                    isError &&
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={onRegisterClicked}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <Spinner
                visible={isShowLoader}
                textContent={'Please wait...'}
                textStyle={{ color: '#923bcc' }} />
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    loginBox: { width: '90%', backgroundColor: '#fffafa', padding: 20, borderRadius: 5 },
    label: { fontSize: 18, color: '#923bcc' },
    input: { width: '100%', height: 40 },
    error: { fontSize: 14, color: '#b83044' },
    button: { width: '100%', height: 40, backgroundColor: '#923bcc', marginTop: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    buttonText: { color: '#fff' }
});
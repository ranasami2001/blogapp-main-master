import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import AllBlogs from '../components/AllBlogs';
import MyBlogs from '../components/MyBlogs';
import AddBlog from '../components/AddBlog';
import EditBlog from '../components/EditBlog';

import Screen from '../utils/Screen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.SIGNUP}>
                <Stack.Screen name={Screen.SIGNUP} component={SignUp} options={{ headerShown: false }} />
                
                <Stack.Screen name={Screen.HOME} component={Home}
                    options={{
                        title: 'Bloggy',
                        headerStyle: {
                            backgroundColor: '#923bcc',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerBackVisible: false
                    }} />
                <Stack.Screen name={Screen.ALLBLOGS} component={AllBlogs}
                    options={{
                        title: 'All Blogs',
                        headerStyle: {
                            backgroundColor: '#923bcc',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }} />
                <Stack.Screen name={Screen.MYBLOGS} component={MyBlogs}
                    options={{
                        title: 'My Blogs',
                        headerStyle: {
                            backgroundColor: '#923bcc',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }} />
                <Stack.Screen name={Screen.ADDBLOG} component={AddBlog}
                    options={{
                        title: 'Add Blog',
                        headerStyle: {
                            backgroundColor: '#923bcc',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }} />
                <Stack.Screen name={Screen.EDITBLOG} component={EditBlog}
                    options={{
                        title: 'Edit Blog',
                        headerStyle: {
                            backgroundColor: '#923bcc',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
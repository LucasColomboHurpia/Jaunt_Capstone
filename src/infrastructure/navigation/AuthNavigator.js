import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './AppNavigator';

import LoginScreen from '../../views/auth/screens/LoginScreen';

export default AuthNavigator = (props) => {
    
    const Stack = createStackNavigator();

    return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="App" component={AppNavigator} />
            </Stack.Navigator>
    )
}
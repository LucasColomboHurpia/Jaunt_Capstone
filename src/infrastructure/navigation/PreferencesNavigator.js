import { createStackNavigator } from '@react-navigation/stack';

import SurveyScreen from '../../views/app/preferences/screens/SurveyPage';
import BottomTabNavigator from './BottomTabNavigator';

const PreferencesNavigator = (props) => {

    const stack = createStackNavigator();

    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            backBehavior="history"
        >
            <stack.Screen name="SurveyPage" component={SurveyScreen} />
            <stack.Screen name="BottomTab" component={BottomTabNavigator} />
        </stack.Navigator>

    )
}

export default PreferencesNavigator;
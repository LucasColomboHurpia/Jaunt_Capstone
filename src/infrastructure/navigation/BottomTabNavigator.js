import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuComponent from './MenuComponent';

import HomeNavigator from './HomeNavigator';
import GroupPage from '../../views/app/activities/screens/GroupPage';
import NotificationScreen from '../../views/app/home/screens/NotificationScreen';

const BottomTabNavigator = (props) => {

    const appTab = createBottomTabNavigator();

    return (
        <appTab.Navigator 
            tabBar={props => <MenuComponent {...props} /> }
            screenOptions={{
                headerShown: false
            }}
            backBehavior="history"
        >
            <appTab.Screen name="Home" component={HomeNavigator} />
            <appTab.Screen name="Activities" component={HomeNavigator} />
            <appTab.Screen name="Notifications" component={NotificationScreen} />
        </appTab.Navigator>

    )
}

export default BottomTabNavigator;




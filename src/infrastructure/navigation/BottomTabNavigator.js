import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuComponent from './MenuComponent';

import HomeNavigator from './HomeNavigator';
import GroupPage from '../../views/app/activities/screens/GroupPage';

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
            <appTab.Screen name="Activities" component={GroupPage} />
            <appTab.Screen name="Notifications" component={HomeNavigator} />
        </appTab.Navigator>

    )
}

export default BottomTabNavigator;
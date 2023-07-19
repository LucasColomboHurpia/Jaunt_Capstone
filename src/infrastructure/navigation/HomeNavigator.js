import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../views/app/home/screens/HomePage';
import CreateActivityScreen from '../../views/app/home/screens/CreateActivity';
import ContactListScreen from '../../views/app/home/screens/ContactListScreen';
import ActivityDashboard from '../../views/app/home/screens/ActivityDashboard';
import ActivitySurvey from '../../views/app/home/screens/ActivitySurvey';
import ActivitySummary from '../../views/app/home/screens/ActivitySummary';
import ActivitySurveyResults from '../../views/app/home/screens/ActivitySurveyResults';
import MapPage from '../../views/app/home/screens/MapPage';
import MediaScreen from '../../views/app/home/screens/Media';
import NotificationScreen from '../../views/app/home/screens/NotificationScreen'; 
import Profile from '../../views/app/home/screens/ProfilePage';
import LogoutScreen from '../../views/app/home/screens/Logout';

const HomeNavigator = (props) => {

    const stack = createStackNavigator();

    return (
        <stack.Navigator 
            backBehavior="history"
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen name="HomeScreen" component={HomeScreen} />
            <stack.Screen name="CreateActivity" component={CreateActivityScreen} />
            <stack.Screen name="ContactListScreen" component={ContactListScreen} />
            <stack.Screen name="ActivityDashboard" component={ActivityDashboard} />
            <stack.Screen name="ActivitySurvey" component={ActivitySurvey} />
            <stack.Screen name="ActivitySummary" component={ActivitySummary} />
            <stack.Screen name="ActivitySurveyResults" component={ActivitySurveyResults} />
            <stack.Screen name="MapPage" component={MapPage} />
            <stack.Screen name="Notifications" component={NotificationScreen} /> 
            <stack.Screen name="Media" component={MediaScreen} />
            <stack.Screen name="Profile" component={Profile} />
            <stack.Screen name="Logout" component={LogoutScreen}/>

        </stack.Navigator>

    )
}

export default HomeNavigator;




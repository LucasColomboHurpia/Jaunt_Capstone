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
import GroupPage from '../../views/app/activities/screens/GroupPage';

const HomeNavigator = (props) => {

    const stack = createStackNavigator();

    return (
        <stack.Navigator 
            backBehavior="history"
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen name="GroupPage" component={GroupPage} />
            <stack.Screen name="ActivityDashboard" component={ActivityDashboard} />
        </stack.Navigator>

    )
}

export default HomeNavigator;
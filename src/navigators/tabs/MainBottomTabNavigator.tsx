import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import HomeScreen from '@src/screens/HomeScreen';
import ScoreboardScreen from '@src/screens/ScoreboardScreen';
import PostScreen from '@src/screens/PostScreen';
import InformationScreen from '@src/screens/InformationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen name={ROUTES.FEED} component={HomeScreen} />
			<Tab.Screen name={ROUTES.SCOREBOARD} component={ScoreboardScreen} />
			<Tab.Screen name={ROUTES.POST} component={PostScreen} />
			<Tab.Screen name={ROUTES.INFO} component={InformationScreen} />
			<Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
		</Tab.Navigator>
	);
}

export default MainBottomTabNavigator;

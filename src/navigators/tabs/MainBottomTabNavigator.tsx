import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import LandingScreen from '@src/screens/LandingScreen';

// Types
// import { MainStackParamList } from '@src/types/navigation';

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.FEED} component={LandingScreen} />
	  <Tab.Screen name={ROUTES.SCOREBOARD} component={LandingScreen} />
	  <Tab.Screen name={ROUTES.POST} component={LandingScreen} />
	  <Tab.Screen name={ROUTES.INFO} component={LandingScreen} />
	  <Tab.Screen name={ROUTES.PROFILE} component={LandingScreen} />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;

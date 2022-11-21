import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import LandingScreen from '@src/screens/LandingScreen';
import DetailScreen from '@src/screens/DetailScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.LANDING_PAGE}>
		<Stack.Screen options={{ title: 'Landing screen' }} name={ROUTES.LANDING_PAGE} component={LandingScreen} />
		<Stack.Screen name={ROUTES.POST} component={DetailScreen} />
	</Stack.Navigator>
);

export default MainStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import AuthLandingScreen from '@src/screens/AuthLandingScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.LANDING_PAGE}>
		<Stack.Screen options={{ title: 'Landing screen' }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
	</Stack.Navigator>
);

export default AuthStack;

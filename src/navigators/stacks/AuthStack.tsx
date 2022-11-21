import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens

// Types
import { MainStackParamList } from '@src/types/navigation';
import AuthLandingScreenNew from '@src/screens/AuthLandingScreenNew';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.LANDING_PAGE}>
		<Stack.Screen options={{ title: 'Landing screen' }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreenNew} />
	</Stack.Navigator>
);

export default AuthStack;

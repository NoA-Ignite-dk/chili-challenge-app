import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import AuthLandingScreen from '@src/screens/AuthLandingScreen';
import SignUpScreen from '@src/screens/SignUpScreen';
import LoginScreen from '@src/screens/LoginScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.AUTH_LANDING_PAGE}>
		<Stack.Screen options={{ title: 'Landing screen' }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
		<Stack.Screen options={{ title: 'Login' }} name={ROUTES.LOGIN} component={LoginScreen} />
		<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP} component={SignUpScreen} />
	</Stack.Navigator>
);

export default AuthStack;

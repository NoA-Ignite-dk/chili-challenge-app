import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import AuthLandingScreen from '@src/screens/AuthLandingScreen';
import SignUpScreen from '@src/screens/SignUpScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';
import SignInScreen from '@src/screens/SignInScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.AUTH_LANDING_PAGE}>
		<Stack.Screen options={{ title: 'Landing screen' }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
		<Stack.Screen options={{ title: 'Register' }} name={ROUTES.SIGN_UP} component={SignUpScreen} />
		<Stack.Screen options={{ title: 'Sign in' }} name={ROUTES.SIGN_IN} component={SignInScreen} />
	</Stack.Navigator>
);

export default AuthStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import AuthLandingScreen from '@src/screens/AuthLandingScreen';
import LoginScreen from '@src/screens/LoginScreen';
import SignUpEmailScreen from '@src/screens/signup/SignUpEmailScreen';
import SignUpPasswordScreen from '@src/screens/signup/SignUpPasswordScreen';
import SignUpNameScreen from '@src/screens/signup/SignUpNameScreen';
import SignUpPlantsScreen from '@src/screens/signup/SignUpPlantsScreen';

// Types
import { AuthStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
	<Stack.Navigator initialRouteName={ROUTES.AUTH_LANDING_PAGE}>
		<Stack.Screen options={{ headerShown: false }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
		<Stack.Screen options={{ title: 'Login' }} name={ROUTES.LOGIN} component={LoginScreen} />
		<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_EMAIL} component={SignUpEmailScreen} />
		<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PASSWORD} component={SignUpPasswordScreen} />
		<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_NAME} component={SignUpNameScreen} />
		<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PLANTS} component={SignUpPlantsScreen} />
		{/* <Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_SUCCESS} component={} /> */}
	</Stack.Navigator>
);

export default AuthStack;

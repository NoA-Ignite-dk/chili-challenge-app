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
import SignUpSuccessScreen from '@src/screens/signup/SignUpSuccessScreen';

// Types
import { AuthStackParamList } from '@src/types/navigation';
import { AuthProvider } from '@src/components/providers/authContext';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
	<AuthProvider>
		<Stack.Navigator screenOptions={{ headerBackTitle: '' }} initialRouteName={ROUTES.AUTH_LANDING_PAGE}>
			<Stack.Screen options={{ headerShown: false }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
			<Stack.Screen options={{ title: 'Login' }} name={ROUTES.LOGIN} component={LoginScreen} />
			<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_EMAIL} component={SignUpEmailScreen} />
			<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PASSWORD} component={SignUpPasswordScreen} />
			<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_NAME} component={SignUpNameScreen} />
			<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PLANTS} component={SignUpPlantsScreen} />
			<Stack.Screen options={{ title: 'Account created' }} name={ROUTES.SIGN_UP_SUCCESS} component={SignUpSuccessScreen} />
		</Stack.Navigator>
	</AuthProvider>
);

export default AuthStack;

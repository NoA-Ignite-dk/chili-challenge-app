import React, { useEffect } from 'react';
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
import { AllRoutesNavigationProp, AuthStackParamList } from '@src/types/navigation';
import { AuthProvider } from '@src/components/providers/authContext';
import { useSession } from '@src/data/session';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
	const { session } = useSession();
	const navigation = useNavigation<AllRoutesNavigationProp>();

	useEffect(() => {
		if (session) {
			navigation.navigate(ROUTES.MAIN_STACK);
		}
	}, [session]);

	return (
		<AuthProvider>
			<Stack.Navigator initialRouteName={ROUTES.AUTH_LANDING_PAGE}>
				<Stack.Screen options={{ headerShown: false }} name={ROUTES.AUTH_LANDING_PAGE} component={AuthLandingScreen} />
				<Stack.Screen options={{ title: 'Login' }} name={ROUTES.LOGIN} component={LoginScreen} />
				<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_EMAIL} component={SignUpEmailScreen} />
				<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PASSWORD} component={SignUpPasswordScreen} />
				<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_NAME} component={SignUpNameScreen} />
				<Stack.Screen options={{ title: 'Sign up' }} name={ROUTES.SIGN_UP_PLANTS} component={SignUpPlantsScreen} />
				<Stack.Screen options={{ title: 'Account created', gestureEnabled: false, headerBackVisible: false  }} name={ROUTES.SIGN_UP_SUCCESS} component={SignUpSuccessScreen} />
			</Stack.Navigator>
		</AuthProvider>
	);
};

export default AuthStack;

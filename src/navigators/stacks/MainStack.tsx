import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import UserScreen from '@src/screens/UserScreen';
import SettingsScreen from '@src/components/SettingsScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';
import { useSession } from '@src/data/session';
import { AppProvider } from '@src/components/providers/appContext';
import MainBottomTabNavigator from '../tabs/MainBottomTabNavigator';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = () => {
	const { session } = useSession();

	if (!session) {
		return null;
	}

	return (
		<AppProvider session={session}>
			<Stack.Navigator initialRouteName={ROUTES.MAIN_TABS} screenOptions={{ headerShown: false}}>
				<Stack.Screen name={ROUTES.MAIN_TABS} component={MainBottomTabNavigator} />
				<Stack.Screen name={ROUTES.USER} options={{ headerShown: true, headerTitle: '', headerBackVisible: true }} component={UserScreen} />
				<Stack.Screen name={ROUTES.SETTINGS} options={{ title: 'Settings', presentation: 'transparentModal', animation: 'slide_from_bottom' }} component={SettingsScreen} />
			</Stack.Navigator>
		</AppProvider>
	);
};

export default AuthStack;

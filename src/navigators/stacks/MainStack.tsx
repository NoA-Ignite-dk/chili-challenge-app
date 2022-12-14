import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

// Screens
import UserScreen from '@src/screens/UserScreen';
import SettingsScreen from '@src/components/SettingsScreen';
import PostScreen from '@src/screens/PostScreen';

// Types
import { MainStackParamList } from '@src/types/navigation';
import { useSession } from '@src/data/session';
import { AppProvider } from '@src/components/providers/appContext';

// Tabs
import MainBottomTabs from '../tabs/MainBottomTabs';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
	const { session } = useSession();

	if (!session) {
		return null;
	}

	return (
		<AppProvider session={session}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName={ROUTES.MAIN_TABS}
			>
				<Stack.Screen name={ROUTES.MAIN_TABS} component={MainBottomTabs} />
				<Stack.Screen
					options={{
						presentation: 'modal',
					}}
					name={ROUTES.POST}
					component={PostScreen}
				/>
				<Stack.Screen name={ROUTES.USER} options={{ headerShown: true, headerTitle: '', headerBackVisible: true }} component={UserScreen} />
				<Stack.Screen
					name={ROUTES.SETTINGS}
					options={{ title: 'Settings', presentation: 'transparentModal', animation: 'slide_from_bottom' }}
					component={SettingsScreen}
				/>
			</Stack.Navigator>
		</AppProvider>
	);
};

export default MainStack;

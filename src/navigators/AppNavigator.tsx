import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import Txt from '@src/components/Txt';

// Config
import { ROUTES } from '@src/config/routes';

// Stacks
import AuthStack from '@src/navigators/stacks/AuthStack';

// Tabs
import MainBottomTabNavigator from '@src/navigators/tabs/MainBottomTabs';
import SettingsScreen from '@src/components/SettingsScreen';

// Stacks
const Stack = createNativeStackNavigator();

const FallbackScreen = (
	<View style={{ flex: 1 }}>
		<Txt>Loading...</Txt>
	</View>
);

const AppNavigator = () => {
	return (
		<NavigationContainer fallback={FallbackScreen}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: 'none',
					gestureEnabled: false,
				}}
				initialRouteName={ROUTES.AUTH_STACK}
			>
				<Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
				<Stack.Screen name={ROUTES.MAIN_TABS} component={MainBottomTabNavigator} />
				<Stack.Screen
					options={{ title: 'Settings', presentation: 'transparentModal', animation: 'slide_from_bottom' }}
					name={ROUTES.SETTINGS}
					component={SettingsScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

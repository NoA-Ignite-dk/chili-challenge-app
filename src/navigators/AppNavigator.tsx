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
import MainStack from './stacks/MainStack';

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
			<Stack.Navigator screenOptions={{
				headerShown: false, animation: 'none', gestureEnabled: false
			}} initialRouteName={ROUTES.AUTH_STACK}>
				<Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
				<Stack.Screen name={ROUTES.MAIN_STACK} component={MainStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

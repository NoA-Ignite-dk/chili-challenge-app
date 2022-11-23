import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Config
import { ROUTES } from '@src/config/routes';
import Colors from '@src/config/colors';

// Screens
import HomeScreen from '@src/screens/HomeScreen';
import ScoreboardScreen from '@src/screens/ScoreboardScreen';
import PostScreen from '@src/screens/PostScreen';
import InformationScreen from '@src/screens/InformationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	iconContainer: {
		marginRight: 15,
	},
});

function MainBottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: '#FAFAFA', height: 124 },
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 24,
				},
				headerRight: () => (
					<View style={styles.iconContainer}>
						<Ionicons name="settings-outline" size={24} color={Colors.BLACK} />
					</View>
				)
			}}>
			<Tab.Screen name={ROUTES.FEED} component={HomeScreen}
				options={{
					headerRight: () => (
						<View style={styles.iconContainer}>
							<Ionicons name="notifications-outline" size={24} color={Colors.BLACK} />
						</View>
					)
				}} />
			<Tab.Screen name={ROUTES.SCOREBOARD} component={ScoreboardScreen}
			options={{
				headerStyle: { backgroundColor: Colors.GREEN_PRIMARY, height: 124 },
				headerTitleStyle: {
					color: Colors.WHITE,
					fontSize: 24,
				},
				headerRight: () => (
					<View style={styles.iconContainer}>
						<Ionicons name="settings-outline" size={24} color={Colors.WHITE} />
					</View>
				)
			}}/>
			<Tab.Screen name={ROUTES.POST} component={PostScreen} />
			<Tab.Screen name={ROUTES.INFO} component={InformationScreen} />
			<Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
		</Tab.Navigator>
	);
}

export default MainBottomTabNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Config
import { ROUTES } from '@src/config/routes';
import Colors from '@src/config/colors';

// Screens
import HomeScreen from '@src/screens/HomeScreen';
import ScoreboardScreen from '@src/screens/ScoreboardScreen';
import PostScreen from '@src/screens/PostScreen';
import InformationScreen from '@src/screens/InformationScreen';
import Icon, { IconType } from '@src/components/Icon';
import { AppProvider } from '@src/components/providers/appContext';
import ProfileScreen from '@src/screens/profile/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useSession } from '@src/data/session';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	iconContainer: {
		marginRight: 15,
	},
});

function MainBottomTabNavigator() {
	const { session } = useSession();

	if (!session) {
		return null;
	}

	return (
		<AppProvider session={session}>
			<Tab.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: Colors.BACKGROUND_GREY, height: 124 },
					headerTitleAlign: 'left',
					headerTitleStyle: {
						fontSize: 24,
						fontFamily: "Manrope_600SemiBold"
					},
					headerRight: () => (
						<View style={styles.iconContainer}>
							<Ionicons name="settings-outline" size={24} color={Colors.BLACK} />
						</View>
					),
					tabBarShowLabel: false,
					tabBarStyle: { backgroundColor: Colors.BACKGROUND_GREY, height: 100, paddingLeft: 20, paddingRight: 20 },
					tabBarIconStyle: {
						marginTop: 15,
					},
				}}
			>
				<Tab.Screen
					name={ROUTES.FEED}
					component={HomeScreen}
					options={{
						tabBarIcon: () => <Icon type={IconType.FEED} />,
						title: 'Feed',
						headerRight: () => (
							<View style={styles.iconContainer}>
								<Ionicons name="notifications-outline" size={24} color={Colors.BLACK} />
							</View>
						),
					}}
				/>
				<Tab.Screen
					name={ROUTES.SCOREBOARD}
					component={ScoreboardScreen}
					options={{
						tabBarIcon: () => <Icon type={IconType.SCOREBOARD} />,
						title: 'Scoreboard',
						headerStyle: { backgroundColor: Colors.GREEN_PRIMARY, height: 124 },
						headerTitleStyle: {
							color: Colors.WHITE,
							fontSize: 24,
							fontFamily: "Manrope_600SemiBold"
						},
						headerRight: () => (
							<View style={styles.iconContainer}>
								<Ionicons name="settings-outline" size={24} color={Colors.WHITE} />
							</View>
						),
					}}
				/>
				<Tab.Screen
					name={ROUTES.POST}
					component={PostScreen}
					options={{
						tabBarIcon: () => <Icon type={IconType.POST} />,
						title: 'Create post',
						headerTitleStyle: {
							fontSize: 24,
							fontFamily: "Manrope_600SemiBold"
						},
					}}
				/>
				<Tab.Screen
					name={ROUTES.INFO}
					component={InformationScreen}
					options={{
						tabBarIcon: () => <Icon type={IconType.INFORMATION} />,
						title: 'Information',
					}}
				/>
				<Tab.Screen
					name={ROUTES.PROFILE}
					component={ProfileScreen}
					options={{
						title: 'Profile',
						tabBarIcon: () => <Icon type={IconType.PROFILE} />,
						headerRight: () => {
							const navigation = useNavigation<AllRoutesNavigationProp>();

							return (
								<Pressable style={styles.iconContainer} onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
									<Ionicons name="settings-outline" size={24} color={Colors.BLACK} />
								</Pressable>
							);
						},
					}}
				/>
			</Tab.Navigator>
		</AppProvider>
	);
}

export default MainBottomTabNavigator;

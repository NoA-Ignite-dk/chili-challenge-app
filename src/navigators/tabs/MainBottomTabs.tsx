import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon, { IconType } from '@src/components/Icon';

// Config
import { ROUTES } from '@src/config/routes';
import Colors from '@src/config/colors';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';

// Screens
import HomeScreen from '@src/screens/HomeScreen';
import ScoreboardScreen from '@src/screens/ScoreboardScreen';
import PostScreen from '@src/screens/PostScreen';
import InformationScreen from '@src/screens/InformationScreen';
import ProfileScreen from '@src/screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	iconContainer: {
		marginRight: 15,
	},
});

function MainBottomTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.BACKGROUND_GREY, height: 124 },
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 24,
					fontFamily: 'Manrope_600SemiBold',
				},
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
						fontFamily: 'Manrope_600SemiBold',
					},
				}}
			/>
			<Tab.Screen
				name={ROUTES.POST_MODAL}
				component={PostScreen}
				options={{
					tabBarIcon: () => <Icon type={IconType.POST} />,
				}}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						e.preventDefault();
						navigation.navigate(ROUTES.POST);
					},
				})}
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
	);
}

export default MainBottomTabs;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '@src/config/routes';
import { AppProvider } from '@src/components/providers/appContext';
import ProfileScreen from '@src/screens/profile/ProfileScreen';
import Colors from '@src/config/colors';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AllRoutesParamList } from '@src/types/navigation';
import EditProfileScreen from '@src/screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator<AllRoutesParamList>();

const styles = StyleSheet.create({
	iconContainer: {
		marginRight: 15,
	},
});

const ProfileStack = () => (
	<AppProvider>
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.BACKGROUND_GREY },
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 24,
				},
				headerBackTitleVisible: false,
				headerRight: () => (
					<View style={styles.iconContainer}>
						<Ionicons name="settings-outline" size={24} color={Colors.BLACK} />
					</View>
				),
			}}>
			<Stack.Screen options={{ title: 'Profile' }} name={ROUTES.PROFILE} component={ProfileScreen} />
			<Stack.Screen
				options={{
					title: 'Edit Profile'
				}}
				name={ROUTES.EDIT_PROFILE} component={EditProfileScreen} />
		</Stack.Navigator>
	</AppProvider>
);

export default ProfileStack;

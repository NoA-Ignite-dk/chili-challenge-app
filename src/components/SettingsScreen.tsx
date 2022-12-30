import Colors from '@src/config/colors';
import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { queryClient } from '@src/lib/reactQuery';
import { ROUTES } from '@src/config/routes';
import { supabase } from '@src/lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import Icon, { IconType } from './Icon';
import Button from './buttons/PrimaryButton';


const styles = StyleSheet.create({
	marginBottom: {
		marginBottom: 22,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

	},
	modalView: {
		width: '100%',
		bottom: -330,
		borderRadius: 20,
		paddingHorizontal: 30,
		paddingVertical: 50,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: Colors.WHITE,
	},
});


export default function SettingsScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();


	async function logout() {
		setLoading(true);
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		} else {
			queryClient.clear()
			navigation.navigate(ROUTES.AUTH_LANDING_PAGE);
		}

		setLoading(false);
	}

	return (
			<SafeAreaView style={styles.centeredView}>
				<View style={styles.modalView}>
					<Button style={styles.marginBottom} onPress={() => logout()} fullWidth>
						<Text>Log out</Text>
					</Button>
					<Pressable onPress={() => navigation.navigate(ROUTES.PROFILE)}>
						<Text>Close</Text>
					</Pressable>
					{loading && <Icon type={IconType.LOADING} />}
				</View>
			</SafeAreaView>
	);
}

import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import Txt from '@src/components/Txt';
import Button from '@src/components/buttons/PrimaryButton';

// Config
import Colors from '@src/config/colors';
import { supabase } from '@src/lib/supabase';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import Icon, { IconType } from '@src/components/Icon';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();

	async function logout() {
		setLoading(true);
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		} else {
			navigation.navigate(ROUTES.AUTH_LANDING_PAGE);
		}

		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Txt style={{ fontWeight: '200' }}>Profile</Txt>
			<Button onPress={logout}>{loading ? <Icon type={IconType.LOADING} /> : 'Logout'}</Button>
		</View>
	);
}

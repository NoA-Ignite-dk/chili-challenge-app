import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@src/config/routes';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import Button from '@src/components/buttons/PrimaryButton';
import { containerStyles, typography } from '@src/styles/generalStyles';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		paddingTop: 150,
		paddingBottom: 80,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	title: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 20,
		marginBottom: 10,
	},
	button: {
		width: '49%',
		padding: 16,
	},
});

export default function AuthLandingScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();

	return (
		<View style={[containerStyles.container, containerStyles.padding, styles.container]}>
			<View>
				<Text style={styles.title}>NoA Ignite</Text>
				<Text style={typography.largeTitle}>Chili 🌶️ Challenge</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button style={styles.button} onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL)}>
					Sign up
				</Button>
				<View style={{ width: '2%' }}></View>
				<Button style={styles.button} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
					Login
				</Button>
			</View>
		</View>
	);
}

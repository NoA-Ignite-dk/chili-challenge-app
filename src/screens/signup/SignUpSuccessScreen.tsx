import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import { useAuthContext } from '@src/components/providers/authContext';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	mt10: {
		marginTop: 10,
	},
});

export default function SignUpSuccessScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { setEmail, setPassword, setFirstName, setLastName } = useAuthContext();
	setEmail('');
	setPassword('');
	setFirstName('');
	setLastName('');

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Text style={typography.signupTitle}>Email confirmation sent!</Text>
			<Text style={typography.signupText}>Please check your inbox and confirm your email before logging in.</Text>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={() => navigation.navigate(ROUTES.LOGIN)}>Login</Button>
			</View>
			<View style={[styles.verticallySpaced, styles.mt10]}>
				<Button onPress={() => navigation.navigate(ROUTES.AUTH_LANDING_PAGE)}>Home</Button>
			</View>
		</View>
	);
}

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';
import { containerStyles } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';
import { ROUTES } from '@src/config/routes';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
});

export default function SignUpPasswordScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Txt>Whats your name?</Txt>
			<Txt>Identify yourself</Txt>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<InputField
					isValid={passwordValid}
					setIsValid={setPasswordValid}
					text={password}
					setText={setPassword}
					label="Password"
					placeholder="******"
					errorMessage="Field required"
					password
				/>
				<InputField
					isValid={confirmPasswordValid}
					setIsValid={setConfirmPasswordValid}
					text={confirmPassword}
					setText={setConfirmPassword}
					label="Confirm password"
					placeholder="******"
					errorMessage="Field required"
					password
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={() => navigation.navigate(ROUTES.SIGN_UP_NAME)}>Continue</Button>
			</View>
		</View>
	);
}

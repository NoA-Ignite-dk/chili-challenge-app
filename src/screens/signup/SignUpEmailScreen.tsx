import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { containerStyles, typography } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useNavigation } from '@react-navigation/native';
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
});

export default function SignUpEmailScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { email, setEmail } = useAuthContext();
	const [emailValid, setEmailValid] = useState(false);
	const [error, setError] = useState('');
	const emailRegex = /[a-z0-9]+@noaignite.com/;

	const handleContinue = () => {
		if (emailValid) {
			if (emailRegex.test(email)) {
				navigation.navigate(ROUTES.SIGN_UP_PASSWORD);
				setError('');
			} else {
				setError('Please provide a NoA Ignite email address.');
			}
		} else {
			setError('Please fill out all fields');
		}
	};

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Text style={typography.signupTitle}>What’s your company email?</Text>
			<Text style={typography.signupText}>You will need it to sign in to the application.</Text>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<InputField
					isValid={emailValid}
					setIsValid={setEmailValid}
					text={email}
					setText={setEmail}
					label="Email"
					placeholder="email@noaignite.com"
					errorMessage="Field required"
					autoCapitalize="none"
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={handleContinue}>Continue</Button>
			</View>

			{error && <Text style={typography.errorMessage}>{error}</Text>}
		</View>
	);
}

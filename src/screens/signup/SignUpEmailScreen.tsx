import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';
import { containerStyles } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@src/config/routes';
import { useAuthContext } from '@src/components/AppProvider';

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

	const handleContinue = () => {
		if (emailValid) {
			navigation.navigate(ROUTES.SIGN_UP_PASSWORD);
		} else {
			setError('Please fill out all fields');
		}
	};

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Txt>What’s your company email?</Txt>
			<Txt>You will need it to sign in to the application</Txt>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<InputField
					isValid={emailValid}
					setIsValid={setEmailValid}
					text={email}
					setText={setEmail}
					label="Email"
					placeholder="email@address.com"
					errorMessage="Field required"
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={handleContinue}>Continue</Button>
			</View>

			{error && <Txt>{error}</Txt>}
		</View>
	);
}

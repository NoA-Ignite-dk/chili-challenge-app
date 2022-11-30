import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';
import { containerStyles } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@src/config/routes';
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

export default function SignUpNameScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const [firstName, setFirstName] = useState('');
	const [firstNameValid, setFirstNameValid] = useState(false);
	const [lastName, setLastName] = useState('');
	const [lastNameValid, setLastNameValid] = useState(false);

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Txt>Whats your name?</Txt>
			<Txt>Identify yourself</Txt>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<InputField
					isValid={firstNameValid}
					setIsValid={setFirstNameValid}
					text={firstName}
					setText={setFirstName}
					label="First name"
					placeholder="Jane"
					errorMessage="Field required"
				/>
				<InputField
					isValid={lastNameValid}
					setIsValid={setLastNameValid}
					text={lastName}
					setText={setLastName}
					label="Last name"
					placeholder="Doe"
					errorMessage="Field required"
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={() => navigation.navigate(ROUTES.SIGN_UP_PLANTS)}>Continue</Button>
			</View>
		</View>
	);
}

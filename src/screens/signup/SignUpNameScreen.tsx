import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { containerStyles, typography } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@src/config/routes';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useAuthContext } from '@src/components/providers/authContext';
import { supabase } from '@src/lib/supabase';
import Icon, { IconType } from '@src/components/Icon';

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
	const { firstName, setFirstName, lastName, setLastName, allUserData } = useAuthContext();
	const [firstNameValid, setFirstNameValid] = useState(false);
	const [lastNameValid, setLastNameValid] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function signUp() {
		setLoading(true);

		if (!firstNameValid || !lastNameValid) {
			setError('Please fill out all fields');
			return;
		}

		// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
		const { data, error } = await supabase.auth.signUp({
			email: allUserData.email,
			password: allUserData.password,
			options: {
				data: {
					full_name: `${allUserData.firstName} ${allUserData.lastName}`,
				},
			},
		});

		if (error) {
			Alert.alert(error.message);
		} else {
			setLoading(false);
			navigation.navigate(ROUTES.SIGN_UP_SUCCESS);
		}
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Text style={typography.signupTitle}>Whats your name?</Text>
			<Text style={typography.signupText}>Identify yourself</Text>
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
				<Button onPress={signUp}>{loading ? <Icon type={IconType.LOADING} /> : 'Create account'}</Button>
			</View>

			{error && <Text style={typography.errorMessage}>{error}</Text>}
		</View>
	);
}

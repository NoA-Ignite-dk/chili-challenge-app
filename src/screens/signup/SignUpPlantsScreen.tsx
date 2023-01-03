import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useAuthContext } from '@src/components/providers/authContext';
import Icon, { IconType } from '@src/components/Icon';
import { supabase } from '@src/lib/supabase';
import ROUTES from '@src/config/routes';
import InputField from '@src/components/InputField';
import { createPlant } from '@src/data/plants';

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

export default function SignUpPlantsScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { allUserData } = useAuthContext();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [plant1Valid, setPlant1Valid] = useState(false);
	const [plant1, setPlant1] = useState('');
	const [plant2Valid, setPlant2Valid] = useState(false);
	const [plant2, setPlant2] = useState('');
	const [plant3Valid, setPlant3Valid] = useState(false);
	const [plant3, setPlant3] = useState('');

	const handleContinue = () => {
		if (plant1Valid && plant2Valid && plant3Valid) {
			signUp();
		} else {
			setError('Please fill out all plant names');
		}
	};

	async function signUp() {
		setLoading(true);
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
		}

		try {
			await createPlant({ user_id: data.user?.id, name: plant1, image_url: '', primary: false });
			await createPlant({ user_id: data.user?.id, name: plant2, image_url: '', primary: false });
			await createPlant({ user_id: data.user?.id, name: plant3, image_url: '', primary: false });
		} catch (error) {
			setError('Something went wrong. Please try again.');
			setLoading(false)
			return;
		}

		setLoading(false);
		navigation.navigate(ROUTES.SIGN_UP_SUCCESS);
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Text style={typography.signupTitle}>What are your chili plants called?</Text>
			<Text style={typography.signupText}>Add up to three names</Text>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<InputField
					isValid={plant1Valid}
					setIsValid={setPlant1Valid}
					text={plant1}
					setText={setPlant1}
					label="Plant 1"
					placeholder="Name"
					errorMessage="Field required"
				/>
				<InputField
					isValid={plant2Valid}
					setIsValid={setPlant2Valid}
					text={plant2}
					setText={setPlant2}
					label="Plant 2"
					placeholder="Name"
					errorMessage="Field required"
				/>
				<InputField
					isValid={plant3Valid}
					setIsValid={setPlant3Valid}
					text={plant3}
					setText={setPlant3}
					label="Plant 3"
					placeholder="Name"
					errorMessage="Field required"
				/>
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={handleContinue}>{loading ? <Icon type={IconType.LOADING} /> : 'Create account'}</Button>
			</View>

			{error && <Text style={typography.errorMessage}>{error}</Text>}
		</View>
	);
}

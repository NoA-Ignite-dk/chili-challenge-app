import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';
import { containerStyles } from '@src/styles/generalStyles';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { useAuthContext } from '@src/components/AppProvider';
import Icon, { IconType } from '@src/components/Icon';
import { supabase } from '@src/lib/supabase';
import ROUTES from '@src/config/routes';

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
	const [error] = useState('');
	const [loading, setLoading] = useState(false);

	const handleContinue = () => {
		signUpWithEamail();
	};

	async function signUpWithEamail() {
		setLoading(true);
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
			navigation.navigate(ROUTES.MAIN_TABS);
		}

		setLoading(false);
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Txt>What are your chili plants called?</Txt>
			<Txt>Add up to three names</Txt>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				{/* <InputField
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
				/> */}
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={handleContinue}>{loading ? <Icon type={IconType.LOADING} /> : 'Continue'}</Button>
			</View>

			{error && <Txt>{error}</Txt>}
		</View>
	);
}

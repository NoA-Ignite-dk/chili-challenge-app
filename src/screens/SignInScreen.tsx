import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { supabase } from '@src/lib/supabase';
import Txt from '@src/components/Txt';
import { containerStyles } from '@src/styles/generalStyles';
import InputField from '@src/components/InputField';

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

export default function SignInScreen() {
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);
	const [loading, setLoading] = useState(false);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Txt>Let's sign you in</Txt>
			<Txt>Enter your email and password to sign in</Txt>
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
			<View style={styles.verticallySpaced}>
				<InputField
					isValid={passwordValid}
					setIsValid={setPasswordValid}
					label="Password"
					text={password}
					setText={setPassword}
					placeholder="Password"
					errorMessage="Field required"
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button disabled={loading} onPress={() => signInWithEmail()}>
					Sign in
				</Button>
			</View>
		</View>
	);
}

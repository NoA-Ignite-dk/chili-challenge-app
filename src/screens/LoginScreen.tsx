import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { supabase } from '@src/lib/supabase';
import { containerStyles, typography } from '@src/styles/generalStyles';
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

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) setError(error.message);
		setLoading(false);
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<Text style={typography.signupTitle}>Let's sign you in</Text>
			<Text style={typography.signupText}>Enter your email and password to sign in</Text>
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
					errorMessage="Field required"
					password
					placeholder="******"
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button disabled={loading} onPress={() => signInWithEmail()}>
					Sign in
				</Button>
			</View>
			{error && <Text style={typography.errorMessage}>{error}</Text>}
		</View>
	);
}

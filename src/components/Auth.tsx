import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import { supabase } from '@src/lib/supabase';

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

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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

	async function signUpWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<TextInput onChangeText={(text) => setEmail(text.toLowerCase())} value={email} placeholder="email@address.com" autoCapitalize={'none'} />
			</View>
			<View style={styles.verticallySpaced}>
				<TextInput
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={'none'}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button disabled={loading} onPress={() => signInWithEmail()}>
					Sign in
				</Button>
			</View>
			<View style={styles.verticallySpaced}>
				<Button disabled={loading} onPress={() => signUpWithEmail()}>
					Sign up
				</Button>
			</View>
		</View>
	);
}

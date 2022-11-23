import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import Colors from '@src/config/colors';
import { ROUTES } from '@src/config/routes';
import { MainStackNavigationProp } from '@src/types/navigation';
import { supabase } from '@src/lib/supabase';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	// btn: {
	// 	marginTop: verticalScale(20),
	// },
});

export default function AuthLandingScreen() {
	const navigation = useNavigation<MainStackNavigationProp>();
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	if (session && session.user) {
		navigation.navigate(ROUTES.MAIN_TABS);
	}

	return (
		<View style={styles.container}>
			<Txt>Chili Challenge</Txt>
			<Button onPress={() => navigation.navigate(ROUTES.SIGN_UP)}>Register</Button>
			<Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)}>Sign in</Button>
		</View>
	);
}

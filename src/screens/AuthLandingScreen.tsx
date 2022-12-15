import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import { ROUTES } from '@src/config/routes';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { supabase } from '@src/lib/supabase';
import Button from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';
import { containerStyles, typography } from '@src/styles/generalStyles';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	button: {
		width: '49%',
		padding: 16,
	},
});

export default function AuthLandingScreen() {
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		if (session && session.user) {
			navigation.navigate(ROUTES.MAIN_TABS);
		}
	}, [session])

	return (
		<View
			style={[
				containerStyles.container,
				containerStyles.padding,
				styles.container,
				containerStyles.largePaddingBottom,
				containerStyles.largePaddingTop,
			]}
		>
			<Txt style={typography.largeTitle}>Chili Challenge</Txt>
			<View style={styles.buttonsContainer}>
				<Button style={styles.button} onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL)}>
					Sign up
				</Button>
				<View style={{ width: '2%' }}></View>
				<Button style={styles.button} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
					Login
				</Button>
			</View>
		</View>
	);
}

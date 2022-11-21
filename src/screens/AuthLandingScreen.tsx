import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';

// Components

// Config
import Colors from '@src/config/colors';
import { ROUTES } from '@src/config/routes';

// Types
import { MainStackNavigationProp } from '@src/types/navigation';

// Utils
import { verticalScale } from '@src/utils/scaling';
import Auth from '../components/Auth';
import { supabase } from '../lib/supabase';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		marginTop: verticalScale(20),
	},
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
			<Auth />
		</View>
	);
}

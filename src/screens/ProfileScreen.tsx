import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import Txt from '@src/components/Txt';
import Button from '@src/components/buttons/PrimaryButton';

// Config
import Colors from '@src/config/colors';
import { supabase } from '@src/lib/supabase';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import Icon, { IconType } from '@src/components/Icon';
import { useAppContext } from '@src/components/providers/appContext';
import { normalizeRows, takeFirstRow } from '@src/utils/normalizeData';
import ProfileCard from '@src/components/ProfileCard';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { session } = useAppContext();
	const [fullName, setFullName] = useState('');
	const [totalPointState, setTotalPointState] = useState<number>(0);
	const [postCountState, setPostCountState] = useState<number>(0);
	// const [avatarUrl, setAvatarUrl] = useState('')

	useEffect(() => {
		if (session) {
			getProfile();
		}
	}, [session])

	async function getProfile() {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from('profiles')
				.select(`
					fullName: full_name,
					post (
						id
					),
					point (
						point_to_claim (
							amount
						)
					)
				`)
				.eq('id', session?.user.id)
				.limit(1)
				.single();

			if (error) {
				throw error;
			}

			if (data) {
				const totalPoints = normalizeRows(data.point).reduce((amount, e) => {
					if (!e) {
						return amount;
					}

					const claim = takeFirstRow(e.point_to_claim);

					if (!claim) {
						return amount;
					}

					return amount + (claim.amount as number);
				}, 0);

				const postCount = normalizeRows(data.post)
					.filter((e) => !!e?.id)
					.length;

				setFullName(data.fullName)
				setTotalPointState(totalPoints)
				setPostCountState(postCount)
				// setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message)
			} else {
				// eslint-disable-next-line no-console
				console.error('Error', error);
			}
		} finally {
			setLoading(false)
		}
	}

	async function logout() {
		setLoading(true);
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		} else {
			navigation.navigate(ROUTES.AUTH_LANDING_PAGE);
		}

		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Txt style={{ fontWeight: '200' }}>{fullName}</Txt>
			<Txt style={{ fontWeight: '200' }}>Profile</Txt>
			<ProfileCard name={fullName} points={totalPointState} posts={postCountState}></ProfileCard>
			<Button onPress={logout}>{loading ? <Icon type={IconType.LOADING} /> : 'Logout'}</Button>
		</View>
	);
}

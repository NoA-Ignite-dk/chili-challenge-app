import { ProfileImage } from '@src/components/ProfileImage';
import { AppProvider, useAppContext } from '@src/components/providers/appContext';
import { containerStyles } from '@src/styles/generalStyles';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import Button from '@src/components/buttons/PrimaryButton';
import Icon, { IconType } from '@src/components/Icon';
import { supabase } from '../lib/supabase';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	imageContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40

	}
});

export default function EditProfileScreen() {
	const [loading, setLoading] = useState(true);
	const { session } = useAppContext();
	const [fullName, setFullName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	useEffect(() => {
		if (session) getProfile();
	}, [session]);

	async function getProfile() {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from('profiles')
				.select(`
					fullName: full_name,
					profilePicture: avatar_url
				`)
				.eq('id', session?.user.id)
				.single();

			if (error) {
				throw error;
			}

			if (data) {
				setFullName(data.fullName)
				setProfilePicture(data.profilePicture)

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

	const updateProfile = async ({ fullName, profilePicture }: { fullName: string; profilePicture: string; }) => {
		const update = {
			full_name: fullName,
			avatar_url: profilePicture,
			updated_at: new Date(),
		};

		const { error } = await supabase
			.from('profiles')
			.update(update)
			.match({
				id: session?.user.id,
			})

		if (error) {
			throw error;
		}

		await getProfile();
	}

	return (
		<AppProvider>
			<View style={[containerStyles.container, containerStyles.padding]}>
				<View style={styles.imageContainer}>
					<ProfileImage imageSource={{ uri: profilePicture }} size={"xlarge"}></ProfileImage>
				</View>
				<View style={styles.verticallySpaced}>
					<Input autoCompleteType={''} label="Full Name" value={fullName || ''} onChangeText={(text) => setFullName(text)} />
				</View>

				<View style={[styles.verticallySpaced, styles.mt20]}>
					<Button onPress={() => updateProfile({ fullName, profilePicture })}>{loading ? <Icon type={IconType.LOADING} /> : 'Update'}</Button>
				</View>
			</View>
		</AppProvider>
	);
}

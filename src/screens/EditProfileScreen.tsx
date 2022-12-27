import { ProfileImage } from '@src/components/ProfileImage';
import { useAppContext } from '@src/components/providers/appContext';
import { containerStyles } from '@src/styles/generalStyles';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Button from '@src/components/buttons/PrimaryButton';
import Icon, { IconType } from '@src/components/Icon';
import { useUserProfileQuery, useUserProfileMutation } from '@src/data/user-profile';

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
	const { session } = useAppContext();
	const { isLoading, data: profileData } = useUserProfileQuery(session?.user.id as string);
	const profileMutation = useUserProfileMutation();
	const [fullName, setFullName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	useEffect(() => {
		if (profileData) {
			setFullName(profileData.fullName);
			setProfilePicture(profileData.profilePicture);
		}
	}, [profileData])

	const updateProfile = async ({ fullName, profilePicture }: { fullName: string; profilePicture: string; }) => {
		profileMutation.mutate({
			id: session?.user.id as string,
			payload: { fullName, profilePicture }
		})
	}

	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<View style={styles.imageContainer}>
				<ProfileImage imageSource={{ uri: profilePicture }} size={"xlarge"}></ProfileImage>
			</View>
			<View style={styles.verticallySpaced}>
				<Input autoComplete={'name'} label="Full Name" value={fullName || ''} onChangeText={(text) => setFullName(text)} />
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button onPress={() => updateProfile({ fullName, profilePicture })}>
					{(isLoading || profileMutation.isLoading)
						? <Icon type={IconType.LOADING} />
						: 'Update'
					}
				</Button>
			</View>
		</View>
	);
}

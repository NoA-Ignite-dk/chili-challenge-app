import { ProfileImage } from '@src/components/ProfileImage';
import { useAppContext } from '@src/components/providers/appContext';
import { containerStyles } from '@src/styles/generalStyles';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Button from '@src/components/buttons/PrimaryButton';
import Icon, { IconType } from '@src/components/Icon';
import { useUserProfileQuery, useUserProfileMutation } from '@src/data/user-profile';
import Colors from '@src/config/colors';
import EditProfilePictureModal from '@src/components/EditProfilePictureModal';

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
		paddingVertical: 40,
		position: "relative"

	},
	absolute: {
		zIndex: 1000,
		position: "absolute",
	},
	backgroundOpacity: {
		backgroundColor: Colors.DARK_GREY,
		opacity: 0.4,
		zIndex: 999,
		width: 104,
		height: 104,
		borderRadius: 50,
		position: "absolute"
	}
});

export default function EditProfileScreen() {
	const { session } = useAppContext();
	const { isLoading, data: profileData } = useUserProfileQuery(session?.user.id as string);
	const profileMutation = useUserProfileMutation();
	const [fullName, setFullName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

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
				<Pressable onPress={() => setModalVisible(true)}>
					<View style={styles.imageContainer}>
						<View style={styles.absolute}>
							<Icon type={IconType.EDIT} />
						</View>
						<ProfileImage imageSource={{ uri: profilePicture }} size={"xlarge"}></ProfileImage>
						<View style={styles.backgroundOpacity}></View>
					</View>
				</Pressable>
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
			<EditProfilePictureModal loading={isLoading} open={modalVisible} setOpen={setModalVisible} />
		</View>
	);
}

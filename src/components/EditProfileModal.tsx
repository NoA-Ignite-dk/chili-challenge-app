import { ProfileImage } from '@src/components/ProfileImage';
import { useAppContext } from '@src/components/providers/appContext';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text, Modal, Alert } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Icon, { IconType } from '@src/components/Icon';
import { useUserProfileMutation, useProfileQuery } from '@src/data/profile';
import Colors from '@src/config/colors';
import EditPictureModal from './EditPictureModal';
import SecondaryButton from './buttons/SecondaryButton';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	editItem: {
		flexDirection: 'row',
		backgroundColor: Colors.OFF_WHITE,
		minHeight: 56,
		maxHeight: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		width: '20%',
	},
	input: {
		width: '80%',
	},
	mt20: {
		marginTop: 20,
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
		position: 'relative',
	},
	absolute: {
		zIndex: 1000,
		position: 'absolute',
	},
	backgroundOpacity: {
		backgroundColor: Colors.DARK_GREY,
		opacity: 0.4,
		zIndex: 999,
		width: 104,
		height: 104,
		borderRadius: 50,
		position: 'absolute',
	},
	modalView: {
		width: '100%',
		bottom: -108,
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		backgroundColor: Colors.WHITE,
	},
	closeTextContainer: {
		alignSelf: 'baseline',
		marginBottom: 36,
		marginTop: 15,
	},
});

type Props = {
	open: boolean;
	setOpen: (arg: boolean) => void;
};

export default function EditProfileScreen({ open, setOpen }: Props) {
	const { session } = useAppContext();
	const { isLoading, data: profileData } = useProfileQuery(session.user.id);
	const profileMutation = useUserProfileMutation();
	const [fullName, setFullName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		if (profileData) {
			setFullName(profileData.fullName);
			setProfilePicture(profileData.profilePicture);
		}
	}, [profileData]);

	const updateProfile = async ({ fullName, profilePicture }: { fullName?: string; profilePicture?: string }) => {
		await profileMutation.mutateAsync({
			id: session.user.id,
			payload: { fullName, profilePicture },
		});
		setOpen(false);
	};

	function updateProfilePicture(profilePicture: string) {
		profileMutation
			.mutateAsync({
				id: session.user.id,
				payload: { profilePicture },
			})
			.then(() => setModalVisible(false));
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={open}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setOpen(!open);
			}}
		>
			<View style={[containerStyles.container, styles.modalView]}>
				<Pressable onPress={() => setModalVisible(true)}>
					<View style={styles.imageContainer}>
						<View style={styles.absolute}>
							<Icon type={IconType.EDIT} stroke={Colors.WHITE} />
						</View>
						<ProfileImage imageSource={{ uri: profilePicture }} size={'xlarge'}></ProfileImage>
						<View style={styles.backgroundOpacity}></View>
					</View>
				</Pressable>
				<Text style={[containerStyles.padding, typography.uppercaseBig]}>General Information</Text>
				<View style={[styles.verticallySpaced, styles.editItem, containerStyles.padding]}>
					<Text style={[styles.label, typography.bodySecondary]}>Full Name</Text>
					<TextInput
						style={[styles.input, typography.h3]}
						autoComplete={'name'}
						value={fullName || ''}
						onChangeText={(text) => setFullName(text)}
					/>
				</View>

				<View style={[styles.verticallySpaced, styles.mt20, containerStyles.padding]}>
					<Button onPress={() => updateProfile({ fullName, profilePicture })}>
						{isLoading || profileMutation.isLoading ? <Icon type={IconType.LOADING} /> : 'Update'}
					</Button>
					<Pressable>
						<SecondaryButton onPress={() => setOpen(!open)} fullWidth style={styles.closeTextContainer}>
							Close
						</SecondaryButton>
					</Pressable>
				</View>
				<EditPictureModal
					onSave={updateProfilePicture}
					loading={isLoading || profileMutation.isLoading}
					open={modalVisible}
					setOpenStatus={setModalVisible}
				/>
			</View>
		</Modal>
	);
}

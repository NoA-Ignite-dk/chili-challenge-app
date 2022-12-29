import Colors from '@src/config/colors';
import React from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '@src/utils/uploadImage';
import { useUserProfileMutation } from '@src/data/user-profile';
import { getImageUrl } from '@src/utils/getImageUrl';
import Button from './buttons/PrimaryButton';
import Icon, { IconType } from './Icon';
import Txt from './Txt';
import { useAppContext } from './providers/appContext';

const styles = StyleSheet.create({
	marginBottom: {
		marginBottom: 22,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
	},
	modalView: {
		width: '100%',
		bottom: -320,
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: Colors.WHITE,
	},
	closeTextContainer: {
		alignSelf: 'baseline',
		marginBottom: 36,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	closeText: {
		fontSize: 18,
	},
});

type Props = {
	open: boolean;
	setOpen: (arg: boolean) => void;
	// setSelectedPoint: (pointId: number | null) => void;
	loading: boolean;
};

export default function EditProfilePictureModal({ open, setOpen, loading }: Props) {
	const { session } = useAppContext();
	const profileMutation = useUserProfileMutation();

	const updatePhoto =  ({ profilePicture }: { profilePicture: string; }) => {
		profileMutation.mutate({
			id: session?.user.id as string,
			payload: { profilePicture }
		})
	}

	const openImageLibrary = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			const imageId = await uploadImage(result);
			const imageUrl = await getImageUrl(imageId);
			updatePhoto({ profilePicture: imageUrl });
			setOpen(false);
		} else {
			// eslint-disable-next-line no-alert
		}
	};

	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			// eslint-disable-next-line no-alert
			alert("You've refused to allow this app to access your camera");
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			base64: true,
		});

		if (!result.cancelled) {
			const imageId = await uploadImage(result);
			const imageUrl = await getImageUrl(imageId);
			updatePhoto({ profilePicture: imageUrl });
			setOpen(false);
		}
	};

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
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Button style={styles.marginBottom} onPress={() => openCamera()} fullWidth>
						<Text>Take Picture</Text>
					</Button>
					<Button style={styles.marginBottom} onPress={() => openImageLibrary()} fullWidth>
						<Text>Select from photo library</Text>
					</Button>

					{loading && <Icon type={IconType.LOADING} />}

					<Pressable style={styles.closeTextContainer} onPress={() => setOpen(!open)}>
						<Txt style={styles.closeText}>Close</Txt>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

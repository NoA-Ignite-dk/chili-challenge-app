import Colors from '@src/config/colors';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '@src/utils/uploadImage';
import { getImageUrl } from '@src/utils/getImageUrl';
import Button from './buttons/PrimaryButton';
import Icon, { IconType } from './Icon';
import Txt from './Txt';

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
	setOpenStatus: (arg: boolean) => void;
	onSave: (newPicture: string) => void;
	loading?: boolean;
};

export default function EditPictureModal({ open, setOpenStatus, loading, onSave }: Props) {
	const [processing, setProcessing] = useState(false);

	async function processImage(pickedImage: ImagePicker.ImageInfo) {
		setProcessing(true);
		const imageId = await uploadImage(pickedImage);
		const imageUrl = await getImageUrl(imageId);
		setProcessing(false);
		onSave(imageUrl);
	}

	const openImageLibrary = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			allowsEditing: true,
			quality: 1,
		});

		if (result.cancelled) {
			return;
		}

		await processImage(result);
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

		if (result.cancelled) {
			return;
		}

		await processImage(result);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={open}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setOpenStatus(!open);
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

					{(loading || processing) && <Icon type={IconType.LOADING} />}

					<Pressable style={styles.closeTextContainer} onPress={() => setOpenStatus(!open)}>
						<Txt style={styles.closeText}>Cancel</Txt>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

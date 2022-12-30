/* eslint-disable no-alert */
import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Components
import Txt from '@src/components/Txt';
import SecondaryButton from '@src/components/buttons/SecondaryButton';
import PointsModal from '@src/components/PointsModal';
import Icon, { IconType } from '@src/components/Icon';
import Button from '@src/components/buttons/PrimaryButton';

// Config
import Colors from '@src/config/colors';
import { containerStyles, typography } from '@src/styles/generalStyles';
import Variables from '@src/config/variables';
import { getImageUrl } from '@src/utils/getImageUrl';
import { uploadImage } from '@src/utils/uploadImage';
import { useAppContext } from '@src/components/providers/appContext';

// Types
import { usePointToClaimQuery } from '@src/data/point-to-claim';
import { useCreateUserPostsMutation } from '@src/data/user-posts';
import { useCreateUserPointsMutation } from '@src/data/user-points';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		justifyContent: 'flex-start',
	},
	image: {
		height: 250,
		width: '100%',
		resizeMode: 'cover',
		borderRadius: Variables.BORDER_RADIUS,
	},
	section: {
		marginBottom: 24,
		marginTop: 10,
	},
	button: {
		marginTop: 16,
	},
	selectedButton: {
		marginTop: 16,
		backgroundColor: Colors.GREEN_PRIMARY,
	},
	selectedButtonText: {
		color: Colors.WHITE,
	},
	imageContainer: {
		width: '100%',
		marginTop: 12,
		position: 'relative',
	},
	imageCloseButton: {
		height: 30,
		width: 30,
		position: 'absolute',
		top: 10,
		right: 10,
		backgroundColor: Colors.GREY,
		zIndex: 1,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.7,
	},
	imagePlaceholder: {
		width: '100%',
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.BACKGROUND_GREY,
		borderRadius: Variables.BORDER_RADIUS,
		marginTop: 12,
		flexDirection: 'row',
	},
	imagePlaceholderButton: {
		backgroundColor: Colors.LIGHT_GREY,
		color: Colors.BLACK,
		borderRadius: 50,
		height: 46,
		width: 46,
		justifyContent: 'center',
		alignItems: 'center',
	},
	createButton: {},
});

export default function PostScreen() {
	const [selectedImage, setSelectedImage] = useState('');
	const [selectedImageResult, setSelectedImageResult] = useState<ImagePicker.ImageInfo>({ uri: '', height: 0, width: 0, cancelled: false });
	const [postDescription, setPostDescription] = useState('');
	const { isLoading, data: pointsData } = usePointToClaimQuery();
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
	const selectedPointData = pointsData?.find((item) => item.id === selectedPoint);
	const { session } = useAppContext();
	const createPostMutation = useCreateUserPostsMutation();
	const createPointMutation = useCreateUserPointsMutation();

	const createPost = async () => {
		const imageId = await uploadImage(selectedImageResult);
		const imageUrl = await getImageUrl(imageId);

		if (!selectedImage) {
			alert('Please select an image or take a photo');
			throw Error('No image selected');
		}

		if (!postDescription) {
			alert('Please add a description');
			throw Error('No description added');
		}

		// Create post
		const post = await createPostMutation.mutateAsync({
			id: session?.user.id as string,
			payload: {
				description: postDescription,
				user_id: session?.user.id as string,
				image_url: imageUrl,
			},
		});

		if (selectedPoint) {
			await createPointMutation.mutateAsync({
				payload: {
					post_id: post.id,
					claimed_point_id: selectedPoint,
					user_id: session?.user.id as string,
				},
			});
		}

		// eslint-disable-next-line no-alert
		alert('Post created!');
	};

	const openImageLibrary = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setSelectedImage(result.uri);
			setSelectedImageResult(result);
		} else {
			// eslint-disable-next-line no-alert
			alert('You did not select any image.');
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
			setSelectedImage(result.uri);
			setSelectedImageResult(result);
		}
	};

	const removeImage = () => {
		setSelectedImage('');
	};

	return (
		<View style={[styles.container, containerStyles.padding]}>
			<View style={styles.section}>
				<TextInput
					style={typography.bodyRegular14}
					onChangeText={(text: string) => setPostDescription(text)}
					multiline={true}
					placeholder="Write something..."
				/>
			</View>
			<View style={styles.section}>
				<Text style={typography.uppercaseBig}>Points (optional)</Text>
				{!selectedPoint && (
					<SecondaryButton onPress={() => setModalVisible(true)} style={styles.button} icon="plus">
						<Text style={typography.buttonText}>Select points</Text>
					</SecondaryButton>
				)}
				{selectedPoint && (
					<SecondaryButton onPress={() => setModalVisible(true)} style={styles.selectedButton} textStyle={styles.selectedButtonText}>
						{selectedPointData?.title}
					</SecondaryButton>
				)}
			</View>
			<View style={styles.section}>
				<Text style={typography.uppercaseBig}>Image</Text>
				{selectedImage && (
					<View style={styles.imageContainer}>
						<Pressable onPress={removeImage} style={styles.imageCloseButton}>
							<Text style={{ fontSize: 18, color: Colors.WHITE }}>X</Text>
						</Pressable>
						<Image style={styles.image} source={{ uri: selectedImage }}></Image>
					</View>
				)}
				{!selectedImage && (
					<View style={styles.imagePlaceholder}>
						<Pressable style={styles.imagePlaceholderButton} onPress={openCamera}>
							<Icon type={IconType.CAMERA} />
						</Pressable>
						<Pressable style={styles.imagePlaceholderButton} onPress={openImageLibrary}>
							<Icon type={IconType.UPLOAD} />
						</Pressable>
					</View>
				)}
			</View>
			<Button style={styles.createButton} onPress={createPost}>
				<Text style={typography.buttonText}>Create post</Text>
			</Button>
			<PointsModal loading={isLoading} setSelectedPoint={setSelectedPoint} open={modalVisible} setOpen={setModalVisible} data={pointsData} />
		</View>
	);
}

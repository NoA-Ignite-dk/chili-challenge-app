/* eslint-disable no-alert */
import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Components
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
import { usePointToClaimQuery } from '@src/data/point-to-claim';
import { useCreatePostsMutation } from '@src/data/posts';
import { useCreatePointsMutation } from '@src/data/points';
import { POINT_TYPES } from '@src/constants/general';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import { usePlantsByUserIdQuery } from '@src/data/plants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		justifyContent: 'space-between',
		paddingBottom: 60,
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
	title: {
		fontSize: 24,
		fontFamily: 'Manrope_600SemiBold',
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
		backgroundColor: Colors.GREEN_PRIMARY,
		color: Colors.BLACK,
		borderRadius: 50,
		height: 46,
		width: 46,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5,
	},
	createButton: {},
	pointItemContainer: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	pointItemText: {
		marginTop: 5,
		color: Colors.WHITE,
	},
	pointAmount: {
		backgroundColor: Colors.FADED_GREEN,
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: Variables.BORDER_RADIUS_LARGE,
		textAlign: 'right',
		marginTop: 5,
	},
});

export default function PostScreen() {
	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const [selectedImageResult, setSelectedImageResult] = useState<ImagePicker.ImageInfo>({ uri: '', height: 0, width: 0, cancelled: false });
	const [postDescription, setPostDescription] = useState('');
	const { isLoading, data: pointsData } = usePointToClaimQuery();
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
	const selectedPointData = pointsData?.find((item) => item.id === selectedPoint);
	const { session } = useAppContext();
	const createPostMutation = useCreatePostsMutation();
	const createPointMutation = useCreatePointsMutation();
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { data: plantState } = usePlantsByUserIdQuery(session.user.id);
	const hasPrimaryPlant = (plantState || []).some((plant) => plant.primary);

	const createPost = async () => {
		if (!hasPrimaryPlant) {
			alert("You don't have a primary plant set. To claim points, go to your profile page and set a primary plant.");
			return;
		}

		if (!selectedImage) {
			alert('Please select an image or take a photo');
			return;
		}

		if (!postDescription) {
			alert('Please add a description');
			return;
		}

		setLoading(true);

		const imageId = await uploadImage(selectedImageResult);
		const imageUrl = await getImageUrl(imageId);

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

		setLoading(false);
		// eslint-disable-next-line no-alert
		navigation.navigate(ROUTES.FEED);
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
			<View>
				<View style={styles.section}>
					<Text style={styles.title}>Create post</Text>
				</View>
				<View style={styles.section}>
					<TextInput
						style={typography.bodyRegular14}
						onChangeText={(text: string) => setPostDescription(text)}
						multiline={true}
						placeholder="Write something..."
					/>
				</View>
				<View style={styles.section}>
					<Text style={typography.uppercaseBig}>Claim points (optional)</Text>
					{!selectedPoint && (
						<SecondaryButton iconColor={Colors.GREEN_PRIMARY} onPress={() => setModalVisible(true)} style={styles.button} icon="plus">
							<Text style={typography.buttonText}>Select points</Text>
						</SecondaryButton>
					)}
					{selectedPoint && (
						<SecondaryButton onPress={() => setModalVisible(true)} style={styles.selectedButton} textStyle={styles.selectedButtonText}>
							<View style={styles.pointItemContainer}>
								<Text style={[styles.pointItemText, typography.buttonText]}>
									{POINT_TYPES[selectedPointData?.type as keyof typeof POINT_TYPES]}
									{': '}
									{selectedPointData?.title}
								</Text>
								<View style={styles.pointAmount}>
									<Text style={{ color: Colors.TEXT_60 }}>{selectedPointData?.amount}</Text>
								</View>
							</View>
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
								<Icon stroke={Colors.WHITE} type={IconType.CAMERA} />
							</Pressable>
							<Pressable style={styles.imagePlaceholderButton} onPress={openImageLibrary}>
								<Icon stroke={Colors.WHITE} type={IconType.UPLOAD} />
							</Pressable>
						</View>
					)}
				</View>
			</View>
			<Button style={styles.createButton} onPress={createPost}>
				{!loading && <Text>Create post</Text>}
				{/* {{loading && <Icon type={IconType.LOADING} />}} */}
				{loading && <Text>Posting..</Text>}
			</Button>
			<PointsModal loading={isLoading} setSelectedPoint={setSelectedPoint} open={modalVisible} setOpen={setModalVisible} data={pointsData} />
		</View>
	);
}

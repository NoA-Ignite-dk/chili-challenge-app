/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@src/lib/supabase';

// Components
import Txt from '@src/components/Txt';
import SecondaryButton from '@src/components/buttons/SecondaryButton';
import PointsModal from '@src/components/PointsModal';
import Icon, { IconType } from '@src/components/Icon';

// Config
import Colors from '@src/config/colors';
import { containerStyles, typography } from '@src/styles/generalStyles';
import Variables from '@src/config/variables';
import { normalizeRows } from '@src/utils/normalizeData';

// Types
import { PointToClaim } from '@src/types/supabase';

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
		height: 150,
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
});

export default function PostScreen() {
	const [selectedImage, setSelectedImage] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useState(false);
	const [pointsData, setPointsData] = useState<PointToClaim[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedPoint, setSelectedPoint] = useState(null);
	const selectedPointData = pointsData?.find((item) => item.id === selectedPoint);

	const openImageLibrary = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setSelectedImage(result.uri);
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

		const result = await ImagePicker.launchCameraAsync();

		// eslint-disable-next-line no-console
		console.log(result);

		if (!result.cancelled) {
			setSelectedImage(result.uri);
		}
	};

	const removeImage = () => {
		setSelectedImage('');
	};

	async function getPointsToClaim() {
		setModalVisible(true);
		try {
			setLoading(true);
			const { data, error } = await supabase.from('point_to_claim').select(
				`
					id,
					title,
					type,
					amount
				`,
			);

			if (error) {
				throw error;
			}

			if (data) {
				const pointsToClaim = normalizeRows(data).filter((e) => !!e?.id);
				setPointsData(pointsToClaim);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			} else {
				// eslint-disable-next-line no-console
				console.error('Error', error);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={[styles.container, containerStyles.padding]}>
			<View style={styles.section}>
				<TextInput multiline={true} placeholder="Write something..." />
			</View>
			<View style={styles.section}>
				<Txt style={typography.uppercaseBig}>Points (optional)</Txt>
				{!selectedPoint && (
					<SecondaryButton onPress={getPointsToClaim} style={styles.button} icon="plus">
						Select points
					</SecondaryButton>
				)}
				{selectedPoint && (
					<SecondaryButton onPress={getPointsToClaim} style={styles.selectedButton}>
						{selectedPointData?.title}
					</SecondaryButton>
				)}
			</View>
			<View style={styles.section}>
				<Txt style={typography.uppercaseBig}>Image</Txt>
				{selectedImage && (
					<View style={styles.imageContainer}>
						<Pressable onPress={removeImage} style={styles.imageCloseButton}>
							<Txt style={{ fontSize: 18, color: Colors.WHITE }}>X</Txt>
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
			<PointsModal setSelectedPoint={setSelectedPoint} open={modalVisible} setOpen={setModalVisible} data={pointsData} />
		</View>
	);
}

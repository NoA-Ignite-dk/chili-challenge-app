import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Pressable, Alert, Modal, FlatList, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@src/lib/supabase';

// Components
import Txt from '@src/components/Txt';
import SecondaryButton from '@src/components/buttons/SecondaryButton';

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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
	},
	modalView: {
		width: '100%',
		height: '80%',
		margin: 20,
		bottom: -80,
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

const PointItem = ({ title, amount }: any) => (
	<View style={styles.centeredView}>
		<Text>{title}</Text>
		<Text>{amount}</Text>
	</View>
);

export default function PostScreen() {
	const [selectedImage, setSelectedImage] = useState('');
	// const [loading, setLoading] = useState(false);
	const [pointsData, setPointsData] = useState<PointToClaim[]>([]);
	const [modalVisible, setModalVisible] = useState(false);

	// const pickImageAsync = async () => {
	// 	// requestPermission();
	// 	const result = await ImagePicker.launchImageLibraryAsync({
	// 		allowsEditing: true,
	// 		quality: 1,
	// 	});

	// 	if (!result.cancelled) {
	// 		setSelectedImage(result.uri);
	// 	} else {
	// 		alert('You did not select any image.');
	// 	}
	// };

	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("You've refused to allow this app to access your camera");
			return;
		}

		const result = await ImagePicker.launchCameraAsync();

		// Explore the result
		console.log(result);

		if (!result.cancelled) {
			setSelectedImage(result.uri);
			console.log(result.uri);
		}
	};

	const removeImage = () => {
		setSelectedImage('');
	};

	async function getPointsToClaim() {
		setModalVisible(true);
		try {
			// setLoading(true);
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
			// setLoading(false);
		}
	}

	console.log(pointsData);

	return (
		<View style={[styles.container, containerStyles.padding]}>
			<View style={styles.section}>
				<TextInput multiline={true} placeholder="Write something..." />
			</View>
			<View style={styles.section}>
				<Txt style={typography.uppercaseBig}>Points (optional)</Txt>
				<SecondaryButton onPress={getPointsToClaim} style={styles.button} icon="plus">
					Select points
				</SecondaryButton>
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
							<Txt style={{ fontSize: 18 }}>+</Txt>
						</Pressable>
					</View>
				)}
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Pressable onPress={() => setModalVisible(!modalVisible)}>
							<Text>Hide Modal</Text>
						</Pressable>

						{/* @TODO add key extractor */}
						<FlatList data={pointsData} renderItem={PointItem} />
					</View>
				</View>
			</Modal>
		</View>
	);
}

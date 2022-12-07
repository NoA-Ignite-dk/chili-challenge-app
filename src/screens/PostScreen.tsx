import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Components
import Txt from '@src/components/Txt';

// Config
import Colors from '@src/config/colors';
import { containerStyles, typography } from '@src/styles/generalStyles';
import Variables from '@src/config/variables';

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
});

export default function PostScreen() {
	const [selectedImage, setSelectedImage] = useState('');
	// const [status, requestPermission] = ImagePicker.useCameraPermissions();

	const pickImageAsync = async () => {
		// requestPermission();
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setSelectedImage(result.uri);
		} else {
			alert('You did not select any image.');
		}
	};

	const removeImage = () => {
		setSelectedImage('');
	};

	return (
		<View style={[styles.container, containerStyles.padding]}>
			{/* <Txt style={{ fontWeight: '200' }}>Create a post</Txt> */}
			<View style={styles.section}>
				<TextInput placeholder="Write something..." />
			</View>
			<View style={styles.section}>
				<Txt style={typography.uppercaseBig}>Points (optional)</Txt>
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
						<Pressable style={styles.imagePlaceholderButton} onPress={pickImageAsync}>
							<Txt style={{ fontSize: 18 }}>+</Txt>
						</Pressable>
					</View>
				)}
			</View>
			{/* <Button onPress={pickImageAsync}>Pick an image</Button> */}
		</View>
	);
}

import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

import Colors from '@src/config/colors';

interface ProfileImageProps {
	imageSource: ImageSourcePropType;
	size: 'xsmall'| 'small' | 'large'  | 'xlarge'
}

const styles = StyleSheet.create({
	largeImage: {
		width: 70,
		height: 70,
		borderRadius: 50,
	},
	xLargeImage: {
		width: 104,
		height: 104,
		borderRadius: 50,
	},
	circle: {
		borderColor: Colors.FADED_GREEN,
		borderStyle: "solid",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center"
	},
	largeCircle: {
		width: 78,
		height: 78,
		borderWidth: 2,
	},
	xLargeCircle: {
		width: 114,
		height: 114,
		borderWidth: 2.5,
	},
	smallCircle: {
		width: 64,
		height: 64,
		borderWidth: 1.5,
	},
	smallImage: {
		width: 56,
		height: 56,
		borderRadius: 50,
	},
	xSmallCircle: {
		width: 40,
		height: 40,
		borderWidth: 1,
	},
	xSmallImage: {
		width: 36,
		height: 36,
		borderRadius: 50,
	},

});

// eslint-disable-next-line import/prefer-default-export
export const ProfileImage = ({ imageSource, size = "small" }: ProfileImageProps) => {
	// eslint-disable-next-line default-case
	switch (size) {
		case 'xsmall':
			return (
				<View style={[styles.xSmallCircle, styles.circle]} >
					<Image style={styles.xSmallImage} source={imageSource}></Image>
				</View>
			)
		case 'small':
			return (
				<View style={[styles.smallCircle, styles.circle]} >
					<Image style={styles.smallImage} source={imageSource}></Image>
				</View>
			)
		case 'large':
			return (
				<View style={[styles.largeCircle, styles.circle]} >
					<Image style={styles.largeImage} source={imageSource}></Image>
				</View>
			)
		case 'xlarge':
			return (
				<View style={[styles.xLargeCircle, styles.circle]} >
					<Image style={styles.xLargeImage} source={imageSource}></Image>
				</View>
			)
	}
}


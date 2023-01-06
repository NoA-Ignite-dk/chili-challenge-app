import React from 'react';
import { Text, View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { typography, containerStyles } from '@src/styles/generalStyles';

interface InformationCardProps {
	title: string;
	subtitle: string;
	imageSource: ImageSourcePropType;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '100%',
		height: 100,
		resizeMode: 'cover',
		flex: 1,
	},
	textContainer: {
		height: 140,
		borderRadius: 7,
	},
	imageContainer: {
		height: 200,
	},
	textMargin: {
		marginBottom: 12,
	},
	textMarginSmall: {
		marginBottom: 5,
	},
});

export default function InformationCard({ title, subtitle, imageSource }: InformationCardProps) {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} />
			</View>

			<View style={[styles.textContainer, containerStyles.padding]}>
				<Text style={[typography.h2, styles.textMarginSmall]}>{title}</Text>
				<Text style={[typography.bodyRegular14, styles.textMargin]}>
					Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation
					veniam...
				</Text>
				<Text style={[typography.h3, styles.textMarginSmall]}>{subtitle}</Text>
				<Text style={typography.bodyRegular14}>
					Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation
					veniam...
				</Text>
			</View>
		</View>
	);
}

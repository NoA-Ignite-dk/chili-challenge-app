import React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { containerStyles } from '@src/styles/generalStyles'

import Colors from '@src/config/colors';
import { ProfileImage } from './ProfileImage';

interface ScoreboardCardProps {
	name: string;
	points: number;
	imageSource: ImageSourcePropType;
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		borderBottomWidth: 1,
		borderColor: Colors.LIGHT_GREY,
		maxHeight: 80,
		alignItems: "center",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		height: 80,
	},

	item1: {
		minWidth: 20,
		maxWidth: 20,
	},
	item2: {
		minWidth: 240,
		maxWidth: 240,
	},
	item3: {
		minWidth: 90,
		maxWidth: 90,
		justifyContent: "flex-end"
	},
	pointBackground: {
		width: 50,
		height: 30,
		backgroundColor: Colors.GREEN_PRIMARY,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	whiteText: {
		color: Colors.WHITE
	}

});


export default function ScoreboardCard({ name, points, imageSource }: ScoreboardCardProps) {
	return (
		<View style={[containerStyles.container, styles.grid]}>
			<View style={[styles.item, styles.item1]}>
				<Text>4</Text>
			</View>
			<View style={[styles.item, styles.item2]}>
				<ProfileImage imageSource={imageSource} size={"small"}></ProfileImage>
				<Text> {name} </Text>
			</View>
			<View style={[styles.item, styles.item3]}>
				<View style={styles.pointBackground}>
					<Text style={styles.whiteText}> {points} </Text>
				</View>
			</View>
		</View>
	);
}


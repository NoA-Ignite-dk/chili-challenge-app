import React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles'

import Colors from '@src/config/colors';
import { ProfileImage } from './ProfileImage';

interface ScoreboardCardProps {
	name: string;
	points: number;
	placement?: number;
	imageSource: ImageSourcePropType;
	type: 'firstToThirdPlace' | 'otherPlacements'
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
		minWidth: 280,
		maxWidth: 280,
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
	placement: {
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",

	},

});


export default function ScoreboardCard({ name, points, imageSource, placement, type }: ScoreboardCardProps) {
	// eslint-disable-next-line default-case
	switch (type) {
		case 'firstToThirdPlace':
			return (
				<View style={styles.placement}>
					<View style={styles.pointBackground}>
						<Text style={typography.whiteText}> {points} </Text>
					</View>
					<ProfileImage imageSource={imageSource} size={"large"}></ProfileImage>
					<Text style={typography.whiteText}>{name}</Text>
				</View>
			)
		case 'otherPlacements':
			return (
				<View style={[containerStyles.container, styles.grid]}>
					<View style={[styles.item, styles.item1]}>
						<Text>{placement}</Text>
					</View>
					<View style={[styles.item, styles.item2]}>
						<ProfileImage imageSource={imageSource} size={"small"}></ProfileImage>
						<Text> {name} </Text>
					</View>
					<View style={[styles.item, styles.item3]}>
						<View style={styles.pointBackground}>
							<Text style={typography.whiteText}> {points} </Text>
						</View>
					</View>
				</View>
			);
	}
}


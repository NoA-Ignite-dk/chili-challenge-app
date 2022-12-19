import React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from 'react-native';

import Colors from '@src/config/colors';
import { ProfileImage } from './ProfileImage'


interface ProfileCardProps {
	name: string;
	points: number;
	posts: number;
	imageSource?: ImageSourcePropType;
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		minHeight:100,
		maxHeight: 100,
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: Colors.WHITE
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		height: 80,

	},

	itemLeft: {
		maxWidth: "70%",
		minWidth: "70%"
	},
	itemRight: {
		maxWidth: "30%",
		minWidth: "30%",
		justifyContent: "space-between",
		paddingRight: 20
	},
	center: {
		textAlign: "center",
	},

});


export default function ProfileCard({ name, points, posts, imageSource }: ProfileCardProps) {
	return (
		<View style={styles.grid}>
			<View style={[styles.item, styles.itemLeft]}>
				{imageSource && (
					<ProfileImage imageSource={imageSource} size={"large"}></ProfileImage>
				)}
				<Text> {name} </Text>
			</View>
			<View style={[styles.item, styles.itemRight]}>
				<View>
					<Text style={styles.center}>{posts}</Text>
					<Text>posts</Text>
				</View>
				<View>
					<Text style={styles.center}>{points}</Text>
					<Text>points</Text>
				</View>
			</View>
		</View>
	);
}


import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '@src/config/colors';
import { useUserProfileQuery } from '@src/data/user-profile';
import { useUserPointsQuery } from '@src/data/user-points';
import { useUserPostsQuery } from '@src/data/user-posts';
import { ProfileImage } from './ProfileImage'
import { useAppContext } from './providers/appContext';

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		minHeight:100,
		maxHeight: 100,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
		backgroundColor: Colors.WHITE
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		height: 80,
	},
	itemLeft: {
		maxWidth: "65%",
		minWidth: "65%",

	},
	itemRight: {
		maxWidth: "20%",
		minWidth: "20%",
		justifyContent: "space-between",
	},
	center: {
		textAlign: "center",
	},
});

export default function ProfileCard() {
	const { session } = useAppContext();
	const { data: profileData } = useUserProfileQuery(session?.user.id);
	const { data: pointsData } = useUserPointsQuery(session?.user.id);
	const { data: postState } = useUserPostsQuery(session?.user.id);

	const imageSource = profileData?.profilePicture
		? { uri: profileData?.profilePicture}
		: require('../../assets/images/chiliplant.jpg');

	const totalPoints = (pointsData || [])
		.reduce(
			(total, e) => total + (e.point_to_claim?.amount || 0),
			0,
		);

	const postCount = (postState || []).length;

	return (
		<View style={styles.grid}>
			<View style={[styles.item, styles.itemLeft]}>
				{imageSource && (
					<ProfileImage imageSource={imageSource} size={"large"}></ProfileImage>
				)}
				<Text> {profileData?.fullName} </Text>
			</View>
			<View style={[styles.item, styles.itemRight]}>
				<View>
					<Text style={styles.center}>{postCount}</Text>
					<Text>posts</Text>
				</View>
				<View>
					<Text style={styles.center}>{totalPoints}</Text>
					<Text>points</Text>
				</View>
			</View>
		</View>
	);
}


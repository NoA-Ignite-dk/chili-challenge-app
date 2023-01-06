import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '@src/config/colors';
import { typography } from '@src/styles/generalStyles';
import { usePointsByUserIdQuery } from '@src/data/points';
import { usePostsByUserIDQuery } from '@src/data/posts';
import { useProfileQuery } from '@src/data/profile';
import { ProfileImage } from './ProfileImage';

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',

		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 20,
		backgroundColor: Colors.WHITE,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
	},
	itemLeft: {
		maxWidth: '65%',
		minWidth: '65%',
	},
	itemRight: {
		maxWidth: '20%',
		minWidth: '20%',
		justifyContent: 'space-between',
	},
	center: {
		textAlign: 'center',
	},
	marginLeft: {
		marginLeft: 10,
	},
});

export default function ProfileCard({ userId }: { userId: string }) {
	const { data: profileData } = useProfileQuery(userId);
	const { data: pointsData } = usePointsByUserIdQuery(userId);
	const { data: postState } = usePostsByUserIDQuery(userId);
	const imageSource = profileData?.profilePicture ? { uri: profileData.profilePicture } : undefined;
	const totalPoints = (pointsData || []).reduce((total, e) => total + (e.point_to_claim?.amount || 0), 0);
	const postCount = (postState || []).length;

	return (
		<View style={styles.grid}>
			<View style={[styles.item, styles.itemLeft]}>
				{imageSource && <ProfileImage imageSource={imageSource} size={'large'}></ProfileImage>}
				<Text style={[typography.h3, styles.marginLeft]}>{profileData?.fullName}</Text>
			</View>
			<View style={[styles.item, styles.itemRight]}>
				<View>
					<Text style={[styles.center, typography.h3]}>{postCount}</Text>
					<Text style={typography.bodySecondary}>posts</Text>
				</View>
				<View>
					<Text style={[styles.center, typography.h3]}>{totalPoints}</Text>
					<Text style={typography.bodySecondary}>points</Text>
				</View>
			</View>
		</View>
	);
}

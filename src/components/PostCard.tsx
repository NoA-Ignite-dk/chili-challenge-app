import React from 'react';
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';

// Config
import Colors from '@src/config/colors';
import { useUserProfileQuery } from '@src/data/user-profile';
import { PublicPost } from '@src/data/posts';
import { ProfileImage } from './ProfileImage';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'flex-start',
		minWidth: '100%',
		marginBottom: 20,
		// padding: 10,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 5,
	},
	imageContainer: {
		width: '100%',
		position: 'relative',
	},
	image: {
		height: 380,
		width: '100%',
		resizeMode: 'cover',
	},
	text: {
		textAlign: 'left',
		padding: 18,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
	},
	itemLeft: {},
	itemRight: {},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		padding: 5,
		resizeMode: 'contain',
	},
	profileName: {
		marginLeft: 10,
	},
	date: {
		marginRight: 10,
	},
});

type Props = {
	item: PublicPost;
};

export default function PostCard({ item }: Props) {
	const { data: profileData } = useUserProfileQuery(item.user_id);
	const { width } = Dimensions.get('window');
	const date = new Date(item.created_at);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	} as const;

	return (
		<View style={styles.container}>
			<View style={[styles.flex, { width }]}>
				<View style={[styles.item, styles.itemLeft]}>
					<ProfileImage imageSource={{ uri: profileData?.profilePicture }} size={'small'}></ProfileImage>
					<Text style={styles.profileName}>{profileData?.fullName}</Text>
				</View>
				<View style={[styles.item, styles.itemRight]}>
					<View>
						<Text style={styles.date}>{date.toLocaleDateString(undefined, options)}</Text>
					</View>
				</View>
			</View>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: item.image_url }} />
			</View>
			<Text style={styles.text}>{item.description}</Text>
		</View>
	);
}

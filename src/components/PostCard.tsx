import React from 'react';
import { Image, StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';

// Config
import Colors from '@src/config/colors';
import { PublicPost } from '@src/data/posts';
import { useProfileQuery } from '@src/data/profile';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import Variables from '@src/config/variables';
import { POINT_TYPES } from '@src/constants/general';
import { ROUTES } from '@src/config/routes';
import { usePointsByUserIdQuery } from '@src/data/points';
import { ProfileImage } from './ProfileImage';
import { useAppContext } from './providers/appContext';
import SecondaryButton from './buttons/SecondaryButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'flex-start',
		minWidth: '100%',
		marginBottom: 20,
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
		fontFamily: 'Manrope_400Regular',
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
		fontFamily: 'Manrope_400Regular',
	},
	date: {
		marginRight: 10,
		fontFamily: 'Manrope_400Regular',
	},
	claimedPoint: {
		paddingHorizontal: 18,
		paddingVertical: 18,
		paddingBottom: 10,
	},
	claimedPointButton: {
		backgroundColor: Colors.YELLOW_GOLD,
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: Variables.BORDER_RADIUS_LARGE,
		borderColor: Colors.YELLOW_GOLD,
	},
	claimedPointButtonText: {
		color: Colors.WHITE,
	},
});

type Props = {
	item: PublicPost;
};

export default function PostCard({ item }: Props) {
	const { session } = useAppContext();
	const { data: profileData } = useProfileQuery(item.user_id);
	const { width } = Dimensions.get('window');
	const date = new Date(item.created_at);
	const { data: pointsData } = usePointsByUserIdQuery(item.user_id);
	const claimedPoint = pointsData?.find((pointItem) => pointItem.post_id === item.id);
	const navigation = useNavigation<AllRoutesNavigationProp>();

	function openUserProfile() {
		if (session?.user.id === item.user_id) {
			return navigation.navigate(ROUTES.PROFILE);
		}

		return navigation.push(ROUTES.USER, { user_id: item.user_id });
	}

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	} as const;

	return (
		<View style={styles.container}>
			<View style={[styles.flex, { width }]}>
				<Pressable onPress={() => openUserProfile()} style={[styles.item, styles.itemLeft]}>
					<ProfileImage imageSource={{ uri: profileData?.profilePicture }} size={'small'}></ProfileImage>
					<Text style={styles.profileName}>{profileData?.fullName}</Text>
				</Pressable>
				<View style={[styles.item, styles.itemRight]}>
					<View>
						<Text style={styles.date}>{date.toLocaleDateString(undefined, options)}</Text>
					</View>
				</View>
			</View>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: item.image_url }} />
			</View>
			{claimedPoint && (
				<View style={styles.claimedPoint}>
					<SecondaryButton icon="star" fullWidth style={styles.claimedPointButton} textStyle={styles.claimedPointButtonText}>
						{POINT_TYPES[claimedPoint?.point_to_claim?.type as keyof typeof POINT_TYPES]}
						{': '}
						{claimedPoint.point_to_claim?.title}
					</SecondaryButton>
				</View>
			)}
			<Text style={styles.text}>{item.description}</Text>
		</View>
	);
}

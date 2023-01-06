import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles';

import Colors from '@src/config/colors';
import { Profile } from '@src/data/profile';
import { useNavigation } from '@react-navigation/native';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import { useAppContext } from './providers/appContext';
import { ProfileImage } from './ProfileImage';

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderBottomWidth: 1,
		borderColor: Colors.LIGHT_GREY,
		maxHeight: 80,
		alignItems: 'center',
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
	},

	item1: {
		minWidth: '5%',
		maxWidth: '5%',
	},
	item2: {
		minWidth: '67%',
		maxWidth: '67%',
	},
	item3: {
		minWidth: '25%',
		maxWidth: '25%',
		justifyContent: 'flex-end',
	},
	pointBackground: {
		width: 50,
		height: 30,
		backgroundColor: Colors.GREEN_PRIMARY,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	placement: {
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	marginRight: {
		marginLeft: 5,
	},
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const placeholderImage = require('../../assets/images/chiliplant.jpg');

interface ScoreboardCardProps {
	user: Profile;
	points: number;
	placement?: number;
	type: 'firstToThirdPlace' | 'otherPlacements';
}

export default function ScoreboardCard({ user, points, placement, type }: ScoreboardCardProps) {
	const { session } = useAppContext();
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const imageSource = user.profilePicture ? { uri: user.profilePicture } : placeholderImage;

	function openUserProfile() {
		if (session?.user.id === user.id) {
			return navigation.navigate(ROUTES.PROFILE);
		}

		return navigation.push(ROUTES.USER, { user_id: user.id });
	}

	switch (type) {
		case 'firstToThirdPlace':
			return (
				<View style={styles.placement}>
					<View style={styles.pointBackground}>
						<Text style={[typography.whiteText, typography.bodySemibold]}> {points} </Text>
					</View>
					<Pressable style={{ alignItems: 'center' }} onPress={openUserProfile}>
						<ProfileImage imageSource={imageSource} size={'small'} />
						<Text style={[typography.whiteText, typography.h3]}>{user.fullName}</Text>
					</Pressable>
				</View>
			);
		case 'otherPlacements':
		default:
			return (
				<View style={[containerStyles.container, styles.grid]}>
					<View style={[styles.item, styles.item1]}>
						<Text style={typography.bodySecondary}>{placement}</Text>
					</View>
					<Pressable style={[styles.item, styles.item2]} onPress={openUserProfile}>
						<ProfileImage imageSource={imageSource} size={'small'}></ProfileImage>
						<Text style={[styles.marginRight, typography.h3]}> {user.fullName} </Text>
					</Pressable>
					<View style={[styles.item, styles.item3]}>
						<View style={styles.pointBackground}>
							<Text style={[typography.whiteText, typography.bodySemibold]}> {points} </Text>
						</View>
					</View>
				</View>
			);
	}
}

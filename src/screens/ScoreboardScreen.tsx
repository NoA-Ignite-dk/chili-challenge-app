import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles'

// Components

// Config
import Colors from '@src/config/colors';
import ScoreboardCard from '@src/components/ScoreboardCard';
import { UserWithPoints, useUsersWithPointsQuery } from '@src/data/users-with-points';
import { ProfileImage } from '@src/components/ProfileImage';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GREEN_PRIMARY,
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		marginTop: 60
	},
	bottomContainer: {
		width: '100%',
		backgroundColor: Colors.WHITE,
		borderRadius: 12,
		height: 500
	},
	firstPlacePole: {
		height: 160,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'
	},
	secondPlacePole: {
		height: 120,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'
	},
	thirdPlacePole: {
		height: 105,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'

	},
	placementContainer: {
		justifyContent: "center",
		alignItems: "center",

	},
	placement: {
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",

	},
	scoreboardNumbers: {
		fontSize: 50,
		fontWeight: '800',
		marginTop: 10
	}
});

export default function ScoreboardScreen() {
	const { data: usersWithPoints, isLoading, isError } = useUsersWithPointsQuery();

	if (isLoading) {
		return (
			<View>
				<Text>Loading..</Text>
			</View>
		)
	}

	if (isError || !usersWithPoints) {
		return (
			<View>
				<Text>Something went wrong</Text>
			</View>
		)
	}

	const [first, second, third, ...others] = usersWithPoints
		.map((user) => {
			return {
				...user,
				total: user.point.reduce((total, point) => total + (point.point_to_claim?.amount || 0), 0)
			}
		})
		.sort((a, b) => b.total - a.total)
		.map((user, index) => {
			return {
				...user,
				placement: index + 1
			}

		})

	function renderUserWithPoints({ item }: { item: UserWithPoints & { total: number , placement: number } }) {
		return (
			<ScoreboardCard
				name={item.fullName}
				points={item.total}
				placement={item.placement}
				imageSource={item.profilePicture
					? { uri: item.profilePicture }
					: require('../../assets/images/chiliplant.jpg')
				}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.placementContainer}>
					<View style={styles.placement}>
						<ProfileImage imageSource={{ uri: second.profilePicture }} size={"large"}></ProfileImage>
						<Text style={typography.whiteText}>{second.fullName}</Text>
					</View>
					<View style={styles.secondPlacePole}>
						<Text style={[styles.scoreboardNumbers, typography.whiteText]}>2</Text>
					</View>
				</View>
				<View style={styles.placementContainer}>
					<View style={styles.placement}>
						<ProfileImage imageSource={{ uri: first.profilePicture }} size={"large"}></ProfileImage>
						<Text style={typography.whiteText}>{first.fullName}</Text>
					</View>
					<View style={styles.firstPlacePole}>
						<Text style={[styles.scoreboardNumbers, typography.whiteText]}>1</Text>
					</View>
				</View>
				<View style={styles.placementContainer}>
					<View style={styles.placement}>
						<ProfileImage imageSource={{ uri: third.profilePicture }} size={"large"}></ProfileImage>
						<Text style={typography.whiteText}>{third.fullName}</Text>
					</View>
					<View style={styles.thirdPlacePole}>
						<Text style={[styles.scoreboardNumbers, typography.whiteText]}>3</Text>
					</View>
				</View>
			</View>
			<View style={[styles.bottomContainer, containerStyles.padding]}>
				<FlatList data={others} renderItem={renderUserWithPoints} />
			</View>
		</View>
	);
}

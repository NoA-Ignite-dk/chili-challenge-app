import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles'

// Config
import Colors from '@src/config/colors';
import ScoreboardCard from '@src/components/ScoreboardCard';
import { UserWithPoints, useUsersWithPointsQuery } from '@src/data/users-with-points';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GREEN_PRIMARY,
		marginBottom: 140
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
	},
	bottomContainer: {
		width: '100%',
		backgroundColor: Colors.WHITE,
		borderRadius: 12,
		marginBottom: 140
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
	scoreboardNumbers: {
		fontSize: 50,
		fontWeight: '800',
		fontFamily: "Manrope_800ExtraBold",
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

	function renderUserWithPoints({ item }: { item: UserWithPoints & { total: number, placement: number } }) {
		return (
			<ScoreboardCard
				user={item}
				points={item.total}
				placement={item.placement}
				type={'otherPlacements'}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.placementContainer}>
					<ScoreboardCard
						user={second}
						points={second.total}
						placement={second.placement}
						type={'firstToThirdPlace'}
					/>
					<View style={styles.secondPlacePole}>
						<Text style={[styles.scoreboardNumbers, typography.whiteText]}>2</Text>
					</View>
				</View>
				<View style={styles.placementContainer}>
					<ScoreboardCard
						user={first}
						points={first.total}
						placement={first.placement}
						type={'firstToThirdPlace'}
					/>
					<View style={styles.firstPlacePole}>
						<Text style={[styles.scoreboardNumbers, typography.whiteText]}>1</Text>
					</View>
				</View>
				<View style={styles.placementContainer}>
					<ScoreboardCard
						user={third}
						points={third.total}
						placement={third.placement}
						type={'firstToThirdPlace'}
					/>
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

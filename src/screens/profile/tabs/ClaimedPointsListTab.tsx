import Colors from '@src/config/colors';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { Point, usePointsByUserIdQuery } from '@src/data/points';
import SecondaryButton from '@src/components/buttons/SecondaryButton';
import Variables from '@src/config/variables';
import { POINT_TYPES } from '@src/constants/general';

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
		height: 60,
	},
	itemLeft: {
		minWidth: '75%',
		maxWidth: '75%',
	},
	itemRight: {
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

export function ClaimedPointsListTab({ userId }: { userId: string }) {
	const { data: pointsData } = usePointsByUserIdQuery(userId);

	function renderClaimedPoints({ item }: { item: Point }) {
		return (
			<View style={[containerStyles.container, styles.grid]}>
				<View style={[styles.item, styles.itemLeft]}>
					<SecondaryButton icon="star" style={styles.claimedPointButton} textStyle={styles.claimedPointButtonText}>
						{POINT_TYPES[item.point_to_claim?.type as keyof typeof POINT_TYPES]}
						{': '}
						{item.point_to_claim?.title}
					</SecondaryButton>
				</View>
				<View style={[styles.item, styles.itemRight]}>
					<View style={styles.pointBackground}>
						<Text style={[typography.whiteText, typography.bodySemibold]}> {item.point_to_claim?.amount} </Text>
					</View>
				</View>
			</View>
		);
	}

	return (
		<>
			{!pointsData?.length && <Text style={typography.placeholderText}>No claimed points yet!</Text>}
			<View style={[containerStyles.container, containerStyles.padding]}>
				<Text style={typography.uppercaseBig}>Claimed points</Text>
				<FlatList data={pointsData} renderItem={renderClaimedPoints}></FlatList>
			</View>
		</>
	);
}

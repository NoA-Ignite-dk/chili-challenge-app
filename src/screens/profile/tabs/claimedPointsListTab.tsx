import Colors from "@src/config/colors";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Point, useUserPointsQuery } from '@src/data/user-points';
import { useAppContext } from "@src/components/providers/appContext";
import { containerStyles, typography } from "@src/styles/generalStyles";

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
	labelContainer: {
		flexDirection: "row",
		alignItems: "center",
		maxHeight: 40
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		height: 80,
	},

	item1: {
		minWidth: "10%",
		maxWidth: "10%",
	},
	item2: {
		minWidth: "60%",
		maxWidth: "60%",
	},
	item3: {
		minWidth: "25%",
		maxWidth: "25%",
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
	marginRight: {
		marginLeft: 5
	}

});
export function claimedPointsListTab() {
	const { session } = useAppContext();
	const { data: pointsData } = useUserPointsQuery(session?.user.id);

	function renderClaimedPoints({ item }: { item: Point }) {
		return (
			<View style={[containerStyles.container, styles.grid]}>
				<View style={[styles.item, styles.item1]}>
					<Text style={typography.bodySecondary}>{item.point_to_claim?.type}</Text>
				</View>
				<View style={[styles.item, styles.item2]}>
					<Text style={[styles.marginRight, typography.h3]}> {item.point_to_claim?.title} </Text>
				</View>
				<View style={[styles.item, styles.item3]}>
					<View style={styles.pointBackground}>
						<Text style={[typography.whiteText, typography.bodySemibold]}> {item.point_to_claim?.amount} </Text>
					</View>
				</View>
			</View>
		)
	}



	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<View style={[containerStyles.container, styles.labelContainer]}>
				<View style={[styles.item, styles.item1]}>
					<Text style={typography.uppercaseBig}>Type</Text>
				</View>
				<View style={[styles.item, styles.item2]}>
					<Text style={[styles.marginRight, typography.uppercaseBig]}>Title</Text>
				</View>
				<View style={[styles.item, styles.item3]}>
				</View>
			</View>
			<FlatList data={pointsData} renderItem={renderClaimedPoints}></FlatList>
		</View>
	);
}

import Colors from '@src/config/colors';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { Plant, usePlantsByUserIdQuery, useUpdatePlantMutation } from '@src/data/plants';
import { ProfileImage } from '@src/components/ProfileImage';
import SecondaryButton from '@src/components/buttons/SecondaryButton';
import { useAppContext } from '@src/components/providers/appContext';
import AddPlantModal from '@src/components/AddPlantsModal';
import { useState } from 'react';

const styles = StyleSheet.create({
	greenBackground: {
		backgroundColor: Colors.GREEN_PRIMARY,
		borderRadius: 15,
		padding: 12,
	},
	buttonText: {
		color: Colors.WHITE,
		textTransform: 'uppercase',
	},
	grid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderBottomWidth: 1,
		borderBottomColor: Colors.LIGHT_GREY,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 15,
		paddingVertical: 15,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		flexBasis: 100,
		flexGrow: 1,
	},
	item3: {
		justifyContent: 'flex-end',
	},
	marginLeft: {
		marginLeft: 5,
	},
});

export function AllPlantsTab({ userId }: { userId: string }) {
	const { session } = useAppContext();
	const { data: plantState } = usePlantsByUserIdQuery(userId);
	const plantsMutation = useUpdatePlantMutation();
	const [addPlantsModalVisible, setAddPlantsModalVisible] = useState(false);
	const isCurrentProfile = session?.user.id === userId;
	const hasPlants = (plantState || []).some((plant) => plant);
	const hasPrimaryPlant = (plantState || []).some((plant) => plant.primary);

	const setPrimary = (item: Plant) => {
		plantsMutation.mutate({ id: item.id, payload: { primary: true } });
	};

	function renderPlant({ item }: { item: Plant }) {
		return (
			<View style={[containerStyles.container, styles.grid]}>
				<View style={styles.item}>
					<ProfileImage imageSource={{ uri: item.image_url }} size={'large'}></ProfileImage>
					<Text style={[typography.h3, styles.marginLeft]}> {item.name} </Text>
				</View>
				<View style={[styles.item, styles.item3]}>
					{isCurrentProfile && !hasPrimaryPlant && (
						<View>
							<SecondaryButton onPress={() => setPrimary(item)} icon={'plus'}>
								Set as primary
							</SecondaryButton>
						</View>
					)}
					{hasPrimaryPlant && (
						<View>
							{item.primary && (
								<View style={styles.greenBackground}>
									<Text style={[styles.buttonText, typography.uppercaseBig, typography.whiteText]}>Primary</Text>
								</View>
							)}
						</View>
					)}
				</View>
			</View>
		);
	}

	return (
		<>
			{!hasPlants && isCurrentProfile && (
				<View style={containerStyles.padding}>
					<Text style={typography.placeholderText}>You have no registered plants yet! </Text>
					<SecondaryButton icon="plus" iconColor={Colors.GREEN_PRIMARY} onPress={() => setAddPlantsModalVisible(true)}>
						Add plants
					</SecondaryButton>
				</View>
			)}
			{!hasPlants && !isCurrentProfile && (
				<View style={containerStyles.padding}>
					<Text style={typography.placeholderText}>No registered plants yet! </Text>
				</View>
			)}
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
				<FlatList data={plantState} renderItem={renderPlant} />
			</View>
			<AddPlantModal open={addPlantsModalVisible} setOpen={setAddPlantsModalVisible} />
		</>
	);
}

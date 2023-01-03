import Colors from '@src/config/colors';
import Variables from '@src/config/variables';
import { POINT_TYPES } from '@src/constants/general';
import { useClaimedPointsQuery } from '@src/data/points';
import { typography } from '@src/styles/generalStyles';
import { PointToClaim } from '@src/types/supabase';
import React from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from './buttons/PrimaryButton';
import Icon, { IconType } from './Icon';

const styles = StyleSheet.create({
	pointItem: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: '100%',
		height: 50,
	},
	deselectPoint: {
		backgroundColor: Colors.WHITE,
		borderColor: Colors.GREEN_PRIMARY,
		borderStyle: 'solid',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
		height: 50,
		marginBottom: 22,
	},
	deselectPointText: {
		color: Colors.GREEN_PRIMARY,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
	},
	modalView: {
		width: '100%',
		height: '70%',
		bottom: -150,
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		elevation: 5,
		backgroundColor: Colors.WHITE,
	},
	closeTextContainer: {
		alignSelf: 'baseline',
		marginBottom: 45,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	pointAmount: {
		backgroundColor: Colors.FADED_GREEN,
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: Variables.BORDER_RADIUS_LARGE,
		textAlign: 'right',
		marginTop: 5,
	},
	pointItemContainer: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	pointItemText: {
		marginTop: 5,
		color: Colors.WHITE,
	},
});

type Props = {
	data: any;
	open: boolean;
	setOpen: (arg: boolean) => void;
	setSelectedPoint: (pointId: number | null) => void;
	loading: boolean;
};

type PointItemProps = {
	item: PointToClaim;
	handleSelectPoint: Function;
};

type RenderPointItemProps = {
	item: PointToClaim;
};

const PointItem = ({ item, handleSelectPoint }: PointItemProps) => {
	const { data: allClaimedPointsData } = useClaimedPointsQuery();

	return (
		<Button
			disabled={allClaimedPointsData?.some((claimedPoint) => claimedPoint.claimed_point_id === item.id)}
			onPress={() => handleSelectPoint(item.id)}
			fullWidth
			style={styles.pointItem}
		>
			<View style={styles.pointItemContainer}>
				<Text style={[styles.pointItemText, typography.primaryButtonText]}>
					{POINT_TYPES[item.type as keyof typeof POINT_TYPES]}
					{': '}
					{item.title}
				</Text>
				<View style={styles.pointAmount}>
					<Text style={{ color: Colors.TEXT_60 }}>{item.amount}</Text>
				</View>
			</View>
		</Button>
	);
};

export default function PointsModal({ data, open, setOpen, setSelectedPoint, loading }: Props) {
	// const { data: allClaimedPointsData } = useClaimedPointsQuery();

	// const filteredPoints = data?.filter((pointToClaim: PointToClaim) => {
	// 	return !allClaimedPointsData?.find((claimedPoint) => {
	// 		return claimedPoint.claimed_point_id === pointToClaim.id;
	// 	});
	// });

	const handleSelectPoint = (pointId: number) => {
		setSelectedPoint(pointId);
		setOpen(!open);
	};

	const handleRemovePoint = () => {
		setSelectedPoint(null);
		setOpen(!open);
	};

	const renderPointItem = ({ item }: RenderPointItemProps) => <PointItem handleSelectPoint={handleSelectPoint} item={item} />;

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={open}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setOpen(!open);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{/* <Pressable style={styles.closeButton} onPress={() => setOpen(!open)}>
						<Icon width={32} height={32} type={IconType.CLOSE} />
					</Pressable> */}

					<FlatList data={data} renderItem={renderPointItem} keyExtractor={(item: any) => item.id} />

					<Button textStyle={styles.deselectPointText} onPress={() => handleRemovePoint()} fullWidth style={styles.deselectPoint}>
						<Text>Remove point</Text>
					</Button>

					{loading && <Icon type={IconType.LOADING} />}

					<Pressable style={styles.closeTextContainer} onPress={() => setOpen(!open)}>
						<Text style={typography.closeButton}>Close</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

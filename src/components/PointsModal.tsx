import Colors from '@src/config/colors';
import { PointToClaim } from '@src/types/supabase';
import React from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from './buttons/PrimaryButton';
import Icon, { IconType } from './Icon';

const styles = StyleSheet.create({
	pointItem: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
		height: 50,
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
	closeButton: {
		alignSelf: 'flex-end',
	},
	closeText: {
		alignSelf: 'baseline',
		marginBottom: 30,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

type Props = {
	data: any;
	open: boolean;
	setOpen: (arg: boolean) => void;
	setSelectedPoint: (pointId: number) => void;
	loading: boolean;
};

type PointItemProps = {
	item: PointToClaim;
	handleSelectPoint: Function;
};

type RenderPointItemProps = {
	item: PointToClaim;
};

const PointItem = ({ item, handleSelectPoint }: PointItemProps) => (
	<Button onPress={() => handleSelectPoint(item.id)} fullWidth style={styles.pointItem}>
		<Text>{item.title}</Text>
		<Text>{item.amount}</Text>
	</Button>
);

export default function PointsModal({ data, open, setOpen, setSelectedPoint, loading }: Props) {
	const handleSelectPoint = (pointId: number) => {
		setSelectedPoint(pointId);
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
					<Pressable style={styles.closeButton} onPress={() => setOpen(!open)}>
						<Icon width={32} height={32} type={IconType.CLOSE} />
					</Pressable>

					<FlatList data={data} renderItem={renderPointItem} keyExtractor={(item: any) => item.id} />

					{loading && <Icon type={IconType.LOADING} />}

					<Pressable style={styles.closeText} onPress={() => setOpen(!open)}>
						<Text>Close</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

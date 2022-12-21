import Colors from '@src/config/colors';
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
});

type Props = {
	data: any;
	open: boolean;
	setOpen: (arg: boolean) => void;
	setSelectedPoint: any;
};

type PointItemProps = {
	title: string | null;
	amount: number | null;
	id: number;
	setSelectedPoint: any;
};

const PointItem = ({ title, amount, id, setSelectedPoint }: PointItemProps) => (
	<Button onPress={() => setSelectedPoint(id)} fullWidth style={styles.pointItem}>
		<Text>{title}</Text>
		<Text>{amount}</Text>
	</Button>
);

export default function PointsModal({ data, open, setOpen, setSelectedPoint }: Props) {
	const renderPointItem = (item: any) => (
		<PointItem id={item.id} setSelectedPoint={setSelectedPoint} title={item.title} amount={item.amount} />
	);

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
				</View>
			</View>
		</Modal>
	);
}

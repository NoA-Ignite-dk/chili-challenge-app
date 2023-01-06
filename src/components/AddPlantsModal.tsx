import { useAppContext } from '@src/components/providers/appContext';
import { containerStyles, typography } from '@src/styles/generalStyles';
import { useState } from 'react';
import { Pressable, StyleSheet, View, Text, Modal, Alert } from 'react-native';
import Button from '@src/components/buttons/PrimaryButton';
import Icon, { IconType } from '@src/components/Icon';
import Colors from '@src/config/colors';
import { useCreatePlantMutation } from '@src/data/plants';
import AddPlantCard from './AddPlantCard';
import SecondaryButton from './buttons/SecondaryButton';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	modalView: {
		width: '100%',
		bottom: -108,
		borderRadius: 20,
		padding: 20,
		backgroundColor: Colors.WHITE,
	},
	closeTextContainer: {
		alignSelf: 'baseline',
		marginBottom: 36,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	closeText: {
		marginTop: 18,
	},
	validationError: {
		...typography.errorMessage,
		textAlign: 'center',
		paddingBottom: 4,
	},
});

type Props = {
	open: boolean;
	setOpen: (arg: boolean) => void;
};

export default function AddPlantModal({ open, setOpen }: Props) {
	const { session } = useAppContext();
	const createPlantMutation = useCreatePlantMutation();
	const [submitted, setSubmitted] = useState(false);

	const [plants, setPlants] = useState([
		{ name: '', picture: '' },
		{ name: '', picture: '' },
		{ name: '', picture: '' },
	]);

	const isValid = plants.every((plant) => plant.name && plant.picture);

	function submitModal() {
		setSubmitted(true);

		if (!isValid) {
			return;
		}

		// TODO: Implement bulk create mutation
		Promise.all(
			plants.map((e) =>
				createPlantMutation.mutateAsync({
					payload: {
						name: e.name,
						image_url: e.picture,
						user_id: session.user.id,
					},
				}),
			),
		).then(() => setOpen(false));
	}

	function onChange(index: number, payload: { name?: string; picture?: string }) {
		setPlants((currentPlants) =>
			currentPlants.map((plant, i) => {
				if (i === index) {
					return {
						...plant,
						...payload,
					};
				}

				return plant;
			}),
		);
	}

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
			<View style={[containerStyles.container, styles.modalView]}>
				<AddPlantCard
					label="Name your first plant"
					name={plants[0].name}
					picture={plants[0].picture}
					onChange={(payload) => onChange(0, payload)}
				/>
				<AddPlantCard
					label="Name your second plant"
					name={plants[1].name}
					picture={plants[1].picture}
					onChange={(payload) => onChange(1, payload)}
				/>
				<AddPlantCard
					label="Name your third plant"
					name={plants[2].name}
					picture={plants[2].picture}
					onChange={(payload) => onChange(2, payload)}
				/>

				<View style={[styles.verticallySpaced, styles.mt20, containerStyles.padding]}>
					{submitted && !isValid && <Text style={styles.validationError}>Please fill out all names & pictures!</Text>}
					<Button onPress={submitModal}>{createPlantMutation.isLoading ? <Icon type={IconType.LOADING} /> : 'Update'}</Button>
					<Pressable style={styles.closeTextContainer} onPress={() => setOpen(!open)}>
						<SecondaryButton fullWidth style={styles.closeText}>
							Close
						</SecondaryButton>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

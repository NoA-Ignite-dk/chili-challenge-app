import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { containerStyles, typography } from '@src/styles/generalStyles';
import Colors from '@src/config/colors';
import SecondaryButton from './buttons/SecondaryButton';
import EditPictureModal from './EditPictureModal';

const styles = StyleSheet.create({
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	plantItem: {
		flexDirection: 'row',
		backgroundColor: Colors.OFF_WHITE,
		minHeight: 56,
		maxHeight: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputField: {
		...typography.h3,
		flexGrow: 1,
	},
});

interface AddPlantCardProps {
	label: string;
	name: string;
	picture: string;
	onChange: (payload: { name?: string; picture?: string }) => void;
}

export default function AddPlantCard({ name, label, onChange }: AddPlantCardProps) {
	const [modalVisible, setModalVisible] = useState(false);

	function onPicture(picture: string) {
		onChange({ picture });
		setModalVisible(false);
	}

	return (
		<View>
			<Text style={typography.uppercaseBig}>{label}</Text>
			<View style={[styles.verticallySpaced, styles.plantItem, containerStyles.center]}>
				<TextInput style={styles.inputField} autoComplete={'name'} value={name || ''} onChangeText={(name) => onChange({ name })} />
				<SecondaryButton icon="plus" iconColor={Colors.GREEN_PRIMARY} onPress={() => setModalVisible(true)}>
					Add image
				</SecondaryButton>
			</View>
			<EditPictureModal onSave={onPicture} open={modalVisible} setOpenStatus={setModalVisible} />
		</View>
	);
}

import React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { containerStyles } from '@src/styles/generalStyles'

import Colors from '@src/config/colors';
import Button from '@src/components/buttons/PrimaryButton';
import { ProfileImage } from './ProfileImage';

interface PlantCardProps {
	name: string;
	imageSource: ImageSourcePropType;
	primary: boolean;
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		borderBottomWidth: 1,
		borderBottomColor: Colors.LIGHT_GREY,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 15,
		paddingVertical: 15,

	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		flexBasis: 100,
		flexGrow: 1

	},
	item3: {
		justifyContent: "flex-end"
	},

});


export default function PlantCard({ name, primary, imageSource }: PlantCardProps) {
	return (
		<View style={[containerStyles.container, styles.grid]}>
			<View style={styles.item}>
				<ProfileImage imageSource={imageSource} size={"large"}></ProfileImage>
				<Text> {name} </Text>
			</View>
			<View style={[styles.item, styles.item3]}>
				<View>
				{primary === false
				? <Button>Set as primary</Button>
				: <Button>Primary</Button> }

				</View>
			</View>
		</View>
	);
}


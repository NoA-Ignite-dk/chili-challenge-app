import { StyleSheet } from 'react-native';
import Colors from '@src/config/colors';
// Config

// eslint-disable-next-line import/prefer-default-export
export const typography = StyleSheet.create({
	h1: {
		fontWeight: '600',
		fontSize: 18,

	},
	h2: {
		fontWeight: '600',
		fontSize: 16
	},
	h3: {
		fontWeight: '100',
	},


	firstPlacePole:{
		height: 160,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'
	},
	secondPlacePole:{
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
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	padding: {
		padding: 15,
	}

})

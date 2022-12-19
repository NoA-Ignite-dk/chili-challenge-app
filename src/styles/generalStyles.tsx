import { StyleSheet } from 'react-native';
import Colors from '@src/config/colors';
// Config

export const typography = StyleSheet.create({
	h1: {
		fontWeight: '600',
		fontSize: 18,
	},
	h2: {
		fontWeight: '600',
		fontSize: 16,
	},
	h3: {
		fontWeight: '100',
	},
	largeTitle: {
		fontSize: 60,
		fontWeight: '600',
	},
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE
	},
	padding: {
		padding: 15,
	},
	largePaddingTop: {
		paddingTop: 66,
	},
	largePaddingBottom: {
		paddingBottom: 56,
	},
});

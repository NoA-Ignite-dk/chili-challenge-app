import { StyleSheet } from 'react-native';
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
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	padding: {
		padding: 15,
	},
	largePaddingBottom: {
		paddingBottom: 56,
	},
});

import { StyleSheet } from 'react-native';
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
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	padding: {
		padding: 15,
	}

})

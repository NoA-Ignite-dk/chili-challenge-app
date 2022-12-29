import Colors from '@src/config/colors';
import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
	h1: {
		fontFamily: 'Manrope_700Bold',
		fontWeight: '600',
		fontSize: 24,
	},
	h2: {
		fontFamily: 'Manrope_600SemiBold',
		fontWeight: '600',
		fontSize: 16,
	},
	h3: {
		fontFamily: 'Manrope_500Medium',
		fontSize: 16
	},
	uppercaseBig: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 12,
		textTransform: 'uppercase',
		color: Colors.TEXT_60,
	},
	largeTitle: {
		fontFamily: 'Manrope_700Bold',
		fontSize: 60,
		fontWeight: '600',
	},
	bodyRegular16: {
		fontFamily: "Manrope_400Regular",
		fontSize: 16
	},
	bodyRegular14: {
		fontFamily: "Manrope_400Regular",
		fontSize: 14
	},
	bodySemibold: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 14
	},
	bodySecondary:{
		fontFamily: "Manrope_500Medium",
		fontSize: 12
	},
	headerTitle: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 16,
		color: Colors.GREEN_PRIMARY,
	},
	whiteText: {
		color: Colors.WHITE
	}
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
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

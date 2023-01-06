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
		fontSize: 16,
	},
	uppercaseBig: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 13,
		textTransform: 'uppercase',
		color: Colors.TEXT_60,
	},
	largeTitle: {
		fontFamily: 'Manrope_700Bold',
		fontSize: 60,
		lineHeight: 70,
	},
	bodyRegular16: {
		fontFamily: 'Manrope_400Regular',
		fontSize: 16,
	},
	bodyRegular14: {
		fontFamily: 'Manrope_400Regular',
		fontSize: 14,
	},
	bodySemibold: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 14,
	},
	bodySecondary: {
		fontFamily: 'Manrope_500Medium',
		fontSize: 12,
	},
	headerTitle: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 16,
		color: Colors.GREEN_PRIMARY,
	},
	whiteText: {
		color: Colors.WHITE,
	},
	signupTitle: {
		fontFamily: 'Manrope_700Bold',
		fontSize: 32,
		lineHeight: 42,
		maxWidth: '80%',
		marginBottom: 10,
		marginTop: 14,
	},
	signupText: {
		fontFamily: 'Manrope_400Regular',
		fontSize: 16,
		marginBottom: 20,
	},
	errorMessage: {
		fontFamily: 'Manrope_400Regular',
		color: Colors.ERROR_RED,
		paddingHorizontal: 20,
		paddingTop: 10,
	},
	buttonText: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 14,
		textTransform: 'uppercase',
	},
	primaryButtonText: {
		fontFamily: 'Manrope_500Medium',
		fontSize: 16,
	},
	closeButton: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 16,
		color: Colors.TEXT_60,
	},
	placeholderText: {
		fontFamily: 'Manrope_600SemiBold',
		fontSize: 16,
		color: Colors.TEXT_60,
		textAlign: 'center',
		marginVertical: 20,
	},
});

export const containerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
	},
	center: {
		justifyContent: 'space-between',
		alignItems: 'center',
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

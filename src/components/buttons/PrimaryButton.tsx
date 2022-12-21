import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle, TextProps } from 'react-native';

// Config
import Colors from '@src/config/colors';

// Components
import LoadingIndicator from '@src/components/LoadingIndicator';
import Txt from '@src/components/Txt';

// Utils
import { verticalScale, scale } from '@src/utils/scaling';
import Variables from '@src/config/variables';

const styles = StyleSheet.create({
	pressable: {
		height: verticalScale(48),
		borderRadius: Variables.BORDER_RADIUS,
		alignItems: 'center',
		paddingHorizontal: scale(20),
		justifyContent: 'center',
		backgroundColor: Colors.GREEN_PRIMARY,
	},
	pressed: {
		backgroundColor: Colors.BLACK,
	},
	disabled: {
		backgroundColor: Colors.GREY,
	},
	text: {
		textTransform: 'uppercase',
		color: Colors.WHITE,
	},
	fullWidth: {
		minWidth: '100%',
	},
});

type Props = {
	disabled?: boolean;
	onPress?: () => void;
	children: TextProps['children'];
	style?: ViewStyle | ViewStyle[];
	loading?: boolean;
	textStyle?: TextStyle;
	fullWidth?: boolean;
};

const Button = ({ disabled = false, onPress, children, loading = false, style, textStyle, fullWidth = false, ...props }: Props) => {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				{ ...styles.pressable },
				pressed && styles.pressed,
				disabled ? styles.disabled : {},
				style && style,
				fullWidth && styles.fullWidth,
			]}
			{...props}
		>
			{loading && <LoadingIndicator />}
			{!loading && <Txt style={{ ...styles.text, ...textStyle }}>{children}</Txt>}
		</Pressable>
	);
};

export default Button;

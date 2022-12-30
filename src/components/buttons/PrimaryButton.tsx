import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle, TextProps, View } from 'react-native';

// Config
import Colors from '@src/config/colors';

// Components
import LoadingIndicator from '@src/components/LoadingIndicator';
import Txt from '@src/components/Txt';

// Utils
import { verticalScale, scale } from '@src/utils/scaling';
import Variables from '@src/config/variables';
import { typography } from '@src/styles/generalStyles';
import Icon, { IconType } from '../Icon';

const styles = StyleSheet.create({
	pressable: {
		height: verticalScale(48),
		borderRadius: Variables.BORDER_RADIUS,
		alignItems: 'center',
		paddingHorizontal: scale(20),
		justifyContent: 'center',
		backgroundColor: Colors.GREEN_PRIMARY,
		flexDirection: 'row',
		alignContent: 'center',
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
	icon: {
		marginLeft: 6,
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
	icon?: 'edit' | 'none';
};

const Button = ({
	disabled = false,
	onPress,
	children,
	loading = false,
	style,
	textStyle,
	fullWidth = false,
	icon = 'none',
	...props
}: Props) => {
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
			{!loading && <Txt style={{ ...typography.uppercaseBig, ...styles.text, ...textStyle }}>{children}</Txt>}
			{icon && icon === 'edit' && (
				<View style={styles.icon}>
					<Icon width={20} type={IconType.EDIT} stroke={Colors.WHITE} />
				</View>
			)}
		</Pressable>
	);
};

export default Button;

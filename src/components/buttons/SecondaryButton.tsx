import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle, TextProps, View, Text } from 'react-native';

// Config
import Colors from '@src/config/colors';

// Components
import LoadingIndicator from '@src/components/LoadingIndicator';

// Utils
import { verticalScale, scale } from '@src/utils/scaling';
import Variables from '@src/config/variables';
import Icon, { IconType } from '../Icon';

const styles = StyleSheet.create({
	pressable: {
		height: verticalScale(30),
		borderRadius: Variables.BORDER_RADIUS_LARGE,
		alignItems: 'center',
		paddingHorizontal: scale(20),
		justifyContent: 'center',
		backgroundColor: Colors.WHITE,
		flexDirection: 'row',
		alignContent: 'center',
		borderStyle: 'solid',
		borderColor: Colors.GREEN_PRIMARY,
		borderWidth: 1,
	},
	pressed: {
		backgroundColor: Colors.LIGHT_GREY,
	},
	disabled: {
		backgroundColor: Colors.GREY,
	},
	text: {
		textTransform: 'uppercase',
		color: Colors.GREEN_PRIMARY,
		marginTop: 2,
	},
	icon: {
		marginLeft: 8,
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
	icon?: 'plus' | 'none' | 'star';
	fullWidth?: boolean;
	iconColor?: string;
};

const SecondaryButton = ({
	disabled = false,
	onPress,
	children,
	loading = false,
	style,
	textStyle,
	icon = 'none',
	fullWidth = false,
	iconColor = Colors.WHITE,
	...props
}: Props) => {
	const iconType = {
		plus: IconType.PLUS,
		star: IconType.STAR,
	};

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
			{!loading && <Text style={{ ...styles.text, ...textStyle }}>{children}</Text>}
			{icon && icon !== 'none' && (
				<View style={styles.icon}>
					<Icon width={20} type={iconType[icon]} stroke={iconColor} />
				</View>
			)}
		</Pressable>
	);
};

export default SecondaryButton;

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
	},
});

type Props = {
	disabled?: boolean;
	onPress?: () => void;
	children: TextProps['children'];
	style?: ViewStyle | ViewStyle[];
	loading?: boolean;
	textStyle?: TextStyle;
	icon?: 'plus' | 'none';
};

const SmallButton = ({ disabled = false, onPress, children, loading = false, style, textStyle, icon = 'none', ...props }: Props) => {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [{ ...styles.pressable }, pressed && styles.pressed, disabled ? styles.disabled : {}, style && style]}
			{...props}
		>
			{loading && <LoadingIndicator />}
			{!loading && <Txt style={{ ...styles.text, ...textStyle }}>{children}</Txt>}
			{icon && icon === 'plus' && <Icon width={20} type={IconType.PLUS} />}
		</Pressable>
	);
};

export default SmallButton;

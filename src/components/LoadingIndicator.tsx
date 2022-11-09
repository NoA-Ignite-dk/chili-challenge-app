import React from 'react';
import { StyleProp, ViewStyle, ActivityIndicator } from 'react-native';

// Config
import Colors from '@src/config/colors';

type Props = {
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
};

const LoadingIndicator = ({ color = Colors.WHITE, size = 20, style }: Props) => (
	<ActivityIndicator animating style={style} size={size} color={color} />
);

export default LoadingIndicator;

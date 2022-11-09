import React from 'react';
import { TextStyle, Text, TextProps } from 'react-native';

import { FontKey } from '@mthines/react-native-font-face';

// Constants
import { fontFace, FontName } from '@src/constants/font';

type Props = {
	children?: TextProps['children'];
	style?: TextStyle;
};

const Txt = ({
	children,
	style: { fontFamily = 'Roboto', fontWeight = '400', fontStyle = 'normal', ...style } = {} as TextStyle,
}: Props) => {
	// Defining the Font Key in a separate variable, so we can type it for the index of the Object
	// We need to cast `fontFamily` to `FontName`, as the fontFamily type is coming from the `TextStyle`,
	// which has no relation to our `FontName`
	const fontKey: FontKey<FontName> = `${fontFamily as FontName}.${fontStyle}.${fontWeight}`;
	// Get the actual font from the fonts Object matching the key, or use a fallback
	const fontFaceFamily = fontFace[fontKey] || fontFace['Roboto.normal.400'];

	return <Text style={{ fontFamily: fontFaceFamily, ...style }}>{children}</Text>;
};

export default Txt;

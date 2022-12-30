// @TODO delete this file

import { setFontFace } from '@mthines/react-native-font-face';

export enum FontNames {
	robotoRegular = 'roboto-regular',
	robotoItalic = 'roboto-italic',
	robotoBold = 'roboto-bold',
	robotoLight = 'roboto-light',
}

export enum FontWeights {
	light = '200',
	normal = '400',
	bold = '600',
}

export type FontName = 'Roboto';
export type FontFamilies = FontNames.robotoBold | FontNames.robotoItalic | FontNames.robotoLight | FontNames.robotoRegular;

export const fontFace = setFontFace<FontName, FontFamilies>([
	{
		font: FontNames.robotoRegular,
		style: {
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: FontWeights.normal,
		},
	},
	{
		font: FontNames.robotoBold,
		style: {
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: FontWeights.bold,
		},
	},
	{
		font: FontNames.robotoItalic,
		style: {
			fontFamily: 'Roboto',
			fontStyle: 'italic',
			fontWeight: FontWeights.normal,
		},
	},
	{
		font: FontNames.robotoLight,
		style: {
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: FontWeights.light,
		},
	},
]);

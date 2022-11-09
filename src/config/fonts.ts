import * as Font from 'expo-font';

import { FontNames } from '@src/constants/font';

export const CustomFonts = {
	[FontNames.robotoBold]: require('../../assets/fonts/Roboto-Bold.ttf'),
	[FontNames.robotoItalic]: require('../../assets/fonts/Roboto-Italic.ttf'),
	[FontNames.robotoLight]: require('../../assets/fonts/Roboto-Light.ttf'),
	[FontNames.robotoRegular]: require('../../assets/fonts/Roboto-Regular.ttf'),
};

export const loadFonts = () => Font.loadAsync(CustomFonts);

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

export type MainStackParamList = {
	[ROUTES.MAIN_STACK]: undefined;
	[ROUTES.AUTH_STACK]: undefined;
	[ROUTES.LANDING_PAGE]: undefined;
	[ROUTES.FEED]: undefined;
	[ROUTES.POST]: undefined;
	[ROUTES.SCOREBOARD]: undefined;
	[ROUTES.INFO]: undefined;
	[ROUTES.PROFILE]: undefined;
	[ROUTES.MAIN_TABS]: undefined;
	[ROUTES.AUTH_LANDING_PAGE]: undefined;
	[ROUTES.SIGN_UP]: undefined;
	[ROUTES.LOGIN]: undefined;
	// [ROUTES.DETAIL_PAGE]: {
	// 	pageId: string;
	// 	title: string;
	// };
};

export type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList, ROUTES>;

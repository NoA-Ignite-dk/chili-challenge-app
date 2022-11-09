import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

export type MainStackParamList = {
	[ROUTES.MAIN_STACK]: undefined;
	[ROUTES.LANDING_PAGE]: undefined;
	[ROUTES.DETAIL_PAGE]: {
		pageId: string;
		title: string;
	};
};

export type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList, ROUTES>;

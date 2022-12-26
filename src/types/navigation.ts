import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Config
import { ROUTES } from '@src/config/routes';

export type AllRoutesParamList = {
	[ROUTES.AUTH_STACK]: undefined;
	[ROUTES.FEED]: undefined;
	[ROUTES.POST]: undefined;
	[ROUTES.SCOREBOARD]: undefined;
	[ROUTES.INFO]: undefined;
	[ROUTES.PROFILE]: undefined;
	[ROUTES.MAIN_TABS]: undefined;
	[ROUTES.AUTH_LANDING_PAGE]: undefined;
	[ROUTES.SIGN_UP]: undefined;
	[ROUTES.LOGIN]: undefined;
	[ROUTES.SIGN_UP_EMAIL]: undefined;
	[ROUTES.SIGN_UP_NAME]: undefined;
	[ROUTES.SIGN_UP_PASSWORD]: undefined;
	[ROUTES.SIGN_UP_PLANTS]: undefined;
	[ROUTES.SIGN_UP_SUCCESS]: undefined;
	[ROUTES.EDIT_PROFILE]: undefined;
	[ROUTES.PROFILE_STACK]: undefined;
};

export type MainStackParamList = {
	[ROUTES.AUTH_STACK]: undefined;
	[ROUTES.FEED]: undefined;
	[ROUTES.POST]: undefined;
	[ROUTES.SCOREBOARD]: undefined;
	[ROUTES.INFO]: undefined;
	[ROUTES.PROFILE]: undefined;
	[ROUTES.MAIN_TABS]: undefined;
	[ROUTES.EDIT_PROFILE]: undefined;
};

export type AuthStackParamList = {
	[ROUTES.AUTH_LANDING_PAGE]: undefined;
	[ROUTES.SIGN_UP]: undefined;
	[ROUTES.LOGIN]: undefined;
	[ROUTES.SIGN_UP_EMAIL]: undefined;
	[ROUTES.SIGN_UP_NAME]: undefined;
	[ROUTES.SIGN_UP_PASSWORD]: undefined;
	[ROUTES.SIGN_UP_PLANTS]: undefined;
	[ROUTES.SIGN_UP_SUCCESS]: undefined;
};

export type AllRoutesNavigationProp = NativeStackNavigationProp<AllRoutesParamList, ROUTES>;

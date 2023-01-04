import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import { schedulePushNotification } from '@src/utils/sendPushNotification';
import { registerForPushNotificationsAsync } from '@src/utils/registerForPushNotifications';
import * as Notifications from 'expo-notifications';

import {
	useFonts,
	Manrope_200ExtraLight,
	Manrope_300Light,
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

// Config
import { containerStyles } from '@src/styles/generalStyles';

// Types
import { Subscription } from 'expo-modules-core';
import { Notification } from 'expo-notifications';

// Navigators
import { queryClient } from '@src/lib/reactQuery';
import AppNavigator from './src/navigators/AppNavigator';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
	// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
	const [notification, setNotification] = useState<Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	const [fontsLoaded] = useFonts({
		Manrope_200ExtraLight,
		Manrope_300Light,
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
		Manrope_800ExtraBold,
	});

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
			} catch (e) {
				console.warn(e); // eslint-disable-line no-console
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		schedulePushNotification(expoPushToken);

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}

			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady && fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady, fontsLoaded]);

	if (!appIsReady || !fontsLoaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={containerStyles.container}>
				<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
					<StatusBar style="auto" />
					<AppNavigator />
				</View>
			</SafeAreaView>
		</QueryClientProvider>
	);
}

import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';

// Config
import { loadFonts } from '@src/config/fonts';
import { containerStyles } from '@src/styles/generalStyles';

// Navigators
import { queryClient } from '@src/lib/reactQuery';
import AppNavigator from './src/navigators/AppNavigator';

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await loadFonts();
			} catch (e) {
				console.warn(e); // eslint-disable-line no-console
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
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

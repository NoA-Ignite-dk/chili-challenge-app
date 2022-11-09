import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import PrimaryButton from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';

// Config
import Colors from '@src/config/colors';
import { ROUTES } from '@src/config/routes';

// Types
import { MainStackNavigationProp } from '@src/types/navigation';

// Utils
import { verticalScale } from '@src/utils/scaling';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		marginTop: verticalScale(20),
	},
});

export default function LandingScreen() {
	const navigation = useNavigation<MainStackNavigationProp>();

	const onPress = () => {
		navigation.navigate(ROUTES.DETAIL_PAGE, {
			title: 'dynamic title',
			pageId: 'dynamic page id',
		});
	};

	return (
		<View style={styles.container}>
			<Txt style={{ fontWeight: '200' }}>Welcome to our Expo boilerplate</Txt>
			<Txt style={{ fontWeight: '600' }}>Open up App.tsx to start working on your app!</Txt>
			<PrimaryButton style={styles.btn} onPress={onPress}>
				Go to detail screen
			</PrimaryButton>
		</View>
	);
}
